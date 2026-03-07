# WordPress-Integration – GMKB Recruiting-Landingpages

## Uebersicht

Die Landingpages werden als statische HTML/CSS/JS-Dateien entwickelt und in das bestehende WordPress (medizinundtherapie.de) integriert. Die Integration nutzt **Custom Page Templates** und das **Code Snippets Plugin** fuer conditional Loading.

## Voraussetzungen

- WordPress Admin-Zugang
- Code Snippets Plugin (oder Alternative wie WPCode)
- FTP/SFTP-Zugang oder File Manager
- Borlabs Cookie (bereits installiert)

## Schritt-fuer-Schritt Anleitung

### 1. Dateien auf den Server hochladen

Folgende Dateien muessen auf den Server:

```
/wp-content/themes/[theme-name]/
  page-karriere-paediatrie.php    <- Custom Page Template
  page-karriere-therapeuten.php   <- Custom Page Template (spaeter)
  page-danke-bewerbung.php        <- Custom Page Template

/wp-content/themes/[theme-name]/assets/karriere/
  css/
    base.css
    paediatrie.css
    therapeuten.css               <- spaeter
    danke.css
  js/
    paediatrie.js
    therapeuten.js                <- spaeter
  fonts/
    inter-latin.woff2
  images/
    hero-480w.webp, hero-960w.webp, hero-1440w.webp
    hero-480w.jpg, hero-960w.jpg, hero-1440w.jpg
    feature-480w.webp, ...
    video-thumb-480w.webp, ...
    testimonial-480w.webp, ...
  php/
    form-handler-paediatrie.php
    form-handler-therapeuten.php  <- spaeter
```

### 2. Custom Page Templates erstellen

**page-karriere-paediatrie.php:**
```php
<?php
/**
 * Template Name: Karriere – Facharzt Paediatrie
 */

// Kein WordPress-Header/Footer (isolierte Landingpage)
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <!-- Kompletten <head> aus index.html hierhin kopieren -->
  <!-- Pfade anpassen: ../../assets/ wird zu -->
  <!-- <?php echo get_template_directory_uri(); ?>/assets/karriere/ -->

  <?php
  // CSRF Token generieren
  if (session_status() === PHP_SESSION_NONE) session_start();
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  ?>
</head>
<body>
  <!-- Kompletten <body> aus index.html hierhin kopieren -->
  <!-- Im Formular: -->
  <!-- <input type="hidden" name="csrf_token" value="<?php echo esc_attr($_SESSION['csrf_token']); ?>"> -->
  <!-- Den dev-token-placeholder Zeile entfernen -->

  <?php wp_footer(); // Fuer Borlabs Cookie und andere Plugins ?>
</body>
</html>
```

### 3. Seiten in WordPress anlegen

1. **Seiten > Neue Seite erstellen**
   - Titel: "Facharzt Pädiatrie"
   - Permalink: `/karriere/paediatrie/`
   - Template: "Karriere – Facharzt Paediatrie"
   - Inhalt: leer lassen (Template bringt alles mit)

2. **Danke-Seite erstellen**
   - Titel: "Danke Bewerbung"
   - Permalink: `/danke-bewerbung/`
   - Template: "Karriere – Danke Bewerbung"

### 4. CSS einbinden (Code Snippets Plugin)

Neues Snippet erstellen: **"Karriere LP – CSS"**
- Typ: PHP
- Ausfuehrung: Nur Frontend
- Ort: Ueberall ausfuehren

```php
add_action('wp_enqueue_scripts', function() {
    // Nur auf Karriere-Landingpages laden
    if (is_page_template('page-karriere-paediatrie.php')
        || is_page_template('page-karriere-therapeuten.php')
        || is_page_template('page-danke-bewerbung.php')) {

        $base = get_template_directory_uri() . '/assets/karriere/';

        // Base Styles (Design Tokens, Reset, Components)
        wp_enqueue_style('karriere-base', $base . 'css/base.css', [], '1.0');

        // Page-spezifische Styles
        if (is_page_template('page-karriere-paediatrie.php')) {
            wp_enqueue_style('karriere-paediatrie', $base . 'css/paediatrie.css', ['karriere-base'], '1.0');
        }
        if (is_page_template('page-danke-bewerbung.php')) {
            wp_enqueue_style('karriere-danke', $base . 'css/danke.css', ['karriere-base'], '1.0');
        }
    }
});
```

### 5. JavaScript einbinden (Code Snippets Plugin)

Neues Snippet: **"Karriere LP – JS"**

```php
add_action('wp_enqueue_scripts', function() {
    if (is_page_template('page-karriere-paediatrie.php')) {
        $base = get_template_directory_uri() . '/assets/karriere/';
        wp_enqueue_script('karriere-paediatrie', $base . 'js/paediatrie.js', [], '1.0', true);
    }
});
```

### 6. Form Handler integrieren

**Option A: Separates PHP-Script (empfohlen)**

1. `form-handler-paediatrie.php` nach `/assets/karriere/php/` hochladen
2. Im Template den Form-Action Pfad anpassen:
   ```html
   <form action="<?php echo get_template_directory_uri(); ?>/assets/karriere/php/form-handler-paediatrie.php" method="POST">
   ```
3. In `form-handler.php` die Konfiguration anpassen:
   ```php
   $config['is_dev'] = false;
   $config['danke_url'] = '/danke-bewerbung/';
   $config['recipient_email'] = 'ECHTE-EMAIL@medizinundtherapie.de';
   ```

**Option B: Ueber functions.php / Code Snippets**

```php
add_action('admin_post_nopriv_karriere_bewerbung', 'handle_karriere_bewerbung');
add_action('admin_post_karriere_bewerbung', 'handle_karriere_bewerbung');

function handle_karriere_bewerbung() {
    // form-handler.php Logik hier einbinden
    require_once get_template_directory() . '/assets/karriere/php/form-handler-paediatrie.php';
}
```
Bei Option B den Form-Action anpassen auf:
```html
<form action="<?php echo admin_url('admin-post.php'); ?>" method="POST">
  <input type="hidden" name="action" value="karriere_bewerbung">
```

### 7. URL-Struktur konfigurieren

1. **Einstellungen > Permalinks** pruefen: "Beitragsname" muss aktiv sein
2. Seiten anlegen mit korrekten Permalinks:
   - `/karriere/paediatrie/` (ggf. erst Elternseite "Karriere" anlegen)
   - `/danke-bewerbung/`
3. Falls URL nicht passt: Seite "Karriere" als Elternseite setzen

### 8. GTM Container aktivieren

1. In den Page Templates die GTM-Kommentare entfernen (`<!-- -->`)
2. `GTM-XXXXXXX` durch echte Container-ID ersetzen
3. Beide Stellen aktualisieren (head + noscript nach body)

### 9. Borlabs Cookie konfigurieren

1. Sicherstellen dass Borlabs Cookie auf den Karriere-URLs aktiv ist
2. Google Consent Mode v2 in Borlabs aktivieren
3. Pruefen dass Borlabs nach Einwilligung `consent update` pushed:
   ```javascript
   window.dataLayer.push('consent', 'update', {
     'ad_storage': 'granted',
     'analytics_storage': 'granted'
   });
   ```

### 10. Sitemap und Robots

- Die Karriere-Landingpages sollen in der XML-Sitemap erscheinen
- `meta robots: index, follow` ist bereits gesetzt
- Danke-Seite hat `noindex, nofollow` (korrekt)
- In Yoast/RankMath pruefen: Seite nicht versehentlich auf "noindex"

### 11. E-Mail-Versand testen

1. Form Handler Konfiguration pruefen (`$config['is_dev'] = false`)
2. Empfaenger-E-Mail eintragen
3. Testbewerbung absenden
4. Pruefen:
   - E-Mail kommt an
   - Formatierung korrekt (HTML-E-Mail)
   - Reply-To auf Bewerber-Adresse gesetzt
   - Redirect auf Danke-Seite funktioniert
5. Falls E-Mail nicht ankommt: SMTP-Plugin installieren (z.B. WP Mail SMTP)

## Checkliste vor Go-Live

- [ ] Page Templates hochgeladen
- [ ] Assets hochgeladen (CSS, JS, Fonts, Images, PHP)
- [ ] Seiten in WordPress angelegt mit korrekten URLs
- [ ] CSS/JS Snippets aktiv und funktional
- [ ] Formular-Submit funktioniert (E-Mail kommt an)
- [ ] Redirect auf Danke-Seite nach Submit
- [ ] GTM Container ID eingesetzt und aktiv
- [ ] Borlabs Cookie auf Karriere-URLs aktiv
- [ ] Conversion-Tracking getestet (GTM Preview Mode)
- [ ] Seiten in XML-Sitemap
- [ ] Mobile Test (375px, 768px)
- [ ] Desktop Test (1440px)
- [ ] Ladezeit < 2,5s
- [ ] DSGVO: Fonts self-hosted, Consent vor Tracking
