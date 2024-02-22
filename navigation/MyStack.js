import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import AssociationsScreen from '../screens/AssociationsScreen'
import { useTheme } from '@react-navigation/native'
import { FormProvider } from '../components/FormContext'
import routes from './routes'
const Stack = createStackNavigator()
function MyStack(props) {
  const { colors: colorsByTheme } = useTheme()
  return (
    <FormProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={routes.ASSOCIATIONS}
          component={AssociationsScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: colorsByTheme.white_dark_blue,
            headerStyle: { backgroundColor: colorsByTheme.Login_background },
          }}
          // screenOptions={{headerShown: true}}
        />
      </Stack.Navigator>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyStack
