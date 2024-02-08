import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from './Screen';
import MyText from '../components/MyText';

function ProfileScreen(props) {
    const {user} = useAuth();
  return (
    <View style={styles.container}>
        <MyText>
            Profiiiiiil
        </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default ProfileScreen;