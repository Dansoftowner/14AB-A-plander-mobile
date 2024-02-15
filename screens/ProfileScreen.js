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
import members from '../api/members'
import FancyAlert from '../components/MyAlert'
import UpdatedAlertMessage from '../components/UpdatedAlertMessage'
import storage from '../auth/storage'
import AuthContext from '../auth/authContext'

function ProfileScreen() {
  const { user, setUser } = useContext(AuthContext)
  // const savedUser = {
  //   _id: '652f866cfc13ae3ce86c7ce7',
  //   isRegistered: true,
  //   email: 'bverchambre0@alibaba.com',
  //   username: 'gizaac0',
  //   name: 'Reizinger Szabolcs',
  //   address: 'Hungary, 7300 PillaFalva Maniel utca 12.',
  //   idNumber: '589376QN',
  //   phoneNumber: '+86 (120) 344-7474',
  //   guardNumber: '08/0019/161373',
  //   roles: ['member', 'president'],
  // }
  // const originalUser = user
  const defaultPwd = '00000000AA'
  const [newPwd, setNewPwd] = useState(defaultPwd)
  const [newPwdRepeat, setNewPwdRepeat] = useState(defaultPwd)
  const [isPasswordEditable, setisPasswordEditable] = useState(false)
  const [alertShown, setAlertShown] = useState(false)
  const [errorShown, setErrorShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [logoutShown,setLogoutShown] = useState(false)
  const [userwPass, setUserWpass] = useState({
    ...user,
    password: newPwd,
    repeatedPassword: newPwdRepeat,
  })
  const [prevoiusGuardNumber, setPreviousGuardNumber] = useState(
    user.guardNumber,
  )
  const { colors: colorsByTheme } = useTheme()
  const { logOut } = useAuth()
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

  useEffect(() => {
    formRef.current.setFieldValue('password', defaultPwd)
    formRef.current.setFieldValue('repeatedPassword', defaultPwd)
    const values = formRef.current.values
    console.log(userwPass)
    console.log(values)
  }, [])

  const handleSubmit = async (currentPassword = undefined) => {
    const values = formRef.current.values
    //const token = storage.getToken()
    //console.log('Műkszik', token)
    //console.log(values)
    //console.log(currentPassword)
    // console.log(currentPassword)
    if (
      user.email !== values.email ||
      user.username !== values.username ||
      defaultPwd != values.password
    ) {
      const { email, username } = values
      console.log(currentPassword)
      const result = await members.patchMeCredentials(
        email === user.email ? undefined : email,
        username === user.username ? undefined : username,
        newPwd === defaultPwd ? undefined : newPwd,
        currentPassword,
      )
      console.log(result)
      if (!result.ok) {
        console.log(result.headers)
        setErrorShown(true)
        setErrorMessage(result.data.message)
      } else {
        const { name, address, idNumber, phoneNumber, guardNumber } = values
        const result = await members.patchMe(
          name,
          address,
          idNumber,
          phoneNumber,
          guardNumber,
        )
        //const result = await members.patchMeCredentials("652f866cfc13ae3ce86c7ce7")
        if (!result.ok) {
          console.log(result.headers)
          setErrorShown(true)
          setErrorMessage(result.data.message)
        } else {
          setLogoutShown(true)
        }
        console.log(result)
      }
    } else {
      const { name, address, idNumber, phoneNumber, guardNumber } = values
      console.log('basic')
      const result = await members.patchMe(
        name,
        address,
        idNumber,
        phoneNumber,
        guardNumber,
      )
      //const result = await members.patchMeCredentials("652f866cfc13ae3ce86c7ce7")
      if (!result.ok) {
        console.log(result.headers)
        setErrorShown(true)
        setErrorMessage(result.data.message)
      } else {
        setSuccessShown(true)
        setUser({...values})
        //setAlertShown()
      }
      console.log(result)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <UpdatedAlertMessage
          visible={alertShown}
          type="confirmation"
          size="large"
          title={i18n.t('editCredentials')}
          button={i18n.t('save')}
          message={i18n.t('reEnterPwd')}
          cancel={true}
          close={i18n.t('close')}
          onClose={() => setAlertShown(false)}
          onPress={(text) => handleSubmit(text)}
        />
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
          visible={logoutShown}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('reLogin')}
          onClose={() => {
            setLogoutShown(false)
            logOut()
          }}
          //onPress={() => setSuccessShown(false)}
        />
        <UpdatedAlertMessage
          visible={successShown}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('detailsSuccess')}
          onClose={() => {
            setSuccessShown(false)
          }}
        />
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={200}
          color={colorsByTheme.black_white}
        />
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {user.name}
          {i18n.t('details')}
        </MyText>
        {user.roles.includes('president') && (
          <MyText textColor="black" style={styles.role}>
            {i18n.t('president')}
          </MyText>
        )}
        <Formik
          // innerRef={form}
          initialValues={{
            ...user,
            password: newPwd,
            repeatedPassword: newPwdRepeat,
          }}
          // initialErrors={formErrors}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                onChangeText={handleChange('email')}
                icon="email-outline"
                name="email"
                title={i18n.t('email')}
                enabled={false}
                keyboardType="email-address"
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('username')}
                icon="at"
                name="username"
                title={i18n.t('username')}
                enabled={false}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                //value={newPwd}
                values={values}
                onChangeText={(text) => {
                  setFieldValue('password', text)
                  setNewPwd(text)
                }}
                icon="lock-outline"
                name="password"
                title={i18n.t('password')}
                enabled={false}
                isPasswordField={true}
                showEye={false}
                setPasswordEditable={() => {
                  setisPasswordEditable(!isPasswordEditable)
                  if (newPwd === defaultPwd) {
                    setFieldValue('password', '')
                    setFieldValue('repeatedPassword', '')
                    setNewPwd('')
                    setNewPwdRepeat('')
                  } else {
                    setNewPwd(defaultPwd)
                    setNewPwdRepeat(defaultPwd)
                    setFieldValue('password', defaultPwd)
                    setFieldValue('repeatedPassword', defaultPwd)
                  }
                }}
              />
              {isPasswordEditable && (
                <EditProfileFields
                  visible={false}
                  themeColor="black"
                  textColor="black"
                  //value={newPwdRepeat}
                  values={values}
                  onChangeText={(text) => {
                    setNewPwdRepeat(text)
                    setFieldValue('repeatedPassword', text)
                  }}
                  icon="lock-outline"
                  name="repeatedPassword"
                  enabled={true}
                  title={i18n.t('repeatPwd')}
                  isPasswordField={true}
                  showEye={false}
                />
              )}
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('phoneNumber')}
                icon="phone-outline"
                name="phoneNumber"
                title={i18n.t('phone')}
                keyboardType="phone-pad"
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('address')}
                icon="map-marker-outline"
                name="address"
                title={i18n.t('address')}
              />

              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('idNumber')}
                icon="card-account-details-outline"
                name="idNumber"
                title={i18n.t('idNumber')}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={(text) => {
                  if (text.length + 1 != prevoiusGuardNumber.length) {
                    if (text.length == 2) {
                      text = text + '/'
                    } else if (text.length == 7) {
                      text = text + '/'
                    }
                  }
                  setFieldValue('guardNumber', text)
                  setPreviousGuardNumber(text)
                }}
                maxLength={13}
                icon="card-text-outline"
                name="guardNumber"
                title={i18n.t('guardNumber')}
                keyboardType="number-pad"
              />
              <View style={styles.regFinished}>
                <MyText textColor="black" style={styles.reg}>
                  {values.isRegistered
                    ? 'Registration finished'
                    : 'You have not finished registration yet'}
                </MyText>
                <MaterialCommunityIcons
                  name={
                    values.isRegistered
                      ? 'check-decagram-outline'
                      : 'alert-decagram-outline'
                  }
                  size={24}
                  color={colorsByTheme.black_white}
                />
              </View>
              {(JSON.stringify(values) != JSON.stringify(user)) && (
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
                        setErrorShown(true)
                        return
                      }
                      if (
                        user.email !== values.email ||
                        user.username !== values.username ||
                        defaultPwd != values.password
                      ) {
                        setAlertShown(true)
                      } else {
                        handleSubmit()
                      }
                    }}
                  />
                </View>
              )}
              <MyText textColor={colorsByTheme.black_white}>
                  {newPwd}
                {/* {JSON.stringify(touched)}
                {JSON.stringify(errors)}
                {JSON.stringify(values)}
                {JSON.stringify(user)} */}
                {/* {JSON.stringify(userwPass)} */}
              </MyText>
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

export default ProfileScreen
