import React from 'react';
import { View, StyleSheet } from 'react-native';
import {useTheme} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditField({style}) {
    const { colors: colorsByTheme } = useTheme()  
    return (
    <View style={[styles.container, {backgroundColor: colorsByTheme.medium_blue_yellow}, style]}>
        <MaterialCommunityIcons name="pencil" size={15} color={colorsByTheme.white_dark_blue} />
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