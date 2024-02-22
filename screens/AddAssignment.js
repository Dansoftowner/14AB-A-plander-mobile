import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, FlatList } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFormDispatch, useFormState } from '../components/FormContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import i18n from '../locales/i18n'
import MyFormField from '../components/MyFormField'
import MyButton from '../components/MyButton'
import MySubmitButton from '../components/MySubmitButton'
import EditField from '../components/EditField'
import EditProfileFields from '../components/EditProfileFields'
import useAuth from '../auth/useAuth'
import { useTheme } from '@react-navigation/native'
import membersApi from '../api/members'
import FancyAlert from '../components/MyAlert'
import UpdatedAlertMessage from '../components/UpdatedAlertMessage'
import storage from '../auth/storage'
import AuthContext from '../auth/authContext'
import AutoComplete from '../components/AssociationsAutoComplete'
import MembersAutoComplete from '../components/MembersAutoComplete'
import assignments from '../api/assignments'
import { format, set } from 'date-fns'
import { hu } from 'date-fns/locale'
import DateTimeFormInput from '../components/DateTimeFormInput'

const { add } = require("date-fns");

import DateTimePicker from '@react-native-community/datetimepicker'
import MemberListItem from './MemberListItem'

function AddAssignment({ route, navigation }) {
  const { user, setUser } = useContext(AuthContext)

  const [alertShown, setAlertShown] = useState(false)
  const [errorShown, setErrorShown] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [datePickerShown, setDatePickerShown] = useState(false)
  const [timePickerShown, setTimePickerShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [assignment, setAssignment] = useState()
  const { colors: colorsByTheme } = useTheme()
  const [isStartDate, setIsStartDate] = useState(true)
  const formRef = useRef()

  const isShown = useRef()

  const handleSubmit = async () => {
    const values = formRef.current.values
    if (values.start > values.end) {
      setErrorMessage('A kezdet nem lehet később, mint a vég')
      return setErrorShown(true)
    } else {
      const assignees = values.assignees.map((assignee) => assignee._id)
      const result = await assignments.patchAssignmentById(
        values._id,
        values.title,
        values.location,
        values.start,
        values.end,
        assignees,
      )
      if (!result.ok) {
        console.log(result.data.message)
        setErrorMessage(result.data.message)
        return setErrorShown(true)
      }
      setAssignment({...values})
      setSuccessMessage('A szolgálat sikeresen frissítve')
      return setSuccessShown(true)
    }
  }

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      formRef.current.setFieldValue(isStartDate ? 'start' : 'end', currentDate)
      setDatePickerShown(!datePickerShown)
      setTimePickerShown(true)
      //console.log('beállítani a dátumot', currentDate)
    } else {
      setDatePickerShown(!datePickerShown)
    }
  }

  const onChangeTime = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      console.log('beállítani a dátumot', currentDate)
      formRef.current.setFieldValue(isStartDate ? 'start' : 'end', currentDate)
      setTimePickerShown(!timePickerShown)
    } else {
      setTimePickerShown(!timePickerShown)
    }
  }

  // const [assignmentId, setAssignmentId] = useState()

  const handleAddMember = (member) => {
    console.log(formRef.current.values.assignees)
    const isMemberAlreadyAdded =
      formRef.current.values.assignees.filter((x) => x._id === member._id)
        .length > 0
    if (!isMemberAlreadyAdded) {
      formRef.current.setFieldValue('assignees', [
        ...formRef.current.values.assignees,
        { _id: member._id, name: member.name },
      ])
    }
    console.log(formRef.current.values.assignees)
  }


  const handleDeleteMember = (_id) => {
      console.log(formRef.current.values.assignees)
    console.log(_id)
    formRef.current.setFieldValue(
      'assignees',
      formRef.current.values.assignees.filter((x) => x._id !== _id),
    )
  }

  const handleAddAssignment = async () => {
    const values = formRef.current.values
    if (values.start > values.end) {
        setErrorMessage('A kezdet nem lehet később, mint a vég')
        return setErrorShown(true)
    }
    else{
        if (values.title == '') {
            values.title = 'Általános szolgálat'
        }
        if (values.location == '') {
            values.location = 'Nem megadott'
        }
        values.assignees = values.assignees.map(assignee => assignee._id)
        const result = await assignments.postAssignment(values.title, values.location, values.start, values.end, values.assignees)
        if (!result.ok) {
            console.log(result)
            setErrorMessage(result.data.message)
            return setErrorShown(true)
        }
        else{
            setSuccessMessage('A szolgálat sikeresen létrehozva')
            return setSuccessShown(true)
        }
    }
  }

//   useEffect(() => {
//     if (route.params.id !== -1) {
//       // setAssignmentId(route.params.id)
//       handleGetAssignment(route.params.id)
//     }
//   }, [route.params.id])

  useEffect(() => {
    if (route.params?.member !== undefined) {
      //console.log('itt')
      // setAssignmentId(route.params.id)
      // handleGetAssignment(route.params.id)
      handleAddMember(route.params.member)
    }
  }, [route.params])

  return (
    <ScrollView>
      <UpdatedAlertMessage
        visible={errorShown}
        type="error"
        size="small"
        button={i18n.t('close')}
        message={errorMessage}
        onClose={() => setErrorShown(false)}
        //onPress={() => setErrorShown(false)}
      />
      <UpdatedAlertMessage
        visible={successShown}
        type="success"
        size="small"
        button={i18n.t('close')}
        message={successMessage}
        onClose={() => {
          setSuccessShown(false)
          navigation.navigate('Assingments')
        }}
        //onPress={() => setSuccessShown(false)}
      />
      <View style={styles.container}>
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {i18n.t('addAssignment')}
        </MyText>
        <Formik
          initialValues={{
            title: '',
            location:'',
            start:
              new Date(),
            end: add(new Date(), {hours: 3}),
            assignees: []
          }}
          // initialErrors={formErrors}
          //validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
          //jkenableReinitialize //ez nagyon fontos!
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            validateForm,
            setTouched,
            touched,
          }) => (
            <View style={styles.form}>
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('title')}
                icon="format-letter-case"
                name="title"
                title={i18n.t('assignmentName')}
                placeholder='Opcionális'
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('location')}
                icon="map-marker-outline"
                name="location"
                title={i18n.t('assignmentLocation')}
                placeholder='Opcionális'
              />
            {/* <MyFormField
            //   value={values.username}
              onChangeText={handleChange('username')}
              autoCapitalize="none"
              autoCorrect={false}
              icon="account-outline"
              name="username"
              placeholder={i18n.t('username')}
              themeColor="white"
            /> */}
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('membersInDuty')}
              </MyText>
              {/* <MembersAutoComplete
                data={members}
                values={values.assignees}
                /> */}
              {values.assignees.length !== 0 ? (
                <FlatList
                  style={{ flexGrow: 0 }}
                  data={values.assignees}
                  renderItem={({ item }) => (
                    <MemberListItem
                      name={item.name}
                      _id={item._id}
                      onPress={(_id) => handleDeleteMember(_id)}
                    />
                  )}
                  //key={item._id}
                />
              ) : (
                <MyText textColor="black" style={{ fontWeight: 'bold' }}>
                  A szolgálathoz nincsenek beosztva tagok!
                </MyText>
              )}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MyButton
                  onPress={() => navigation.navigate('Members', {path: 'add'})}
                  title="Új tag beosztása"
                  style={{ marginTop: 10, width: 'auto' }}
                />
              </View>
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                Szolgálat kezdete
              </MyText>
              <DateTimeFormInput
                themeColor="black"
                values={values}
                textColor="black"
                name="start"
                subtitle={format(
                  values?.start == '' ? new Date() : values.start,
                  'yyyy. MMMM. dd. HH:mm',
                  { locale: hu },
                )}
                onPress={() => {
                  setDatePickerShown(!datePickerShown)
                  setIsStartDate(true)
                }}
              />
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                Szolgálat vége
              </MyText>
              <DateTimeFormInput
                themeColor="black"
                values={values}
                textColor="black"
                name="end"
                subtitle={format(
                  values?.end == '' ? new Date() : values.end,
                  'yyyy. MMMM. dd. HH:mm',
                  { locale: hu },
                )}
                onPress={() => {
                  setDatePickerShown(!datePickerShown)
                  setIsStartDate(false)
                }}
              />

              {/* {values.assignees.length === 0 &&
              (
                <MyText textColor='black' style={{fontWeight: 'bold'}}>
                  A szolgálathoz nincsenek beosztva tagok!
                </MyText>
              )} */}
              {/* <MemberListItem name="Miklós" /> */}
              {datePickerShown && (
                <DateTimePicker
                  mode="date"
                  value={new Date(isStartDate ? values.start : values.end)}
                  onChange={onChangeDate}
                />
              )}
              {timePickerShown && (
                <DateTimePicker
                  mode="time"
                  value={new Date(isStartDate ? values.start : values.end)}
                  onChange={onChangeTime}
                />
              )}

              {/* <MembersAutoComplete data={members} /> */}
              {/* <MyButton onPress={() => console.log(assignment)}></MyButton> */}

              {/* <MyText textColor="black">{assignmentId}</MyText> */}
              <MyText textColor="black">
                {JSON.stringify(values)}
              </MyText>
              {/* <MyText textColor="black">
                {JSON.stringify(assignment)}
              </MyText> */}
              {/* <MyText textColor="black">{JSON.stringify(assignment)}</MyText> */}
              {/* <MyText textColor="black">{JSON.stringify(values)}</MyText> */}

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                <MyButton
                  title="Mentés"
                  style={{ width: 100, backgroundColor: 'green' }}
                  onPress={handleAddAssignment}
                />

                {/* {JSON.stringify(values) != JSON.stringify(assignment) &&
                  user.roles.includes('president') && (
                    <View>
                      <MyButton
                        title={i18n.t('save')}
                        style={{backgroundColor: 'green', width: 100, marginLeft: 20}}
                        onPress={handleSubmit}
                      />
                    </View>
                  )} */}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    marginHorizontal: 20,
    paddingTop: 30,
  },
  reg: {
    marginRight: 5,
  },
  role: {
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 10,
  },
  regFinished: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    // backgroundColor: 'white',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
})

export default AddAssignment
