import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'

import routes from './routes'

import AssociationsScreen from '../screens/AssociationsScreen'
import { FormProvider } from '../components/FormContext'
import LoginScreen from '../screens/LoginScreen'

const Stack = createStackNavigator()

function MyStack() {
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
        />
      </Stack.Navigator>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyStack
