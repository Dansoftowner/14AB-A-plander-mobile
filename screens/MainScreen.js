import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { useTheme } from '@react-navigation/native';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';
import LogOut from '../components/LogOut';

function MainScreen(props) {
    const {user} = useAuth();

  return (
    <Screen>
      <View style={[styles.container]}>
      <LogOut />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})

export default MainScreen
