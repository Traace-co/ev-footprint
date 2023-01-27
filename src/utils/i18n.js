import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend";
import PreferredLanguageDetector from "./preferredLanguageOverride";

const languageDetector = new LanguageDetector();
languageDetector.addDetector(PreferredLanguageDetector);

// eslint-disable-next-line no-undef
i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ['preferredLanguageOverride', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain']
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    saveMissing: true
  })

export default i18n;
