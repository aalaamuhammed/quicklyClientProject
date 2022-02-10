import { I18nManager } from 'react-native'
import lang from './localization'

let currentLanguage
if (I18nManager.isRTL) {
  currentLanguage = 'ar'
} else {
  currentLanguage = 'en'
}

export default lang[currentLanguage]
