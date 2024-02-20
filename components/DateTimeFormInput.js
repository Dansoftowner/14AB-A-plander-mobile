import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import MyTextInput from './MyTextInput'
import { useFormikContext } from 'formik'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'
import MyErrorMessage from './MyErrorMessage'

function DateTimeFormInput({
  name,
  width = 350,
  onPress,
  onChangeText,
  value,
  title,
  themeColor,
  style,
  enabled,
  showEye,
  subtitle,
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
          //onChangeText={(text) => setFieldValue(name, text)}
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
