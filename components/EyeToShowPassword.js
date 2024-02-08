import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '@react-navigation/native';

function EyeToShowPassword({onPress, passwordVisible = false}) {
  const { colors: colorsByTheme } = useTheme();

    return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name={!passwordVisible ? "eye" : "eye-off"} size={18} color={colorsByTheme.Login_eyeColor} />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default EyeToShowPassword;