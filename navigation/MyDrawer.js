import React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import useAuth from '../auth/useAuth'
import i18n from '../locales/i18n'
import routes from './routes'

import AssingmentStack from './AssignmentStack'
import { FormProvider } from '../components/FormContext'
import MainScreen from '../screens/MainScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ReportStack from './ReportStack'
import SettingsScreen from '../screens/SettingsScreen'

const Drawer = createDrawerNavigator()

function MyDrawer() {
  const { colors: colorsByTheme } = useTheme()
  const { user } = useAuth()

  return (
    <FormProvider>
      <Drawer.Navigator
        initialRouteName={routes.ASSIGNMENTS}
        screenOptions={{
          headerShown: true,
          headerTitle: user ? user.name : 'Plander',
          headerTintColor: colorsByTheme.white_white,
          headerStyle: {
            backgroundColor: colorsByTheme.medium_blue_dark_blue,
            shadowColor: colorsByTheme.medium_blue_dark_blue,
          },
          headerTitleStyle: { fontWeight: 'bold' },
          drawerActiveTintColor: colorsByTheme.white_white,
          drawerActiveBackgroundColor: colorsByTheme.medium_blue_dark_blue,
        }}
      >
        <Drawer.Screen
          name={routes.MAIN}
          component={MainScreen}
          options={{ title: i18n.t('navMain'), headerTitle: 'Plander' }}
        />
        <Drawer.Screen
          name={routes.ASSIGNMENT_STACK}
          component={AssingmentStack}
          options={{
            title: i18n.t('assignments'),
            headerTitle: i18n.t('assignments'),
          }}
        />
        <Drawer.Screen
          name={routes.REPORTS_STACK}
          component={ReportStack}
          options={{
            title: i18n.t('reports'),
            headerTitle: i18n.t('reports'),
          }}
        />
        <Drawer.Screen
          name={routes.PROFILE}
          component={ProfileScreen}
          options={{
            title: i18n.t('navProfile'),
            headerTitle: i18n.t('editProfile'),
          }}
        />
        <Drawer.Screen
          name={routes.SETTINGS}
          component={SettingsScreen}
          options={{
            title: i18n.t('navSettings'),
            headerTitle: i18n.t('navSettings'),
          }}
        />
      </Drawer.Navigator>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyDrawer
