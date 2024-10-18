import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from './locales';

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: locales.es,
      en: locales.en,
      pt: locales.pt,
    },
    lng: "es",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });