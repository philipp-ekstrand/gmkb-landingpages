# Projektdefinition – GMKB Recruiting-Landingpages

## Basics
- **Kunde:** GMKB – Gemeinnuetzige Medizinzentren Koeln/Bonn
- **Projekt:** Recruiting-Landingpages (Facharzt Paediatrie + Therapeuten)
- **Beschreibung:** Conversion-optimierte Recruiting-Landingpages fuer Google Ads Kampagnen. Statisches HTML/CSS/JS, Integration in bestehendes WordPress.
- **Sprache:** DE
- **Figma:** Keine – Design wird auf Basis der Referenzseiten + GMKB Corporate Design erstellt

## Referenzseiten (inhaltliche Grundlage)
- **Paediatrie:** https://recruiting.medizinundtherapie.de/paediatrie/
- **Therapeuten:** https://recruiting.medizinundtherapie.de/hallo/
- **Design-Referenzen (gute Landingpages):**
  - https://karriere.tv-turm.de/jobs/job-mitarbeiter-besucherservice-ticketing/
  - https://palabra.de/karriere/

## Domain & Integration
- **Hauptdomain:** medizinundtherapie.de (WordPress)
- **URL-Struktur:** /karriere/paediatrie/, /karriere/therapeuten/
- **Integration:** Custom Page Template + Code Snippets Plugin
- **Danke-Seite:** /danke-bewerbung (Conversion-Tracking)

## Landingpages
1. **Facharzt fuer Paediatrie (m/w/d)** – Primaer, wird zuerst erstellt
2. **Ergotherapeut*in / Logopaedin (m/w/d)** – Sekundaer, nach interner Freigabe der ersten Seite

## Formulare
- **Typ:** Bewerbungsformular (niedrige Huerde, kein Lebenslauf noetig)
- **Empfaenger:** [muss vom Kunden kommen]
- **Methode:** PHP mail() oder SMTP (je nach WordPress-Setup)
- **Danke-Seite:** Redirect nach Submit auf /danke-bewerbung

## Tracking & Analytics
- **GTM:** Google Tag Manager Container (noch zu erstellen)
- **GA4:** Google Analytics 4 (noch zu erstellen)
- **Google Ads:** Conversion-Tracking via GTM
- **Consent:** Cookie Consent Tool integrierbar (Borlabs Cookie bereits auf Hauptseite)
- **Events zu tracken:**
  - Button-Klick auf CTA
  - Formular-Submit
  - Danke-Seite Page View (Haupt-Conversion)

## Bilder
- Professionelle Fotos vorhanden in `/input/` (8 Bilder)
- Paediatrie: Arzt (teal Scrubs) mit Kind, Empfangsszenen
- Therapeuten: Therapeutin mit Kind, Ergotherapie-Szenen
- Muessen optimiert werden (WebP, verschiedene Groessen)

## Besonderheiten
- Kein Navigationsmenue (isolierte Kampagnen-Landingpage)
- Sticky CTA auf Mobile
- Ladezeit < 2,5s
- DSGVO-konform (Self-hosted Fonts, Consent Management)
- Must-have Keywords fuer SEO/SEA in H1, H2, Fliesstext einbauen
- Seiten muessen fuer Google crawlbar sein (kein robots-Block)
- Skalierbar fuer weitere Stellen-Landingpages

---

## Meilensteine

> Jeder Meilenstein hat ein klares Ergebnis (Deliverable) und wird erst nach expliziter Freigabe durch den Projektleiter abgeschlossen. Der naechste Meilenstein wird NIE ohne OK gestartet.

### M0 – Analyse & Grobkonzept
**Ziel:** Alle Inputs analysieren, Projektstruktur aufsetzen, Grobkonzept + Design-Konzept + Wireframe erstellen.
**Deliverables:**
- `architecture/project.md` – Projektdefinition (dieses Dokument)
- `architecture/konzept.md` – Grobkonzept (Section-Struktur, SEO, Tracking, Phasenplan)
- `architecture/design-konzept.md` – Benchmark-Analyse, CI-Extraktion, Design-Richtung
- `architecture/wireframe.md` – Detaillierter Section-fuer-Section Wireframe (ASCII)
- `CLAUDE.md` – Projektspezifische Arbeitsanweisungen
- Projektstruktur aufgeraeumt, README geschrieben
**Checkpoint:** Projektleiter reviewt Konzept, Design-Konzept und Wireframe.

### M1 – Design & Styleguide
**Ziel:** CSS Design Tokens und visuelles System definieren. Font beschaffen und einbinden.
**Deliverables:**
- CSS Custom Properties (Farben, Typografie, Spacing, Radii, Shadows)
- Self-hosted Font-Dateien (Inter) in `/assets/fonts/`
- Button-Styles, Card-Styles, Input-Styles als CSS-Klassen
- `architecture/styleguide.md` – Dokumentation aller Design Tokens
- Optional: Styleguide-HTML als visuelle Referenz
**Checkpoint:** Projektleiter reviewt Styleguide und Design Tokens.

### M2 – HTML-Struktur (Paediatrie)
**Ziel:** Komplettes semantisches HTML der Paediatrie-Landingpage. Alle 9 Sections + Sticky CTA.
**Deliverables:**
- `pages/paediatrie/index.html` – Vollstaendiges HTML5 (semantic, WCAG-konform)
- Alle Texte eingebaut (aus Referenzseite + konzept.md)
- SEO-Keywords in H1, H2, Fliesstext platziert
- Meta Tags (Title, Description, OG Tags, Canonical)
- Bild-Platzhalter mit `<picture>` + `loading="lazy"`
- GTM-Container Snippet (Platzhalter)
- `data-track` Attribute an allen CTAs und Formular
**Checkpoint:** Projektleiter reviewt HTML-Struktur und Inhalte.

### M3 – CSS & Responsive (Paediatrie)
**Ziel:** Komplettes Styling – Mobile-First, alle Breakpoints, visuell fertig.
**Deliverables:**
- `pages/paediatrie/styles.css` – Vollstaendiges CSS
- Mobile-First mit min-width Media Queries (481px, 768px, 901px, 1101px, 1440px)
- Alle Sections gestylt gemaess Wireframe
- Scroll-Animationen vorbereitet (CSS-Klassen fuer JS-getriggerte Reveals)
- `prefers-reduced-motion` Support
- Dark-Section Kontraste WCAG AA konform
**Checkpoint:** Projektleiter reviewt Design im Browser (Mobile + Desktop).

### M4 – JavaScript & Interaktionen (Paediatrie)
**Ziel:** Alle interaktiven Features implementieren.
**Deliverables:**
- `pages/paediatrie/scripts.js` – Vanilla JS, kein Framework
- Scroll-Reveal Animationen (Intersection Observer)
- Sticky Mobile CTA (ein-/ausblenden je nach Formular-Sichtbarkeit)
- Smooth Scroll (CTA-Klick → Formular)
- Floating Labels im Formular
- Client-side Formular-Validierung
- Video Play/Pause Logik
- Tracking Event Hooks (`dataLayer.push` nach Consent-Check)
**Checkpoint:** Projektleiter testet Interaktionen auf Mobile + Desktop.

### M5 – Formular & PHP (Paediatrie)
**Ziel:** Funktionierendes Bewerbungsformular mit E-Mail-Versand und Redirect.
**Deliverables:**
- `pages/paediatrie/form-handler.php` – POST-Handler
- Server-side Validierung (Pflichtfelder, E-Mail-Format, CSRF-Token)
- E-Mail-Versand (formatierte Bewerbungsmail an Empfaenger)
- Redirect auf `/danke-bewerbung` nach erfolgreichem Submit
- Fehlermeldungen bei Server-Fehler
- Rate-Limiting / Honeypot gegen Spam
**Checkpoint:** Projektleiter testet Formular-Submit (lokal oder Staging).

### M6 – Bilder & Performance
**Ziel:** Alle Bilder optimiert, Performance-Ziele erreicht.
**Deliverables:**
- Bilder aus `/input/` → WebP konvertiert (mehrere Groessen)
- JPG-Fallback fuer aeltere Browser
- `<picture>` Elemente mit `srcset` und `sizes`
- Hero-Bild: Inline Critical CSS oder Preload
- Lighthouse Score >= 90 (Performance, A11y, Best Practices, SEO)
- Ladezeit < 2,5s (simuliert)
**Checkpoint:** Projektleiter reviewt Lighthouse Report.

### M7 – Conversion-Tracking Setup
**Ziel:** GTM, GA4, Google Ads Conversion vorbereitet und dokumentiert.
**Deliverables:**
- GTM Container Snippet im HTML (Platzhalter-ID, wird spaeter ersetzt)
- `dataLayer.push()` Events fuer: `click_cta`, `form_submit`
- Consent-Check vor jedem Event-Push
- Google Consent Mode v2 Default States vorbereitet
- `architecture/tracking-setup.md` – Dokumentation aller Events, Tags, Trigger
**Checkpoint:** Projektleiter reviewt Tracking-Dokumentation.

### M8 – Quality Review & Testing
**Ziel:** Umfassender Test auf allen Geraeten und Browsern.
**Deliverables:**
- Cross-Browser Test (Chrome, Safari, Firefox, Edge)
- Responsive Test (375px, 768px, 1024px, 1440px)
- Accessibility Audit (WCAG 2.2 AA Konformitaet)
- Formular-Test (Validierung, Submit, Error States)
- Lighthouse >= 90 in allen Kategorien
- Alle gefundenen Bugs gefixt
**Checkpoint:** Projektleiter gibt finale Freigabe fuer WordPress-Integration.

### M9 – WordPress-Integrations-Dokumentation
**Ziel:** Schritt-fuer-Schritt Anleitung, damit der Kunde/Account-Manager die Seiten in WordPress einbauen kann.
**Deliverables:**
- `architecture/wordpress-integration.md` – Komplette Anleitung:
  - Custom Page Template erstellen
  - CSS via Code Snippets Plugin einbinden (conditional auf LP-URLs)
  - JS via Code Snippets Plugin einbinden (conditional auf LP-URLs)
  - PHP Form Handler integrieren
  - URL-Struktur konfigurieren (/karriere/paediatrie/)
  - GTM Container ID einsetzen
  - Sitemap + Robots.txt Hinweise
**Checkpoint:** Projektleiter reviewt Dokumentation.

### M10 – Therapeuten-Seite (Uebertragung)
**Ziel:** Zweite Landingpage fuer Ergotherapeut*in / Logopaedin auf Basis der Paediatrie-Seite.
**Deliverables:**
- `pages/therapeuten/index.html` – Angepasste Inhalte (Texte, Keywords, Bilder)
- `pages/therapeuten/styles.css` – Gleicher Styleguide, ggf. minimale Anpassungen
- `pages/therapeuten/scripts.js` – Gleiche Funktionalitaet
- `pages/therapeuten/form-handler.php` – Angepasster Empfaenger
- Therapeuten-spezifische Benefits eingebaut
- SEO-Keywords fuer Ergotherapie/Logopaedie platziert
- Quality Review (wie M8, aber kuerzer da Struktur identisch)
**Checkpoint:** Projektleiter gibt finale Freigabe.
