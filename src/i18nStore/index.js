import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { localForage } from '@utils';
import constants from '@constants';
// translations
import TRANSLATIONS_EN from './locales/en/translation';
import TRANSLATIONS_VN from './locales/vn/translation';

const allowedLanguages = ['en', 'vn'];

const defaultLng = 'en';
let lng = defaultLng;

const storageLanguage = localForage.getItemLocalForage(
  constants.LOCAL_FORAGE_KEYS.LANGUAGE
);
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}

const i18nStore = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng,
    fallbackLng: defaultLng,
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      vn: {
        translation: TRANSLATIONS_VN
      }
    },
    react: {
      useSuspense: true
    },
    load: 'all'
  });

export default i18nStore;
