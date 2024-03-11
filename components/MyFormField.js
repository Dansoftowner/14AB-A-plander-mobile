import React from 'react'
import { View } from 'react-native'

import { useFormikContext } from 'formik'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'

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
      <MyTextInput
        title={title}
        onBlur={() => setFieldTouched(name)}
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
    </View>
  )
}

export default MyFormField
