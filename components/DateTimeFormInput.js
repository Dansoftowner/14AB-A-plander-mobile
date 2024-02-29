import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { useFormikContext } from 'formik'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'

function DateTimeFormInput({
  name,
  onPress,
  onChangeText,
  value,
  title,
  themeColor,
  style,
  enabled,
  showEye,
  subtitle,
  width = 350,
  isEditable = true,
  isPasswordField = false,
  passwordVisible = false,
  ...otherProps
}) {
  const { setFieldTouched, errors, touched } = useFormikContext()

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={onPress}
        onBlur={() => setTouched(...touched, { name: true })}
      >
        <MyTextInput
          title={title}
          onBlur={() => setFieldTouched(name)}
          onChangeText={onChangeText}
          value={value}
          subtitle={subtitle}
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
          isButton={true}
          isDate={true}
        />
      </TouchableWithoutFeedback>
      <MyErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default DateTimeFormInput
