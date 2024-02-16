import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {useTheme} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditField({onPress, style}) {
    const { colors: colorsByTheme } = useTheme()  
    return (
    <View style={[styles.container, {backgroundColor: colorsByTheme.medium_blue_yellow}, style]}>
      <TouchableWithoutFeedback onPress={onPress} >
        <MaterialCommunityIcons name="pencil" size={15} color={colorsByTheme.white_dark_blue} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default EditField;