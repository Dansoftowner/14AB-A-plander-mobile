import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../components/MyText';

function SettingsScreen(props) {
  return (
    <View style={styles.container}>
        <MyText>
            Settings Screen
        </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default SettingsScreen;