import {I18n} from 'i18n-js'

import loginTransEN from './en/login.json'
import loginTransHU from './hu/login.json'

import registerTransEN from './en/register.json'
import registerTransHU from './hu/register.json'

import memberTransHU from './hu/member.json'
import memberTransEN from './en/member.json'

import translationTransHU from './hu/translation.json'
import translationTransEN from './en/translation.json'

const translations = {
    en: {
        ...loginTransEN, 
        ...registerTransEN,
        ...memberTransEN,
        ...translationTransEN
    },
    hu: {
        ...loginTransHU, 
        ...registerTransHU,
        ...memberTransHU,
        ...translationTransHU
    }
}

export default new I18n(translations);