import React, { useState } from 'react'
import { useFormikContext } from 'formik'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'
import styles from '../config/styles'
import SmallButton from './SmallButton'
import { View } from 'react-native'
import MyText from './MyText'
function MyFormField({
  name,
  width,
  onPress,
  onChangeText,
  value,
  title,
  themeColor,
  style,
  enabled,
  showEye,
  isEditable = true,
  isPasswordField = false,
  passwordVisible = false,
  ...otherProps
}) {
  const { setFieldTouched, errors, touched } = useFormikContext()

  return (
    <View>
      {/* <MyText textColor='black'>{isEditable}</MyText> */}
      <MyTextInput
        title={title}
        onBlur={() => setFieldTouched(name)}
        //onChangeText={(text) => setFieldValue(name, text)}
        onChangeText={onChangeText}
        value={value}
        width={width}
        onPress={onPress}
        isPasswordField={isPasswordField}
        passwordVisible={passwordVisible}
        {...otherProps}
        isEditable={isEditable}
        themeColor={themeColor}
        editable={enabled}
        style={style}
        showEye={showEye}
      />
      {errors[name] && (
        <MyErrorMessage error={errors[name]} visible={touched[name]} />
      )}
      {/* <MyErrorMessage error={errors[name]} visible={errors[name]} /> */}
    </View>
  )
}

export default MyFormField
