/**
 * Cookie-Consent Init für GMKB Karriere
 *
 * Nutzt vanilla-cookieconsent 3.1.0 (Open-Source, MIT, Zero-Dependencies).
 * Integriert mit Google Consent Mode v2: setzt initial alles auf "denied",
 * pusht "consent update" sobald der User zustimmt.
 *
 * Drei Kategorien:
 *  - necessary  (immer aktiv, nur Pflicht-Cookies wie PHPSESSID)
 *  - analytics  (Google Analytics / GA4)
 *  - marketing  (Google Ads Conversion + Maps + Vimeo)
 */
(function () {
  'use strict';

  if (!window.CookieConsent || typeof window.CookieConsent.run !== 'function') {
    console.warn('[gmkb-cc] CookieConsent library not loaded');
    return;
  }

  // Google Consent Mode v2 – Default States (denied) sind bereits in der Page-HTML gesetzt
  // (siehe page-karriere-paediatrie.php / -logopaedie.php / -ergotherapie.php Hero-Head).

  function gtagConsentUpdate(state) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push('consent', 'update', state);
  }

  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom right' },
      preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true }
    },

    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {
        autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] },
        services: {
          ga4: {
            label: 'Google Analytics / GA4',
            onAccept: function () { gtagConsentUpdate({ analytics_storage: 'granted' }); },
            onReject: function () { gtagConsentUpdate({ analytics_storage: 'denied' }); }
          }
        }
      },
      marketing: {
        autoClear: { cookies: [{ name: /^_gcl/ }, { name: 'NID' }, { name: 'IDE' }] },
        services: {
          ads: {
            label: 'Google Ads Conversion Tracking',
            onAccept: function () {
              gtagConsentUpdate({
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted'
              });
            },
            onReject: function () {
              gtagConsentUpdate({
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            }
          }
        }
      }
    },

    language: {
      default: 'de',
      translations: {
        de: {
          consentModal: {
            title: 'Wir respektieren deine Privatsphäre',
            description:
              'Wir verwenden Cookies, um dir das beste Erlebnis auf unseren Karriere-Seiten zu bieten. Notwendige Cookies sind für den Betrieb der Seite erforderlich. Optional kannst du Analyse- und Marketing-Cookies zulassen, damit wir unsere Stellenanzeigen besser ausspielen und auswerten können. Mehr Infos in unserer <a href="https://medizinundtherapie.de/datenschutz/" target="_blank" rel="noopener">Datenschutzerklärung</a>.',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur Notwendige',
            showPreferencesBtn: 'Einstellungen anpassen',
            footer: '<a href="https://medizinundtherapie.de/datenschutz/" target="_blank" rel="noopener">Datenschutz</a> · <a href="https://medizinundtherapie.de/impressum/" target="_blank" rel="noopener">Impressum</a>'
          },
          preferencesModal: {
            title: 'Cookie-Einstellungen',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur Notwendige',
            savePreferencesBtn: 'Einstellungen speichern',
            closeIconLabel: 'Schließen',
            sections: [
              {
                title: 'Cookie-Verwendung',
                description:
                  'Wir nutzen Cookies, um die Funktionalität der Karriere-Seite sicherzustellen, dein Verhalten zu analysieren und unsere Stellenanzeigen zu optimieren. Du kannst deine Auswahl jederzeit anpassen.'
              },
              {
                title: 'Notwendige Cookies <span class="pm__badge">Immer aktiv</span>',
                description:
                  'Diese Cookies sind für die Grundfunktionen der Seite erforderlich, z. B. um deine Eingaben im Bewerbungsformular während der Sitzung zu behalten oder um Schutz vor Missbrauch (CSRF) zu gewährleisten.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analyse-Cookies',
                description:
                  'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Karriere-Seiten nutzen. Alle Daten sind aggregiert und nicht personenbezogen ausgewertet.',
                linkedCategory: 'analytics'
              },
              {
                title: 'Marketing-Cookies',
                description:
                  'Diese Cookies erlauben uns, den Erfolg unserer Stellenanzeigen über Google Ads zu messen und externe Inhalte (z. B. Karten und Videos) bereitzustellen.',
                linkedCategory: 'marketing'
              },
              {
                title: 'Mehr Informationen',
                description:
                  'Bei Fragen zur Cookie-Verwendung kontaktiere uns gerne über das <a href="https://medizinundtherapie.de/kontakt/" target="_blank" rel="noopener">Kontaktformular</a> oder per E-Mail.'
              }
            ]
          }
        }
      }
    }
  });

  // "Cookies verwalten"-Button im Footer mit dem Preferences-Modal verbinden
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.site-footer__cookie-btn, [data-track="cookie-settings"]');
    if (btn) {
      e.preventDefault();
      CookieConsent.showPreferences();
    }
  });
})();
