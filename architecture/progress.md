# GMKB Recruiting-Landingpages – Fortschritt

**Letztes Update:** 2026-03-10
**Aktiver Meilenstein:** Korrekturrunde (vom Projektleiter)
**Status:** Warte auf Korrekturliste
**Naechster Schritt:** Korrekturen umsetzen

---

## Meilenstein-Uebersicht

| # | Meilenstein | Status | Zeitraum |
|---|---|---|---|
| M0 | Analyse & Grobkonzept | ✅ Fertig | 2026-03-07 |
| M1 | Design & Styleguide | ✅ Fertig | 2026-03-07 |
| M2 | HTML-Struktur & Sections | ✅ Fertig | 2026-03-07 |
| M3 | CSS & Responsive | ✅ Fertig | 2026-03-07 |
| M4 | JavaScript & Interaktionen | ✅ Fertig | 2026-03-07 |
| M5 | Formular & PHP | ✅ Fertig | 2026-03-07 |
| M6 | Bilder & Performance | ✅ Fertig | 2026-03-07 |
| M7 | Conversion-Tracking Setup | ✅ Fertig | 2026-03-07 |
| M8 | Quality Review & Testing | ✅ Fertig | 2026-03-07 |
| M9 | WordPress-Integration Docs | ✅ Fertig | 2026-03-07 |
| M10 | Redesign + Alle Seiten | ✅ Fertig | 2026-03-08 bis 2026-03-10 |
| M11 | FAQ, Feedback-Runde 1, SEO-Keywords | ✅ Fertig | 2026-03-08 bis 2026-03-10 |
| M12 | Responsive & UI-Polish | ✅ Fertig | 2026-03-08 |
| M13 | SEO-Optimierung Paediatrie | ✅ Fertig | 2026-03-08 |

---

## Aktive Seiten (alle auf Vercel deployed)

| Seite | Pfad | Vercel-URL |
|---|---|---|
| Paediatrie | `/pages/paediatrie/` | `gmkb-peadiatrie.greyt.de/paediatrie/` |
| Logopaedie | `/pages/logopaedie/` | `gmkb-peadiatrie.greyt.de/logopaedie/` |
| Ergotherapie | `/pages/ergotherapie/` | `gmkb-peadiatrie.greyt.de/ergotherapie/` |
| Therapeuten | `/pages/therapeuten/` | `gmkb-peadiatrie.greyt.de/therapeuten/` |
| Danke-Seite | `/pages/danke/` | `gmkb-peadiatrie.greyt.de/danke/` |

**CSS-Architektur:** `base.css` (Tokens) → `components.css` (Shared Components) → seitenspezifische `styles.css`

---

## Detaillog

### M0 – Analyse & Grobkonzept (2026-03-07)
- [x] Input-Dokumente gelesen (Briefing, Keywords, Tracking-Anforderungen)
- [x] Referenzseiten analysiert (Paediatrie + Therapeuten + Design-Referenzen)
- [x] Bildmaterial gesichtet (8 Fotos in /input/)
- [x] Projekt aufgeraeumt (Next.js/Sanity/Docker entfernt)
- [x] CLAUDE.md, project.md, konzept.md, design-konzept.md erstellt
- [x] CI-Extraktion von medizinundtherapie.de + recruiting-Subdomain
- [x] Wireframe erstellt (wireframe.md) – 9 Sections + Sticky Mobile CTA
- [x] Vom Projektleiter freigegeben

---

### M1 – Design & Styleguide (2026-03-07)
- [x] Farbpalette (Teal #0D7377, Coral #E8613A, Neutrals), Typografie (Inter Variable, fluid clamp()), Spacing (4px-Basis)
- [x] Button-Styles (Primary, Hero, Glow, Ghost), Section-Layouts
- [x] base.css als Living Styleguide
- [x] Vom Projektleiter freigegeben

---

### M2 – HTML-Struktur & Sections (2026-03-07)
- [x] Semantisches HTML5, alle 9 Sections + Sticky CTA (Paediatrie)
- [x] SEO-Keywords, Meta Tags, Schema.org JobPosting, GTM-Platzhalter, data-track Attribute, Honeypot
- [x] Vom Projektleiter freigegeben

---

### M3 – CSS & Responsive (2026-03-07)
- [x] Mobile-First CSS, 6 Breakpoints (0, 481, 768, 901, 1101, 1440)
- [x] Scroll-Reveal Klassen, prefers-reduced-motion, WCAG AA Kontraste
- [x] Vom Projektleiter freigegeben

---

### M4 – JavaScript & Interaktionen (2026-03-07)
- [x] Scroll-Reveal (IntersectionObserver), Hero Entrance, Smooth Scroll, Sticky Mobile CTA
- [x] Client-side Formular-Validierung, Video Play/Pause, Tracking Event Hooks
- [x] Vom Projektleiter freigegeben

---

### M5 – Formular & PHP (2026-03-07)
- [x] form-handler.php (POST, Validierung, CSRF-Token, Honeypot, Rate-Limiting)
- [x] HTML-Bewerbungsmail im GMKB-Design, Redirect auf Danke-Seite
- [x] Danke-Seite (`/pages/danke/`) mit Conversion-Event

---

### M6 – Bilder & Performance (2026-03-07)
- [x] 4 Bilder optimiert (WebP + JPG, 3 Groessen: 480w/960w/1440w)
- [x] picture-Elemente mit srcset + sizes, Hero-Bild Preload

---

### M7 – Conversion-Tracking Setup (2026-03-07)
- [x] GTM Container, dataLayer Events, Google Consent Mode v2, tracking-setup.md

---

### M8 – Quality Review & Testing (2026-03-07)
- [x] Responsive Test (375/768/1440px), Formular-Test, Accessibility Audit – keine Bugs

---

### M9 – WordPress-Integration Docs (2026-03-07)
- [x] wordpress-integration.md: Custom Page Template, Code Snippets, Form Handler, GTM + Borlabs, Go-Live Checkliste

---

### M10 – Redesign + Alle Seiten (2026-03-08 bis 2026-03-10)

Umfang hat sich gegenueber der urspruenglichen Planung ("nur Therapeuten-Seite") stark erweitert. M10 umfasst das komplette Redesign aller Seiten.

#### Paediatrie-Redesign (2026-03-08)
- [x] Benefit-Cards: Weisser Content-Container ueber Bild (Energie Kreuzlingen Style)
- [x] Testimonial: Weisse Card mit Quote links, Bild rechts + Gradient-Fade
- [x] Prozess: Weisse Boxen mit Shadow/Teal-Border, animierte Dot-Connectors
- [x] Formular: Labels ueber Feldern, Datei-Upload, Turnstile-Captcha vorbereitet
- [x] CTA-Banner: Weniger Padding, weisser Button-Variant
- [x] Globale Pill-Tags (.benefits__tag) ueber alle Sektionen
- [x] Neue Bilder: Benefits (6x), Testimonial-Placeholder, GMKB-Logo

#### Therapeuten-Seite (2026-03-08 bis 2026-03-09)
- [x] Komplette Landingpage erstellt (index.html, styles.css, scripts.js)
- [x] 4 Input-Bilder optimiert (WebP + JPG, 3 Groessen) fuer Hero, Feature, Video, Testimonials
- [x] Texte von Referenzseite (recruiting.medizinundtherapie.de/hallo/) uebernommen
- [x] SEA-Keywords aus CSV in H1, H2, Benefits, FAQ, Fliesstext integriert
- [x] 2 Testimonials (Pina + Felix), 7 Benefits, Gehaltsrange 48.800–57.300 EUR
- [x] CSS-Architektur refactored: base.css → components.css → seitenspezifische styles.css
- [x] Texte gekuerzt (Dopplungen entfernt, kein Keyword-Stuffing)
- [x] Benefit-Cards: Bilder entfernt, Icon-Only mit weissem Hintergrund
- [x] Testimonial-Slider mit Pfeil-Navigation + Dot-Indikatoren + Infinite-Loop
- [x] CTA-Bild: Therapeutin (freigestelltes PNG, transparente Version)
- [x] Multi-Step-Formular (3 Schritte + Reject) mit dynamischer Hoehenanpassung
- [x] Zurueck-Button mit Step-History-Tracking (sichtbar ab Schritt 2)
- [x] Berufsfeld-Dropdown (Ergotherapeut/Logopaedie) auf Therapeuten-Seite
- [x] Vercel-Rewrites fuer Therapeuten-Seite + Root-Domain

#### Logopaedie + Ergotherapie (2026-03-10, aus M11 Feedback-Runde)
- [x] Beide Seiten komplett erstellt (`/pages/logopaedie/`, `/pages/ergotherapie/`)
- [x] Inhalte fachspezifisch angepasst (nicht nur Copy-Paste von Paediatrie)
- [x] CTA-Bild Ergotherapeut (freigestelltes PNG)
- [x] Vercel-Rewrites fuer beide Seiten

#### Cross-Page Fixes (2026-03-10)
- [x] H1-Gendering: "Ergotherapeut / Ergotherapeutin gesucht", "Logopäde / Logopädin gesucht" – komplett in Teal, kein grauer Span
- [x] Aufgaben-Section: Markup auf aufgaben__* Klassen vereinheitlicht (identisch mit Paediatrie), Checkmarks per CSS ::before statt inline SVGs
- [x] Aufgaben-Checkmarks: Einzelnes SVG (data URI), 24px Icon, 36px padding-left, zentriert im Kreis-Hintergrund
- [x] Doppelte Checkmarks in Logopaedie behoben (CSS-Klasse + inline SVG = doppelt)
- [x] 4-Phasen-Welleneffekt: solid hell → gradient ↓ → solid kraeftig → gradient ↑ (alle Seiten)
- [x] Feature-Bilder getauscht: Ergo = Mann, Logo = Frau
- [x] 2-Klick Vimeo-Embed mit DSGVO-Consent-Overlay auf allen Seiten (Poster-Bild + Datenschutz-Hinweis, iframe erst nach Klick, Vimeo-IDs sind Platzhalter VIMEO_ID_*)

---

### M11 – FAQ, Feedback-Runde 1, SEO-Keywords (2026-03-08 bis 2026-03-10)

#### FAQ-Sektion + Glassmorphism (2026-03-08, Paediatrie)
- [x] FAQ-Akkordeon implementiert
- [x] Zweiter CTA-Banner hinzugefuegt
- [x] Benefit-Card Glassmorphism-Effekt
- [x] Testimonial-Section Update

#### Feedback-Runde 1 (2026-03-10)
Umsetzung des ersten Kunden-Feedbacks (dokumentiert in `architecture/feedback-v1.md`):
- [x] Logopaedie + Ergotherapie Seiten erstellt (A1)
- [x] Aufgaben & Profil Section auf allen 3 Seiten (A4)
- [x] 72h Rueckmeldezeit vereinheitlicht (W1/W6)
- [x] CTA-Button nach Benefits (W2/W7)
- [x] Standort-Dropdown im Formular (W10)
- [x] Gendersprache entfernt (A2)
- [x] Section-Reihenfolge nach Referenzseite (A3/A11)
- [x] SEO-Keywords integriert (A10)

#### SEO-Keywords Logopaedie + Ergotherapie (2026-03-10)
- [x] Eyebrow-Texte aufgewertet (wie Paediatrie)
- [x] Section-Backgrounds: sanfter Welleneffekt ohne harte Kanten (alle 3 Seiten)
- [x] Hero Hook: keyword-reich + Location statt emotional-generisch
- [x] Benefits H2 + Intro: Location (Koeln/Bonn), Berufsbezeichnung, fachspezifisch
- [x] Testimonial, Form, Video, FAQ, Process: ueberall Keywords + Location ergaenzt
- [x] Alle Must-have-Keywords aus SEA-Keywordliste integriert (Ergo: 28, Logo: 22 Keywords)
- [x] CLAUDE.md: Vercel-Deployment-Doku + Section-Background-Referenz ergaenzt

---

### M12 – Responsive & UI-Polish (2026-03-08, Paediatrie)
- [x] Button: 3-Farben Teal-Gradient (135deg) mit Pseudo-Element Hover-Transition
- [x] White Button: Analoger Gradient (grau-weiss-grau)
- [x] Benefit-Card Icons: Gradient statt Flat-Color
- [x] CTA-Banner: Gradient-Hintergrund, Doctor-PNG mit Overflow-Effekt
- [x] FAQ: Zwei feste HTML-Spalten, nur-eins-offen-pro-Spalte Logik
- [x] Mobile: Logo kleiner, Hero-Padding, Sticky-CTA Hint, Image-first Layout
- [x] Testimonial: Image-first auf Mobile mit Top-to-Bottom Overlay
- [x] Process: Vertikale Connector-Dots auf Mobile
- [x] Trust-Bar: Zentrierte Divider, Wrapping-Fix
- [x] H2 Font-Size global groesser, Container-Padding 12px Mobile

---

### M13 – SEO-Optimierung Paediatrie (2026-03-08)
- [x] Meta-Title/Description: Kinderarzt, Stelle, Bonn, Stellenangebot ergaenzt
- [x] H1: Genderstern durch SEO-freundliche Variante ersetzt
- [x] Alle 7 H2-Tags mit Paediatrie/Kinderarzt/GMKB Keywords angereichert
- [x] Alt-Texte: Facharzt Paediatrie, Bonn, Kinder- und Jugendmedizin eingebaut
- [x] Eyebrow/Hook: Stellenangebot, Kinderarzt ergaenzt
- [x] FAQ-Antworten + Benefit-Texte: Keyword-Dichte erhoeht
- [x] JobPosting Schema erweitert: baseSalary, validThrough, directApply, jobBenefits, qualifications, postalCode
- [x] OG-Tags aktualisiert

---

## Offene Punkte

- [ ] WordPress-Zugang fuer Integration (spaeter)
- [ ] E-Mail-Empfaenger fuer Bewerbungsformular definieren
- [ ] Consent Management: Borlabs Cookie Kompatibilitaet klaeren
- [ ] Vimeo-Video-IDs einsetzen (aktuell Platzhalter VIMEO_ID_*)
- [ ] Lighthouse Score >= 90 (nach WordPress-Integration)
- [ ] M5–M9 formale Freigabe durch Projektleiter ausstehend
