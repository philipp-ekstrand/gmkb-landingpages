# Feedback-Runde 1 – Action Items

**Datum:** 2026-03-10
**Feedback von:** Willem (Projektmanager), Alaa (Paid Specialist)

---

## Status-Legende
- [x] Erledigt
- [ ] Offen
- [?] Braucht Zulieferung/Klärung

---

## Willem – Facharzt-Seite (Pädiatrie)

| # | Feedback | Status | Umsetzung |
|---|----------|--------|-----------|
| W1 | "Antwort in 48h" vs "72h" vereinheitlichen | [x] | Alle Stellen auf 72h angepasst |
| W2 | CTA-Button nach Benefits einfügen | [x] | "Jetzt bewerben"-Button am Ende der Benefits-Section |
| W3 | "Interdisziplinäre Kinder- und Jugendmedizin" → "Wir sind eine interdisziplinäre Einrichtung" | [x] | Heading angepasst |
| W4 | "Lerne dein Pädiatrie-Team kennen" → "Lerne dein Team kennen" | [x] | Heading angepasst |
| W5 | Video lässt sich nicht abspielen | [?] | Platzhalter bleibt – braucht echte Video-URL (YouTube/Vimeo/Self-hosted) |

## Willem – Therapeuten-Seite

| # | Feedback | Status | Umsetzung |
|---|----------|--------|-----------|
| W6 | Rückmeldezeiten überall auf 72h | [x] | Auf beiden neuen Seiten (Logopädie + Ergotherapie) |
| W7 | CTA-Button nach Benefits | [x] | Auf beiden neuen Seiten |
| W8 | Video nicht abspielbar | [?] | Platzhalter – braucht Video-URL |
| W9 | Testimonial-Bilder: Personen sichtbar | [x] | object-position angepasst; Pina → Logopädie-Seite, Felix → Ergotherapie-Seite |
| W10 | Standortabfrage einbinden | [x] | Dropdown "Bevorzugter Standort" (Köln/Bonn/Beide) im Formular |

## Alaa – Übergreifend (alle Seiten)

| # | Feedback | Status | Umsetzung |
|---|----------|--------|-----------|
| A1 | 2 getrennte LPs für Logopädie + Ergotherapie | [x] | /pages/logopaedie/ und /pages/ergotherapie/ erstellt |
| A2 | Gendersprache entfernen (*in) | [x] | Auf beiden neuen Seiten neutral formuliert |
| A3 | Seitenstruktur umordnen | [x] | Neue Reihenfolge: Hero → Benefits → Aufgaben/Profil → Feature → CTA → Testimonial → Video → Process → Formular → FAQ |
| A4 | Aufgaben & Profil ergänzen | [x] | Neue Section mit je 4 Punkten (Aufgaben + Profil), alle 3 Seiten |
| A5 | Benefit-Cards gleiche Höhe | [x] | CSS: align-items: stretch + height: 100% |
| A6 | "Alternativ per E-Mail bewerben" entfernen | [x] | Auf allen Seiten entfernt |
| A7 | Gedankenstriche reduzieren | [x] | Übermäßige " – " durch Kommas/Punkte ersetzt |
| A8 | Stimmen aus dem Team konkretisieren | [x] | Pina → Logopädie, Felix → Ergotherapie (je eigene Seite, kein Slider nötig) |
| A9 | Standort mit Karte ergänzen | [?] | Braucht: Genaue Adressen + Entscheidung Google Maps Embed vs. statisches Bild |
| A10 | Texte SEO-optimieren | [x] | Keywords aus CSV integriert (Logopädie: sprachtherapeut, sprachtherapie; Ergotherapie: eigene Keywords) |
| A11 | Referenzseite (karriere.tv-turm.de) als Orientierung | [x] | Reihenfolge + Aufgaben/Profil-Pattern übernommen |

---

## Offene Punkte (braucht Zulieferung)

1. **Video-URL:** YouTube/Vimeo-Link oder Self-hosted Video-Datei für Team-Video
2. **Standort-Karte:** Genaue Adressen der Standorte Köln + Bonn für Karteneinbindung
3. **Transparentes PNG Ergotherapeut:** Freigestelltes Bild von Felix für CTA-Banner der Ergotherapie-Seite (Philipp liefert)
4. **Testimonial-Fotos:** Falls bessere/neuere Porträtfotos verfügbar → austauschen

---

## Strukturänderungen

### Vorher (Therapeuten-Seite)
1 kombinierte Seite: `/pages/therapeuten/`

### Nachher
- `/pages/logopaedie/` – Fokus Logopädie, Keywords: logopäde, sprachtherapeut, sprachtherapie
- `/pages/ergotherapie/` – Fokus Ergotherapie, Keywords: ergotherapeut, ergotherapie jobs
- `/pages/therapeuten/` – bleibt als Archiv, wird nicht mehr aktiv genutzt

### Neue Section-Reihenfolge (alle Seiten)
1. Hero
2. Benefits ("Unser Versprechen an Dich") + CTA
3. Aufgaben & Profil (NEU)
4. Feature (Interdisziplinär)
5. CTA-Banner
6. Testimonial (Stimmen aus dem Team)
7. Video (Lerne dein Team kennen)
8. Bewerbungsprozess
9. Formular (mit Standort-Dropdown)
10. FAQ
11. Footer + Sticky CTA
