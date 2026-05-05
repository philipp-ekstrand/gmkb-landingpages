<?php
/**
 * Bewerbungs-Formular-Handler – Hooks fuer admin-post.php
 *
 * Endpoint: <?php echo esc_url( admin_url( 'admin-post.php' ) ); ?> mit action=gmkb_bewerbung_paediatrie
 *
 * Nutzt admin-post.php weil:
 *   - Maintenance-Plugin blockt /wp-admin/* nicht (frontend-only)
 *   - WordPress vollstaendig geladen, wp_mail() mit konfigurierter SMTP nutzbar
 *   - Saubere CSRF-Pruefung via Session-Token
 *
 * Sicherheit:
 *   - CSRF-Token (Session-basiert, One-Time Use)
 *   - Honeypot Anti-Spam
 *   - Session-Rate-Limit (3 Submissions / Stunde)
 *   - Eingabevalidierung + Sanitization
 *   - Datei-Upload-Validierung (MIME, Groesse, Anzahl)
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

const GMKB_RECIPIENT_EMAIL          = 'kbuchmueller@gmezkb.de';
const GMKB_RECIPIENT_NAME           = 'GMKB Bewerbungen';
const GMKB_DANKE_PATH               = '/danke-bewerbung/';
const GMKB_RATE_LIMIT_COUNT         = 3;
const GMKB_RATE_LIMIT_WINDOW        = 3600; // 1 Stunde
const GMKB_FILE_MAX_BYTES           = 5 * 1024 * 1024; // 5 MB pro Datei
const GMKB_FILE_MAX_TOTAL_BYTES     = 20 * 1024 * 1024; // 20 MB Gesamt
const GMKB_FILE_MAX_COUNT           = 5;

/**
 * Mapping Berufsfeld -> Subject + Formular-Pfad.
 * Wird verwendet um den Handler dynamisch zu bauen pro Stelle.
 */
function gmkb_get_berufe() {
    return array(
        'paediatrie'   => array(
            'label'   => 'Facharzt Paediatrie (m/w/d)',
            'subject' => 'Neue Bewerbung: Facharzt Paediatrie (m/w/d)',
            'path'    => '/facharzt-paediatrie/',
        ),
        'logopaedie'   => array(
            'label'   => 'Logopaede / Logopaedin (m/w/d)',
            'subject' => 'Neue Bewerbung: Logopaedin / Logopaede (m/w/d)',
            'path'    => '/logopaede-logopaedin/',
        ),
        'ergotherapie' => array(
            'label'   => 'Ergotherapeut / Ergotherapeutin (m/w/d)',
            'subject' => 'Neue Bewerbung: Ergotherapeut / Ergotherapeutin (m/w/d)',
            'path'    => '/ergotherapeut-ergotherapeutin/',
        ),
    );
}

// Hooks fuer alle Berufsfelder
foreach ( gmkb_get_berufe() as $key => $info ) {
    $action = 'gmkb_bewerbung_' . $key;
    $cb     = function() use ( $key ) { gmkb_handle_bewerbung( $key ); };
    add_action( "admin_post_nopriv_{$action}", $cb );
    add_action( "admin_post_{$action}",         $cb );
}

/**
 * Generischer Handler fuer alle Bewerbungen.
 * @param string $beruf_key Schluessel aus gmkb_get_berufe()
 */
function gmkb_handle_bewerbung( $beruf_key ) {
    $berufe = gmkb_get_berufe();
    $info   = isset( $berufe[ $beruf_key ] ) ? $berufe[ $beruf_key ] : $berufe['paediatrie'];
    gmkb_get_formular_path( $info['path'] ); // setzt Static fuer error-Redirect

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
        status_header( 405 );
        header( 'Allow: POST' );
        exit( 'Method Not Allowed' );
    }

    if ( session_status() === PHP_SESSION_NONE ) {
        session_start();
    }

    // ---- CSRF ----
    $token_post    = isset( $_POST['csrf_token'] ) ? (string) $_POST['csrf_token'] : '';
    $token_session = $_SESSION['csrf_token'] ?? '';
    if ( ! $token_post || ! $token_session || ! hash_equals( $token_session, $token_post ) ) {
        gmkb_handle_error( 'Ungueltige Anfrage. Bitte lade die Seite neu und versuche es erneut.' );
    }
    unset( $_SESSION['csrf_token'] );

    // ---- Honeypot ----
    if ( ! empty( $_POST['website'] ) ) {
        // Bot, leise redirecten
        gmkb_redirect_danke();
    }

    // ---- Rate-Limit ----
    if ( ! isset( $_SESSION['form_submissions'] ) ) {
        $_SESSION['form_submissions'] = array();
    }
    $now = time();
    $_SESSION['form_submissions'] = array_values( array_filter(
        $_SESSION['form_submissions'],
        static function ( $ts ) use ( $now ) {
            return ( $now - (int) $ts ) < GMKB_RATE_LIMIT_WINDOW;
        }
    ) );
    if ( count( $_SESSION['form_submissions'] ) >= GMKB_RATE_LIMIT_COUNT ) {
        gmkb_handle_error( 'Du hast zu viele Bewerbungen in kurzer Zeit gesendet. Bitte versuche es spaeter erneut.' );
    }

    // ---- Felder ----
    $vorname   = gmkb_sanitize_line( $_POST['vorname'] ?? '' );
    $nachname  = gmkb_sanitize_line( $_POST['nachname'] ?? '' );
    $email     = sanitize_email( $_POST['email'] ?? '' );
    $telefon   = gmkb_sanitize_line( $_POST['telefon'] ?? '' );
    $standort  = gmkb_sanitize_line( $_POST['standort'] ?? '' );
    $nachricht = gmkb_sanitize_textarea( $_POST['nachricht'] ?? '' );

    $errors = array();
    if ( $vorname === '' )                                         { $errors[] = 'Vorname ist ein Pflichtfeld.'; }
    if ( $nachname === '' )                                        { $errors[] = 'Nachname ist ein Pflichtfeld.'; }
    if ( ! $email || ! is_email( $email ) )                        { $errors[] = 'Bitte gib eine gueltige E-Mail-Adresse ein.'; }
    if ( $telefon === '' )                                         { $errors[] = 'Telefonnummer ist ein Pflichtfeld.'; }
    if ( empty( $_POST['datenschutz'] ) )                          { $errors[] = 'Bitte stimme der Datenschutzerklaerung zu.'; }

    if ( $errors ) {
        gmkb_handle_error( implode( ' ', $errors ) );
    }

    // ---- Datei-Uploads ----
    list( $attachments, $upload_errors ) = gmkb_process_uploads( 'bewerbung_datei' );
    if ( $upload_errors ) {
        gmkb_handle_error( implode( ' ', $upload_errors ) );
    }

    // ---- E-Mail-Body ----
    $body    = gmkb_build_email_body( compact( 'vorname','nachname','email','telefon','standort','nachricht' ), $info['label'] );
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'Reply-To: ' . sprintf( '%s %s <%s>', $vorname, $nachname, $email ),
    );

    // Empfaenger + Subject ueber Filter ueberschreibbar (z.B. waehrend Test-Phase auf eigene Adresse umleiten).
    $to_default = sprintf( '%s <%s>', GMKB_RECIPIENT_NAME, GMKB_RECIPIENT_EMAIL );
    $to         = apply_filters( 'gmkb_bewerbung_recipient', $to_default, $beruf_key );
    $subject    = apply_filters( 'gmkb_bewerbung_subject',   $info['subject'], $beruf_key );

    $sent = wp_mail( $to, $subject, $body, $headers, $attachments );

    // Tmp-Files sicherheitshalber loeschen (wp_mail liest sie vorher ein)
    foreach ( $attachments as $path ) {
        if ( is_file( $path ) && strpos( $path, sys_get_temp_dir() ) === 0 ) {
            @unlink( $path );
        }
    }

    if ( ! $sent ) {
        error_log( 'GMKB Bewerbung Paediatrie: wp_mail() failed for ' . $email );
        gmkb_handle_error( 'Es gab ein technisches Problem beim Senden. Bitte versuche es spaeter erneut oder schreibe direkt an ' . GMKB_RECIPIENT_EMAIL . '.' );
    }

    $_SESSION['form_submissions'][] = $now;
    gmkb_redirect_danke();
}
// === Helper: Error-Redirect ueber Beruf-Pfad ===
function gmkb_get_formular_path() {
    // Wird im Error-Pfad waehrend Handler-Run gesetzt
    static $path = null;
    if ( func_num_args() > 0 ) { $path = func_get_arg( 0 ); }
    return $path ?: '/facharzt-paediatrie/';
}

function gmkb_sanitize_line( $value ) {
    $value = wp_strip_all_tags( (string) $value );
    $value = str_replace( array( "\r", "\n" ), '', $value );
    return trim( $value );
}

function gmkb_sanitize_textarea( $value ) {
    return trim( wp_strip_all_tags( (string) $value ) );
}

function gmkb_process_uploads( $field ) {
    $errors      = array();
    $attachments = array();

    if ( empty( $_FILES[ $field ] ) || empty( $_FILES[ $field ]['name'] ) ) {
        return array( array(), array() ); // optional, kein Upload = OK
    }

    $files = $_FILES[ $field ];
    $count = is_array( $files['name'] ) ? count( $files['name'] ) : 1;

    // Wenn nicht-Array: in Array umwandeln fuer einheitliches Handling
    if ( ! is_array( $files['name'] ) ) {
        foreach ( array( 'name','type','tmp_name','error','size' ) as $k ) {
            $files[ $k ] = array( $files[ $k ] );
        }
        $count = 1;
    }

    if ( $count > GMKB_FILE_MAX_COUNT ) {
        $errors[] = sprintf( 'Maximal %d Dateien erlaubt.', GMKB_FILE_MAX_COUNT );
        return array( array(), $errors );
    }

    $allowed_mimes = array(
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'application/zip',
        'application/x-zip-compressed',
    );
    $allowed_exts = array( 'pdf','doc','docx','jpg','jpeg','png','zip' );

    $total_bytes = 0;
    for ( $i = 0; $i < $count; $i++ ) {
        $err   = (int)    $files['error'][ $i ];
        $name  = (string) $files['name'][ $i ];
        $tmp   = (string) $files['tmp_name'][ $i ];
        $size  = (int)    $files['size'][ $i ];

        if ( $err === UPLOAD_ERR_NO_FILE )  { continue; }
        if ( $err !== UPLOAD_ERR_OK )       { $errors[] = sprintf( 'Datei "%s": Upload-Fehler (Code %d).', $name, $err ); continue; }
        if ( ! is_uploaded_file( $tmp ) )   { $errors[] = sprintf( 'Datei "%s": ungueltige Quelle.', $name ); continue; }
        if ( $size <= 0 )                   { $errors[] = sprintf( 'Datei "%s": leer.', $name ); continue; }
        if ( $size > GMKB_FILE_MAX_BYTES )  { $errors[] = sprintf( 'Datei "%s" ist zu gross (max. 5 MB).', $name ); continue; }

        $ext = strtolower( pathinfo( $name, PATHINFO_EXTENSION ) );
        if ( ! in_array( $ext, $allowed_exts, true ) ) {
            $errors[] = sprintf( 'Datei "%s": Format nicht erlaubt.', $name );
            continue;
        }

        $finfo = finfo_open( FILEINFO_MIME_TYPE );
        $mime  = $finfo ? finfo_file( $finfo, $tmp ) : null;
        if ( $finfo ) { finfo_close( $finfo ); }
        if ( $mime && ! in_array( $mime, $allowed_mimes, true ) ) {
            $errors[] = sprintf( 'Datei "%s": Inhaltstyp nicht erlaubt (%s).', $name, $mime );
            continue;
        }

        $total_bytes += $size;
        if ( $total_bytes > GMKB_FILE_MAX_TOTAL_BYTES ) {
            $errors[] = 'Gesamtgroesse aller Dateien ueberschreitet 20 MB.';
            return array( array(), $errors );
        }

        // In sicheres Tmp-File mit Original-Endung kopieren (wp_mail attachments brauchen lesbaren Pfad)
        $safe_name = sanitize_file_name( $name );
        $dest      = sys_get_temp_dir() . '/gmkb-' . wp_generate_uuid4() . '-' . $safe_name;
        if ( ! @move_uploaded_file( $tmp, $dest ) ) {
            $errors[] = sprintf( 'Datei "%s": konnte nicht uebernommen werden.', $name );
            continue;
        }
        $attachments[] = $dest;
    }

    return array( $attachments, $errors );
}

function gmkb_build_email_body( $data, $stelle = 'Facharzt Paediatrie (m/w/d)' ) {
    $datum  = wp_date( 'd.m.Y, H:i' );
    $stelle = esc_html( $stelle );
    $vorname  = esc_html( $data['vorname'] );
    $nachname = esc_html( $data['nachname'] );
    $email    = esc_html( $data['email'] );
    $telefon  = esc_html( $data['telefon'] );
    $standort = esc_html( $data['standort'] ?: 'keine Angabe' );
    $nachricht_html = $data['nachricht'] !== ''
        ? nl2br( esc_html( $data['nachricht'] ) )
        : '<em>Keine Nachricht angegeben</em>';

    $email_attr = esc_attr( $data['email'] );
    $telefon_attr = esc_attr( $data['telefon'] );

    return <<<HTML
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0; padding:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1a1a1a; line-height:1.55;">
<div style="max-width:600px; margin:0 auto; padding:24px 20px;">

  <h1 style="margin:0 0 4px 0; font-size:18px; font-weight:600; color:#0D7377;">Neue Bewerbung</h1>
  <p style="margin:0 0 24px 0; color:#666; font-size:14px;">{$stelle}, GMKB Karriereportal</p>

  <div style="margin:0 0 14px 0;">
    <div style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:2px;">Name</div>
    <div style="font-size:15px;">{$vorname} {$nachname}</div>
  </div>

  <div style="margin:0 0 14px 0;">
    <div style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:2px;">E-Mail</div>
    <div style="font-size:15px;"><a href="mailto:{$email_attr}" style="color:#0D7377; text-decoration:none;">{$email}</a></div>
  </div>

  <div style="margin:0 0 14px 0;">
    <div style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:2px;">Telefon</div>
    <div style="font-size:15px;"><a href="tel:{$telefon_attr}" style="color:#0D7377; text-decoration:none;">{$telefon}</a></div>
  </div>

  <div style="margin:0 0 14px 0;">
    <div style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:2px;">Standort-Praeferenz</div>
    <div style="font-size:15px;">{$standort}</div>
  </div>

  <div style="margin:0 0 14px 0;">
    <div style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:2px;">Nachricht</div>
    <div style="font-size:15px;">{$nachricht_html}</div>
  </div>

  <p style="margin:24px 0 0 0; padding-top:14px; border-top:1px solid #eee; color:#888; font-size:12px;">
    Eingegangen am {$datum} Uhr &middot; Karriere-Landingpage &middot; <a href="mailto:{$email_attr}" style="color:#0D7377;">Direkt antworten</a>
  </p>

</div>
</body>
</html>
HTML;
}

function gmkb_handle_error( $message ) {
    $_SESSION['gmkb_form_error'] = $message;
    $_SESSION['gmkb_form_data']  = array(
        'vorname'   => isset( $_POST['vorname'] )   ? gmkb_sanitize_line( $_POST['vorname'] )    : '',
        'nachname'  => isset( $_POST['nachname'] )  ? gmkb_sanitize_line( $_POST['nachname'] )   : '',
        'email'     => isset( $_POST['email'] )     ? sanitize_email( $_POST['email'] )          : '',
        'telefon'   => isset( $_POST['telefon'] )   ? gmkb_sanitize_line( $_POST['telefon'] )    : '',
        'standort'  => isset( $_POST['standort'] )  ? gmkb_sanitize_line( $_POST['standort'] )   : '',
        'nachricht' => isset( $_POST['nachricht'] ) ? gmkb_sanitize_textarea( $_POST['nachricht'] ) : '',
    );
    wp_safe_redirect( home_url( gmkb_get_formular_path() ) . '#bewerbung' );
    exit;
}

function gmkb_redirect_danke() {
    wp_safe_redirect( home_url( GMKB_DANKE_PATH ) );
    exit;
}
