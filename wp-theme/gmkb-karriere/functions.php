<?php
/**
 * GMKB Karriere Theme – Functions
 *
 * Minimaler klassischer Theme-Loader. Aufgabe ausschliesslich:
 *   1) Conditional Asset-Loading fuer die Karriere-Page-Templates
 *   2) WordPress-Standard-Theme-Support fuer Title-Tag und Feed-Links
 *
 * Keine Widget-Areas, keine Customizer-Optionen, keine Menues.
 * Karriere-Landingpages sind isoliert ohne Header/Footer-Navigation.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Basic Auth Gate (Test-Phase, vor DSE-Freigabe)
 * Schuetzt Frontend ausser wp-admin/login/cron/REST/AJAX. Eingeloggte Admins gehen durch.
 */
require_once get_template_directory() . '/inc/basic-auth.php';

/**
 * Bewerbungs-Formular-Handler (admin-post.php)
 */
require_once get_template_directory() . '/inc/bewerbung-handler.php';

/**
 * Theme-Setup
 */
add_action( 'after_setup_theme', function () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'post-thumbnails' );
} );

/**
 * Asset-Loading – conditional pro Page Template
 *
 * Pfade ueber get_template_directory_uri(), damit auch ein evtl. spaeter angelegtes Child-Theme
 * keine Probleme macht (waere sonst stylesheet_directory_uri).
 */
add_action( 'wp_enqueue_scripts', function () {
    $base = get_template_directory_uri() . '/assets/';
    $ver  = '1.0.0';

    $is_landing = (
        is_page_template( 'page-karriere-paediatrie.php' )   ||
        is_page_template( 'page-karriere-logopaedie.php' )   ||
        is_page_template( 'page-karriere-ergotherapie.php' ) ||
        is_page_template( 'page-danke-bewerbung.php' )
    );

    // Pflicht-Reset und Components fuer alle Karriere-Pages
    if ( $is_landing ) {
        wp_enqueue_style( 'gmkb-base',       $base . 'css/base.css',       array(),              $ver );
        wp_enqueue_style( 'gmkb-components', $base . 'css/components.css', array( 'gmkb-base' ), $ver );

        // Cookie-Consent: vanilla-cookieconsent 3.1.0 (MIT, self-hosted) - in Footer laden, body muss existieren
        wp_enqueue_style(  'gmkb-cookieconsent',      $base . 'vendor/cookieconsent/cookieconsent.css', array(), '3.1.0' );
        wp_enqueue_script( 'gmkb-cookieconsent',      $base . 'vendor/cookieconsent/cookieconsent.umd.js', array(), '3.1.0', true );
        wp_enqueue_script( 'gmkb-cookieconsent-init', $base . 'js/cookie-consent-init.js', array( 'gmkb-cookieconsent' ), $ver, true );
    }

    // Paediatrie-spezifisch
    if ( is_page_template( 'page-karriere-paediatrie.php' ) ) {
        wp_enqueue_style(  'gmkb-paediatrie', $base . 'css/paediatrie.css', array( 'gmkb-components' ), $ver );
        wp_enqueue_script( 'gmkb-paediatrie', $base . 'js/paediatrie.js',   array(), $ver, true );
    }

    // Logopaedie
    if ( is_page_template( 'page-karriere-logopaedie.php' ) ) {
        wp_enqueue_style(  'gmkb-logopaedie', $base . 'css/logopaedie.css', array( 'gmkb-components' ), $ver );
        wp_enqueue_script( 'gmkb-logopaedie', $base . 'js/logopaedie.js',   array(), $ver, true );
    }

    // Ergotherapie
    if ( is_page_template( 'page-karriere-ergotherapie.php' ) ) {
        wp_enqueue_style(  'gmkb-ergotherapie', $base . 'css/ergotherapie.css', array( 'gmkb-components' ), $ver );
        wp_enqueue_script( 'gmkb-ergotherapie', $base . 'js/ergotherapie.js',   array(), $ver, true );
    }

    // Danke-Seite
    if ( is_page_template( 'page-danke-bewerbung.php' ) ) {
        wp_enqueue_style( 'gmkb-danke', $base . 'css/danke.css', array( 'gmkb-components' ), $ver );
    }
}, 20 );

/**
 * E-Mail-From-Name fuer ausgehende Bewerbungs-Mails
 *
 * WP Mail SMTP ist auf der Site aktiv – die Mails laufen sauber ueber den eingerichteten SMTP.
 * Hier nur From-Name und Reply-To beim Bewerbungs-Mail-Versand sicherstellen, falls form-handler
 * die Mail ueber wp_mail() schickt (statt eigenes mail()).
 */
add_filter( 'wp_mail_from_name', function ( $name ) {
    // Nur fuer ausgehende Mails vom Karriere-Formular nicht ueberschreiben,
    // damit andere Plugins den eigenen Namen behalten.
    return $name;
} );
