import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import MainScreen from '../screens/MainScreen'
import SettingsScreen from '../screens/SettingsScreen'
import useAuth from '../auth/useAuth'
import { useTheme } from '@react-navigation/native'
import ProfileScreen from '../screens/ProfileScreen'
import { FormProvider } from '../components/FormContext'
import i18n from '../locales/i18n'

const Drawer = createDrawerNavigator()

function MyDrawer(props) {
  const { colors: colorsByTheme } = useTheme()
  const { user } = useAuth()
  
  return (
    <FormProvider>
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: true,
          headerTitle: user ? user.name : 'Plander',
          headerTintColor: colorsByTheme.white_white,
          headerStyle: { backgroundColor: colorsByTheme.medium_blue_dark_blue },
          headerTitleStyle: { fontWeight: 'bold' },
          drawerActiveTintColor: colorsByTheme.white_white,
          drawerActiveBackgroundColor: colorsByTheme.medium_blue_dark_blue,
        }}
      >
        <Drawer.Screen name={i18n.t("navMain")} component={MainScreen} />
        <Drawer.Screen name={i18n.t("navSettings")} component={SettingsScreen} />
        <Drawer.Screen
          name={i18n.t("navProfile")}
          component={ProfileScreen}
          options={{ headerTitle: i18n.t("editProfile") }}
        />
      </Drawer.Navigator>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyDrawer
