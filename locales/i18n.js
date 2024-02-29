import {I18n} from 'i18n-js'

import loginTransEN from './en/login.json'
import loginTransHU from './hu/login.json'

import registerTransEN from './en/register.json'
import registerTransHU from './hu/register.json'

import memberTransHU from './hu/member.json'
import memberTransEN from './en/member.json'

import translationTransHU from './hu/translation.json'
import translationTransEN from './en/translation.json'

import navigationHU from './hu/navigation.json'
import navigationEN from './en/navigation.json'

import assignmentHU from './hu/assignments.json'
import assignmentEN from './en/assignments.json'

const translations = {
    en: {
        ...loginTransEN, 
        ...registerTransEN,
        ...memberTransEN,
        ...translationTransEN,
        ...navigationEN,
        ...assignmentEN
    },
    hu: {
        ...loginTransHU, 
        ...registerTransHU,
        ...memberTransHU,
        ...translationTransHU,
        ...navigationHU,
        ...assignmentHU
    }
}

export default new I18n(translations);