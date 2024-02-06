import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import EyeToShowPassword from './EyeToShowPassword'
import MyText from './MyText'

//import defaultStyles from "../config/styles";

function MyTextInput({
  title,
  icon,
  onPress,
  onChangeText,
  style,
  value,
  isPasswordField = false,
  passwordVisible = false,
  width = '100%',
  isButton = false,
  ...otherProps
}) {
  const { colors: colorsByTheme } = useTheme()  

  return (
    <View
      style={[
        styles.container,
        { width },
        { borderColor: colorsByTheme.Login_textColor },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colorsByTheme.Login_textColor}
          style={styles.icon}
        />
      )}
      {isButton ? (
        <MyText
          placeholderTextColor={colorsByTheme.Login_placeholders}
          style={[styles.text, { color: title !== 'Association' ? colorsByTheme.Login_textColor :  colorsByTheme.Login_placeholders}]}
          {...otherProps}
        >
          {title ?? 'Association'}
        </MyText>
      ) : (
        <TextInput
          // value={value}
          placeholder={title}
          onChangeText={(text) => onChangeText(text)}
          placeholderTextColor={colorsByTheme.Login_placeholders}
          style={[styles.text, { color: colorsByTheme.Login_textColor }]}
          {...otherProps}
        />
      )}
      {isPasswordField && (
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
    borderWidth: 0.7,
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
    //color: colors.white,
    fontWeight: '700',
    flex: 1,
    fontSize: 14
    //width: "300",
    // backgroundColor: "red"
  },
})

export default MyTextInput
