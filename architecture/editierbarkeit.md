# Editierbarkeit der Karriere-Landingpages

> **Wann lesen:** wenn Philipp das Thema "Editierbarkeit", "CMS", "Content im Backend pflegen" oder "GMKB will Texte selbst ändern" anspricht. Diese Datei enthält den vollständigen Plan, wie wir vom aktuellen statischen Theme zu einem editierbaren Content-System kommen, **ohne Plugin** (wegen unserer Zusage an die GMKB-IT).

## Status quo (Stand 5. Mai 2026)

Das Theme `gmkb-karriere` rendert die drei Landingpages (Pädiatrie, Logopädie, Ergotherapie) plus Danke-Seite aus festen Page-Template-Dateien. Die Inhalte stehen direkt als HTML in den Templates. Änderungen laufen über uns: Philipp sagt Bescheid, Anpassung lokal, FTP-Upload, live in ~30 Sekunden.

GMKB selbst kann derzeit keine Texte ändern. Frau Buchmüller, Willem oder die GMKB-IT haben keine UI dafür.

## Constraints aus dem Briefing

- **Keine Plugins.** Zusage an die GMKB-IT, schriftlich dokumentiert in der Antwort an die IT vom März 2026 ("Keine Plugins, keine Frameworks, keine externen Dependencies"). ACF Pro fällt damit raus, obwohl es das Naheliegende wäre.
- **Keine externen Frameworks.** Vanilla-PHP plus WordPress-Core, höchstens jQuery (kommt mit WordPress mit).
- **Daten in Standard-WP-Strukturen.** Keine eigenen DB-Tabellen, alles über `wp_postmeta`, damit Theme bei Bedarf entfernbar ist ohne Datenverlust.

Der Workaround: alles, was ACF Pro liefert, im Theme selbst ausschreiben. WordPress hat dafür native APIs (`add_meta_box()`, `register_post_meta()`, `update_post_meta()`, `wp.media` für Bild-Upload, `jQuery UI Sortable` für Drag & Drop). Aufwand höher als mit ACF Pro, aber Plugin-frei.

## Drei Stufen, sortiert nach Aufwand

### Stufe 1 – Texte editierbar (4 bis 6 Stunden)

Pro Section eine Custom Meta Box im Page-Editor mit festen Feldern. Komponenten-Layout und Reihenfolge bleiben fix.

Editierbar:
- Texte (Hero-Title, Subline, Buttons, Section-Headings, Body-Texte, CTAs)
- Bilder (über WP-Media-Library)
- Links und Anker
- Footer-Texte, Telefon, E-Mail

Fix bleibt:
- Anzahl der Benefits (sechs Cards)
- Anzahl der FAQ-Items
- Anzahl der Aufgaben-Listenpunkte
- Reihenfolge der Komponenten

Use-Case: GMKB ändert "30 Tage Urlaub" zu "31 Tage", formuliert den Hero-Hook neu, tauscht ein Bild aus.

### Stufe 2 – Texte plus Repeater wo sinnvoll (ein bis zwei Tage) – **Empfehlung**

Wie Stufe 1, plus Repeater-Felder dort, wo sich die Anzahl realistisch ändert:

- FAQ-Items als Repeater (beliebig viele Fragen hinzufügen, löschen, sortieren)
- Benefits als Repeater (vier, sechs, acht Cards möglich)
- Aufgaben-Listenpunkte als Repeater
- Standorte als Repeater (falls neue Praxen dazukommen)
- Process-Steps als Repeater (drei, vier, fünf Schritte)

Komponenten-Reihenfolge weiterhin fix. Wenn die geändert werden soll, machen wir das in fünf Minuten.

Use-Case: GMKB ergänzt eine FAQ, fügt einen siebten Standort hinzu, baut eine Bewerbungs-Spezial-FAQ ein, ohne uns zu fragen.

**Warum Empfehlung:** Verhältnis Aufwand zu Mehrwert am besten. Texte und Listen sind genau das, was sich realistisch ändert. Komponenten-Reihenfolge ändert sich selten und ist Architektur-Entscheidung, nicht Tagesgeschäft.

### Stufe 3 – Volle Komponenten-Builder im Sanity-Stil (drei bis vier Tage)

Komplette Flexibilität, alle 12 Komponenten als austauschbare Bausteine im Editor:

- Hero-Variante, Benefits-Block, Aufgaben-Block, Testimonial, Process, Form, Feature, Video-Block, CTA-Banner, Standorte, FAQ
- Im Page-Editor: Komponente hinzufügen, entfernen, sortieren via Drag & Drop
- Pro Komponente eigene Felder, alle aus Stufe 2 plus mehr
- Optional: Live-Preview in Side-Panel
- Custom-JS für die Editor-UX (PHP+JS, ohne Framework)

Use-Case: GMKB launcht eine Pflegekraft-Stelle vollständig autonom. Wählt sieben von 12 Komponenten, befüllt sie, fertig. Kein Coding nötig.

## Vergleich mit ACF Pro

Falls die Plugin-Zusage neu verhandelt würde:

| | Custom Theme (Stufe 2) | ACF Pro |
|---|---|---|
| Plugin-Zusage gewahrt | ja | nein |
| Aufwand initial | 1–2 Tage | 1–2 Tage |
| Aufwand Stufe 3 | 3–4 Tage | 1 Tag mehr |
| Lizenzkosten | nur Entwicklung | ~250 € Lifetime oder 50 €/Jahr |
| UX im wp-admin | wie wir's bauen | sofort polished |
| Wartung | unser Code, klar versioniert | Plugin-Updates extern |
| Daten-Portabilität | volle DB-Standardstruktur | gleiche Struktur |

ACF Pro ist nicht "besser", nur schneller fertig. Custom-Code im Theme erfüllt die Plugin-Zusage und liefert dasselbe Ergebnis.

## Technischer Plan für Stufe 2 (Empfehlung)

### Neue Theme-Dateien

```
/wp-content/themes/gmkb-karriere/
  inc/
    cms-fields.php         <- Meta-Box-Definitionen pro Section
    cms-repeater.php       <- Generische Repeater-Logik (PHP)
    cms-save.php           <- save_post-Hook, sanitize, store
    cms-render.php         <- Helper-Funktionen für Page Templates
  assets/
    js/
      cms-editor.js        <- jQuery UI Sortable, Add/Remove Row, wp.media
    css/
      cms-editor.css       <- Editor-Styling im wp-admin (nicht Frontend)
```

### Speicher-Strategie

Pro Page (id=14 Pädiatrie, id=16 Logo, id=17 Ergo) werden Meta-Felder gespeichert:

- Skalare Felder: `hero_title`, `hero_subtitle`, `hero_image_id`, ...
- Repeater-Felder als JSON-Array in einem einzelnen Meta-Key: `faq_items`, `benefits_items`, `standorte_items`, ...
- Komponenten-spezifische Felder gruppiert: `process_step_1_title`, `process_step_1_text`, ... (oder process als Repeater wenn variable Anzahl)

JSON für Repeater hat den Vorteil, dass Reihenfolge und Schema in einem einzigen DB-Eintrag stecken, einfach zu deserialisieren. Reine WordPress-Standard-Patterns ohne ACF-Magie.

### Migration der Bestandsinhalte

Skript `scripts/cms-migrate.py` (ein Einzel-Run):

1. Bestehende Page-Template-PHPs parsen und Inhalte extrahieren
2. Pro Page die Meta-Felder via WP REST API setzen
3. Verifizieren

Damit niemand neu tippen muss. Visuelles Ergebnis bleibt identisch.

### Page Templates ändern

Die aktuellen `page-karriere-paediatrie.php`, `-logopaedie.php`, `-ergotherapie.php` werden umgebaut:

```php
// vorher (statisch):
<h1 class="hero-v2__title">Facharzt Pädiatrie gesucht</h1>

// nachher (editierbar):
<h1 class="hero-v2__title"><?php echo esc_html( get_post_meta( $post->ID, 'hero_title', true ) ); ?></h1>
```

Für Repeater:

```php
$faqs = json_decode( get_post_meta( $post->ID, 'faq_items', true ) ?: '[]', true );
foreach ( $faqs as $faq ) {
    echo '<details><summary>' . esc_html( $faq['question'] ) . '</summary>';
    echo '<p>' . esc_html( $faq['answer'] ) . '</p></details>';
}
```

### Editor-UX im wp-admin

Für jede Section eine eigene Meta-Box (collapsible). Repeater-Felder mit "Add Row" / "Remove Row" / Drag-Handles. Alles plain PHP-Output mit ein bisschen jQuery für Interaktivität. Bilder über die WordPress-Media-Library (nativ).

Beispiel-Look im Editor (textuell):

```
┌─ Hero-Section ─────────────────────────────────────┐
│ Eyebrow:     [Stellenangebot Kinderarzt – GMKB...] │
│ Headline:    [Facharzt / Fachärztin Pädiatrie...]  │
│ Hook-Text:   [Du bist Kinderarzt und suchst ein...] │
│ Hero-Bild:   [Datei wählen] (aktuell: hero-1440w)  │
│ CTA-Text:    [Bewirb Dich jetzt in 60 Sekunden]    │
└────────────────────────────────────────────────────┘

┌─ FAQ ──────────────────────────────────────────────┐
│ ⋮⋮ FAQ 1                                  [Löschen]│
│   Frage:    [Welche Qualifikation muss ich...]     │
│   Antwort:  [Du benötigst einen abgeschlossenen...] │
│ ⋮⋮ FAQ 2                                  [Löschen]│
│   Frage:    [Wie läuft der Bewerbungsprozess?]     │
│   Antwort:  [Nach deiner Bewerbung melden wir...]   │
│                                       [+ FAQ hinzu]│
└────────────────────────────────────────────────────┘
```

Drag-Handle (⋮⋮) zum Sortieren via jQuery UI Sortable. "Löschen" entfernt einen Eintrag, "FAQ hinzu" fügt eine leere Zeile am Ende an.

## Was Philipp dem User in einer neuen Session sagen sollte

Wenn Philipp sagt "wir müssen das jetzt mit der Editierbarkeit machen":

1. Diese Datei lesen und kurz wiedergeben (drei Stufen, Empfehlung Stufe 2)
2. Fragen, welche Stufe gewünscht ist
3. Bei Stufe 2: ein bis zwei Tage einplanen, vorher noch klären:
   - Welche Sections wirklich Repeater brauchen (ggf. weniger als oben aufgelistet)
   - Ob Frau Buchmüller einen WP-User braucht oder über Willem läuft
   - Test-Run: erst auf Pädiatrie umsetzen, dann Logo + Ergo nach gleicher Vorlage
4. Migration der Bestandsinhalte ist Pflicht-Schritt, nicht optional, sonst gehen Texte verloren

## Was passiert nicht

- Wir bauen kein eigenes Block-Theme mit Gutenberg-Custom-Blocks. Block-Theme-Setup ist komplexer (React, wp-scripts, build-pipeline) und kein Mehrwert für drei Landingpages
- Wir bauen kein Headless-CMS-Setup (Sanity/Strapi + WP-Frontend). Overkill, neue Infrastruktur
- Wir nutzen kein Customizer/Theme-Options-API für Inhalte. Customizer ist für Theme-Settings, nicht für Page-Content
