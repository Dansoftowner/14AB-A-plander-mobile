import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
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

function EditAssignment({id}) {
  const [alertShown, setAlertShown] = useState(false)
  const [errorShown, setErrorShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [members, setMembers] = useState([])
  const [assignment, setAssignment] = useState(null)
  const { colors: colorsByTheme } = useTheme()
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

  const handleGetMembers = async (q) => {
    const result = await membersApi.getMembers(q)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setMembers([...result.data.items])
  }

  const handleGetAssignment = async (assingmentId) => {
    const result = await assignments.getAssignmentById(assingmentId)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    console.log(result.data)
    setAssignment([...result.data])
  }

  useEffect(() => {
    handleGetMembers()
    handleGetAssignment('65ce57a4f88434b54445a9c8')
  }, [])

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
        {/* <UpdatedAlertMessage
          visible={false}
          type="confirmation"
          size="large"
          title={i18n.t('editCredentials')}
          button={i18n.t('save')}
          message={i18n.t('reEnterPwd')}
          cancel={true}
          close={i18n.t('close')}
          onClose={() => setAlertShown(false)}
        //   onPress={(text) => handleSubmit(text)}
        /> */}
        {/* <UpdatedAlertMessage
          visible={false}
          type="error"
          size="small"
          button={i18n.t('close')}
          message={errorMessage}
          onClose={() => setErrorShown(false)}
        /> */}
        {/* <UpdatedAlertMessage
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('reLogin')}
        //   onClose={() => {
        //     logOut()
        //   }}
        /> */}
        {/* <UpdatedAlertMessage
          visible={false}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('detailsSuccess')}
          onClose={() => {
            setSuccessShown(false)
          }}
        /> */}
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {i18n.t('editAssignment')}
        </MyText>
        <Formik
          // innerRef={form}
          initialValues={{}}
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
                onChangeText={handleChange('phoneNumber')}
                icon="format-letter-case"
                name="phoneNumber"
                title={i18n.t('assignmentName')}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('address')}
                icon="map-marker-outline"
                name="address"
                title={i18n.t('assignmentLocation')}
              />

            <MyText textColor='black' style={{fontWeight: 'bold', paddingBottom: 5}}>
            {i18n.t('membersInDuty')} 
            </MyText>

              <MembersAutoComplete data={members} />
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
