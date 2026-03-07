# CLAUDE.md – GMKB Recruiting-Landingpages

> Lies diese Datei beim Start JEDER Konversation.

## PROJEKT

Recruiting-Landingpages fuer die GMKB (Gemeinnuetzige Medizinzentren Koeln/Bonn).
Statische HTML/CSS/JS-Seiten, die als Custom Pages in deren WordPress integriert werden.

- Projektinfos: `/architecture/project.md`
- Fortschritt: `/architecture/progress.md`
- Grobkonzept: `/architecture/konzept.md`
- Input-Dokumente: `/input/`

## TECH STACK

- **HTML5** (Semantic, WCAG 2.2 AA)
- **Vanilla CSS** (Custom Properties, Mobile-First, kein Framework)
- **Vanilla JavaScript** (kein Framework, keine Dependencies)
- **PHP** (Formularverarbeitung, Danke-Seite Redirect)
- **Integration:** WordPress Custom Page + Code Snippets Plugin (CSS/JS/PHP separat)

## KEIN Next.js, KEIN Sanity, KEIN Framework

Dieses Projekt ist bewusst framework-frei. Die Landingpages werden als statische HTML-Dateien entwickelt und dann manuell in WordPress integriert (Custom Page Template + Code Snippets Plugin fuer CSS/JS/PHP).

## BREAKPOINTS (Mobile-First)

```
Default (0px+):       Handy vertikal
481px+:               Handy horizontal
768px+:               Tablet
901px+:               Tablet horizontal
1101px+:              Laptop
1440px+:              Desktop
```

## DATEIEN-KONVENTION

Jede Landingpage besteht aus 4 Dateien:
```
/pages/paediatrie/
  index.html          <- Die komplette Landingpage
  styles.css          <- Alle Styles fuer diese Seite
  scripts.js          <- Interaktionen, Tracking-Events, Sticky CTA
  form-handler.php    <- Formularverarbeitung + E-Mail-Versand

/pages/therapeuten/
  index.html
  styles.css
  scripts.js
  form-handler.php

/pages/danke/
  index.html          <- Danke-Seite nach Bewerbung (Conversion-Tracking)
  styles.css

/assets/
  images/             <- Optimierte Bilder (WebP + Fallback JPG)
  fonts/              <- Self-hosted Fonts (DSGVO)
```

## KRITISCHE PROZESS-REGELN

1. **NIEMALS einen neuen Meilenstein starten ohne ausdrueckliches OK vom Projektleiter.** Nach jedem Checkpoint: Ergebnis melden, warten, erst nach expliziter Freigabe den naechsten Meilenstein beginnen.
2. **Referenzseiten sind inhaltliche Grundlage.** Texte weitgehend 1:1 uebernehmen, Struktur modularer und conversion-orientierter aufbauen.
3. **Keywords integrieren.** Die Must-have-Keywords aus `/input/GMKB-SEA-KWA - Must-have-Keywords .csv` muessen in H1, H2 und Fliesstext natuerlich eingebaut werden.
4. **Kein Navigationsmenue.** Isolierte Kampagnen-Landingpage ohne Hauptnavigation.
5. **Sticky CTA auf Mobile.** Immer sichtbarer Bewerbungs-Button.
6. **Ladezeit < 2,5 Sekunden.** Keine externen Dependencies, optimierte Bilder, minimales CSS/JS.
7. **DSGVO-konform.** Formular mit Einwilligung, Consent Management vorbereitet, keine Google Fonts CDN.
8. **Conversion-Tracking vorbereitet.** GTM-Container, GA4 Events, Google Ads Conversion Tag – alles als data-Attribute und Event-Hooks vorbereitet.

## CODE-REGELN

1. Semantic HTML: main, article, section, header, footer, nav (nur Footer-Links)
2. CSS Custom Properties fuer Farben, Fonts, Spacing – keine Hardcoded Werte
3. Mobile-First CSS mit min-width Media Queries
4. Vanilla JS – kein jQuery, kein Framework
5. Bilder: WebP mit JPG-Fallback via `<picture>` Element, `loading="lazy"` fuer Below-the-fold
6. Self-hosted Fonts (DSGVO-konform)
7. Accessibility: WCAG 2.2 AA (Kontraste, Focus-States, Alt-Texte, Aria-Labels)
8. Performance: Inline Critical CSS, defer JS, optimierte Bilder
9. `prefers-reduced-motion` respektieren
10. Keine externen Requests ausser Tracking (und das nur nach Consent)

## DESIGN-RICHTUNG

- Orientierung am GMKB Corporate Design (Teal/Dunkelgruen als Primaerfarbe, aus dem Logo)
- Moderner, ruhiger, professioneller als die aktuelle Referenzseite
- Klare visuelle Trennung der Sections
- Viel Weissraum, grosse Bilder, scanbare Inhalte
- Trust-Elemente prominent (Testimonials, Benefits, Team-Video)

## CONVERSION-OPTIMIERUNG

- CTA "Bewirb Dich jetzt in 60 Sekunden" – mehrfach auf der Seite
- Sticky CTA auf Mobile
- Formular: Minimal (kein Lebenslauf noetig), niedrige Huerde
- Social Proof: Team-Testimonials, Video
- Benefits klar und scanbar (Icon + Headline + Kurztext)
- Danke-Seite mit eindeutiger URL `/danke-bewerbung` fuer Conversion-Tracking

## WORDPRESS-INTEGRATION

Die fertigen Landingpages werden so in WordPress integriert:
1. Custom Page Template (HTML als PHP-Template)
2. Code Snippets Plugin: CSS-Datei einbinden (nur auf Landingpage-URLs)
3. Code Snippets Plugin: JS-Datei einbinden (nur auf Landingpage-URLs)
4. PHP: Formular-Handler als separates Script oder ueber functions.php
5. URL-Struktur: `medizinundtherapie.de/karriere/paediatrie/` (Unterseite der Hauptdomain)

## BEI KONVERSATIONS-START

1. Lies `/architecture/progress.md`
2. Identifiziere aktuellen Meilenstein + naechsten Task
3. Melde: "Meilenstein [X] – [Name]. Naechster Schritt: [Task]. Fortfahren?"
4. **Warte auf explizites OK**
