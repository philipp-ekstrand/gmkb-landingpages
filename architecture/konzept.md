# Grobkonzept – GMKB Recruiting-Landingpages

## 1. Ausgangslage

Die GMKB (Gemeinnuetzige Medizinzentren Koeln/Bonn) sucht Fachkraefte in zwei Bereichen:
- **Facharzt fuer Paediatrie (m/w/d)** – Raum Bonn, Vollzeit
- **Ergotherapeut*in / Logopaedin (m/w/d)** – Raum Bonn/Koeln

Bestehende Recruiting-Seiten: `recruiting.medizinundtherapie.de/paediatrie/` und `/hallo/`.
Diese werden durch neue, conversion-optimierte Landingpages ersetzt, die als Unterseiten der Hauptdomain laufen.

## 2. Technischer Ansatz

**Statisches HTML/CSS/JS + PHP** – kein Framework, keine CMS-Abhaengigkeit.

Vorteile:
- Maximale Performance (< 2,5s Ladezeit)
- Volle Kontrolle ueber Markup (SEO, Tracking, A11y)
- Einfache WordPress-Integration (Custom Page + Code Snippets)
- Keine Plugin-Konflikte mit bestehendem WordPress
- Skalierbar: Neue Landingpage = Dateien kopieren + Inhalte tauschen

Integration in WordPress:
- URL: `medizinundtherapie.de/karriere/paediatrie/`
- Custom Page Template mit dem HTML
- CSS/JS via Code Snippets Plugin (conditional loading nur auf LP-URLs)
- PHP Form Handler als separates Script

## 3. Section-Struktur (Paediatrie-Landingpage)

Basierend auf der Analyse der Referenzseite, den Design-Referenzen und Conversion-Best-Practices:

### Section 1: Hero
- **Subheadline:** "Werde Teil der GMKB – Gemeinnuetzige Medizinzentren Koeln/Bonn als"
- **H1:** "Facharzt*in Paediatrie" (m/w/d)
- **Quick-Facts:** Vollzeit | Raum Bonn | Sofort / n. Absprache
- **Emotionaler Hook:** "Du bist Profi im Umgang mit Kindern? Ihr Wohlbefinden liegt dir am Herzen? Dann bist du bei uns genau richtig."
- **CTA:** "Bewirb Dich jetzt in 60 Sekunden – ganz ohne Lebenslauf"
- **Hero-Bild:** Arzt mit Kind (2CM07479-ret.jpg oder 2CM07520-ret.jpg)
- **Keywords in H1/Text:** "Facharzt Paediatrie", "Paediatrie Koeln Bonn"

### Section 2: Benefits ("Unser Versprechen an Dich")
- **H2:** "Unser Versprechen an Dich"
- **Layout:** 2-Spalten Grid mit Icon + Headline + Kurztext (modularer als aktuell)
- **Benefits (aus Referenzseite):**
  1. Sicherer Job – Unbefristete Anstellung, 20+ Jahre etablierter Traeger
  2. Tarifliches Gehalt – Regelmaessige Anpassungen, Mobilitaetszuschuss, variable Verguetung
  3. Familie & Beruf – Kita-Plaetze Bonn & Rhein-Sieg, flexible Arbeitszeitmodelle
  4. Kitaplatzvermittlung – Im Raum Bonn / Rhein-Sieg
  5. 30 Tage Urlaub + Heiligabend & Silvester frei – 5-Tage-Woche
  6. Corporate Benefits – Mitarbeiterrabatte, Deutschlandticket-Zuschuss
  7. Interdisziplinaere Zusammenarbeit – Verzahnung mit Kindergarten, Logopaedie, Ergotherapie
- **CTA nach Benefits:** "Bewirb Dich jetzt in 60 Sekunden – ganz ohne Lebenslauf"

### Section 3: Video ("Lerne uns kennen – aus erster Hand")
- **H2:** "Lerne uns kennen – aus erster Hand"
- **Video-Embed:** Team-Video (1:45 min, aktuell auf Referenzseite)
- **CTA nach Video**

### Section 4: Testimonial ("Das sagt dein zukuenftiges Team")
- **H2:** "Das sagt dein zukuenftiges Team"
- **Zitat:** "Diese interdisziplinaere Zusammenarbeit auf Augenhoehe ist fuer mich ein zentraler Teil guter Medizin."
- **Person:** Dr. med. Alexander Groener, Kinder- und Jugendarzt
- **Bild:** Arzt-Foto (2CM07554.jpg oder 2CM07545.jpg)
- **CTA nach Testimonial**

### Section 5: Bewerbungsformular
- **H2:** "Jetzt in 60 Sekunden bewerben"
- **Felder (minimal, niedrige Huerde):**
  - Vorname + Nachname
  - E-Mail
  - Telefon
  - Kurze Nachricht / Motivation (optional, Textarea)
  - Datenschutz-Checkbox (DSGVO Pflicht)
- **KEIN Lebenslauf-Upload** (bewusst niedrige Huerde, wie auf Referenzseite)
- **Submit-Button:** "Bewerbung absenden"
- **Nach Submit:** Redirect auf /danke-bewerbung

### Section 6: Footer (minimal)
- Impressum-Link
- Datenschutz-Link
- Cookies verwalten
- Kein vollstaendiges Menue (isolierte Landingpage)

### Sticky Mobile CTA
- Fixierter Button am unteren Bildschirmrand auf Mobile
- Scrollt zum Bewerbungsformular oder oeffnet es
- Verschwindet wenn Formular im Viewport ist

## 4. SEO/SEA-Optimierung

### Must-have Keywords (aus Keyword-Analyse)
Fuer die Paediatrie-Seite muessen folgende Begriffe in H1, H2 und Text vorkommen:
- "Facharzt Paediatrie" / "Facharzt fuer Paediatrie"
- "Paediatrie Koeln" / "Paediatrie Bonn"
- "Kinderarzt Stelle" / "Kinderarzt Job"
- "Fortbildung Paediatrie"
- "Weiterbildung Paediatrie"

Fuer die Therapeuten-Seite (spaeter):
- "Ergotherapeut Koeln/Bonn", "Ergotherapeut Quereinstieg"
- "Logopaedie Stellenangebote", "Logopaedin Jobs Koeln"
- "Fortbildungen Ergotherapeuten/Logopaedie"
- Vollstaendige Liste in `/input/GMKB-SEA-KWA - Must-have-Keywords .csv`

### Technisches SEO
- Saubere H-Tag Hierarchie (1x H1, mehrere H2, H3 wo noetig)
- Meta Title: "Facharzt Paediatrie (m/w/d) – Jetzt bei GMKB bewerben | Koeln/Bonn"
- Meta Description mit Keywords + CTA
- Canonical URL setzen
- Open Graph Tags fuer Social Sharing
- Keine Blockierung durch robots.txt
- In XML-Sitemap aufnehmen (WordPress-seitig)

## 5. Conversion-Tracking (aus Tracking-Dokument)

### Pflicht-Setup
1. **GTM Container** auf der Landingpage
2. **Google Tag** (Google Ads / Tag ID) via GTM
3. **GA4 Configuration Tag** im GTM
4. **Google Ads Conversion-Tracking Tag** im GTM
5. **Conversion-Linker Tag** aktivieren

### Events
- `click_cta` – Klick auf jeden CTA-Button (data-track Attribute)
- `form_submit` – Formular abgesendet
- `page_view` auf `/danke-bewerbung` = **Haupt-Conversion**
- Duplicate Prevention: Conversion nur 1x pro Session

### DSGVO / Consent
- Google Consent Mode v2 vorbereiten
- Tags nur nach Marketing-Consent feuern
- Default Consent States konfigurieren
- Kompatibel mit Borlabs Cookie (auf Hauptseite bereits vorhanden)

### Vorbereitung im HTML/JS
- Alle CTAs bekommen `data-track="cta-click"` Attribute
- Formular bekommt `data-track="form-submit"`
- JS: Event-Listener die `dataLayer.push()` ausfuehren (nach Consent-Check)
- GTM-Container Snippet als Platzhalter vorbereitet (ID wird spaeter eingesetzt)

## 6. Design-Richtung

### Farbpalette (abgeleitet vom GMKB Logo)
- **Primaer:** Teal/Dunkelgruen (aus Logo, ca. #007B7F oder aehnlich)
- **Akzent:** Coral/Orange (fuer CTAs, aus aktuellem Funnel-Design)
- **Neutral:** Weiss, Hellgrau, Dunkelgrau/Fast-Schwarz
- **Exakte Werte werden in M1 aus dem Logo + Corporate Design extrahiert**

### Typografie
- Moderne, gut lesbare Sans-Serif (z.B. die Font der Hauptseite oder eine freie Alternative)
- Self-hosted (DSGVO)
- Fluid Typography mit clamp()

### Layout-Prinzipien
- Max-Width Container (1200px)
- Grosszuegiger Weissraum zwischen Sections
- Klare visuelle Trennung (keine Farbflaechen-Collage)
- Bilder gross und emotional
- Benefits als Icon-Cards in 2er/3er Grid
- Mobile: Alles stacked, grosse Touch-Targets

### Unterschied zur aktuellen Seite
Die aktuelle Referenzseite ist funktional, aber:
- Visuell unruhig (viele Emojis, wenig Hierarchie)
- Benefits nicht gut scanbar
- Kein klares visuelles System
- **Neu:** Ruhiger, professioneller, modularer, bessere visuelle Hierarchie

## 7. Vorgehen (Phasenplan)

### Phase 1: Design & Styleguide (M1)
- Farbpalette + Typografie aus GMKB Corporate Design extrahieren
- CSS Custom Properties definieren
- Button-Styles, Card-Styles, Section-Layouts
- Styleguide als Referenz-HTML erstellen

### Phase 2: Paediatrie-Landingpage (M2-M6)
- HTML-Struktur aller Sections
- CSS Styling (Mobile-First, alle Breakpoints)
- JavaScript (Sticky CTA, Smooth Scroll, Tracking-Hooks)
- Formular + PHP Handler
- Bilder optimieren (WebP, responsive sizes)

### Phase 3: Tracking-Setup (M7)
- GTM/GA4/Ads Conversion vorbereiten
- Data-Attribute + dataLayer Events
- Consent-Integration dokumentieren

### Phase 4: Quality Review (M8)
- Lighthouse Score >= 90
- Cross-Browser Test
- Responsive Test (375px, 768px, 1440px)
- Accessibility Audit
- Formular-Test

### Phase 5: WordPress-Integrations-Doku (M9)
- Schritt-fuer-Schritt Anleitung fuer WordPress-Integration
- Code Snippets Config
- DNS/URL Hinweise

### Phase 6: Therapeuten-Seite (M10)
- Struktur von Paediatrie kopieren
- Inhalte tauschen (Text, Bilder, Keywords)
- Spezifische Benefits fuer Therapeuten anpassen
- Review + Test

## 8. Offene Punkte / Klaerungsbedarf

| # | Frage | An wen | Status |
|---|---|---|---|
| 1 | WordPress-Zugang fuer spaetere Integration | GMKB / Account Manager | Offen |
| 2 | E-Mail-Empfaenger fuer Bewerbungsformulare | GMKB | Offen |
| 3 | Borlabs Cookie auf Hauptseite – Version + Kompatibilitaet? | GMKB / Account Manager | Offen |
| 4 | Team-Video: Wo gehostet? YouTube/Vimeo/Self-hosted? | GMKB | Offen |
| 5 | GMKB Logo als Datei (SVG/PNG) | GMKB | Offen |
| 6 | Corporate Design Manual / Styleguide vorhanden? | GMKB | Offen |
| 7 | Gewuenschte URL-Struktur bestaetigen (/karriere/paediatrie/) | Account Manager | Offen |
| 8 | Soll die Seite vom Kunden spaeter selbst editierbar sein? | Account Manager / GMKB | Offen – beeinflusst Ansatz |
