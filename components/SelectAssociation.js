import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import { useFormikContext } from 'formik'

import MyTextInput from './MyTextInput'
import MyErrorMessage from './MyErrorMessage'

function SelectAssociation({ onPress, title, name, subtitle }) {
  const { setTouched, errors, touched } = useFormikContext()

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onBlur={() => setTouched(...touched, { name: true })}
      >
        <MyTextInput
          title={title}
          subtitle={subtitle}
          icon="police-badge-outline"
          isButton={true}
          placeholder={title}
          placeholderTextColor="black"
        />
      </TouchableWithoutFeedback>
      <MyErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default SelectAssociation
