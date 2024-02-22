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
// import { FormProvider } from '../components/FormContext'

const Stack = createStackNavigator()
function AssingmentStack(props) {
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
      <Stack.Screen name={routes.ASSIGNMENTS} component={AssignmentScreen} />
      <Stack.Screen
        name= {routes.MEMBERS}
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
