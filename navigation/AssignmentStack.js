import React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../config/colors'
import i18n from '../locales/i18n'
import routes from './routes'

import AddAssignment from '../screens/AddAssignment'
import AssignmentScreen from '../screens/AssignmentScreen'
import EditAssignment from '../screens/EditAssignment'
import MembersScreen from '../screens/MembersScreen'
import TempAssScreen from '../screens/TempAssScreen'

const Stack = createStackNavigator()
function AssingmentStack() {
  const { colors: colorsByTheme } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.ASSIGNMENTS}
    >
      <Stack.Screen
        name={routes.EDIT_ASSIGMENT}
        component={EditAssignment}
        options={{
          headerShown: true,
          headerTitle: i18n.t('editAssignment'),
          headerStyle: {
            backgroundColor: colorsByTheme.white_black,
          },
        }}
      />
      <Stack.Screen
        name={routes.ADD_ASSIGMENT}
        component={AddAssignment}
        options={{
          headerShown: true,
          headerTitle: i18n.t('addAssignment'),
          headerStyle: {
            backgroundColor: colorsByTheme.white_black,
          },
        }}
      />
      {/* <Stack.Screen name={routes.ASSIGNMENTS} component={TempAssScreen} /> */}
      <Stack.Screen name={routes.ASSIGNMENTS} component={AssignmentScreen} />
      <Stack.Screen
        name={routes.MEMBERS}
        component={MembersScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: colorsByTheme.white_dark_blue,
          headerStyle: {
            backgroundColor: colors.medium_blue,
            shadowColor: colors.medium_blue,
          },
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default AssingmentStack
