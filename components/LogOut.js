import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyText from './MyText'
import { useTheme } from '@react-navigation/native'

import i18n from '../locales/i18n'
import logout from '../auth/useAuth'
import AuthContext from '../auth/authContext'

function Logout() {
  const { colors: colorsByTheme } = useTheme()
    const handleOnPress = () => {
        logout()
    }
  return (
    <View style={[styles.container, {backgroundColor: colorsByTheme.medium_blue_dark_blue}]}>
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
    paddingVertical: 1
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
})

export default Logout
