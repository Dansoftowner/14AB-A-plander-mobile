import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'

import associationsHook from '../api/associations'
import { useFormDispatch, useFormState } from '../components/FormContext'

import Screen from './Screen'
import AssociationsAutoComplete from '../components/AssociationsAutoComplete'

function AssociationsScreen({ navigation }) {
  const { colors: colorsByTheme } = useTheme()
  const [associations, setAssociations] = useState()
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

  const handleGetAssociations = async (q) => {
    const result = await associationsHook.getAssociations(q)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setAssociations([...result.data.items])
  }

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
          <AssociationsAutoComplete
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
