import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa los JSON de traducciones
import en from "./locales/en/translations.json";
import es from "./locales/es/translations.json";

i18n
  .use(LanguageDetector) // Detecta idioma del navegador
  .use(initReactI18next) // Hook para React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en", // Idioma por defecto si no encuentra otro
    interpolation: {
      escapeValue: false, // React ya lo maneja
    },
  });

export default i18n;
