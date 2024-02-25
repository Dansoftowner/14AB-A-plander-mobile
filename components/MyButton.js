import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

function MyButton({ title, onPress, style, textStyle }) {
  const { colors: colorsByTheme } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colorsByTheme.Login_buttonBg },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: colorsByTheme.Login_buttonColor },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default MyButton
