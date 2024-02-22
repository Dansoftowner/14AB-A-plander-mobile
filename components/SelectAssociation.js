import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import MyTextInput from './MyTextInput'
import { useFormikContext } from 'formik'
import MyErrorMessage from './MyErrorMessage'
import MyText from './MyText'

function SelectAssociation({ onPress, title, name, subtitle, isButton }) {
  const {
    setFieldTouched,
    setTouched,
    // handleChange,
    // setFieldValue,
    // values,
    errors,
    touched,
  } = useFormikContext()

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress} onBlur={() => setTouched(...touched, {name: true})}
      //onBlur={() => setFieldTouched(name)}
      >
        <MyTextInput
          title={title}
          icon="police-badge-outline"
          isButton={true}
        />
      </TouchableWithoutFeedback>
      <MyErrorMessage error={errors[name]} visible={touched[name]} />
      {/* <MyText>
        {errors[name]}
      </MyText> */}
      {/* <MyText> */}
        {/* {touched[name]}
      </MyText> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default SelectAssociation
