import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { useTheme } from '@react-navigation/native'
import associationsHook from '../api/associations'

import MyErrorMessage from './MyErrorMessage'
import MyTextInput from './MyTextInput'
function MyFormField({
  name,
  width,
  onPress,
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

  // const [associations, setAssociations] = useState()

  // const fetchData = async () => {
  //   setFieldValue(name, text)
  //   if (values[name].length > 2) {
  //     const result = await associationsHook.getAssociations()
  //     if (!result.ok) {
  //       return console.log(result)
  //     }
  //     //console.log(result.data)
  //     setAssociations([...result.data.items])
  //     console.log(associations.length)
  //   }
  // }

  return (
    <>
      <MyTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
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
