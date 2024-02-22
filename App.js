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
import LanguageContext from './locales/LanguageContext'

export default function App() {
  const colorScheme = useColorScheme()
  const [user, setUser] = useState()
  const [language, setLanguage] = useState('hu')
  i18n.locale = language
  //Appearance.setColorScheme('light')
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <NavigationContainer
            theme={colorScheme === 'light' ? AppLightTheme : AppDarkTheme}
          >
            {/* <MyStack/> */}
            {/* <MyDrawer/> */}
            {/* <LoginScreen/> */}
            {/* <MainScreen /> */}
            {user ? <MyDrawer /> : <MyStack />}
          </NavigationContainer>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  )
}
