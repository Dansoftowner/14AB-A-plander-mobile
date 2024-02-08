import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyText from './MyText'
import { useTheme } from '@react-navigation/native'

import i18n from '../locales/i18n'
import AuthContext from '../auth/authContext'
import FlagHU from '../assets/flags/hu.svg'
import FlagEN from '../assets/flags/gb.svg'
import {getLocales} from 'expo-localization'
import LanguageContext from '../locales/LanguageContext'

function LanguageSelector(props) {
  
  const { colors: colorsByTheme } = useTheme()
  const {language, setLanguage} = useContext(LanguageContext)

  const handleOnPress = () => {
    setLanguage(language == "en" ? "hu" : "en")
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.medium_blue_dark_blue },
      ]}
    >
      <TouchableWithoutFeedback onPress={handleOnPress}>
        {language == "en" ? <FlagEN width={30} height={30} /> : <FlagHU width={30} height={30} />}
      </TouchableWithoutFeedback>
      <MyText style={[styles.text, { color: colorsByTheme.white_white }]}>
        {i18n.t('langSelectorAlt')}
      </MyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
})

export default LanguageSelector
