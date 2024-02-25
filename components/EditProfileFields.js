import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from './MyText'
import MyFormField from './MyFormField'
import SmallButton from './SmallButton'

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
  keyboardType,
  ...otherProps
}) {
  const [isEditable, setIsEditable] = useState(false)
  return (
    <View>
      <MyText textColor="black" style={{ fontWeight: 'bold' }}>
        {title}
      </MyText>
      {/* <MyText textColor="black">{isEditable ? 'true' : 'false'}</MyText>
      <MyText textColor="black">{enabled ? 'true' : 'false'}</MyText> */}
      <View style={styles.field}>
        <MyFormField
          themeColor={themeColor}
          //title={title}
          value={
            typeof values[name] === 'number'
              ? values[name].toString()
              : values[name]
          }
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
          //placeholder={placeholder}
          // textContentType="password"
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
  container: {},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default EditProfileFields
