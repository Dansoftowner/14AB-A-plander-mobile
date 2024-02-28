import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'
import { format, add } from 'date-fns'
import { hu } from 'date-fns/locale'

import i18n from '../locales/i18n'
import routes from '../navigation/routes'
import assignments from '../api/assignments'

import DateTimeFormInput from '../components/DateTimeFormInput'
import DateTimePicker from '@react-native-community/datetimepicker'
import InputField from '../components/InputField'
import MyText from '../components/MyText'
import MyButton from '../components/MyButton'
import MyAlert from '../components/MyAlert'
import MyListItem from '../components/MyListItem'

function AddAssignment({ route, navigation }) {
  const formRef = useRef()
  const { colors: colorsByTheme } = useTheme()
  const [errorShown, setErrorShown] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [datePickerShown, setDatePickerShown] = useState(false)
  const [timePickerShown, setTimePickerShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [isStartDate, setIsStartDate] = useState(true)
  //possibly deleteable
  const [assignment, setAssignment] = useState()
  const [alertShown, setAlertShown] = useState(false)

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
      //setAssignment({ ...values })
      setSuccessMessage(i18n.t('modifiedAssignment'))
      return setSuccessShown(true)
    }
  }

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setDatePickerShown(false)
      formRef.current.setFieldValue(isStartDate ? 'start' : 'end', currentDate)
      setTimePickerShown(true)
    } else {
      setDatePickerShown(!datePickerShown)
    }
  }

  const onChangeTime = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setTimePickerShown(false)
      formRef.current.setFieldValue(isStartDate ? 'start' : 'end', currentDate)
    } else {
      setTimePickerShown(!timePickerShown)
    }
  }

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

  const handleDeleteMember = (item) => {
    formRef.current.setFieldValue(
      'assignees',
      formRef.current.values.assignees.filter((x) => x._id !== item._id),
    )
  }

  const handleAddAssignment = async () => {
    const values = formRef.current.values
    if (values.start > values.end) {
      setErrorMessage(i18n.t('errorStartEndDate'))
      return setErrorShown(true)
    } else {
      if (values.title == '') {
        values.title = 'Általános szolgálat'
      }
      if (values.location == '') {
        values.location = 'Nem megadott'
      }
      console.log(values.assignees)
      values.assignees = values.assignees.map((assignee) => assignee._id)
      const result = await assignments.postAssignment(
        values.title,
        values.location,
        values.start,
        values.end,
        values.assignees,
      )
      if (!result.ok) {
        console.log(result)
        setErrorMessage(result.data.message)
        return setErrorShown(true)
      } else {
        setSuccessMessage(i18n.t('addedAssignment'))
        return setSuccessShown(true)
      }
    }
  }

  useEffect(() => {
    if (route.params?.member !== undefined) {
      handleAddMember(route.params.member)
    }
  }, [route.params])

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
        <Formik
          initialValues={{
            title: '',
            location: '',
            start: new Date(),
            end: add(new Date(), { hours: 3 }),
            assignees: [],
          }}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ values, handleChange }) => (
            <View style={styles.form}>
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                placeholderTextColor={colorsByTheme.medium_white}
                onChangeText={handleChange('title')}
                icon="format-letter-case"
                name="title"
                title={i18n.t('assignmentName')}
                placeholder={i18n.t('optional')}
              />
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('location')}
                icon="map-marker-outline"
                name="location"
                title={i18n.t('assignmentLocation')}
                placeholder={i18n.t('optional')}
                placeholderTextColor={colorsByTheme.medium_white}
              />
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('membersInDuty')}
              </MyText>
              {values.assignees.length !== 0 ? (
                values.assignees.map((item) => (
                  <MyListItem
                    item={item}
                    onPress={(item) => handleDeleteMember(item)}
                    key={item._id}
                  />
                ))
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <MyText textColor="black" style={styles.noMembers}>
                    {i18n.t('noMembers')}
                  </MyText>
                </View>
              )}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MyButton
                  onPress={() =>
                    navigation.navigate(routes.MEMBERS, { path: 'add' })
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
                {i18n.t('assignmentEnd')}
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
              {datePickerShown && (
                <DateTimePicker
                  mode="date"
                  value={new Date(isStartDate ? values.start : values.end)}
                  onChange={onChangeDate}
                  is24Hour
                />
              )}
              {timePickerShown && (
                <DateTimePicker
                  mode="time"
                  value={new Date(isStartDate ? values.start : values.end)}
                  onChange={onChangeTime}
                  is24Hour
                />
              )}

              <View style={styles.btnContainer}>
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('save')}
                  style={{ width: 100, backgroundColor: 'green' }}
                  onPress={handleAddAssignment}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
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
  noMembers: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
  },
})

export default AddAssignment
