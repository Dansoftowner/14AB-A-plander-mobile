import {I18n} from 'i18n-js'
import {getLocales} from 'expo-localization'

import loginTransEN from './en/login.json'
import loginTransHU from './hu/login.json'

const translations = {
    en: {
        ...loginTransEN
    },
    hu: {
        ...loginTransHU
    }
}

export default new I18n(translations);

// i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
//     resources,
//     defaultNS: 'common',
//     fallbackLng: 'hu',
//     debug: true,
//   })