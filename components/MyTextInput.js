import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import EyeToShowPassword from './EyeToShowPassword'
import MyText from './MyText'
import colors from '../config/colors'
import EditField from './EditField'

//import defaultStyles from "../config/styles";

function MyTextInput({
  title,
  icon,
  onPress,
  onChangeText,
  style,
  value,
  showEye,
  enabled = true,
  isEditable,
  themeColor = "white",
  isPasswordField = false,
  passwordVisible = false,
  width = '100%',
  isButton = false,
  ...otherProps
}) {
  const { colors: colorsByTheme } = useTheme()  
  const colorCalculated = () => {
    return colors.light_blue
    // if (!enabled) {
    //   return colorsByTheme.Login_dropDownFont
    // }
    // if (themeColor === "white") {
    //   return colorsByTheme.Login_textColor
    // }
    // else {
    //   return colorsByTheme.black_white
    // }
  }
  return (
    <View
      style={[
        styles.container,
        { width },
        { borderColor: themeColor === "white" ? colorsByTheme.Login_textColor : colorsByTheme.black_white },
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={themeColor === "white" ? colorsByTheme.Login_textColor : colorsByTheme.black_white}
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
          value={value}
          maxLength={50}
          placeholder={title}
          onChangeText={(text) => onChangeText(text)}
          placeholderTextColor={colorsByTheme.Login_placeholders}
          style={[styles.text, { color: isEditable ? colorsByTheme.black_white : colorsByTheme.medium_light }]}
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
