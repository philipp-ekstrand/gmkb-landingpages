# GMKB Recruiting-Landingpages – Fortschritt

**Letztes Update:** 2026-03-07
**Aktiver Meilenstein:** M5 – Formular & PHP
**Status:** IN_PROGRESS
**Naechster Schritt:** form-handler.php + Danke-Seite

---

## Meilenstein-Uebersicht

| # | Meilenstein | Status | Datum |
|---|---|---|---|
| M0 | Analyse & Grobkonzept | ✅ Fertig | 2026-03-07 |
| M1 | Design & Styleguide | ✅ Fertig | 2026-03-07 |
| M2 | HTML-Struktur & Sections | ✅ Fertig | 2026-03-07 |
| M3 | CSS & Responsive | ✅ Fertig | 2026-03-07 |
| M4 | JavaScript & Interaktionen | ✅ Fertig | 2026-03-07 |
| M5 | Formular & PHP | 🔄 In Arbeit | 2026-03-07 |
| M6 | Bilder & Performance | ⬜ Ausstehend | - |
| M7 | Conversion-Tracking Setup | ⬜ Ausstehend | - |
| M8 | Quality Review & Testing | ⬜ Ausstehend | - |
| M9 | WordPress-Integration Docs | ⬜ Ausstehend | - |
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
- [ ] form-handler.php erstellt (POST-Handler)
- [ ] Server-side Validierung (Pflichtfelder, E-Mail-Format, CSRF-Token)
- [ ] E-Mail-Versand (formatierte Bewerbungsmail)
- [ ] Redirect auf /danke-bewerbung nach Submit
- [ ] Honeypot / Rate-Limiting gegen Spam
- [ ] Danke-Seite erstellt (pages/danke/)
- [ ] Vom Projektleiter freigegeben

---

### Offene Fragen / Blocker
- WordPress-Zugang fuer Integration (spaeter)
- E-Mail-Empfaenger fuer Bewerbungsformular
- Consent Management: Borlabs Cookie auf Hauptseite vorhanden – kompatibel?
- Video-Embed: Hosting des Team-Videos (YouTube/Vimeo oder self-hosted?)
