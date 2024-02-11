import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'
import useAuth from '../auth/useAuth'
import ThemeSwitch from '../components/ThemeSwitch'
import LanguageSelector from '../components/LanguageSelector'
import Logout from '../components/LogOut'

function MainScreen(props) {
  return (
      <View style={[styles.container]}>
        <Logout />
        <ThemeSwitch />
        <LanguageSelector />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MainScreen
