import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import EyeToShowPassword from './EyeToShowPassword'
import MyText from './MyText'

function MyTextInput({
  title,
  icon,
  onPress,
  onChangeText,
  style,
  value,
  showEye,
  isEditable,
  subtitle,
  themeColor = 'white',
  width = '100%',
  maxLength = 50,
  enabled = true,
  isPasswordField = false,
  passwordVisible = false,
  isButton = false,
  ...otherProps
}) {
  const { colors: colorsByTheme } = useTheme()
  const colorCalculated = () => {
    if (isEditable) {
      if (themeColor === 'white') {
        return colorsByTheme.white_black
      }
      return colorsByTheme.black_white
    }
    return colorsByTheme.medium_light
  }
  return (
    <View
      style={[
        styles.container,
        { width },
        {
          borderColor:
            themeColor === 'white'
              ? colorsByTheme.white_black
              : colorsByTheme.black_white,
        },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={
            themeColor === 'white'
              ? colorsByTheme.white_black
              : colorsByTheme.black_white
          }
          style={styles.icon}
        />
      )}
      {isButton ? (
        <MyText
          style={[
            styles.text,
            {
              color:
                title !== subtitle
                  ? themeColor === 'white'
                    ? colorsByTheme.white_black
                    : colorsByTheme.black_white
                  : colorsByTheme.Login_placeholders,
            },
          ]}
          {...otherProps}
        >
          {title ?? subtitle}
        </MyText>
      ) : (
        <TextInput
          value={value}
          maxLength={maxLength}
          placeholder={title}
          onChangeText={(text) => onChangeText(text)}
          style={[styles.text, { color: colorCalculated() }, style]}
          {...otherProps}
        />
      )}
      {isPasswordField && showEye && (
        <EyeToShowPassword
          style={styles.eye}
          onPress={onPress}
          passwordVisible={passwordVisible}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  eye: {
    right: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontWeight: '700',
    flex: 1,
    fontSize: 14,
  },
})

export default MyTextInput
