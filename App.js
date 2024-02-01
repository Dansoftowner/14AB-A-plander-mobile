import React, { useState } from 'react';
import { AppRegistry, StyleSheet, } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import AuthContext from './auth/authContext';

import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import {Appearance} from 'react-native';

import AppDarkTheme from './config/themes/appDarkTheme';
import AppLightTheme from './config/themes/appLightTheme';

export default function App() {
  const colorScheme = useColorScheme();
  Appearance.setColorScheme('dark')
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={colorScheme === 'light' ? AppLightTheme : AppDarkTheme}>
        <LoginScreen/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({

});