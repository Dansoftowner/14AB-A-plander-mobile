import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from './MyText'
import MyFormField from './MyFormField'
import EditField from './EditField'

function EditProfileFields({
  title,
  value,
  icon,
  themeColor,
  enabled = true,
  textColor,
  values,
  onChangeText,
  name,
  secure,
  showEye = false,
  isPasswordField = false,
  setPasswordEditable
}) {

  return (
    <View>
      <MyText
        textColor={textColor}
        style={{ fontSize: 16, fontWeight: 'bold' }}
      >
        {title}
      </MyText>
      <View style={styles.field}>
        <MyFormField
          themeColor={themeColor}
          value={values[name]}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          icon={icon}
          name={name}
          width={enabled ? 365 : 335}
          style={{ fontWeight: '400' }}
          isPasswordField={isPasswordField}
          enabled={enabled}
          showEye={showEye}
        />
        {!enabled && <EditField style={{ marginLeft: 8 }} onPress={setPasswordEditable} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default EditProfileFields
