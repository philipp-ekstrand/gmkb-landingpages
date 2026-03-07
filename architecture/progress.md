# GMKB Recruiting-Landingpages – Fortschritt

**Letztes Update:** 2026-03-07
**Aktiver Meilenstein:** M9 – WordPress-Integration Docs
**Status:** FERTIG
**Naechster Schritt:** Freigabe durch Projektleiter, dann M10 (Therapeuten-Seite)

---

## Meilenstein-Uebersicht

| # | Meilenstein | Status | Datum |
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
| M10 | Therapeuten-Seite (Uebertragung) | ⬜ Ausstehend | - |

---

## Detaillog

### M0 – Analyse & Grobkonzept
- [x] Input-Dokumente gelesen (Briefing, Keywords, Tracking-Anforderungen)
- [x] Referenzseiten analysiert (Paediatrie + Therapeuten + Design-Referenzen)
- [x] Bildmaterial gesichtet (8 Fotos in /input/)
- [x] Projekt aufgeraeumt (Next.js/Sanity/Docker entfernt)
- [x] CLAUDE.md fuer dieses Projekt angepasst
- [x] project.md erstellt
- [x] Grobkonzept erstellt (konzept.md)
- [x] Design-Konzept mit Benchmark-Analyse erstellt (design-konzept.md)
- [x] CI-Extraktion von medizinundtherapie.de + recruiting-Subdomain
- [x] Wireframe erstellt (wireframe.md) – 9 Sections + Sticky Mobile CTA
- [x] Design-Konzept + Wireframe mit extrahierter CI abgeglichen
- [x] Grobkonzept + Design-Konzept + Wireframe vom Projektleiter freigegeben (2026-03-07)

---

### M1 – Design & Styleguide
- [x] Farbpalette definiert (Teal #0D7377, Coral #E8613A, Neutrals)
- [x] Typografie festgelegt (Inter Variable, self-hosted, fluid clamp())
- [x] Spacing-System definiert (4px-Basis, CSS Custom Properties)
- [x] Button-Styles definiert (Primary, Hero, Glow, Ghost)
- [x] Section-Layouts skizziert
- [x] base.css als Living Styleguide erstellt
- [x] Vom Projektleiter freigegeben

---

### M2 – HTML-Struktur & Sections
- [x] Semantisches HTML5 (header, main, sections, footer)
- [x] Alle 9 Sections + Sticky CTA implementiert
- [x] SEO-Keywords natuerlich eingebaut (H1, H2, Fliesstext)
- [x] Meta Tags (Title, Description, OG, Canonical)
- [x] Schema.org JobPosting Structured Data
- [x] GTM-Container Platzhalter + dataLayer Init
- [x] data-track Attribute an allen CTAs und Formular
- [x] Honeypot Anti-Spam Feld
- [x] Vom Projektleiter freigegeben

---

### M3 – CSS & Responsive
- [x] Mobile-First CSS mit allen 6 Breakpoints (0, 481, 768, 901, 1101, 1440)
- [x] Alle Sections gestylt (Hero, Trust, Benefits, CTA-Banner, Video, Testimonial, Process, Form, Footer)
- [x] Scroll-Reveal CSS-Klassen vorbereitet
- [x] prefers-reduced-motion Support
- [x] WCAG AA Kontraste
- [x] Vom Projektleiter freigegeben

---

### M4 – JavaScript & Interaktionen
- [x] Scroll-Reveal (IntersectionObserver)
- [x] Hero Entrance Animation
- [x] Smooth Scroll (Anchor Links)
- [x] Sticky Mobile CTA (ein-/ausblenden)
- [x] Client-side Formular-Validierung
- [x] Video Play/Pause Logik (Platzhalter)
- [x] Tracking Event Hooks (dataLayer.push)
- [x] Vom Projektleiter freigegeben

---

### M5 – Formular & PHP
- [x] form-handler.php erstellt (POST-Handler)
- [x] Server-side Validierung (Pflichtfelder, E-Mail-Format, CSRF-Token)
- [x] E-Mail-Versand (formatierte HTML-Bewerbungsmail im GMKB-Design)
- [x] Redirect auf Danke-Seite nach Submit
- [x] Honeypot + Session-basiertes Rate-Limiting gegen Spam
- [x] Danke-Seite erstellt (pages/danke/) mit Conversion-Event
- [x] CSRF-Token im Formular vorbereitet (PHP-Kommentar fuer WordPress)
- [ ] Vom Projektleiter freigegeben

---

### M6 – Bilder & Performance
- [x] 4 Bilder aus /input/ optimiert (hero, feature, video-thumb, testimonial)
- [x] WebP-Konvertierung in 3 Groessen (480w, 960w, 1440w)
- [x] JPG-Fallback fuer alle Groessen
- [x] picture-Elemente mit srcset + sizes im HTML
- [x] Hero-Bild Preload im head
- [ ] Lighthouse Score >= 90 (nach WordPress-Integration)
- [ ] Vom Projektleiter freigegeben

---

### M7 – Conversion-Tracking Setup
- [x] GTM Container Snippet vorbereitet (Platzhalter-ID)
- [x] dataLayer.push Events: cta-click, form_submit, video-play, conversion_bewerbung
- [x] Google Consent Mode v2 Default States
- [x] Consent-Check Architektur (Borlabs Cookie pushed consent update)
- [x] tracking-setup.md Dokumentation (Events, Tags, Trigger, Variablen, Checkliste)
- [ ] Vom Projektleiter freigegeben

---

### M8 – Quality Review & Testing
- [x] Responsive Test (375px, 768px, 1440px) – alle Breakpoints geprueft
- [x] Formular-Test (Client-side Validierung, Error States, Focus Management)
- [x] Accessibility Audit (Alt-Texte, Labels, Heading-Hierarchie, ARIA, lang)
- [x] Keine Bugs gefunden
- [ ] Lighthouse >= 90 (nach WordPress-Integration mit echtem Server)
- [ ] Vom Projektleiter freigegeben

---

### M9 – WordPress-Integration Docs
- [x] wordpress-integration.md erstellt
- [x] Custom Page Template Anleitung
- [x] Code Snippets Plugin Setup (CSS + JS conditional loading)
- [x] Form Handler Integration (2 Optionen)
- [x] URL-Struktur Konfiguration
- [x] GTM + Borlabs Cookie Setup
- [x] Go-Live Checkliste
- [ ] Vom Projektleiter freigegeben

---

### Offene Fragen / Blocker
- WordPress-Zugang fuer Integration (spaeter)
- E-Mail-Empfaenger fuer Bewerbungsformular
- Consent Management: Borlabs Cookie auf Hauptseite vorhanden – kompatibel?
- Video-Embed: Hosting des Team-Videos (YouTube/Vimeo oder self-hosted?)
