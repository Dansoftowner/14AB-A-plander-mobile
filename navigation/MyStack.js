import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'

import routes from './routes'

import AssociationsScreen from '../screens/AssociationsScreen'
import { FormProvider } from '../components/FormContext'
import LoginScreen from '../screens/LoginScreen'
import i18n from '../locales/i18n'
import colors from '../config/colors'

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
            headerTintColor: colorsByTheme.white_white,
            headerStyle: {
              backgroundColor: colorsByTheme.medium_blue_dark_blue,
              shadowColor: colorsByTheme.medium_blue_dark_blue,
            },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitle: i18n.t('associationSelector'),
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
