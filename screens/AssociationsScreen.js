import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import { useTheme } from '@react-navigation/native'
import AutoComplete from '../components/AssociationsAutoComplete'
import associationsHook from '../api/associations'
import { useFormDispatch, useFormState } from '../components/FormContext'
import { Formik } from 'formik'

function AssociationsScreen({ navigation }) {
  const { colors: colorsByTheme } = useTheme()
  const [associations, setAssociations] = useState()

  const handleGetAssociations = async (q) => {
    const result = await associationsHook.getAssociations(q)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setAssociations([...result.data.items])
  }

  const form = React.useRef()
  const dispatch = useFormDispatch()
  const { values: formValues, errors: formErrors } = useFormState('user')

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (form.current) {
        const { values, errors } = form.current
        dispatch({
          type: 'UPDATE_FORM',
          payload: {
            id: 'user',
            data: { values, errors },
          },
        })
      }
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    handleGetAssociations('')
  }, [])

  return (
    <Formik
      innerRef={form}
      initialValues={formValues}
      initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, handleChange, setFieldValue }) => (
        <Screen
          style={[
            styles.container,
            { backgroundColor: colorsByTheme.Login_background },
          ]}
        >
          <AutoComplete
            data={associations}
            values={values.association}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            selectAssociation={(text) => handleGetAssociations(text)}
          />
        </Screen>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
})

export default AssociationsScreen
