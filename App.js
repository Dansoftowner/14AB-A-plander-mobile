import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { Appearance } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import i18n from './locales/i18n'

import AppDarkTheme from './config/themes/appDarkTheme'
import AppLightTheme from './config/themes/appLightTheme'
import AuthContext from './auth/authContext'
import MainScreen from './screens/MainScreen'
import MyDrawer from './navigation/MyDrawer'
import MyStack from './navigation/MyStack'
import LoginScreen from './screens/LoginScreen'
import AssociationsScreen from './screens/AssociationsScreen'

export default function App() {
  const colorScheme = useColorScheme()
  Appearance.setColorScheme('light')
  const [user, setUser] = useState()
  i18n.locale = 'en'
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer
          theme={colorScheme === 'light' ? AppLightTheme : AppDarkTheme}
        >          
          <MyStack/>
          {/* <MyDrawer/> */}
          {/* <LoginScreen/> */}
          {/* <MainScreen /> */}
          {/* { user ? <MyDrawer /> : <MyStack /> } */}
          {/* <AssociationsScreen/> */}
        </NavigationContainer>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  )
}
