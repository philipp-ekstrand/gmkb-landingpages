<?php
/**
 * Minimaler Header.
 * Wird nur von index.php, page.php und 404.php genutzt – die Karriere-Page-Templates
 * (page-karriere-paediatrie.php, page-danke-bewerbung.php) haben ihre eigene HTML-Struktur
 * und nutzen wp_head() / wp_footer() direkt.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<main style="max-width: 800px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1a1a1a;">
