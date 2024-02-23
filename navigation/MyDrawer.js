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
// import ExampleForCalendar from '../screens/ExampleForCalendar'
//import ExampleForAgenda from '../screens/ExampleForAgenda'
import ExpandableCalendarScreen from '../components/calendar/AgendaList'
import AssignmentScreen from '../screens/AssignmentScreen'
import AssingmentStack from './AssignmentStack'
import routes from './routes'
import ReportScreen from '../screens/ReportScreen'
import ReportStack from './ReportStack'
const Drawer = createDrawerNavigator()

function MyDrawer(props) {
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
          options={{ title: i18n.t('navMain') }}
        />
        <Drawer.Screen
          name={routes.SETTINGS}
          component={SettingsScreen}
          options={{ title: i18n.t('navSettings') }}
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
          name={routes.PROFILE}
          component={ProfileScreen}
          options={{
            title: i18n.t('navProfile'),
            headerTitle: i18n.t('editProfile'),
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
      </Drawer.Navigator>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyDrawer
