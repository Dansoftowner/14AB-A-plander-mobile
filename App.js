import 'react-native-gesture-handler'
import React, { useState } from 'react'

import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

import i18n from './locales/i18n'

import AppDarkTheme from './config/themes/appDarkTheme'
import AppLightTheme from './config/themes/appLightTheme'
import AuthContext from './auth/authContext'
import MyDrawer from './navigation/MyDrawer'
import MyStack from './navigation/MyStack'
import LanguageContext from './locales/LanguageContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  const [user, setUser] = useState()
  const colorScheme = useColorScheme('light')
  const [language, setLanguage] = useState('hu')

  const queryClient = new QueryClient()

  i18n.locale = language

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer
              theme={colorScheme === 'light' ? AppLightTheme : AppDarkTheme}
            >
              {user ? <MyDrawer /> : <MyStack />}
            </NavigationContainer>
          </QueryClientProvider>
        </LanguageContext.Provider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  )
}
