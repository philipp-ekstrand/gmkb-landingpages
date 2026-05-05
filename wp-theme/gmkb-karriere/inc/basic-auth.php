<?php
/**
 * Basic Auth Gate fuer die Test-Phase (vor DSE-Freigabe).
 *
 * Schuetzt das Frontend ausserhalb von wp-admin / wp-login / wp-cron / REST / AJAX / admin-post.
 * Eingeloggte Admins sind ueber WP-Cookie automatisch durchgelassen.
 *
 * Konfiguration via Konstanten (in wp-config.php oder via define() in dieser Datei).
 * Default-Werte werden hier gesetzt, koennen aber von wp-config ueberschrieben werden.
 *
 * Entfernen nach DSE-Freigabe + Live-Schaltung:
 *   - require_once-Zeile in functions.php auskommentieren oder
 *   - GMKB_BASIC_AUTH_ENABLED auf false setzen
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

// Reihenfolge wichtig: zuerst Secret laden (definiert GMKB_BASIC_AUTH_USER + ...PASSWORD_HASH),
// danach Defaults nur fuer noch nicht gesetzte Konstanten.
$gmkb_secret_file = __DIR__ . '/basic-auth-secret.php';
if ( file_exists( $gmkb_secret_file ) ) {
    require_once $gmkb_secret_file;
}

if ( ! defined( 'GMKB_BASIC_AUTH_ENABLED' ) )       { define( 'GMKB_BASIC_AUTH_ENABLED', true ); }
if ( ! defined( 'GMKB_BASIC_AUTH_USER' ) )          { define( 'GMKB_BASIC_AUTH_USER', 'gmkb-review' ); }
if ( ! defined( 'GMKB_BASIC_AUTH_PASSWORD_HASH' ) ) { define( 'GMKB_BASIC_AUTH_PASSWORD_HASH', '__not_configured__' ); }
if ( ! defined( 'GMKB_BASIC_AUTH_REALM' ) )         { define( 'GMKB_BASIC_AUTH_REALM', 'GMKB Karriere Test-Phase' ); }

add_action( 'init', 'gmkb_basic_auth_gate', 1 );

function gmkb_basic_auth_gate() {
    if ( ! GMKB_BASIC_AUTH_ENABLED ) {
        return;
    }

    // Logged-in user mit edit-Rechten? Durchlassen.
    if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) {
        return;
    }

    // wp-admin, AJAX, Cron, REST, admin-post — ohne Auth durchlassen
    if ( is_admin() ) {
        return;
    }
    if ( defined( 'DOING_AJAX' )  && DOING_AJAX )  { return; }
    if ( defined( 'DOING_CRON' )  && DOING_CRON )  { return; }
    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) { return; }

    $uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
    $skip_paths = array(
        '/wp-admin', '/wp-login.php', '/wp-cron.php', '/wp-json',
        '/xmlrpc.php',
    );
    foreach ( $skip_paths as $skip ) {
        if ( strpos( $uri, $skip ) === 0 ) {
            return;
        }
    }
    // /?rest_route=... ebenfalls durchlassen
    if ( ! empty( $_GET['rest_route'] ) ) {
        return;
    }

    // Authorization-Header pruefen.
    // Bei FastCGI/PHP-FPM ist PHP_AUTH_USER/PW oft nicht gesetzt – der Header steht in
    // HTTP_AUTHORIZATION oder REDIRECT_HTTP_AUTHORIZATION (RewriteRule [E=HTTP_AUTHORIZATION:...]).
    $user = isset( $_SERVER['PHP_AUTH_USER'] ) ? $_SERVER['PHP_AUTH_USER'] : '';
    $pass = isset( $_SERVER['PHP_AUTH_PW'] )   ? $_SERVER['PHP_AUTH_PW']   : '';

    if ( $user === '' && $pass === '' ) {
        $raw = '';
        foreach ( array( 'HTTP_AUTHORIZATION', 'REDIRECT_HTTP_AUTHORIZATION', 'Authorization' ) as $hk ) {
            if ( ! empty( $_SERVER[ $hk ] ) ) { $raw = $_SERVER[ $hk ]; break; }
        }
        if ( $raw === '' && function_exists( 'apache_request_headers' ) ) {
            $hdrs = apache_request_headers();
            foreach ( $hdrs as $k => $v ) {
                if ( strcasecmp( $k, 'Authorization' ) === 0 ) { $raw = $v; break; }
            }
        }
        if ( stripos( $raw, 'Basic ' ) === 0 ) {
            $decoded = base64_decode( substr( $raw, 6 ), true );
            if ( is_string( $decoded ) && strpos( $decoded, ':' ) !== false ) {
                list( $user, $pass ) = explode( ':', $decoded, 2 );
            }
        }
    }

    if (
        $user !== '' && $pass !== '' &&
        hash_equals( GMKB_BASIC_AUTH_USER, $user ) &&
        password_verify( $pass, GMKB_BASIC_AUTH_PASSWORD_HASH )
    ) {
        return; // OK
    }

    nocache_headers();
    header( 'WWW-Authenticate: Basic realm="' . esc_attr( GMKB_BASIC_AUTH_REALM ) . '"' );
    status_header( 401 );
    echo '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Authentifizierung erforderlich</title></head><body style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 80px auto; padding: 0 20px; color: #1a1a1a;"><h1>Authentifizierung erforderlich</h1><p>Diese Seite befindet sich aktuell in der internen Test-Phase. Fuer den Zugriff sind Zugangsdaten erforderlich.</p></body></html>';
    exit;
}
