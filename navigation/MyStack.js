import React from 'react';
import { View, StyleSheet } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
function MyStack(props) {
  return (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
    />
  </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default MyStack;