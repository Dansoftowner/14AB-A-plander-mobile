import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { useTheme } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function SmallButton({ onPress, style, type }) {
  const { colors: colorsByTheme } = useTheme()
  const typeProps = {
    delete: {
      color: colorsByTheme.medium_red_light_red,
      icon: 'trash-can',
      iconColor: 'white',
    },
    edit: {
      color: colorsByTheme.medium_blue_yellow,
      icon: 'pencil',
      iconColor: colorsByTheme.white_dark_blue,
    },
    add: {
      color: colorsByTheme.medium_green_light_green,
      icon: 'plus',
      iconColor: 'white',
    },
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: typeProps[type].color },
        style,
      ]}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <MaterialCommunityIcons
          name={typeProps[type].icon}
          size={15}
          color={typeProps[type].iconColor}
        />
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SmallButton
