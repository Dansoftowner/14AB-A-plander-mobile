import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
function EyeToShowPassword({onPress, passwordVisible}) {
    return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name={passwordVisible ? "eye" : "eye-off"} size={18} color="black" />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default EyeToShowPassword;