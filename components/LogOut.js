import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyText from './MyText'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'

import i18n from '../locales/i18n'
import AuthContext from '../auth/authContext'

function LogOut(props) {
  const { colors: colorsByTheme } = useTheme()
  const {user, setUser} = useContext(AuthContext)
    const handleOnPress = () => {
        setUser(null)
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
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
})

export default LogOut
