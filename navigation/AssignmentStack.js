import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import AssingmentsScreen from '../screens/AssingmentsScreen'
import EditAssignment from '../screens/EditAssignment'
import RefactoredCalendar from '../components/new calendars/RefactoredCalendar'
// import { FormProvider } from '../components/FormContext'

const Stack = createStackNavigator()
function AssingmentStack(props) {
  const { colors: colorsByTheme } = useTheme()
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName='EditAssingment'>
          <Stack.Screen
            name="EditAssingment"
            component={EditAssignment}
            options={{
              headerShown: false,
              headerTitle: '',
              headerTintColor: colorsByTheme.white_dark_blue,
              headerStyle: { backgroundColor: colorsByTheme.Login_background },
            }}
            // screenOptions={{headerShown: true}}
          />
        <Stack.Screen name="Assingments" component={
            RefactoredCalendar
        } />
      </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default AssingmentStack
