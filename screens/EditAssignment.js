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
import MyAlert from '../components/MyAlert'
import storage from '../auth/storage'
import AuthContext from '../auth/authContext'
import AssociationsAutoComplete from '../components/AssociationsAutoComplete'
import MembersAutoComplete from '../components/MembersAutoComplete'
import assignments from '../api/assignments'
import { format, set } from 'date-fns'
import { hu } from 'date-fns/locale'
import { enGB } from 'date-fns/locale'
import DateTimeFormInput from '../components/DateTimeFormInput'

import DateTimePicker from '@react-native-community/datetimepicker'
import MemberListItem from '../components/MemberListItem'
import languageContext from '../locales/LanguageContext'
import routes from '../navigation/routes'

function EditAssignment({ route, navigation }) {
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
  const { language } = useContext(languageContext)
  const isShown = useRef()

  const handleSubmit = async () => {
    const values = formRef.current.values
    if (values.start > values.end) {
      setErrorMessage(i18n.t('errorStartEndDate'))
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
      setAssignment({ ...values })
      setSuccessMessage(i18n.t('modifiedAssignment'))
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

  useEffect(() => {
    if (route.params.id !== -1) {
      // setAssignmentId(route.params.id)
      handleGetAssignment(route.params.id)
    }
  }, [route.params.id])

  useEffect(() => {
    if (route.params.member !== undefined) {
      handleAddMember(route.params.member)
    }
  }, [route.params.member])

  const handleAddMember = (member) => {
    const isMemberAlreadyAdded =
      formRef.current.values.assignees.filter((x) => x._id === member._id)
        .length > 0
    if (!isMemberAlreadyAdded) {
      formRef.current.setFieldValue('assignees', [
        ...formRef.current.values.assignees,
        { _id: member._id, name: member.name },
      ])
    }
  }

  const handleGetAssignment = async (assingmentId) => {
    const result = await assignments.getAssignmentById(assingmentId)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setAssignment(result.data)
  }

  const handleDeleteAssignment = async () => {
    const assignmentId = formRef.current.values._id
    const result = await assignments.deleteAssignment(assignmentId)
    if (!result.ok) {
      return console.log(result)
    }
    console.log(result.data)
    setSuccessMessage(i18n.t('removedAssignment'))
    return setSuccessShown(true)
  }

  const handleDeleteMember = (item) => {
    //console.log(item._id)
    formRef.current.setFieldValue(
      'assignees',
      formRef.current.values.assignees.filter((x) => x._id !== item._id),
    )
    console.log(formRef.current.values.assignees)
  }

  return (
    <ScrollView style={{ backgroundColor: colorsByTheme.white_black }}>
      <MyAlert
        visible={errorShown}
        type="error"
        size="small"
        button={i18n.t('close')}
        message={errorMessage}
        onClose={() => setErrorShown(false)}
      />
      <MyAlert
        visible={successShown}
        type="success"
        size="small"
        button={i18n.t('close')}
        message={successMessage}
        onClose={() => {
          setSuccessShown(false)
          navigation.navigate(routes.ASSIGNMENTS)
        }}
      />
      <View style={styles.container}>
        {/* <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {i18n.t('editAssignment')}
        </MyText> */}
        <Formik
          initialValues={{
            _id: assignment?._id,
            title: assignment?.title == null ? '' : assignment.title,
            location: assignment?.location == null ? '' : assignment.location,
            start:
              assignment?.start == undefined ? '' : new Date(assignment.start),
            end: assignment?.end == undefined ? '' : new Date(assignment.end),
            assignees:
              assignment?.assignees == undefined ? [] : assignment.assignees,
            report: assignment?.report,
          }}
          onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize //ez nagyon fontos!
        >
          {({ values, handleChange, handleSubmit }) => (
            <View style={styles.form}>
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('title')}
                icon="format-letter-case"
                name="title"
                title={i18n.t('assignmentName')}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('location')}
                icon="map-marker-outline"
                name="location"
                title={i18n.t('assignmentLocation')}
              />
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('membersInDuty')}
              </MyText>
              {values.assignees.length !== 0 ? (
                values.assignees.map((item) => (
                  <MemberListItem
                    item={item}
                    onPress={(item) => handleDeleteMember(item)}
                    key={item._id}
                  />
                ))
              ) : (
                <MyText textColor="black" style={{ fontWeight: 'bold' }}>
                  {i18n.t('noMembers')}
                </MyText>
              )}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MyButton
                  onPress={() =>
                    navigation.navigate(routes.MEMBERS, { path: 'edit' })
                  }
                  title={i18n.t('add')}
                  style={{ marginTop: 10, width: 'auto' }}
                />
              </View>
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('assignmentStart')}
              </MyText>
              <DateTimeFormInput
                themeColor="black"
                values={values}
                textColor="black"
                name="start"
                subtitle={format(
                  values?.start == '' ? new Date() : values.start,
                  language == 'hu'
                    ? 'yyyy. MMMM dd. HH:mm'
                    : 'dd-MM-yyyy HH:mm',
                  { locale: language == 'hu' ? hu : enGB },
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
                {i18n.t('assignmentEnd')}
              </MyText>
              <DateTimeFormInput
                themeColor="black"
                values={values}
                textColor="black"
                name="end"
                subtitle={format(
                  values?.end == '' ? new Date() : values.end,
                  language == 'hu'
                    ? 'yyyy. MMMM dd. HH:mm'
                    : 'dd-MM-yyyy HH:mm',
                  { locale: hu },
                )}
                onPress={() => {
                  setDatePickerShown(!datePickerShown)
                  setIsStartDate(false)
                }}
              />

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

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('delete')}
                  style={{ width: 100, backgroundColor: 'red' }}
                  onPress={handleDeleteAssignment}
                />

                {JSON.stringify(values) != JSON.stringify(assignment) &&
                  user.roles.includes('president') && (
                    <View>
                      <MyButton
                        textStyle={{ color: 'white' }}
                        title={i18n.t('save')}
                        style={{
                          backgroundColor: 'green',
                          width: 100,
                          marginLeft: 20,
                        }}
                        onPress={handleSubmit}
                      />
                    </View>
                  )}
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
  },
})

export default EditAssignment
