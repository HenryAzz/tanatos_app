import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enTranslations from './en.json'; // English translations
import esTranslations from './es.json'; // Spanish translations

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    lng: 'es', // Default language
    fallbackLng: 'es', // Fallback language
    resources: {
      es: {
        translation: esTranslations, // Spanish translations
      },
      en: {
        translation: enTranslations, // English translations
      },
    },
  });

export default i18n;
