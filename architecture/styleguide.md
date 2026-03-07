# Styleguide – GMKB Recruiting-Landingpages

> Alle Design Tokens und Komponenten-Spezifikationen.
> Implementiert in `/assets/css/base.css`.

---

## 1. Farben

### Brand (aus GMKB Corporate Identity)

| Token | Hex | Verwendung |
|-------|-----|-----------|
| `--color-teal` | `#046C6C` | Primaerfarbe, CTA-Buttons auf hellem BG, Links, Akzente |
| `--color-teal-dark` | `#034E4E` | Button-Hover, CTA-Zwischenrufer (dunklerer Teal) |
| `--color-teal-darker` | `#022D2D` | Testimonial-Section BG |
| `--color-teal-light` | `#E8F5F5` | Formular-Section BG, dezente Akzentflaechen |
| `--color-teal-text` | `#006971` | Text-Akzent (z.B. Links im Fliesstext) |

### Neutral

| Token | Hex | Verwendung |
|-------|-----|-----------|
| `--color-white` | `#FFFFFF` | Standard-Hintergrund, Button-Text auf Teal |
| `--color-gray-light` | `#F6F6F6` | Benefits-Section BG, leichte Abgrenzung |
| `--color-gray-border` | `#E5E5E5` | Subtile Trennlinien (Trust-Bar, Sticky CTA) |
| `--color-gray-input` | `#E0E0E0` | Input-Borders (unfocused) |
| `--color-gray-dark` | `#1A1A1A` | Footer BG |

### Text

| Token | Hex | Verwendung |
|-------|-----|-----------|
| `--color-text-dark` | `#141412` | Headlines, wichtiger Text |
| `--color-text-body` | `#374151` | Fliesstext |
| `--color-text-muted` | `#6B7280` | Labels, Placeholder, sekundaerer Text |

### Feedback

| Token | Hex | Verwendung |
|-------|-----|-----------|
| `--color-error` | `#DC2626` | Formular-Fehler |
| `--color-success` | `#059669` | Erfolgs-Feedback |

---

## 2. Typografie

### Font

**Inter** (Variable Font, 400-800 weight range)
- Self-hosted als woff2 in `/assets/fonts/`
- Latin + Latin-Ext Subsets (fuer deutsche Umlaute)
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Type Scale (Fluid mit clamp)

| Token | Min | Max | Verwendung |
|-------|-----|-----|-----------|
| `--font-size-xs` | 12px | 13px | Labels, Hinweistexte |
| `--font-size-sm` | 13px | 15px | Subtitles, Trust-Bar, Footer |
| `--font-size-base` | 16px | 18px | Fliesstext, Buttons |
| `--font-size-lg` | 18px | 21px | Lead-Text, grosse Buttons |
| `--font-size-h3` | 20px | 24px | Card-Headlines, Testimonial-Zitat |
| `--font-size-h2` | 28px | 40px | Section-Headlines |
| `--font-size-h1` | 40px | 72px | Hero-Headline |

### Font Weights

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--font-weight-regular` | 400 | Fliesstext |
| `--font-weight-medium` | 500 | Trust-Bar, Navigation |
| `--font-weight-semibold` | 600 | Card-Headlines, Section-Labels, Buttons |
| `--font-weight-bold` | 700 | H2 |
| `--font-weight-extrabold` | 800 | H1 |

### Line Heights

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--line-height-tight` | 1.15 | H1 |
| `--line-height-heading` | 1.2 | H2, H3 |
| `--line-height-body` | 1.6 | Fliesstext |

### Letter Spacing

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--letter-spacing-tight` | -0.02em | Headlines |
| `--letter-spacing-normal` | 0 | Fliesstext |
| `--letter-spacing-wide` | 0.05em | Subtitles |
| `--letter-spacing-label` | 0.1em | Section-Labels (UPPERCASE) |

---

## 3. Spacing

8px Basis-Grid:

| Token | Wert | px |
|-------|------|----|
| `--space-1` | 0.25rem | 4 |
| `--space-2` | 0.5rem | 8 |
| `--space-3` | 0.75rem | 12 |
| `--space-4` | 1rem | 16 |
| `--space-5` | 1.25rem | 20 |
| `--space-6` | 1.5rem | 24 |
| `--space-8` | 2rem | 32 |
| `--space-10` | 2.5rem | 40 |
| `--space-12` | 3rem | 48 |
| `--space-16` | 4rem | 64 |
| `--space-20` | 5rem | 80 |
| `--space-24` | 6rem | 96 |

Section-Padding: `clamp(4rem, 8vw, 8rem)` – skaliert fluid zwischen 64px und 128px.

---

## 4. Layout

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--container-max` | 1200px | Standard-Container |
| `--container-narrow` | 640px | Formular-Section |
| `--container-padding` | clamp(1rem, 4vw, 2rem) | Seitenrand |

---

## 5. Border Radius

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--radius-sm` | 4px | Kleine Elemente |
| `--radius-md` | 8px | Buttons, Inputs (CI-konform) |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Hero-Bild, Video-Player, Testimonial-Foto |

---

## 6. Shadows

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)` | Subtile Tiefe |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Card-Hover, Button-Hover |
| `--shadow-lg` | `0 4px 24px rgba(0,0,0,0.08)` | Formular-Card |
| `--shadow-xl` | `0 8px 32px rgba(0,0,0,0.12)` | Hero-Bild |
| `--shadow-sticky` | `0 -4px 12px rgba(0,0,0,0.1)` | Sticky Mobile CTA |

---

## 7. Transitions

| Token | Wert | Verwendung |
|-------|------|-----------|
| `--transition-fast` | 150ms ease | Hover-States, Focus |
| `--transition-base` | 250ms ease | Card-Animationen |
| `--transition-slow` | 400ms ease | Scroll-Reveals |
| `--transition-spring` | 500ms cubic-bezier(0.34,1.56,0.64,1) | Bounce-Effekte |

---

## 8. Komponenten

### Buttons

**Primary (auf hellem BG):**
- BG: `--color-teal`, Text: Weiss
- Hover: `--color-teal-dark`, translateY(-1px), Shadow
- Padding: `1rem 2rem` (Standard), `1.25rem 2.5rem` (Large)
- Border-Radius: `--radius-md` (8px)
- Font-Weight: 600

**Primary Inverted (auf Teal-BG):**
- BG: Weiss, Text: `--color-teal`
- Hover: leichtes Teal-Tint (#F0FAFA)

**Modifier:**
- `.btn--lg` – Groesserer Padding + Font
- `.btn--full` – Volle Breite

### Cards (Benefit-Cards)

- BG: Weiss
- Border: `1px solid rgba(0,0,0,0.06)`
- Border-Radius: `--radius-lg` (12px)
- Padding: `2rem`
- Hover: translateY(-4px), Shadow
- Icon: 40px, Teal-Farbe (Stroke-Stil)

### Form Inputs

- Border: `2px solid --color-gray-input`
- Border-Radius: `--radius-md` (8px)
- Padding: `1rem` (+ extra top fuer Floating Label)
- Focus: Border Teal, `box-shadow: 0 0 0 3px rgba(4,108,108,0.15)`
- Error: Border Red, rote Fehlermeldung darunter
- Floating Label: Transition nach oben-links bei Focus / wenn Inhalt vorhanden

### Section Labels

- Font: `--font-size-xs`, Semibold, Uppercase
- Letter-Spacing: `--letter-spacing-label` (0.1em)
- Farbe: Teal (auf hell) / Teal-Light mit Opacity (auf dunkel)

---

## 9. Breakpoints (Mobile-First)

```
Default (0px+):    Mobile vertikal
481px+:            Mobile horizontal
768px+:            Tablet
901px+:            Tablet horizontal
1101px+:           Laptop
1440px+:           Desktop
```

Alle Media Queries mit `min-width` (Mobile-First).

---

## 10. Section-Farbschema (Scroll-Flow)

```
[1] Hero            #046C6C     Teal
[2] Trust-Bar       #FFFFFF     Weiss
[3] Benefits        #F6F6F6     Light-Gray
[4] CTA-Zwischen    #046C6C     Teal
[5] Video           #FFFFFF     Weiss
[6] Testimonial     #022D2D     Teal Darker
[7] Ablauf          #FFFFFF     Weiss
[8] Formular        #E8F5F5     Teal Light
[9] Footer          #1A1A1A     Fast-Schwarz
```
