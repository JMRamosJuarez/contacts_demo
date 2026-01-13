import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';

import en from './locales/en';
import es from './locales/es';

const RESOURCES = {
  en,
  es,
};

const DEFAULT_LNG = 'en';

const AVAILABLE_LANGUAGES = Object.keys(RESOURCES);

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async () => {
    try {
      return (
        findBestLanguageTag(AVAILABLE_LANGUAGES)?.languageTag || DEFAULT_LNG
      );
    } catch (_) {
      return DEFAULT_LNG;
    }
  },
};

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: DEFAULT_LNG,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'main',
    resources: RESOURCES,
  });
