<?php
/**
 * GMKB Recruiting Landingpage – Formular-Handler (Paediatrie)
 *
 * POST-Handler fuer das Bewerbungsformular.
 * - Server-side Validierung
 * - CSRF-Token Pruefung
 * - Honeypot Anti-Spam
 * - Session-basiertes Rate-Limiting
 * - Formatierter E-Mail-Versand
 * - Redirect auf Danke-Seite
 */

// ============================================================
// KONFIGURATION
// ============================================================

// E-Mail-Empfaenger (muss vom Kunden bestaetigt werden)
$config = [
    'recipient_email' => 'bewerbung@medizinundtherapie.de', // TODO: Vom Kunden bestaetigen lassen
    'recipient_name'  => 'GMKB Bewerbungen',
    'from_email'      => 'noreply@medizinundtherapie.de',
    'from_name'       => 'GMKB Karriereportal',
    'subject'         => 'Neue Bewerbung: Logopäde (m/w/d)',
    'danke_url'       => '/karriere/danke-bewerbung/', // WordPress-URL nach Integration
    'danke_url_dev'   => '../danke/index.html',        // Lokale Entwicklung
    'rate_limit'      => 3,       // Max Submissions pro Session
    'rate_window'     => 3600,    // Zeitfenster in Sekunden (1 Stunde)
    'is_dev'          => true,    // Auf false setzen in Produktion
];

// ============================================================
// SESSION STARTEN
// ============================================================

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ============================================================
// NUR POST-REQUESTS ERLAUBEN
// ============================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method Not Allowed');
}

// ============================================================
// CSRF-TOKEN PRUEFEN
// ============================================================

if (empty($_POST['csrf_token']) || empty($_SESSION['csrf_token'])) {
    handle_error('Ungueltige Anfrage. Bitte lade die Seite neu und versuche es erneut.');
}

if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    handle_error('Ungueltige Anfrage. Bitte lade die Seite neu und versuche es erneut.');
}

// Token nach Verwendung invalidieren (One-Time Use)
unset($_SESSION['csrf_token']);

// ============================================================
// HONEYPOT PRUEFEN
// ============================================================

if (!empty($_POST['website'])) {
    // Bot detected – leise redirecten als waere alles OK
    redirect_to_danke($config);
    exit;
}

// ============================================================
// RATE-LIMITING
// ============================================================

if (!isset($_SESSION['form_submissions'])) {
    $_SESSION['form_submissions'] = [];
}

// Alte Eintraege bereinigen
$now = time();
$_SESSION['form_submissions'] = array_filter(
    $_SESSION['form_submissions'],
    function ($timestamp) use ($now, $config) {
        return ($now - $timestamp) < $config['rate_window'];
    }
);

if (count($_SESSION['form_submissions']) >= $config['rate_limit']) {
    handle_error('Du hast zu viele Bewerbungen in kurzer Zeit gesendet. Bitte versuche es spaeter erneut.');
}

// ============================================================
// EINGABEN BEREINIGEN UND VALIDIEREN
// ============================================================

$vorname   = sanitize_input($_POST['vorname'] ?? '');
$nachname  = sanitize_input($_POST['nachname'] ?? '');
$email     = sanitize_email($_POST['email'] ?? '');
$telefon   = sanitize_input($_POST['telefon'] ?? '');
$nachricht = sanitize_textarea($_POST['nachricht'] ?? '');

$errors = [];

if (empty($vorname)) {
    $errors[] = 'Vorname ist ein Pflichtfeld.';
}

if (empty($nachname)) {
    $errors[] = 'Nachname ist ein Pflichtfeld.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Bitte gib eine gueltige E-Mail-Adresse ein.';
}

if (empty($telefon)) {
    $errors[] = 'Telefonnummer ist ein Pflichtfeld.';
}

if (empty($_POST['datenschutz'])) {
    $errors[] = 'Bitte stimme der Datenschutzerklaerung zu.';
}

if (!empty($errors)) {
    handle_error(implode(' ', $errors));
}

// ============================================================
// E-MAIL ZUSAMMENBAUEN UND SENDEN
// ============================================================

$email_body = build_email_body($vorname, $nachname, $email, $telefon, $nachricht);

$headers = [
    'From'         => "{$config['from_name']} <{$config['from_email']}>",
    'Reply-To'     => "{$vorname} {$nachname} <{$email}>",
    'Content-Type' => 'text/html; charset=UTF-8',
    'X-Mailer'     => 'GMKB-Karriere-Formular/1.0',
    'MIME-Version' => '1.0',
];

$header_string = '';
foreach ($headers as $key => $value) {
    $header_string .= "{$key}: {$value}\r\n";
}

$mail_sent = @mail(
    "{$config['recipient_name']} <{$config['recipient_email']}>",
    $config['subject'],
    $email_body,
    $header_string
);

if (!$mail_sent) {
    // Fallback: Fehler loggen
    error_log("GMKB Form-Handler: E-Mail konnte nicht gesendet werden. Bewerber: {$email}");

    if ($config['is_dev']) {
        // Im Dev-Mode trotzdem redirecten (kein Mailserver vorhanden)
        $_SESSION['form_submissions'][] = time();
        redirect_to_danke($config);
        exit;
    }

    handle_error('Es gab ein technisches Problem. Bitte versuche es spaeter erneut oder sende eine E-Mail an bewerbung@medizinundtherapie.de.');
}

// Submission zaehlen
$_SESSION['form_submissions'][] = time();

// ============================================================
// ERFOLG – REDIRECT ZUR DANKE-SEITE
// ============================================================

redirect_to_danke($config);
exit;


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Input bereinigen (einzeilig)
 */
function sanitize_input(string $value): string
{
    $value = trim($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    // Newlines entfernen (Header-Injection Prevention)
    $value = str_replace(["\r", "\n"], '', $value);
    return $value;
}

/**
 * E-Mail bereinigen
 */
function sanitize_email(string $value): string
{
    $value = trim($value);
    $value = filter_var($value, FILTER_SANITIZE_EMAIL);
    return $value;
}

/**
 * Textarea bereinigen (mehrzeilig erlaubt)
 */
function sanitize_textarea(string $value): string
{
    $value = trim($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    return $value;
}

/**
 * Formatierte HTML-E-Mail erstellen
 */
function build_email_body(string $vorname, string $nachname, string $email, string $telefon, string $nachricht): string
{
    $datum = date('d.m.Y, H:i');
    $nachricht_html = !empty($nachricht) ? nl2br($nachricht) : '<em>Keine Nachricht angegeben</em>';

    return <<<HTML
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4; padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background:#0D7377; padding:24px 32px;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">
        Neue Bewerbung eingegangen
      </h1>
      <p style="margin:8px 0 0; color:rgba(255,255,255,0.85); font-size:14px;">
        Logopäde (m/w/d) &ndash; GMKB Karriereportal
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0; border-bottom:1px solid #eee;">
            <strong style="color:#555; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Name</strong><br>
            <span style="font-size:16px; color:#1a1a1a;">{$vorname} {$nachname}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0; border-bottom:1px solid #eee;">
            <strong style="color:#555; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">E-Mail</strong><br>
            <a href="mailto:{$email}" style="font-size:16px; color:#0D7377; text-decoration:none;">{$email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0; border-bottom:1px solid #eee;">
            <strong style="color:#555; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Telefon</strong><br>
            <a href="tel:{$telefon}" style="font-size:16px; color:#0D7377; text-decoration:none;">{$telefon}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;">
            <strong style="color:#555; font-size:13px; text-transform:uppercase; letter-spacing:0.5px;">Nachricht</strong><br>
            <p style="font-size:15px; color:#1a1a1a; line-height:1.6; margin:8px 0 0;">{$nachricht_html}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f8f8f8; padding:16px 32px; border-top:1px solid #eee;">
      <p style="margin:0; font-size:12px; color:#888;">
        Eingegangen am {$datum} Uhr &bull;
        Quelle: Karriere-Landingpage Logopädie &bull;
        <a href="mailto:{$email}" style="color:#0D7377;">Direkt antworten</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>
HTML;
}

/**
 * Fehlerbehandlung – zurueck zum Formular mit Fehlermeldung
 */
function handle_error(string $message): void
{
    $_SESSION['form_error'] = $message;
    $_SESSION['form_data'] = [
        'vorname'   => $_POST['vorname'] ?? '',
        'nachname'  => $_POST['nachname'] ?? '',
        'email'     => $_POST['email'] ?? '',
        'telefon'   => $_POST['telefon'] ?? '',
        'nachricht' => $_POST['nachricht'] ?? '',
    ];

    header('Location: index.html#bewerbung');
    exit;
}

/**
 * Redirect zur Danke-Seite
 */
function redirect_to_danke(array $config): void
{
    $url = $config['is_dev'] ? $config['danke_url_dev'] : $config['danke_url'];
    header("Location: {$url}");
    exit;
}
