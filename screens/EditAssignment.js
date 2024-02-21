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

import DateTimePicker from '@react-native-community/datetimepicker'
import MemberListItem from './MemberListItem'

function EditAssignment({ route, navigation }) {
  const [alertShown, setAlertShown] = useState(false)
  const [errorShown, setErrorShown] = useState(false)
  const [datePickerShown, setDatePickerShown] = useState(false)
  const [timePickerShown, setTimePickerShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [assignment, setAssignment] = useState()
  const { colors: colorsByTheme } = useTheme()
  const [isStartDate, setIsStartDate] = useState(true)
  const formRef = useRef()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t('zodEmail'))
      .required(i18n.t('fieldRequired')),
    username: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('username'))
      .min(5, i18n.t('zodUsername'))
      .max(20),
    password: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('password'))
      .min(8, i18n.t('zodPasswordLength'))
      .matches(/[A-Z]/, i18n.t('zodPassword'))
      .matches(/[0-9]/, i18n.t('zodPassword')),
    repeatedPassword: Yup.string()
      .required(i18n.t('fieldRequired'))
      .oneOf([Yup.ref('password'), null], i18n.t('zodRepeatedPwd')),
    address: Yup.string()
      .min(5, i18n.t('zodAddress'))
      .matches(/[0-9]/, i18n.t('zodAddress')),
    idNumber: Yup.string().min(3, i18n.t('zodIdNumber')),
    phoneNumber: Yup.string().min(9, i18n.t('zodPhoneNumber')),
    guardNumber: Yup.string()
      .matches(/\d{2}\/\d{4}\/\d{5}/, i18n.t('zodGuardNumber'))
      .max(13)
      .optional()
      .nullable(),
  })

  const isShown = useRef()

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      formRef.current.setFieldValue(
        isStartDate ? 'assignmentStart' : 'assignmentEnd',
        currentDate,
      )
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
      formRef.current.setFieldValue(
        isStartDate ? 'assignmentStart' : 'assignmentEnd',
        currentDate,
      )
      setTimePickerShown(!timePickerShown)
    } else {
      setTimePickerShown(!timePickerShown)
    }
  }

  // const [startDate, setStartDate] = useState(format(
  //   assignment.start == undefined ? new Date() : assignment.start,
  //   'yyyy. MMMM. dd. HH:mm', {locale: hu}
  // ))

  const [assignmentId, setAssignmentId] = useState()

  useEffect(() => {
    if (route.params.id !== -1) {
      setAssignmentId(route.params.id)
      handleGetAssignment(route.params.id)
    } 
  }, [route.params.id])

  useEffect(() => {
    if (route.params.member !== undefined) {
      //console.log('itt')
      // setAssignmentId(route.params.id)
      // handleGetAssignment(route.params.id)
      handleAddMember(route.params.member)
    } 
  }, [route.params.member])

  const handleAddMember = (member) => {
    // console.log(_id)
    const isMemberAlreadyAdded = formRef.current.values.assignees.filter(x => x._id === member._id).length > 0
    if (!isMemberAlreadyAdded) {
      formRef.current.setFieldValue(
        'assignees',
        [...formRef.current.values.assignees, {_id: member._id, name: member.name}],
      )
    }
    console.log(formRef.current.values.assignees)
  }

  const handleGetAssignment = async (assingmentId) => {
    const result = await assignments.getAssignmentById(assingmentId)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    console.log(result.data)
    setAssignment(result.data)
    console.log(assignment)
    console.log('lefutott')
  }

  const handleDeleteMember = (_id) => {
    console.log(_id)
    formRef.current.setFieldValue(
      'assignees',
      formRef.current.values.assignees.filter((x) => x._id !== _id),
    )
    console.log(formRef.current.values.assignees)
  }

  // useEffect(() => {
  //   //handleGetMembers()
  //   console.log(assignmentId)
  // }, [])

  // handleGetAssignment(assignmentId)

  //   const handleSubmit = async (currentPassword = undefined) => {
  //     const values = formRef.current.values

  //     if (
  //       user.email !== values.email ||
  //       user.username !== values.username ||
  //       defaultPwd != values.password
  //     ) {
  //       const { email, username, password } = values
  //       console.log(currentPassword)
  //       console.log(password)
  //       if (password === currentPassword) {
  //         console.log('itt van az error')
  //         // setisPasswordEditable(false)
  //         setErrorMessage(i18n.t('passwordChangeError'))
  //         setErrorShown(true)
  //         console.log('itt van az error')
  //         setFieldValue('password', defaultPwd)
  //         setFieldValue('repeatedPassword', defaultPwd)
  //       } else {
  //         const result = await members.patchMeCredentials(
  //           email === user.email ? undefined : email,
  //           username === user.username ? undefined : username,
  //           password === defaultPwd || password === currentPassword
  //             ? undefined
  //             : password,
  //           currentPassword,
  //         )
  //         console.log(result)
  //         if (!result.ok) {
  //           console.log(result.headers)

  //           setErrorShown(true)
  //           setErrorMessage(result.data.message)
  //         } else {
  //           const { name, address, idNumber, phoneNumber, guardNumber } = values
  //           const result = await members.patchMe(
  //             name,
  //             address,
  //             idNumber,
  //             phoneNumber,
  //             guardNumber,
  //           )
  //           //const result = await members.patchMeCredentials("652f866cfc13ae3ce86c7ce7")
  //           if (!result.ok) {
  //             console.log(result.headers)
  //             setErrorShown(true)
  //             setErrorMessage(result.data.message)
  //           } else {
  //           }
  //           console.log(result)
  //         }
  //       }
  //       //console.log(newPwd)
  //     } else {
  //       const { name, address, idNumber, phoneNumber, guardNumber } = values
  //       console.log('basic')
  //       const result = await members.patchMe(
  //         name,
  //         address,
  //         idNumber,
  //         phoneNumber,
  //         guardNumber,
  //       )
  //       //const result = await members.patchMeCredentials("652f866cfc13ae3ce86c7ce7")
  //       if (!result.ok) {
  //         console.log(result.headers)
  //         setErrorShown(true)
  //         setErrorMessage(result.data.message)
  //       } else {
  //         setSuccessShown(true)
  //         setUser({ ...values })
  //         //setAlertShown()
  //       }
  //       console.log(result)
  //     }
  //   }

  return (
    <ScrollView>
      <View style={styles.container}>
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {i18n.t('editAssignment')}
        </MyText>
        <Formik
          initialValues={{
            assignmentTitle: assignment?.title == null ? '' : assignment.title,
            assignmentLocation:
              assignment?.location == null ? '' : assignment.location,
            assignmentStart:
              assignment?.start == undefined ? '' : new Date(assignment.start),
            assignmentEnd:
              assignment?.end == undefined ? '' : new Date(assignment.end),
            assignees:
              assignment?.assignees == undefined ? [] : assignment.assignees,
          }}
          // initialErrors={formErrors}
          validationSchema={validationSchema}
          //   onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize //ez nagyon fontos!
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
                onChangeText={handleChange('assignmentTitle')}
                icon="format-letter-case"
                name="assignmentTitle"
                title={i18n.t('assignmentName')}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('assignmentLocation')}
                icon="map-marker-outline"
                name="assignmentLocation"
                title={i18n.t('assignmentLocation')}
              />
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
                name="assignmentStart"
                subtitle={format(
                  values?.assignmentStart == ''
                    ? new Date()
                    : values.assignmentStart,
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
                name="assignmentEnd"
                subtitle={format(
                  values?.assignmentEnd == ''
                    ? new Date()
                    : values.assignmentEnd,
                  'yyyy. MMMM. dd. HH:mm',
                  { locale: hu },
                )}
                onPress={() => {
                  setDatePickerShown(!datePickerShown)
                  setIsStartDate(false)
                }}
              />
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
                  value={
                    new Date(
                      isStartDate
                        ? values.assignmentStart
                        : values.assignmentEnd,
                    )
                  }
                  onChange={onChangeDate}
                />
              )}
              {timePickerShown && (
                <DateTimePicker
                  mode="time"
                  value={
                    new Date(
                      isStartDate
                        ? values.assignmentStart
                        : values.assignmentEnd,
                    )
                  }
                  onChange={onChangeTime}
                />
              )}

              {/* <MembersAutoComplete data={members} /> */}
              {/* <MyButton onPress={() => console.log(assignment)}></MyButton> */}
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MyButton onPress={() => navigation.navigate('Members')} title='Új tag beosztása' style={{marginTop: 10, width: "auto"}}/>
              </View>

              <MyText textColor="black">{assignmentId}</MyText>
              <MyText textColor="black">
                {JSON.stringify(values.assignees)}
              </MyText>

              {/* <MyText textColor="black">{JSON.stringify(assignment)}</MyText> */}
              {/* <MyText textColor="black">{JSON.stringify(values)}</MyText> */}
              {JSON.stringify(values) != JSON.stringify(values) && (
                <View>
                  <MyButton
                    title={i18n.t('save')}
                    onPress={() => {
                      setTouched({
                        email: true,
                        username: true,
                        password: true,
                        repeatedPassword: true,
                        address: true,
                        idNumber: true,
                        phoneNumber: true,
                        guardNumber: true,
                      })
                      validateForm()
                      console.log(errors)
                      if (Object.keys(formRef.current.errors).length !== 0) {
                        setErrorMessage(i18n.t('wrongFields'))
                        // setErrorShown(true)
                        return
                      }
                      //   if (
                      //     user.email !== values.email ||
                      //     user.username !== values.username ||
                      //     defaultPwd != values.password
                      //   ) {
                      //     setAlertShown(true)
                      //   } else {
                      //     handleSubmit()
                      //   }
                    }}
                  />
                </View>
              )}
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

export default EditAssignment
