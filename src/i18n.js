import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from './translations/en/en.json'
import translationAR from './translations/ar/ar.json'

// resources
const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "ar",
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }

    });

export default i18n;