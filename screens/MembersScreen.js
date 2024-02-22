import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import { useTheme } from '@react-navigation/native'
import AssociationsAutoComplete from '../components/AssociationsAutoComplete'
import associationsHook from '../api/associations'
import { useFormDispatch, useFormState } from '../components/FormContext'
import { Formik } from 'formik'
import MembersAutoComplete from '../components/MembersAutoComplete'
import membersApi from '../api/members'
import colors from '../config/colors'

function MembersScreen({ navigation }) {
  const [members, setMembers] = useState([])

  const handleGetMembers = async (q) => {
    const result = await membersApi.getMembers(q)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setMembers([...result.data.items])
  }

  useEffect(() => {
    handleGetMembers()
  }, [])

  const form = React.useRef()

  return (
    <Formik
      innerRef={form}
      // initialValues={formValues}
      // initialErrors={formErrors}
      enableReinitialize
    >
      {({ values, handleChange, setFieldValue }) => (
        <Screen
          style={[styles.container, { backgroundColor: colors.medium_blue }]}
        >
          <MembersAutoComplete
            data={members}
            onSelectMember={(text) => handleGetMembers(text)}
            // onChangeText={() => console.log('change')}
            //values={values.assignees}
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

export default MembersScreen
