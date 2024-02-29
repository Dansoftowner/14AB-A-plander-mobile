import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Platform } from 'react-native'

import Constants from 'expo-constants'

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight + 30 : 0,
    flex: 1,
  },
  view: {
    flex: 1,
  },
})

export default Screen
