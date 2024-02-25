import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'
import useAuth from '../auth/useAuth'
import ThemeSwitch from '../components/ThemeSwitch'
import LanguageSelector from '../components/LanguageSelector'
import Logout from '../components/Logout'
import AuthContext from '../auth/authContext'

function MainScreen(props) {
  const {user} = useContext(AuthContext)
  const { colors: colorsByTheme } = useTheme()

  return (
      <View style={[styles.container, 
        { backgroundColor: colorsByTheme.medium_blue_dark_blue },
      ]}>
        <MyText style={[styles.text]}>
          Üdv{'\n'}újra,{'\n'}{user.name.split(' ').map(word => word + '\n')}
        </MyText>
        <MyText>
          {/* {JSON.stringify(user)} */}
        </MyText>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 50,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
})

export default MainScreen
