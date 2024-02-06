import React, { useState } from 'react'
import { useFormikContext } from 'formik'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'
function MyFormField({
  name,
  width,
  onPress,
  onChangeText,
  value,
  isPasswordField = false,
  passwordVisible = false,
  ...otherProps
}) {
  const {
    setFieldTouched,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext()


  return (
    <>
      <MyTextInput
        onBlur={() => setFieldTouched(name)}
        //onChangeText={(text) => setFieldValue(name, text)}
        onChangeText={onChangeText}
        value={value}
        width={width}
        onPress={onPress}
        isPasswordField={isPasswordField}
        passwordVisible={passwordVisible}
        {...otherProps}
      />
      <MyErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default MyFormField
