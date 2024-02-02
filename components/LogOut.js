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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOnPress}>
      <MaterialCommunityIcons
        name="power-standby"
        size={30}
        color={colorsByTheme.Login_buttonColor}
      />
      </TouchableWithoutFeedback>
      <MyText style={[styles.text, { color: colorsByTheme.Login_buttonColor }]}>
        {i18n.t('logout')}
      </MyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.dark_blue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
})

export default LogOut
