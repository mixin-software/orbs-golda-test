import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import isDev from '../config/env';
import { LOCAIZE_API_KEY, LOCAIZE_PROJECT_ID } from '../global/variables';
import Backend from 'i18next-locize-backend';

const locizeOptions = {
    projectId: LOCAIZE_PROJECT_ID,
    apiKey: LOCAIZE_API_KEY,
    referenceLng: 'en-US'
};

const options = {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
    cookieOptions: { path: '/', sameSite: 'strict' }
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        detection: options,
        load: 'languageOnly',
        fallbackLng: 'en-US',
        keySeparator: '.',
        backend: locizeOptions,
        defaultNS: 'all',
        react: {
            useSuspense: true
        },
        interpolation: {
            escapeValue: false
        },
        debug: isDev()
    });

export default i18n;
