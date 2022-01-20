import { useEffect } from "react";

export default function CookieConsent() {
    useEffect(() => {
      const cc = window.initCookieConsent();

      cc.run({
        autorun: true,
        current_lang: 'en',
        theme_css: 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.css',
        autoclear_cookies: true,
        page_scripts: true,
    
        // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
        // delay: 0,                               // default: 0
        // auto_language: null                     // default: null; could also be 'browser' or 'document'
        // autorun: true,                          // default: true
        // force_consent: false,                   // default: false
        // hide_from_bots: false,                  // default: false
        // remove_cookie_tables: false             // default: false
        // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
        // cookie_expiration: 182,                 // default: 182 (days)
        // cookie_necessary_only_expiration: 182   // default: disabled
        // cookie_domain: location.hostname,       // default: current domain
        // cookie_path: '/',                       // default: root
        // cookie_same_site: 'Lax',                // default: 'Lax'
        // use_rfc_cookie: false,                  // default: false
        // revision: 0,                            // default: 0
    
        onFirstAction: function(user_preferences, cookie){
            // callback triggered only once
        },
    
        onAccept: function (cookie) {
            // ...
        },
    
        onChange: function (cookie, changed_preferences) {
            // ...
        },
    
        languages: {
          'cs': {
              consent_modal: {
                  title: 'Používáme cookies!',
                  description: 'Tato webová stránka používá cookies ke zlepšení prohlížení webu a poskytování dalších funkcí. <button type="button" data-cc="c-settings" class="cc-link">Nastavit preference</button>',
                  primary_btn: {
                      text: 'Povolit vše',
                      role: 'accept_all'              // 'accept_selected' or 'accept_all'
                  },
                  secondary_btn: {
                      text: 'Odmítnout',
                      role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                  }
              },
              settings_modal: {
                  title: 'Nastavení cookies',
                  save_settings_btn: 'Uložit nastavení',
                  accept_all_btn: 'Povolit vše',
                  reject_all_btn: 'Odmítnout',
                  close_btn_label: 'Zavřít',
                  cookie_table_headers: [
                      {col1: 'Název'},
                      {col2: 'Doména'},
                      {col3: 'Expirace'},
                      {col4: 'Popis'}
                  ],
                  blocks: [
                      {
                          title: 'Použití cookies 📢',
                          description: 'Tato webová stránka používá cookies ke zlepšení prohlížení webu a poskytování dalších funkcí. Pro více informací si přečtěte <a href="#" class="cc-link">Zásady ochranny osobních  údajů</a>.'
                      }, {
                          title: 'Technické cookies',
                          description: 'Tyto cookies jsou nezbytné pro správné fungování tohoto webu.',
                          toggle: {
                              value: 'necessary',
                              enabled: true,
                              readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
                          }
                      }, {
                          title: 'Analytické cookies',
                          description: 'Tyto cookies umožňují webové stránce zapamatovat si nastavení a volby, které jste udělali dříve',
                          toggle: {
                              value: 'analytics',     // your cookie category
                              enabled: false,
                              readonly: false
                          },
                          cookie_table: [             // list of all expected cookies
                              {
                                  col1: '^_ga',       // match all cookies starting with "_ga"
                                  col2: 'google.com',
                                  col3: '2 years',
                                  col4: 'description ...',
                                  is_regex: true
                              },
                              {
                                  col1: '_gid',
                                  col2: 'google.com',
                                  col3: '1 day',
                                  col4: 'description ...',
                              }
                          ]
                      }, {
                          title: 'Reklamní cookies',
                          description: 'Tyto soubory cookie shromažďují informace o tom, jak webové stránky používáte, které stránky jste navštívili a na které odkazy jste klikli. Všechny údaje jsou anonymizované a nelze je použít k vaší identifikaci.',
                          toggle: {
                              value: 'targeting',
                              enabled: false,
                              readonly: false
                          }
                      }, {
                          title: 'Další informace',
                          description: `V případě dalších dotazů ohledně podmínek a nastavení, neváhejte a <a class="cc-link" href="mailto:info@pellwood.com">kontaktujte nás</a>.`,
                      }
                  ]
              }
          }
        }
    });

    }, []);

    return null;
}