import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { useTheme } from '@react-navigation/native';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';
import LogOut from '../components/LogOut';
import DarkMode from '../components/DarkModeSwitch';

function MainScreen(props) {
    const {user} = useAuth();

  return (
      <View style={[styles.container]}>
      <LogOut />
      <DarkMode/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})

export default MainScreen
