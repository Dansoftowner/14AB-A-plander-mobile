import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {useTheme} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function EditField({onPress, style, type, themeColor}) {
    const { colors: colorsByTheme } = useTheme()  

    const typeProps = {
      delete: {
        color: colorsByTheme.medium_red_light_red,
        icon: 'trash-can',
      },
      edit: {
        color: colorsByTheme.medium_blue_yellow,
        icon: 'pencil',
      },
      add: {
        color: colorsByTheme.medium_green_light_green,
        icon: 'plus'
      }
    }

    return (
    <View style={[styles.container, {backgroundColor: typeProps[type].color}, style]}>
      <TouchableWithoutFeedback onPress={onPress} >
        <MaterialCommunityIcons name={typeProps[type].icon} size={15} color={colorsByTheme.white_dark_blue} />
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