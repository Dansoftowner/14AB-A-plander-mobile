import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, StyleSheet } from 'react-native'
import MainScreen from '../screens/MainScreen'
import SettingsScreen from '../screens/SettingsScreen'
import colors from '../config/colors'
import useAuth from '../auth/useAuth'

const Drawer = createDrawerNavigator()

function MyDrawer(props) {
    
    const {user} = useAuth();
    return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: true,
        headerTitle: user ? user.name : 'Plander',
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: colors.dark_blue },
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MyDrawer
