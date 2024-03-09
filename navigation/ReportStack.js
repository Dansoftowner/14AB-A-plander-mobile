import React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import i18n from '../locales/i18n'
import routes from './routes'

import AddReport from '../screens/AddReport'
import EditReport from '../screens/EditReport'
import ViewPdfScreen from '../screens/ViewPdfScreen'
import ReportScreen from '../screens/ReportScreen'

const Stack = createStackNavigator()

function ReportStack() {
  const { colors: colorsByTheme } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.REPORTS}
    >
      <Stack.Screen
        name={routes.EDIT_REPORT}
        component={EditReport}
        options={{
          headerShown: true,
          headerTitle: i18n.t('editReport'),
          headerStyle: {
            backgroundColor: colorsByTheme.white_black,
          },
        }}
      />
      <Stack.Screen
        name={routes.ADD_REPORT}
        component={AddReport}
        options={{
          headerShown: true,
          headerTitle: i18n.t('addReport'),
          headerStyle: {
            backgroundColor: colorsByTheme.white_black,
          },
        }}
      />
      <Stack.Screen name={routes.REPORTS} component={ReportScreen} />
      <Stack.Screen name={routes.VIEW_PDF} component={ViewPdfScreen} options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorsByTheme.white_dark_blue,
            headerStyle: { backgroundColor: colorsByTheme.Login_background },
      }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default ReportStack
