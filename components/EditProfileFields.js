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
  maxLength,
  setPasswordEditable,
  keyboardType
}) {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <View>
      <MyText textColor="black" style={{fontWeight: "bold"}}>
        {values[name]}
      </MyText>
      {/* <MyText textColor="black">{isEditable ? 'true' : 'false'}</MyText>
      <MyText textColor="black">{enabled ? 'true' : 'false'}</MyText> */}
      <View style={styles.field}>
        <MyFormField
          themeColor={themeColor}
          value={values[name]}
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
          // textContentType="password"
          keyboardType={keyboardType}
          showEye={showEye}
          enabled={enabled ? true : isEditable}
        />
        {!enabled && (
          <EditField
            style={{ marginLeft: 8 }}
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
  container: {},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default EditProfileFields
