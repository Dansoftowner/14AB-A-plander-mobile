import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import AssingmentsScreen from '../screens/AssingmentsScreen'
import EditAssignment from '../screens/EditAssignment'
import RefactoredCalendar from '../components/new calendars/RefactoredCalendar'
import MembersScreen from '../screens/MembersScreen'
import colors from '../config/colors'
// import { FormProvider } from '../components/FormContext'

const Stack = createStackNavigator()
function AssingmentStack(props) {
  const { colors: colorsByTheme } = useTheme()
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='Assingments'>
          <Stack.Screen
            name="EditAssignment"
            component={EditAssignment}
            options={{
              headerShown: true,
              headerTitle: '',
              // headerTintColor: colorsByTheme.white_dark_blue,
              // headerStyle: { backgroundColor: colorsByTheme.Login_background },
            }}
            // screenOptions={{headerShown: true}}
          />
        <Stack.Screen name="Assingments" component={
            RefactoredCalendar
        } />
                <Stack.Screen name="Members" component={
            MembersScreen
        }             options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: colorsByTheme.white_dark_blue,
          headerStyle: { backgroundColor: colors.medium_blue, shadowColor: colors.medium_blue },
        }}/>
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default AssingmentStack
