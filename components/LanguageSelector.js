import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { useTheme } from '@react-navigation/native'

import i18n from '../locales/i18n'

import LanguageContext from '../locales/LanguageContext'
import FlagHU from '../assets/flags/hu.svg'
import FlagEN from '../assets/flags/gb.svg'
import MyText from './MyText'
import members from '../api/members'

function LanguageSelector() {
  const { colors: colorsByTheme } = useTheme()
  const { language, setLanguage } = useContext(LanguageContext)
  const handleOnPress = async () => {
    setLanguage(language == 'en' ? 'hu' : 'en')
    const result = await members.patchPreferences({language: language == 'en' ? 'hu' : 'en'})
    if (!result.ok) {
      console.log(result)
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.medium_blue_dark_blue },
      ]}
    >
      <TouchableWithoutFeedback onPress={handleOnPress}>
        {language == 'en' ? (
          <FlagEN width={30} height={30} />
        ) : (
          <FlagHU width={30} height={30} />
        )}
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
    paddingVertical: 10,
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
})

export default LanguageSelector
