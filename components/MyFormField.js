import React, { useState } from 'react'
import { useFormikContext } from 'formik'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'
import styles from '../config/styles'
import EditField from './EditField'
import { View } from 'react-native'
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
  isPasswordField = false,
  passwordVisible = false,
  ...otherProps
}) {
  const {
    // setFieldTouched,
    handleChange,
    setFieldValue,
    values,
    errors,
    // touched,
  } = useFormikContext()


  return (
    <>
      <MyTextInput
        title={title}
        //onBlur={() => setFieldTouched(name)}
        //onChangeText={(text) => setFieldValue(name, text)}
        onChangeText={onChangeText}
        value={value}
        width={width}
        onPress={onPress}
        isPasswordField={isPasswordField}
        passwordVisible={passwordVisible}
        {...otherProps}
        themeColor={themeColor}
        editable={enabled}
        style={style}
      />
      <MyErrorMessage error={errors[name]} visible={errors[name]} />
    </>
  )
}

export default MyFormField
