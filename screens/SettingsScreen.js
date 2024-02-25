import React from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from '../components/MyText'
import Logout from '../components/Logout'
import LanguageSelector from '../components/LanguageSelector'
import ThemeSwitch from '../components/ThemeSwitch'
import { useTheme } from '@react-navigation/native'

function SettingsScreen(props) {
  const { colors: colorsByTheme } = useTheme()
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.medium_blue_dark_blue },
      ]}
    >
      <Logout />
      <LanguageSelector />
      <ThemeSwitch />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SettingsScreen
