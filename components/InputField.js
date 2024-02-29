import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import MyText from './MyText'
import MyFormField from './MyFormField'
import SmallButton from './SmallButton'

function InputField({
  title,
  value,
  icon,
  themeColor,
  textColor,
  values,
  onChangeText,
  name,
  secure,
  maxLength,
  setPasswordEditable,
  keyboardType,
  enabled = true,
  showEye = false,
  isPasswordField = false,
  ...otherProps
}) {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <View>
      <MyText textColor="black" style={{ fontWeight: 'bold' }}>
        {title}
      </MyText>
      <View style={styles.field}>
        <MyFormField
          themeColor={themeColor}
          value={values[name].toString()}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          icon={icon}
          name={name}
          width={enabled ? 350 : 320}
          style={{ fontWeight: '400' }}
          isPasswordField={isPasswordField}
          secureTextEntry={isPasswordField}
          isEditable={enabled ? true : isEditable}
          maxLength={maxLength}
          {...otherProps}
          keyboardType={keyboardType}
          showEye={showEye}
          enabled={enabled ? true : isEditable}
        />
        {!enabled && (
          <SmallButton
            style={{ marginLeft: 8 }}
            type="edit"
            onPress={() => {
              setIsEditable(!isEditable)
              setPasswordEditable && setPasswordEditable()
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default InputField
