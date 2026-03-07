# Tracking-Setup – GMKB Recruiting-Landingpages

## 1. Uebersicht

| Komponente | Status | Details |
|---|---|---|
| GTM Container | Platzhalter | `GTM-XXXXXXX` – muss durch echte ID ersetzt werden |
| Google Consent Mode v2 | Vorbereitet | Default States im HTML, Update durch Borlabs Cookie |
| dataLayer Events | Implementiert | Alle CTAs, Formular, Video |
| Google Ads Conversion | Vorbereitet | Wird ueber GTM konfiguriert |
| GA4 | Vorbereitet | Wird ueber GTM konfiguriert |

## 2. GTM Container einbinden

Der GTM-Snippet ist als HTML-Kommentar vorbereitet in:
- `pages/paediatrie/index.html` (Zeile ~27-31 und ~72)
- `pages/danke/index.html` (Zeile ~16-20 und ~43)

**Aktivierung:**
1. Kommentarzeichen `<!-- -->` entfernen
2. `GTM-XXXXXXX` durch echte Container-ID ersetzen
3. Beide Stellen (head + noscript body) aktualisieren

## 3. Google Consent Mode v2

### Default States (bereits im HTML)
```javascript
window.dataLayer.push('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
```

### Consent Update (durch Borlabs Cookie)
Borlabs Cookie auf der Hauptseite muss so konfiguriert werden, dass es nach Nutzer-Einwilligung folgendes pushed:
```javascript
window.dataLayer.push('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});
```

**Wichtig:** Borlabs Cookie muss auf den Landingpage-URLs aktiv sein (Cookie-Banner anzeigen).

## 4. dataLayer Events

### 4.1 CTA-Klick Events

| Event | Label | Trigger | Element |
|---|---|---|---|
| `cta-click` | `hero-cta` | Klick | Hero "Bewirb Dich jetzt" Button |
| `cta-click` | `banner-cta` | Klick | CTA-Banner "Jetzt bewerben" Button |
| `cta-click` | `sticky-mobile` | Klick | Sticky Mobile CTA |
| `cta-click` | `cookie-settings` | Klick | Footer "Cookies verwalten" |
| `video-play` | `team-video` | Klick | Video Play-Button |

**dataLayer Format:**
```javascript
{
  event: 'cta-click',
  eventLabel: 'hero-cta'
}
```

### 4.2 Formular-Submit

| Event | Label | Trigger |
|---|---|---|
| `form_submit` | `bewerbung-paediatrie` | Formular erfolgreich abgesendet |

### 4.3 Conversion (Danke-Seite)

Auf `/karriere/danke-bewerbung/` wird automatisch gepushed:
```javascript
{
  event: 'conversion_bewerbung',
  conversionType: 'bewerbung_paediatrie'
}
```

**Dies ist die Haupt-Conversion** fuer Google Ads.

## 5. GTM Tags (muessen im GTM erstellt werden)

### Tag 1: Google Tag (GA4 + Google Ads)
- **Typ:** Google Tag
- **Tag ID:** `G-XXXXXXXXXX` (GA4) oder `AW-XXXXXXXXXX` (Google Ads)
- **Trigger:** Consent Initialization – All Pages
- **Consent:** Requires `analytics_storage` = granted

### Tag 2: GA4 Event – CTA Click
- **Typ:** GA4 Event
- **Event Name:** `cta_click`
- **Parameter:** `event_label` = `{{DLV - eventLabel}}`
- **Trigger:** Custom Event `cta-click`
- **Consent:** Requires `analytics_storage` = granted

### Tag 3: GA4 Event – Form Submit
- **Typ:** GA4 Event
- **Event Name:** `generate_lead`
- **Trigger:** Custom Event `form_submit`
- **Consent:** Requires `analytics_storage` = granted

### Tag 4: Google Ads Conversion
- **Typ:** Google Ads Conversion Tracking
- **Conversion ID:** `AW-XXXXXXXXXX` (vom Kunden)
- **Conversion Label:** (vom Kunden)
- **Trigger:** Custom Event `conversion_bewerbung`
- **Consent:** Requires `ad_storage` = granted
- **Conversion Linker:** Muss als separater Tag aktiviert sein

### Tag 5: Conversion Linker
- **Typ:** Conversion Linker
- **Trigger:** All Pages
- **Consent:** Requires `ad_storage` = granted

## 6. GTM Variablen (muessen erstellt werden)

| Variable | Typ | Wert |
|---|---|---|
| `DLV - eventLabel` | Data Layer Variable | `eventLabel` |
| `DLV - conversionType` | Data Layer Variable | `conversionType` |

## 7. GTM Trigger (muessen erstellt werden)

| Trigger | Typ | Event Name |
|---|---|---|
| CE - CTA Click | Custom Event | `cta-click` |
| CE - Form Submit | Custom Event | `form_submit` |
| CE - Conversion Bewerbung | Custom Event | `conversion_bewerbung` |
| CE - Video Play | Custom Event | `video-play` |

## 8. Conversion-Duplikat-Praevention

Die Danke-Seite URL (`/karriere/danke-bewerbung/`) wird nur nach erfolgreichem Formular-Submit erreicht (PHP-Redirect). Durch die einmalige URL ist Duplikat-Praevention gewaehrleistet.

Zusaetzlich im GTM: Google Ads Conversion Tag auf "One conversion per click" konfigurieren.

## 9. Checkliste vor Go-Live

- [ ] GTM Container erstellt und ID in HTML eingesetzt
- [ ] `GTM-XXXXXXX` in beiden HTML-Dateien ersetzt
- [ ] HTML-Kommentare um GTM-Snippets entfernt
- [ ] Google Tag (GA4 Property) im GTM konfiguriert
- [ ] Google Ads Conversion im GTM konfiguriert
- [ ] Conversion Linker Tag aktiviert
- [ ] Alle Custom Triggers erstellt
- [ ] Borlabs Cookie auf Landingpage-URLs aktiv
- [ ] Borlabs Cookie pushed Consent Mode v2 Updates
- [ ] Preview-Mode: Alle Events testen
- [ ] Danke-Seite: `conversion_bewerbung` Event bestaetigt
- [ ] Google Ads: Conversion-Aktion verknuepft
- [ ] GA4: Events in Echtzeit-Bericht pruefen
