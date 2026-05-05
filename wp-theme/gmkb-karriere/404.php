<?php
/**
 * 404-Fallback.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

status_header( 404 );
get_header();
?>
<h1>Seite nicht gefunden</h1>
<p>Die angeforderte Seite existiert nicht. Bitte besuche die <a href="<?php echo esc_url( home_url( '/' ) ); ?>">Startseite</a>.</p>
<?php
get_footer();
