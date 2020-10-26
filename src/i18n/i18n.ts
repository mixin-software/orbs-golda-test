import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import isDev from '../config/env';

const en = require('./en');
const fr = require('./fr');

const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    }
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        supportedLngs: ['en', 'fr'],
        fallbackLng: 'en',
        keySeparator: '.',
        interpolation: {
            escapeValue: false
        },
        debug: isDev()
    });

export default i18n;
