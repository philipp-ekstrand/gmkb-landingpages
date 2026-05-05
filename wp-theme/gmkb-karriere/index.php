<?php
/**
 * Index-Fallback fuer Posts/Archive.
 * Auf der Karriere-Subdomain gibt es bewusst keinen Blog – diese Datei rendert nur,
 * falls jemand /?p=... oder eine Archiv-URL aufruft.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

get_header();
?>
<h1>Karriere medizinundtherapie.de</h1>
<p>Diese Domain bietet die offenen Stellen der Gemeinnuetzigen Medizinzentren Koeln/Bonn (GMKB). Bitte besuche die <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Startseite</a> oder kontaktiere uns direkt.</p>
<?php
get_footer();
