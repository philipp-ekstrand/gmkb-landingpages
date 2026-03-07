# Wireframe – Facharzt Paediatrie Landingpage

> Detaillierter Section-fuer-Section Entwurf der Landingpage.
> Leserichtung: Von oben nach unten = Scroll-Reihenfolge auf der Seite.

---

## Seiten-Uebersicht (Scroll-Flow)

```
┌──────────────────────────────────────────────────┐
│  [1] HERO                                         │
│      Teal-Hintergrund, grosse H1, Foto, CTA      │
├──────────────────────────────────────────────────┤
│  [2] TRUST-BAR                                    │
│      Quick-Facts als horizontale Leiste           │
├──────────────────────────────────────────────────┤
│  [3] BENEFITS                                     │
│      "Unser Versprechen an Dich" – Card-Grid      │
├──────────────────────────────────────────────────┤
│  [4] CTA-ZWISCHENRUFER                            │
│      Farbiger Streifen mit starkem CTA            │
├──────────────────────────────────────────────────┤
│  [5] VIDEO                                        │
│      "Lerne uns kennen" – Team-Video              │
├──────────────────────────────────────────────────┤
│  [6] TESTIMONIAL                                  │
│      Dunkle Section, grosses Zitat + Foto         │
├──────────────────────────────────────────────────┤
│  [7] ABLAUF                                       │
│      "So einfach geht's" – 3 Schritte            │
├──────────────────────────────────────────────────┤
│  [8] FORMULAR                                     │
│      "Jetzt in 60 Sekunden bewerben"              │
├──────────────────────────────────────────────────┤
│  [9] FOOTER                                       │
│      Minimal: Impressum, Datenschutz, Cookies     │
├──────────────────────────────────────────────────┤
│  [STICKY] MOBILE CTA                              │
│      Fixiert am unteren Rand (nur Mobile)         │
└──────────────────────────────────────────────────┘
```

---

## [1] HERO SECTION

### Hintergrund & Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: GMKB-Teal (#046C6C)                                 │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container (max-width: 1200px, centered)                     │  │
│  │                                                               │  │
│  │  Desktop: 2-Spalten Grid (55% Text / 45% Bild)              │  │
│  │  Mobile: Stacked (Text oben, Bild unten)                    │  │
│  │                                                               │  │
│  │  ┌──────────────────────┐  ┌─────────────────────────────┐  │  │
│  │  │ LINKE SPALTE         │  │ RECHTE SPALTE                │  │  │
│  │  │                      │  │                               │  │  │
│  │  │ [Logo GMKB – weiss]  │  │  ┌─────────────────────┐    │  │  │
│  │  │                      │  │  │                       │    │  │  │
│  │  │ Eyebrow:             │  │  │   HERO-BILD           │    │  │  │
│  │  │ "Werde Teil der      │  │  │   (Arzt mit Kind)     │    │  │  │
│  │  │  GMKB – Gemeinn..."  │  │  │                       │    │  │  │
│  │  │                      │  │  │   border-radius: 16px │    │  │  │
│  │  │ H1:                  │  │  │   object-fit: cover    │    │  │  │
│  │  │ "Fachärzt*in         │  │  │   aspect-ratio: 3/4   │    │  │  │
│  │  │  Pädiatrie"          │  │  │                       │    │  │  │
│  │  │                      │  │  └─────────────────────┘    │  │  │
│  │  │ Subtitle:            │  │                               │  │  │
│  │  │ "(m/w/d) · Vollzeit  │  │                               │  │  │
│  │  │  · Raum Bonn"        │  │                               │  │  │
│  │  │                      │  │                               │  │  │
│  │  │ Hook-Text:           │  │                               │  │  │
│  │  │ "Du bist Profi im    │  │                               │  │  │
│  │  │  Umgang mit Kindern? │  │                               │  │  │
│  │  │  Ihr Wohlbefinden    │  │                               │  │  │
│  │  │  liegt dir am        │  │                               │  │  │
│  │  │  Herzen?"            │  │                               │  │  │
│  │  │                      │  │                               │  │  │
│  │  │ [CTA BUTTON]         │  │                               │  │  │
│  │  │ "Bewirb Dich jetzt   │  │                               │  │  │
│  │  │  in 60 Sekunden"     │  │                               │  │  │
│  │  │  → Weiss/Teal 8px     │  │                               │  │  │
│  │  │                      │  │                               │  │  │
│  │  └──────────────────────┘  └─────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Inhalte

| Element | Text | Styling |
|---------|------|---------|
| Logo | GMKB Logo (SVG, weiss) | Oben links, klein (ca. 120px breit) |
| Eyebrow | "Werde Teil der GMKB – Gemeinnuetzige Medizinzentren Koeln/Bonn als" | text-sm, font-weight 400, weiss, opacity 0.85 |
| H1 | "Fachärzt*in Pädiatrie" | text-h1 (clamp 40-72px), font-weight 800, weiss |
| Subtitle | "(m/w/d) · Vollzeit · Raum Bonn · Ab sofort" | text-sm, weiss, opacity 0.7, letter-spacing leicht |
| Hook | "Du bist Profi im Umgang mit Kindern? Ihr Wohlbefinden liegt dir am Herzen? Dann bist du bei uns genau richtig." | text-body (18px), weiss, max-width 480px |
| CTA | "Bewirb Dich jetzt in 60 Sekunden" | Teal-Button (8px radius), gross (padding 1rem 2.5rem) |
| Unter CTA | "Kein Lebenslauf noetig" | text-sm, weiss, opacity 0.6 |
| Bild | 2CM07479-ret.jpg (Arzt mit Kind) | border-radius: 16px, leichter Schatten |

### Animationen

- H1: Slide-up + Fade (delay 0.2s)
- Hook-Text: Slide-up + Fade (delay 0.4s)
- CTA: Slide-up + Fade (delay 0.6s)
- Bild: Scale 1.05 → 1.0 + Fade (delay 0.3s, duration 1.2s)

### Mobile (< 768px)

- Einspaltiges Layout, Text oben, Bild darunter
- H1 kleiner (clamp runter auf 40px)
- Bild: Volle Breite, border-radius: 12px
- CTA: Volle Breite

---

## [2] TRUST-BAR

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: Weiss                                                │
│  Border-bottom: 1px solid #E5E5E5                                │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – Horizontal Flex, center, gap: 3rem             │  │
│  │                                                               │  │
│  │  ✓ Unbefristet    ✓ 30 Tage        ✓ Tarifliches    ✓ Kita │  │
│  │    angestellt       Urlaub            Gehalt           Platz │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Inhalte

4 Quick-Facts als horizontale Leiste:
1. "Unbefristet angestellt" (Icon: Schloss/Shield)
2. "30 Tage Urlaub" (Icon: Kalender)
3. "Tarifliches Gehalt" (Icon: Banknote)
4. "Kita-Platz" (Icon: Haus/Herz)

### Styling

- Kleine Icons (24px, Teal-Farbe, Stroke-Style)
- Text: font-weight 500, text-sm
- Padding: 1.5rem vertikal
- Mobile: 2x2 Grid statt horizontale Leiste
- Subtle: Nicht ueberladen, dient als Vertrauenssignal + schneller Scan

### Animation

- Fade-in beim Scrollen (als Block, kein Stagger)

---

## [3] BENEFITS SECTION

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: Light-Gray (#F6F6F6)                                 │
│  Padding: clamp(4rem, 8vw, 8rem) vertikal                       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container                                                    │  │
│  │                                                               │  │
│  │  [Section-Label] "UNSERE BENEFITS" (Teal, uppercase, small)  │  │
│  │                                                               │  │
│  │  H2: "Unser Versprechen                                      │  │
│  │       an Dich"                                                │  │
│  │                                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │ CARD 1       │  │ CARD 2       │  │ CARD 3       │       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │ [Icon]       │  │ [Icon]       │  │ [Icon]       │       │  │
│  │  │ H3: Sicherer │  │ H3: Tarif-   │  │ H3: Familie  │       │  │
│  │  │ Job          │  │ liches       │  │ & Beruf      │       │  │
│  │  │              │  │ Gehalt       │  │              │       │  │
│  │  │ Kurztext     │  │ Kurztext     │  │ Kurztext     │       │  │
│  │  │ (2-3 Zeilen) │  │ (2-3 Zeilen) │  │ (2-3 Zeilen) │       │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  │                                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │ CARD 4       │  │ CARD 5       │  │ CARD 6       │       │  │
│  │  │ Kita-Platz   │  │ 30 Tage      │  │ Corporate    │       │  │
│  │  │ vermittlung  │  │ Urlaub       │  │ Benefits     │       │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  │                                                               │  │
│  │         ┌──────────────────────────┐                         │  │
│  │         │ CARD 7 (breitere Karte)  │                         │  │
│  │         │ Interdisziplinaere       │                         │  │
│  │         │ Zusammenarbeit           │                         │  │
│  │         │ + Bild (Team bei Arbeit) │                         │  │
│  │         └──────────────────────────┘                         │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Benefit-Cards (7 Stueck)

| # | Icon | H3 | Text |
|---|------|-----|------|
| 1 | Shield/Lock | Sicherer Job | Unbefristete Anstellung bei einem seit ueber 20 Jahren etablierten gemeinnuetzigen und diakonischen Traeger. |
| 2 | Banknote/Chart | Tarifliches Gehalt | Mit regelmaessigen Anpassungen, Mobilitaetszuschuss sowie variabler Verguetung & Zusatzleistungen. |
| 3 | Heart/Home | Familie & Beruf | Kita-Plaetze in Bonn & Rhein-Sieg-Kreis, flexible Arbeitszeitmodelle fuer eine bessere Vereinbarkeit. |
| 4 | Building/Map | Kitaplatzvermittlung | Im Raum Bonn / Rhein-Sieg – wir helfen dir, den passenden Betreuungsplatz zu finden. |
| 5 | Calendar/Sun | 30 Tage Urlaub | Plus Heiligabend und Silvester frei. Mehr Erholung bei einer 5-Tage-Woche. |
| 6 | Gift/Ticket | Corporate Benefits | Exklusive Mitarbeiterrabatte bei vielen Partnern & monatlicher, steuerfreier Zuschuss fuer dein Deutschlandticket. |
| 7 | Users/Network | Interdisziplinaere Zusammenarbeit | Wir sind eine Einrichtung die eng miteinander arbeitet – verzahnt mit Kindergarten, Logopaedie und Ergotherapie zur Foerderung von Kindern. |

### Card-Styling

```
Background:      Weiss (#FFFFFF)
Border-Radius:   12px
Padding:         2rem
Box-Shadow:      none (clean look auf grauem BG)
Border:          1px solid rgba(0,0,0,0.06)

Icon:            40px, Teal-Farbe, Stroke-Stil (Lucide Icons oder aehnlich)
H3:              text-h3, font-weight 600, Text Dark
Body:            text-body, Text Body Farbe

Card 7 (Sonder):  Grid-Column: span 2 (Desktop), mit kleinem Bild rechts
```

### Grid

- Desktop: 3 Spalten, Gap: 1.5rem
- Tablet: 2 Spalten
- Mobile: 1 Spalte (gestacked)

### Animationen

- Cards erscheinen mit Stagger (je 80ms versetzt)
- Slide-up + Fade pro Card
- Hover: translateY(-4px) + subtle shadow

---

## [4] CTA-ZWISCHENRUFER

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: GMKB-Teal (#046C6C)                                │
│  Padding: 3rem vertikal                                          │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – Flex, center, column                            │  │
│  │                                                               │  │
│  │  Text: "Klingt gut? Dann lass uns reden."                   │  │
│  │  (Weiss, text-h3, font-weight 500)                          │  │
│  │                                                               │  │
│  │  [CTA BUTTON – Weiss auf Teal-BG, 8px radius]                                   │  │
│  │  "Bewirb Dich jetzt in 60 Sekunden"                          │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

**Zweck:** Visueller Break, erinnert an CTA, Farbwechsel erzeugt Rhythmus.

---

## [5] VIDEO SECTION

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: Weiss (#FFFFFF)                                     │
│  Padding: Section-Standard                                       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container                                                    │  │
│  │                                                               │  │
│  │  [Section-Label] "UNSER TEAM"                                │  │
│  │                                                               │  │
│  │  H2: "Lerne uns kennen –                                    │  │
│  │       aus erster Hand"                                       │  │
│  │                                                               │  │
│  │  Subtitle: "Unser Team erzaehlt, warum die GMKB             │  │
│  │  ein besonderer Arbeitsplatz ist."                           │  │
│  │                                                               │  │
│  │  ┌───────────────────────────────────────────────────────┐  │  │
│  │  │                                                         │  │  │
│  │  │             VIDEO PLAYER                                │  │  │
│  │  │             (16:9 Aspect Ratio)                         │  │  │
│  │  │                                                         │  │  │
│  │  │             [▶ Play Button Overlay]                     │  │  │
│  │  │                                                         │  │  │
│  │  │  border-radius: 16px                                    │  │  │
│  │  │  Poster: Frame aus Video oder Teamfoto                  │  │  │
│  │  │                                                         │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Video-Details

- Poster-Bild: Teamfoto oder erster Frame des Videos
- Play-Button: Grosser Kreis (64px), Teal-Background, weisses Play-Icon
- Hover: Scale 1.1 auf Play-Button
- Nach Klick: Video startet (YouTube/Vimeo embed oder self-hosted)
- Consent-Overlay falls noetig (YouTube = externer Dienst)
- Border-Radius: 16px mit overflow: hidden

---

## [6] TESTIMONIAL SECTION

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: GMKB-Teal Darker (#022D2D)    │
│  Padding: Section-Standard                                       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – 2-Spalten Grid (60% Text / 40% Bild)           │  │
│  │                                                               │  │
│  │  ┌──────────────────────────┐  ┌────────────────────────┐  │  │
│  │  │ LINKE SPALTE             │  │ RECHTE SPALTE          │  │  │
│  │  │                          │  │                          │  │  │
│  │  │ [Section-Label]          │  │  ┌──────────────────┐  │  │  │
│  │  │ "STIMMEN AUS DEM TEAM"  │  │  │                    │  │  │  │
│  │  │                          │  │  │  PORTRAIT-FOTO    │  │  │  │
│  │  │ H2: "Das sagt dein      │  │  │  Dr. Groener      │  │  │  │
│  │  │  zukuenftiges Team"     │  │  │                    │  │  │  │
│  │  │                          │  │  │  border-radius:   │  │  │  │
│  │  │ [Grosses Anfuehrungs-   │  │  │  16px              │  │  │  │
│  │  │  zeichen – dekorativ,   │  │  │                    │  │  │  │
│  │  │  Teal-Light, 80px]      │  │  │                    │  │  │  │
│  │  │                          │  │  └──────────────────┘  │  │  │
│  │  │ Zitat:                   │  │                          │  │  │
│  │  │ "Diese interdiszipli-   │  │                          │  │  │
│  │  │  naere Zusammenarbeit   │  │                          │  │  │
│  │  │  auf Augenhoehe ist     │  │                          │  │  │
│  │  │  fuer mich ein          │  │                          │  │  │
│  │  │  zentraler Teil guter   │  │                          │  │  │
│  │  │  Medizin."              │  │                          │  │  │
│  │  │                          │  │                          │  │  │
│  │  │ — Dr. med. Alexander    │  │                          │  │  │
│  │  │   Groener               │  │                          │  │  │
│  │  │   Kinder- und           │  │                          │  │  │
│  │  │   Jugendarzt            │  │                          │  │  │
│  │  │                          │  │                          │  │  │
│  │  └──────────────────────────┘  └────────────────────────┘  │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Styling

- Alle Texte: Weiss
- Grosses dekoratives Anfuehrungszeichen: Teal-Light (#E8F5F5), 80px, font-weight 800, als Grafik-Element
- Zitat: text-h3 (ca. 24px), font-weight 400, italic, line-height 1.5
- Name: font-weight 600
- Rolle: text-sm, opacity 0.7
- Foto: border-radius 16px, leichter Warm-Filter

### Mobile

- Stacked: Foto oben (schmaeler), Zitat darunter
- Foto: Volle Breite, aspect-ratio 4:3

### Animation

- Fade-in der gesamten Section
- Zitat: Leichter Slide von links

---

## [7] ABLAUF SECTION ("So einfach geht's")

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: Weiss (#FFFFFF)                                     │
│  Padding: Section-Standard                                       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – zentriert                                        │  │
│  │                                                               │  │
│  │  [Section-Label] "BEWERBUNGSPROZESS"                         │  │
│  │                                                               │  │
│  │  H2: "So einfach geht's"                                    │  │
│  │                                                               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │  ① ─ ─ ─ ─ ─ ─ ─② ─ ─ ─ ─ ─ ─ ─③              │       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │  SCHRITT 1   │  │  SCHRITT 2   │  │  SCHRITT 3   │       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │  Nummer:     │  │  Nummer:     │  │  Nummer:     │       │  │
│  │  │  "01"        │  │  "02"        │  │  "03"        │       │  │
│  │  │  (gross,     │  │  (gross,     │  │  (gross,     │       │  │
│  │  │   Teal,      │  │   Teal,      │  │   Teal,      │       │  │
│  │  │   60px)      │  │   60px)      │  │   60px)      │       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │  H3:         │  │  H3:         │  │  H3:         │       │  │
│  │  │  "Formular   │  │  "Wir melden │  │  "Kennen-    │       │  │
│  │  │   ausfuellen"│  │   uns"       │  │   lernen"    │       │  │
│  │  │              │  │              │  │              │       │  │
│  │  │  "Keine 60   │  │  "Innerhalb  │  │  "Bei einem  │       │  │
│  │  │   Sekunden,  │  │   von 72     │  │   Match      │       │  │
│  │  │   kein       │  │   Stunden    │  │   laden wir  │       │  │
│  │  │   Lebenslauf │  │   hoerst du  │  │   dich zum   │       │  │
│  │  │   noetig."   │  │   von uns."  │  │   Gespraech."│       │  │
│  │  │              │  │              │  │              │       │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Styling

- Nummern: 60px, font-weight 800, Teal-Farbe, opacity 0.15 als Hintergrund-Element
- Verbindungslinie: gestrichelt, Teal, zwischen den Nummern (nur Desktop)
- Mobile: Vertikal gestackt, Linie wird zur vertikalen Linie links

### Animation

- Counter-Nummern: Fade-in mit leichtem Scale
- Stagger: 150ms zwischen Schritt 1, 2, 3

---

## [8] FORMULAR SECTION

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: Teal Light (#E8F5F5)                                │
│  Padding: Section-Standard                                       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – max-width: 640px, zentriert                     │  │
│  │                                                               │  │
│  │  [Section-Label] "JETZT BEWERBEN"                            │  │
│  │                                                               │  │
│  │  H2: "In 60 Sekunden                                        │  │
│  │       bewerben"                                              │  │
│  │                                                               │  │
│  │  Subtitle: "Kein Lebenslauf noetig. Wir melden              │  │
│  │  uns innerhalb von 72 Stunden bei dir."                      │  │
│  │                                                               │  │
│  │  ┌───────────────────────────────────────────────────────┐  │  │
│  │  │  FORM CARD                                              │  │  │
│  │  │  Background: Weiss, border-radius: 16px, padding: 2rem │  │  │
│  │  │  Box-Shadow: 0 4px 24px rgba(0,0,0,0.08)               │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌─────────────────┐  ┌─────────────────┐              │  │  │
│  │  │  │ Vorname *       │  │ Nachname *      │              │  │  │
│  │  │  │ [Floating Label]│  │ [Floating Label] │              │  │  │
│  │  │  └─────────────────┘  └─────────────────┘              │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌───────────────────────────────────────┐              │  │  │
│  │  │  │ E-Mail-Adresse *                      │              │  │  │
│  │  │  │ [Floating Label]                       │              │  │  │
│  │  │  └───────────────────────────────────────┘              │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌───────────────────────────────────────┐              │  │  │
│  │  │  │ Telefonnummer *                       │              │  │  │
│  │  │  │ [Floating Label]                       │              │  │  │
│  │  │  └───────────────────────────────────────┘              │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌───────────────────────────────────────┐              │  │  │
│  │  │  │ Kurze Nachricht (optional)            │              │  │  │
│  │  │  │ [Textarea, 3 Zeilen]                  │              │  │  │
│  │  │  │                                        │              │  │  │
│  │  │  └───────────────────────────────────────┘              │  │  │
│  │  │                                                         │  │  │
│  │  │  ☐ Ich stimme der Verarbeitung meiner Daten            │  │  │
│  │  │    gemaess der Datenschutzerklaerung zu. *              │  │  │
│  │  │                                                         │  │  │
│  │  │  ┌───────────────────────────────────────┐              │  │  │
│  │  │  │      "Bewerbung absenden"              │              │  │  │
│  │  │  │      [Teal Button 8px radius, volle Breite] │         │  │  │
│  │  │  └───────────────────────────────────────┘              │  │  │
│  │  │                                                         │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

### Formular-Felder

| Feld | Typ | Required | Placeholder |
|------|-----|----------|-------------|
| Vorname | text | Ja | "Vorname" |
| Nachname | text | Ja | "Nachname" |
| E-Mail | email | Ja | "deine@email.de" |
| Telefon | tel | Ja | "0123 456789" |
| Nachricht | textarea | Nein | "Erzaehl uns kurz, warum du dich fuer die Stelle interessierst..." |
| Datenschutz | checkbox | Ja | – |

### Input-Styling

```
Border:          2px solid #E0E0E0
Border-Radius:   8px
Padding:         1rem 1rem 0.75rem
Focus:           Border-Color: Teal, box-shadow: 0 0 0 3px rgba(4,108,108,0.15)
Error:           Border-Color: #E53E3E, Fehlermeldung darunter (rot, text-sm)
Floating Label:  Transition von Placeholder-Position nach oben-links beim Focus
```

### Validierung

- Client-side mit Vanilla JS
- Email-Format pruefen
- Pflichtfelder pruefen
- Checkbox muss gecheckt sein
- Error-Messages direkt unter dem Feld
- Submit-Button disabled bis Form valid

### Nach Submit

- Button zeigt Lade-Animation (Spinner)
- PHP: Daten per POST an form-handler.php
- Erfolg: Redirect auf /danke-bewerbung
- Fehler: Inline-Fehlermeldung oberhalb des Formulars

---

## [9] FOOTER

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Background: #1A1A1A (Fast-Schwarz)                              │
│  Padding: 2rem vertikal                                          │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │  Container – Flex, space-between, center                     │  │
│  │                                                               │  │
│  │  [GMKB Logo – weiss, klein]                                  │  │
│  │                                                               │  │
│  │  Links: Impressum · Datenschutz · Cookies verwalten          │  │
│  │  (text-sm, weiss opacity 0.6, hover opacity 1)              │  │
│  │                                                               │  │
│  │  © 2026 GMKB – Gemeinnuetzige Medizinzentren Koeln/Bonn    │  │
│  │  (text-xs, weiss opacity 0.4)                                │  │
│  │                                                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

Minimalistisch. Kein vollstaendiges Menue. Nur rechtlich notwendige Links.

---

## [STICKY] MOBILE CTA

### Verhalten

```
┌──────────────────────────────────────────┐
│  Fixiert am unteren Bildschirmrand       │
│  Nur sichtbar auf Mobile (< 768px)       │
│  Nur sichtbar wenn Formular NICHT        │
│  im Viewport ist                         │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  Background: Weiss                    │ │
│  │  Border-top: 1px solid #E5E5E5       │ │
│  │  Padding: 0.75rem 1rem               │ │
│  │  Box-Shadow: 0 -4px 12px rgba(0,0,0,0.1) │
│  │                                        │ │
│  │  [CTA BUTTON – Teal, volle Breite]    │ │
│  │  "Jetzt bewerben"                     │ │
│  │                                        │ │
│  └──────────────────────────────────────┘ │
│                                            │
└──────────────────────────────────────────┘
```

### Logik (JavaScript)

1. Intersection Observer auf Formular-Section
2. Wenn Formular im Viewport → Sticky CTA ausblenden (slideDown)
3. Wenn Formular ausserhalb Viewport → Sticky CTA einblenden (slideUp)
4. Klick → Smooth Scroll zum Formular

---

## Farbrhythmus der Sections (Scroll-Flow)

```
[1] Hero            → TEAL (#046C6C)         ████████████
[2] Trust-Bar       → WEISS (#FFFFFF)         ░░░░░░░░░░░░
[3] Benefits        → WARM-GRAY (#F6F6F6)    ▒▒▒▒▒▒▒▒▒▒▒▒
[4] CTA-Zwischen    → TEAL (#046C6C)         ████████████
[5] Video           → WEISS (#FFFFFF)         ░░░░░░░░░░░░
[6] Testimonial     → TEAL DARKER (#022D2D)  ████████████
[7] Ablauf          → WEISS (#FFFFFF)         ░░░░░░░░░░░░
[8] Formular        → TEAL LIGHT (#E8F5F5)   ▓▓▓▓▓▓▓▓▓▓▓▓
[9] Footer          → FAST-SCHWARZ (#1A1A1A) ████████████
```

Der Wechsel zwischen hellen und farbigen Sections erzeugt einen natuerlichen Rhythmus – inspiriert von Spotify und Apple. Keine zwei gleichen Hintergruende hintereinander.

---

## SEO-Keywords Platzierung

| Keyword | Platzierung |
|---------|-------------|
| "Fachärzt*in Pädiatrie" | H1 (Hero) |
| "Pädiatrie Köln Bonn" | Hero Eyebrow + Meta Title |
| "Kinderarzt Stelle" | H2 oder Fliesstext Benefits |
| "Facharzt Pädiatrie Job" | Meta Title + Meta Description |
| "Weiterbildung Pädiatrie" | Benefits-Text (Card) |
| "Fortbildung Ergotherapie Pädiatrie" | Benefits-Text (Interdisziplinaer) |
| "Kinderarzt Bonn bewerben" | CTA-Text + Formular H2 |
| "GMKB Medizinzentren" | Eyebrow + Footer |

---

## Technische Umsetzung

### Dateien

```
pages/paediatrie/
├── index.html          ← Komplette Seite (semantic HTML5)
├── styles.css          ← Alle Styles (Mobile-First, CSS Custom Properties)
├── scripts.js          ← Scroll-Animationen, Sticky CTA, Form-Validierung, Tracking
└── form-handler.php    ← POST-Handler, E-Mail-Versand, Redirect
```

### CSS-Architektur

```css
/* 1. Custom Properties (Design Tokens) */
:root { --color-teal: #046C6C; ... }

/* 2. Reset / Base */
*, *::before, *::after { box-sizing: border-box; }

/* 3. Typography */
h1, h2, h3 { font-family: var(--font-heading); }

/* 4. Layout Utilities */
.container { max-width: 1200px; margin-inline: auto; }

/* 5. Components */
.btn-primary { ... }
.benefit-card { ... }

/* 6. Sections (in Scroll-Reihenfolge) */
.hero { ... }
.trust-bar { ... }
.benefits { ... }

/* 7. Media Queries (Mobile-First) */
@media (min-width: 481px) { ... }
@media (min-width: 768px) { ... }
@media (min-width: 1101px) { ... }

/* 8. Animations */
@keyframes slideUp { ... }

/* 9. Reduced Motion */
@media (prefers-reduced-motion: reduce) { ... }
```

### JS-Architektur

```javascript
// 1. Scroll-Reveal (Intersection Observer)
// 2. Sticky Mobile CTA (Intersection Observer auf Formular)
// 3. Formular-Validierung (client-side)
// 4. Floating Labels
// 5. Smooth Scroll (CTA → Formular)
// 6. Tracking Events (dataLayer.push nach Consent)
// 7. Video Play/Pause
```
