import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import EditAssignment from '../screens/EditAssignment'
import AssignmentScreen from '../screens/AssignmentScreen'
import MembersScreen from '../screens/MembersScreen'
import colors from '../config/colors'
import AddAssignment from '../screens/AddAssignment'
import i18n from '../locales/i18n'
import routes from './routes'
import ReportScreen from '../screens/ReportScreen'
import EditReport from '../screens/EditReport'
import AddReport from '../screens/AddReport'
// import { FormProvider } from '../components/FormContext'

const Stack = createStackNavigator()
function ReportStack(props) {
  const { colors: colorsByTheme } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.REPORTS}
    >
      {/* <Stack.Screen
        name={routes.ADD_REPORT}
        component={EditAssignment}
        options={{
          headerShown: true,
          headerTitle: i18n.t('editAssignment'),
          headerStyle: {
            backgroundColor: colorsByTheme.white_black,
          },
        }}
      /> */}
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
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default ReportStack
