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
