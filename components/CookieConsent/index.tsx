import { useEffect } from "react";
import { useRouter } from "next/router";
import localize from "@/data/localize";

const contactUs = "info@pellwood.com"

export default function CookieConsent() {
  const router = useRouter();
  const { lang } = localize(router.locale);

  useEffect(() => {
    if(typeof window !== 'undefined' && typeof (window as any).initCookieConsent === 'function') {
      const cc = (window as any).initCookieConsent();

      cc.run({
        autorun: true,
        current_lang: lang,
        theme_css: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.css',
        autoclear_cookies: true,
        page_scripts: true,

        gui_options: {
          consent_modal: {
            layout: 'cloud',
            position: 'bottom center',
            transition: 'slide',
            swap_buttons: false
          }
        },
    
        languages: {
          'cs': {
            consent_modal: {
              title: 'Aby web správně fungoval používáme cookies',
              description: 'Cookies používáme ke zlepšení prohlížení webu a poskytování dalších funkcí. Souhlas udělíte kliknutím na tlačítko "Povolit vše" nebo ho můžete odmítnout <button type="button" data-cc="accept-necessary" class="cc-link">zde</button>.',
              primary_btn: {
                text: 'Povolit vše',
                role: 'accept_all'
              },
              secondary_btn: {
                text: 'Nastavit preference',
                role: 'settings'
              }
            },
            settings_modal: {
              title: 'Nastavení cookies',
              save_settings_btn: 'Souhlasím s vybranými cookies',
              accept_all_btn: 'Souhlasím se všemi cookies',
              reject_all_btn: false,
              close_btn_label: 'Zavřít',
              blocks: [
                { description: 'Upravte si cookies dle vlastních preferencí.' },
                {
                  title: 'Technické cookies',
                  description: 'Tyto cookies jsou nezbytné pro správné a bezpečné fungování webu. Technické cookies nelze vypnout.',
                  toggle: { value: 'necessary', enabled: true, readonly: true }
                },
                {
                  title: 'Analytické cookies',
                  description: 'Analytické cookies umožňují měření výkonu webu. Jejich pomocí určujeme třeba počet a zdroje návštěv. Získaná data jsou samozřejmě anonymní.',
                  toggle: { value: 'analytics', enabled: false, readonly: false }
                },
                {
                  title: 'Reklamní cookies',
                  description: 'Tyto soubory cookies shromažďují informace o tom, jak webové stránky používáte, které stránky jste navštívili a na které odkazy jste klikli. Souhlas s těmito cookies lze kdykoliv odvolat.',
                  toggle: { value: 'targeting', enabled: false, readonly: false }
                },
                {
                  title: 'Další informace',
                  description: `V případě dalších dotazů ohledně podmínek a nastavení, neváhejte a <a class="cc-link" href="mailto:${contactUs}">kontaktujte nás</a>.`,
                }
              ]
            }
          },
          'en': {
            consent_modal: {
              title: 'We use cookies to make our site work',
              description: 'We use cookies to improve your browsing experience and provide additional features. You can grant consent by clicking "Accept All" or you can reject them <button type="button" data-cc="accept-necessary" class="cc-link">here</button>.',
              primary_btn: {
                text: 'Accept All',
                role: 'accept_all'
              },
              secondary_btn: {
                text: 'Manage Preferences',
                role: 'settings'
              }
            },
            settings_modal: {
              title: 'Cookie Preferences',
              save_settings_btn: 'Save Preferences',
              accept_all_btn: 'Accept All Cookies',
              reject_all_btn: false,
              close_btn_label: 'Close',
              blocks: [
                { description: 'Customize your cookie preferences.' },
                {
                  title: 'Strictly Necessary Cookies',
                  description: 'These cookies are essential for the proper functioning of the website. They cannot be disabled.',
                  toggle: { value: 'necessary', enabled: true, readonly: true }
                },
                {
                  title: 'Analytics Cookies',
                  description: 'Analytics cookies allow us to measure the performance of our website. They help us determine the number of visits and sources of traffic. The data collected is anonymous.',
                  toggle: { value: 'analytics', enabled: false, readonly: false }
                },
                {
                  title: 'Advertisement Cookies',
                  description: 'These cookies collect information about how you use our website, which pages you visited, and which links you clicked on. Consent to these cookies can be withdrawn at any time.',
                  toggle: { value: 'targeting', enabled: false, readonly: false }
                },
                {
                  title: 'More Information',
                  description: `For any queries regarding our cookie policy and your choices, please <a class="cc-link" href="mailto:${contactUs}">contact us</a>.`,
                }
              ]
            }
          },
          'de': {
            consent_modal: {
                title: 'Wir verwenden Cookies, damit unsere Website funktioniert',
                description: 'Wir verwenden Cookies, um Ihr Surferlebnis zu verbessern und zusätzliche Funktionen bereitzustellen. Sie können Ihre Zustimmung erteilen, indem Sie auf "Alle akzeptieren" klicken, oder sie <button type="button" data-cc="accept-necessary" class="cc-link">hier</button> ablehnen.',
                primary_btn: {
                    text: 'Alle akzeptieren',
                    role: 'accept_all'
                },
                secondary_btn: {
                    text: 'Einstellungen verwalten',
                    role: 'settings'
                }
            },
            settings_modal: {
              title: 'Cookie-Einstellungen',
              save_settings_btn: 'Einstellungen speichern',
              accept_all_btn: 'Alle Cookies akzeptieren',
              reject_all_btn: false,
              close_btn_label: 'Schließen',
              blocks: [
                { description: 'Passen Sie Ihre Cookie-Einstellungen an.' },
                {
                  title: 'Unbedingt erforderliche Cookies',
                  description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.',
                  toggle: { value: 'necessary', enabled: true, readonly: true }
                },
                {
                  title: 'Analyse-Cookies',
                  description: 'Analyse-Cookies ermöglichen es uns, die Leistung unserer Website zu messen. Sie helfen uns, die Anzahl der Besuche und Verkehrsquellen zu ermitteln. Die gesammelten Daten sind anonym.',
                  toggle: { value: 'analytics', enabled: false, readonly: false }
                },
                {
                  title: 'Werbe-Cookies',
                  description: 'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen, welche Seiten Sie besucht und auf welche Links Sie geklickt haben. Die Zustimmung zu diesen Cookies kann jederzeit widerrufen werden.',
                  toggle: { value: 'targeting', enabled: false, readonly: false }
                },
                {
                  title: 'Weitere Informationen',
                  description: `Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte unter <a class="cc-link" href="mailto:${contactUs}">${contactUs}</a>.`,
                }
              ]
            }
          }
        }
      });
    }
  }, [lang]);

  return null;
}