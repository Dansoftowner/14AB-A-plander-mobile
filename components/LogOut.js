import React from 'react'

import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import i18n from '../locales/i18n'
import useAuth from '../auth/useAuth'

import MyText from './MyText'

function Logout() {
  const { colors: colorsByTheme } = useTheme()
  const { logOut } = useAuth()
  const handleOnPress = () => {
    logOut()
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
          name="power-standby"
          size={30}
          color={colorsByTheme.white_white}
        />
      </TouchableWithoutFeedback>
      <MyText style={[styles.text, { color: colorsByTheme.white_white }]}>
        {i18n.t('logout')}
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

export default Logout
