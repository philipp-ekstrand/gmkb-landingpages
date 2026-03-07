# Design-Konzept & Benchmarking – GMKB Recruiting-Landingpage

---

## 1. Benchmark-Analyse: Best-in-Class Karriere-Landingpages

### 1.1 Spotify – Life at Spotify (lifeatspotify.com)

**Das Mutigste aller analysierten Designs.**

- **Hero:** Voller Bildschirm, kraeftiger blauer Hintergrund. H1 "Join the band" – riesig, bold, weiss. Animiertes Job-Karussell laeuft automatisch durch.
- **Signature-Element:** Horizontale Marquee-Scrolls fuer Standorte mit riesiger Typografie + Stadtfotos – extrem auffaellig und einpraegsam.
- **Sektionswechsel:** Wechsel zwischen hellen (Blau/Weiss) und dunklen (Schwarz) Farbschema schafft dramatischen Kontrast.
- **Werte-Kommunikation:** Keine Benefits-Liste, sondern drei Tabs ("Who we are" / "Where we belong" / "How we act") mit grossen Fotos und Texten.
- **CTA:** "Apply now" bei Featured Jobs, "All Jobs" permanent im Header, "Quick clicks" als Pill-Buttons am Ende.
- **Typografie:** Extrem grosse Headlines (100px+), bold. Starke Groessenkontraste.

**Takeaway fuer GMKB:** Mutige Typografie, Farbwechsel zwischen Sections, starke visuelle Identitaet. Die Section-Wechsel zwischen hell und dunkel sind mit purem CSS umsetzbar.

---

### 1.2 Apple – Careers (apple.com/careers)

**Hoechste Produktionswerte, maximaler Minimalismus.**

- **Hero:** Animiertes Apple-Logo (bunte Varianten) auf Schwarz. H1 "Join us. Be you." – vier Worte reichen.
- **Storytelling:** "Watch the film" als CTA – Apple setzt komplett auf emotionales Video-Storytelling statt Features.
- **Kontrast:** Dramatischer Wechsel zwischen schwarzen und weissen Sektionen. Jede Section hat ein eigenes visuelles Konzept.
- **Mitarbeiter-Zitate:** Grosse Blockquotes mit Video-Option ("Watch the film of Ehsan"). Mensch im Mittelpunkt.
- **CTA:** Extrem subtil – blaue Text-Links mit Pfeil. Kein klassischer Button. Weniger ist mehr.
- **Accessibility:** Pause-Button fuer Animationen prominent platziert.

**Takeaway fuer GMKB:** Mut zum Weissraum, dramatische Sektionswechsel hell/dunkel, Mitarbeiter-Zitate als grosses Blockquote mit Bild – nicht als kleine Karte. Accessibility-First (prefers-reduced-motion).

---

### 1.3 Stripe – Jobs (stripe.com/jobs)

**Editorial-Ansatz, magazinartiges Layout.**

- **Hero:** Weisser Hintergrund, grosse Headline links, abstrakter animierter Gradient-Blob rechts. Clean.
- **Mitarbeiter-Testimonials:** Grosse Fotos mit farbigen Hintergruenden (Pink, Blau) – jedes Testimonial hat seine eigene Farbwelt.
- **Layout:** Abwechslung zwischen Text-Sections und grossen Bildkarten. Editorial, zeitschriftenartig.
- **Farbakzente:** Weiss als Basis, einzelne Sections mit farbigen Hintergruenden (Rosa, Hellblau, Gelb, Tuerkis) lockern das minimalistische Layout auf.
- **CTA:** "Offene Stellen" als Pfeil-Link. Dunkelblau/Indigo auf Weiss. Nicht aufdringlich.

**Takeaway fuer GMKB:** Farbige Akzent-Sections fuer einzelne Bereiche (Benefits, Testimonials). Abwechslung zwischen Weissraum-Sections und Farb-Sections. Gradient-Effekte als dezentes Design-Element.

---

### 1.4 Airbnb – Careers (careers.airbnb.com)

**Warme Bildsprache, klare Struktur, authentisch.**

- **Hero:** H1 "Discover your place at Airbnb" – gross, schwarz auf weiss. Darunter Bild-Karussell mit Teamfotos in warmen Settings.
- **Benefits:** Drei Karten-Spalten mit Illustration + Kurztext + Link. Mix aus Fotos und isometrischen Illustrationen.
- **Dashboard-Section:** "Open the door to your next role" mit prominenter Zahl (257 Open Positions), Departments als klickbare Liste.
- **CTA:** Schwarze Pill-Buttons, konsistent ueberall gleich. Klar, nicht aufdringlich.
- **Fotos:** Warm, authentisch, nicht stockfoto-artig. Zeigen echte Teamszenen.

**Takeaway fuer GMKB:** Warme, authentische Bildsprache (haben wir bereits durch die Fotos!). Pill-shaped CTAs. Klare 3-Spalten-Layouts fuer Benefits. Authentizitaet schlaegt perfekte Inszenierung.

---

### 1.5 Google – Careers (careers.google.com)

**Funktional, klar, informationsorientiert.**

- **Hero:** Grosses Teamfoto mit Overlay-Panel. Job-Suche direkt im Hero integriert.
- **Rollen-Karussell:** Horizontaler Scroll mit grossen Foto-Karten pro Bereich (Engineering, AI/ML, Sales etc.)
- **Layout:** Sidebar-Navigation. Grosse Foto-Karten als Einstieg in Bereiche.
- **CTA:** Blauer "Search"-Button im Hero. Ansonsten dezente "Learn more"-Links.

**Takeaway fuer GMKB:** Job-Suche im Hero ist hier nicht relevant (Kampagnen-LP). Aber: grosse Bildkarten als visuelle Anker und horizontale Karussells sind gute Patterns.

---

## 2. CI-Extraktion: GMKB Corporate Identity

### 2.0 Extrahierte Werte von medizinundtherapie.de

Die folgenden Werte wurden direkt aus der Hauptwebseite und der bestehenden
Recruiting-Seite extrahiert (Stand Maerz 2026):

```
FARBEN (extrahiert):
  Primaer-Teal (CTA-Buttons, Recruiting):  rgb(4, 108, 108)   = #046C6C
  Text-Teal (Headline-Akzent):             rgb(0, 105, 113)   = #006971
  Haupt-Grau-Teal (Seitenhintergrund):     rgb(93, 107, 113)  = #5D6B71
  Sekundaer-Grau (Karriere-Button):         rgb(131, 151, 158) = #83979E
  Dunkelrot (Akzent, Hauptseite Hero):      rgb(188, 29, 29)   = #BC1D1D
  Hintergrund Grau (Sections):              rgb(246, 246, 246) = #F6F6F6
  Hintergrund Dunkelgrau:                   rgb(93, 107, 113)  = #5D6B71

TYPOGRAFIE:
  Hauptseite: Helvetica (System-Font, keine Custom Font)
  Recruiting-Seite: Inter / System UI Stack
  Headlines: font-weight 600 (semibold), font-weight 300 (light fuer H3)
  Body: 19px, font-weight 400, line-height 1.3

FORMEN:
  Border-Radius Hauptseite: 3px (fast eckig)
  Border-Radius Recruiting-CTA: 8px (leicht gerundet)
  Cards: 0px border-radius (komplett eckig)
  Buttons: Uppercase, 12px, font-weight 700, 3px radius

SONSTIGES:
  Kein Coral/Orange in der CI
  Heading-Akzentlinie: kurzer Teal-Strich unter H2
  Footer: Dunkelgrau mit weissem Text
  Bilder: Keine Rundungen, kein Overlay
```

---

## 3. Synthese: Design-Richtung fuer GMKB

### 3.1 Design-Philosophie

> **"Moderner Medizin-Traeger mit Herz – nicht Corporate-Klinik."**

Die GMKB ist gemeinnuetzig, arbeitet interdisziplinaer, hat echte Fotos von echten Mitarbeitern. Das Design muss diese Authentizitaet betonen, gleichzeitig aber deutlich professioneller und moderner wirken als die aktuelle Seite.

**Kernprinzip:** Die CI respektieren und weiterentwickeln – nicht brechen. Die Landingpage soll wie eine **premium Version** der Hauptseite wirken, nicht wie eine andere Marke.

**Inspiration-Mix:**
- **Airbnb** fuer die warme, authentische Grundstimmung
- **Spotify** fuer die mutige Typografie und die Sektionswechsel
- **Apple** fuer den Mut zum Weissraum und die Klarheit
- **Stripe** fuer die farbigen Akzent-Sections

### 3.2 Farbpalette

Die CI-Farben werden beibehalten und durch helle/dunkle Varianten ergaenzt:

```
GMKB-Teal (Primaer):     #046C6C    ← Exakt aus CI (CTA-Buttons, Recruiting)
GMKB-Teal Dark:          #034E4E    ← Abgeleitet fuer dunkle Sections, Hover
GMKB-Teal Darker:        #022D2D    ← Fuer Testimonial-Section (fast schwarz)
GMKB-Teal Light:         #E8F5F5    ← Helle Teal-Tonung fuer Formular-Section
GMKB-Teal Text:          #006971    ← Exakt aus CI (Text-Akzentfarbe)

CTA-Primaer:             #046C6C    ← Teal als primaere CTA-Farbe (CI-konform!)
CTA-Primaer Hover:       #034E4E    ← Dunkler fuer Hover-State
CTA-Weiss:               #FFFFFF    ← Weisser CTA auf dunklen Sections

Neutral White:            #FFFFFF
Neutral Off-White:        #F9FAFB    ← Heller Section-Hintergrund (aus Recruiting)
Neutral Light-Gray:       #F6F6F6    ← Exakt aus CI (Section-Hintergrund)
Neutral Mid-Gray:         #5D6B71    ← Exakt aus CI (Grau-Teal)
Text Dark:                #141412    ← Exakt aus CI (Headline-Farbe)
Text Body:                #374151    ← Exakt aus CI (Fliesstext, rgb(55,65,81))
Text Muted:               #83979E    ← Exakt aus CI (Sekundaer-Grau)
```

**Kontrast-Strategie (ueberarbeitet):**
- Hero: Teal-Hintergrund (#046C6C) mit weissem Text – mutig, CI-konform, sofort als GMKB erkennbar
- Benefits: Light-Gray (#F6F6F6) Hintergrund – neutral, scanbar
- Video: Weiss
- Testimonial: Teal Darker (#022D2D) – dramatischer Kontrast, Premium-Feeling
- Formular: Teal Light (#E8F5F5) – einladend, hebt sich ab
- Footer: Teal Dark (#034E4E)
- **Kein Coral/Orange** – nicht in der CI. CTAs bleiben Teal (CI-konform) mit weissem Text auf dunklen Sections

### 3.3 Typografie

Die Hauptseite nutzt Helvetica (generisch). Die Recruiting-Seite nutzt Inter.
Wir bleiben bei **Inter** als Upgrade – moderner als Helvetica, aber aehnliche
Grundform (humanistisch, neutral, vertrauenswuerdig). Kein Bruch mit der CI.

```
Font:              "Inter" (self-hosted, DSGVO-konform)
                   → Auf Recruiting-Seite bereits in Verwendung
                   → Modernes Upgrade gegenueber Helvetica
                   → Exzellente Lesbarkeit, viele Weights

Weights:
  400 Regular      → Body-Text
  500 Medium       → Subheadlines, Labels
  600 SemiBold     → H2, H3 (wie in CI: font-weight 600)
  700 Bold         → H1, CTAs
  800 ExtraBold    → Hero-H1 (Best-in-Class Upgrade)

Groessen (Fluid, clamp):
  H1 Hero:         clamp(2.5rem, 5vw + 1rem, 4.5rem)    → 40px bis 72px
  H2 Section:      clamp(1.75rem, 3vw + 0.5rem, 2.75rem) → 28px bis 44px
  H3 Card/Benefit: clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem) → 18px bis 24px
  Body:            clamp(1rem, 0.5vw + 0.875rem, 1.125rem) → 16px bis 18px
  Small/Meta:      0.875rem → 14px
  CTA Button:      1rem, font-weight 600
```

**Typografie-Prinzipien:**
- Headlines deutlich groesser als auf der aktuellen Seite (Best-in-Class Upgrade)
- Viel Negativraum um Headlines (wie Apple)
- Keine Emojis in Headlines (im Gegensatz zur aktuellen Seite)
- Line-Height: Headlines 1.1-1.2, Body 1.6-1.7
- Section-Labels in Uppercase, klein, Teal (wie CI-Akzentlinie als Text-Element)

### 3.4 Spacing-System

```
--space-xs:     0.5rem     (8px)
--space-sm:     1rem       (16px)
--space-md:     1.5rem     (24px)
--space-lg:     2rem       (32px)
--space-xl:     3rem       (48px)
--space-2xl:    4rem       (64px)
--space-3xl:    6rem       (96px)

Section Padding:  clamp(4rem, 8vw, 8rem) vertikal
Container:        max-width: 1200px, padding-inline: clamp(1.5rem, 4vw, 3rem)
```

### 3.5 Buttons & CTAs

Die CI nutzt eckige Buttons (3px radius) mit Uppercase-Text. Wir modernisieren
dezent: leicht groesserer Radius (8px, wie auf der Recruiting-Seite bereits),
aber **kein Pill-Shape** – das waere ein CI-Bruch. Teal als CTA-Farbe.

```
Primaer CTA:     Background: GMKB-Teal (#046C6C)
                 Text: Weiss
                 Border-Radius: 8px (aus Recruiting-Seite, CI-konform)
                 Padding: 1rem 2.5rem
                 Font-Size: 1rem, Font-Weight: 600
                 Hover: Teal Dark (#034E4E) + subtle Scale (1.02)
                 Transition: 0.3s ease
                 Text-Transform: none (nicht Uppercase – moderner als CI)

Primaer CTA (auf dunklem BG):
                 Background: Weiss (#FFFFFF)
                 Text: GMKB-Teal (#046C6C)
                 Hover: Off-White (#F0F0F0)

Sekundaer CTA:   Background: Transparent
                 Border: 2px solid GMKB-Teal
                 Text: GMKB-Teal
                 Border-Radius: 8px
                 Hover: Teal-Background, weisser Text

Ghost CTA:       Text-Link mit Pfeil-Icon →
                 Color: GMKB-Teal Text (#006971)
                 Font-Weight: 500
                 Hover: Underline + Pfeil bewegt sich nach rechts
```

### 3.6 Animationen & Effekte

**Prinzip:** Dezent, purposeful, respektiert prefers-reduced-motion.

```
1. Scroll-Reveal (Intersection Observer):
   - Sections faden von unten ein (translateY(30px) → 0, opacity 0 → 1)
   - Stagger-Effekt bei Benefit-Cards (je 100ms versetzt)
   - Duration: 0.6s, Easing: cubic-bezier(0.16, 1, 0.3, 1)

2. Hero-Entrance:
   - Headline: Slide-up + Fade (0.8s delay 0.2s)
   - Subline: Slide-up + Fade (0.8s delay 0.4s)
   - CTA: Slide-up + Fade (0.8s delay 0.6s)
   - Hero-Image: Scale von 1.05 auf 1.0 (subtle zoom-out, 1.2s)

3. Benefit-Cards:
   - Hover: Subtle lift (translateY(-4px) + box-shadow)
   - Stagger-Reveal beim Scrollen

4. Counter-Animation (optional):
   - "20+ Jahre" / "30 Tage Urlaub" – Zahlen zaehlen hoch beim Scrollen
   - Nur mit Intersection Observer (kein permanent laufendes Script)

5. Sticky CTA (Mobile):
   - Slide-up Animation beim Erscheinen
   - Verschwindet wenn Formular im Viewport

6. Parallax (sehr dezent):
   - Hero-Bild: Leichter Parallax (transform: translateY mit scroll-Position)
   - Nur auf Desktop, nur wenige Pixel Versatz

7. Formular-Interaktionen:
   - Focus-State: Border-Color Teal + subtle glow
   - Success: Checkmark-Animation nach Submit
   - Labels float nach oben beim Focus (Floating Labels)
```

**prefers-reduced-motion:**
Alle Animationen deaktiviert. Kein Parallax. Kein Stagger. Instant-Transitions.

### 3.7 Bildsprache

Die vorhandenen Fotos sind hochwertig und authentisch – das ist Gold wert:

- **2CM07479-ret.jpg** – Arzt (Teal Scrubs) mit Kind auf Liege → **Hero-Bild** (emotional, direkt, zeigt den Job)
- **2CM07554.jpg** – Arzt lachend am Empfang → **Testimonial-Section**
- **2CM07520-ret.jpg** – Arzt laechelt Richtung Kamera → **Alternatives Hero-Bild** oder Benefits-Section
- **2CM07091-ret.jpg** – Therapeutin mit Kind bei Uebung → **Therapeuten-Seite Hero**
- **2CM07044-ret.jpg** – Weitere Szene → **Benefits oder Zwischenbild**

**Bild-Behandlung:**
- Bilder in voller Breite oder als grosse Karten (nicht als kleine Thumbnails)
- Leichter Warm-Filter fuer Konsistenz (via CSS: brightness + saturate)
- WebP + JPG-Fallback, mehrere Groessen (400w, 800w, 1200w)
- Hero-Bild: object-fit: cover, leichter Overlay-Gradient fuer Textlesbarkeit

---

## 4. Vergleich: Aktuell vs. Neu

| Aspekt | Aktuelle Seite | Neue Landingpage |
|--------|---------------|------------------|
| **Hero** | Emoji-Text, kleines Bild-Karussell, generisch | Grosses Vollbild, mutige H1, Teal-Hintergrund, emotional |
| **Typografie** | Helvetica, kleine Headlines, Emojis | Inter, grosse Headlines, fluid clamp(), self-hosted |
| **Farben** | Teal + Grau, wenig Kontrast | CI-Teal konsequent, Hell/Dunkel-Sektionswechsel |
| **Formen** | Eckig (3px) auf Hauptseite, 8px auf Recruiting | Konsequent 8px (CI-Evolution, kein Bruch) |
| **Benefits** | Lange Liste mit Emojis, schwer scanbar | Icon-Cards in 3er-Grid, stagger-animiert, scanbar |
| **CTA** | Teal-Button (8px radius) | CI-konformer Teal-Button, mehrfach, Sticky auf Mobile |
| **Video** | Embed mit Custom Player | Moderner Embed, sauberer Player, Consent-Overlay |
| **Testimonial** | Zitat + kleines Bild, am Ende der Seite | Grosse Section, dunkler Teal-Hintergrund, grosses Foto + Zitat |
| **Formular** | Kein Formular auf der Seite, nur CTA-Link | Direkt auf der Seite, minimale Felder, floating Labels |
| **Animationen** | Keine | Scroll-Reveal, Hero-Entrance, Hover-Lifts, Counter |
| **Mobile** | Funktional | Sticky CTA, optimierte Touch-Targets, vollstaendig responsive |
| **Performance** | Perspective-Funnel (extern) | < 2.5s, statisches HTML, keine Frameworks, optimierte Bilder |

---

## 5. CI-Konformitaets-Check

| CI-Element | Hauptseite | Recruiting-Seite | Neue Landingpage | Konform? |
|------------|-----------|------------------|------------------|----------|
| Primaerfarbe Teal | #046C6C / #006971 | #046C6C | #046C6C | Ja |
| Font | Helvetica | Inter | Inter (self-hosted) | Ja (Evolution) |
| CTA-Farbe | Teal/Grau | Teal (#046C6C) | Teal (#046C6C) | Ja |
| CTA-Radius | 3px | 8px | 8px | Ja |
| Cards-Radius | 0px | - | 8px | Leichte Modernisierung |
| Heading-Akzent | Teal-Linie unter H2 | - | Section-Labels in Teal | Ja (weiterentwickelt) |
| Bildbehandlung | Eckig, kein Overlay | Eckig | 8px Radius auf Karten | Leichte Modernisierung |
| Footer | Dunkelgrau + Weiss | Hellgrau | Teal Dark + Weiss | Ja (on-brand) |

**Fazit:** Die Landingpage respektiert die CI vollstaendig. Modernisierungen beschraenken sich auf:
- Groessere Typografie (Best-in-Class Standard)
- Konsistenter 8px Border-Radius (bereits auf Recruiting-Seite)
- Hell/Dunkel-Sektionswechsel (CI-Farben, nur kontrastreicher eingesetzt)
- Scroll-Animationen (Branchenstandard, kein CI-Bruch)

---

## 6. Zusammenfassung

Die neue Landingpage wird:

1. **CI-konform** – GMKB-Teal als einzige Primaerfarbe, Inter als Font, konsistente Formen
2. **Mutig** – Grosse Typografie, voller Teal-Hero, klare visuelle Identitaet
3. **Warm** – Authentische Fotos, menschlich statt corporate
4. **Rhythmisch** – Sektionswechsel Teal/Weiss/Grau/Dunkel erzeugen Spannung
5. **Scanbar** – Benefit-Cards, klare Hierarchie, viel Weissraum
6. **Lebendig** – Dezente Scroll-Animationen, Hover-Effekte, Counter
7. **Conversion-fokussiert** – CTA mehrfach, Sticky Mobile, Formular direkt auf Seite
8. **Performant** – Vanilla Stack, < 2.5s, keine Dependencies
9. **Barrierefrei** – WCAG 2.2 AA, prefers-reduced-motion, Focus-States
