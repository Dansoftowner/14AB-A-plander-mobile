import React from 'react'
import {
  Appearance,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import i18n from '../locales/i18n'

import MyText from './MyText'

function ThemeSwitch() {
  const colorMode = Appearance.getColorScheme()
  const { colors: colorsByTheme } = useTheme()
  const handleOnPress = () => {
    if (colorMode === 'light') {
      return Appearance.setColorScheme('dark')
    }
    return Appearance.setColorScheme('light')
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.medium_blue_dark_blue },
      ]}
    >
      <TouchableWithoutFeedback onPress={handleOnPress}>
        <MaterialCommunityIcons
          name={colorMode === 'light' ? 'white-balance-sunny' : 'star-crescent'}
          size={30}
          color={colorsByTheme.white_white}
        />
      </TouchableWithoutFeedback>
      <MyText style={[styles.text, { color: colorsByTheme.white_white }]}>
        {i18n.t('theme')}
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

export default ThemeSwitch
