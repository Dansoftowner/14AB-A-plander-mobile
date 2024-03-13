import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AuthContext from '../auth/authContext'
import i18n from '../locales/i18n'
import members from '../api/members'
import useAuth from '../auth/useAuth'

import InputField from '../components/InputField'
import MyText from '../components/MyText'
import MyButton from '../components/MyButton'
import MyAlert from '../components/MyAlert'

function ProfileScreen() {
  const formRef = useRef()
  const { colors: colorsByTheme } = useTheme()
  const { logOut } = useAuth()
  const { user, setUser } = useContext(AuthContext)
  const [isPasswordEditable, setIsPasswordEditable] = useState(false)
  const [alertShown, setAlertShown] = useState(false)
  const [errorShown, setErrorShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [logoutShown, setLogoutShown] = useState(false)
  const defaultPwd = '00000000AA'
  const [prevoiusGuardNumber, setPreviousGuardNumber] = useState(user.guardNumber)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label(i18n.t('email'))
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
      .matches(/[0-9]/, i18n.t('zodAddress')).required(i18n.t('fieldRequired')),
    idNumber: Yup.string().min(3, i18n.t('zodIdNumber')).required(i18n.t('fieldRequired')),
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
  }, [])

  const handleSubmit = async (currentPassword = undefined) => {
    const values = formRef.current.values
    if (
      user.email !== values.email ||
      user.username !== values.username ||
      defaultPwd != values.password
    ) {
      const { email, username, password } = values
      if (password === currentPassword) {
        setErrorMessage(i18n.t('passwordChangeError'))
        setFieldValue('password', defaultPwd)
        setFieldValue('repeatedPassword', defaultPwd)
        return setErrorShown(true)
      } else {
        const result = await members.patchMeCredentials(
          email === user.email ? undefined : email,
          username === user.username ? undefined : username,
          password === defaultPwd || password === currentPassword
            ? undefined
            : password,
          currentPassword,
        )
        if (!result.ok) {
          setErrorMessage(result.data.message)
          return setErrorShown(true)
        } else {
          const { name, address, idNumber, phoneNumber, guardNumber } = values
          const result = await members.patchMe(
            name,
            address,
            idNumber,
            phoneNumber,
            guardNumber,
          )
          if (!result.ok) {
            setErrorMessage(result.data.message)
            return setErrorShown(true)
          }
          setLogoutShown(true)
        }
      }
    } else {
      const { name, address, idNumber, phoneNumber, guardNumber } = values
      const result = await members.patchMe(
        name,
        address,
        idNumber,
        phoneNumber,
        guardNumber,
      )
      if (!result.ok) {
        console.log(result.headers)
        setErrorMessage(result.data.message)
        return setErrorShown(true)
      }
      setSuccessShown(true)
      setUser({ ...values })
    }
  }

  return (
    <ScrollView style={{ backgroundColor: colorsByTheme.white_black }}>
      <View style={styles.container}>
        <MyAlert
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
        <MyAlert
          visible={errorShown}
          type="error"
          size="small"
          button={i18n.t('close')}
          message={errorMessage}
          onClose={() => setErrorShown(false)}
        />
        <MyAlert
          visible={logoutShown}
          type="success"
          size="small"
          button={i18n.t('close')}
          message={i18n.t('reLogin')}
          onClose={() => {
            setLogoutShown(false)
            logOut()
          }}
        />
        <MyAlert
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
          initialValues={{
            ...user,
            password: defaultPwd,
            repeatedPassword: defaultPwd,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            validateForm,
            setTouched,
            validateField,
            errors
          }) => (
            <View style={styles.form}>
              <InputField
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
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('username')}
                icon="at"
                name="username"
                title={i18n.t('username')}
                enabled={false}
              />
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={(text) => setFieldValue('password', text)}
                icon="lock-outline"
                name="password"
                title={i18n.t('password')}
                enabled={false}
                isPasswordField={true}
                showEye={false}
                setPasswordEditable={() => {
                  setIsPasswordEditable(!isPasswordEditable)
                  if (!isPasswordEditable) {
                    setFieldValue('password', '')
                    setFieldValue('repeatedPassword', '')
                    return
                  }
                  setFieldValue('password', defaultPwd)
                  setFieldValue('repeatedPassword', defaultPwd)
                }}
              />
              {isPasswordEditable && (
                <InputField
                  visible={false}
                  themeColor="black"
                  textColor="black"
                  values={values}
                  onChangeText={(text) => setFieldValue('repeatedPassword', text)}
                  icon="lock-outline"
                  name="repeatedPassword"
                  enabled={true}
                  title={i18n.t('repeatPwd')}
                  isPasswordField={true}
                  showEye={false}
                />
              )}
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('phoneNumber')}
                icon="phone-outline"
                name="phoneNumber"
                title={i18n.t('phone')}
                keyboardType="phone-pad"
              />
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('address')}
                icon="map-marker-outline"
                name="address"
                title={i18n.t('address')}
              />
              <InputField
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('idNumber')}
                icon="card-account-details-outline"
                name="idNumber"
                title={i18n.t('idNumber')}
              />
              <InputField
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
                    ? i18n.t('finishedRegistration')
                    : i18n.t('notRegistered')}
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
              {JSON.stringify(values) !=
                JSON.stringify({
                  ...user,
                  password: defaultPwd,
                  repeatedPassword: defaultPwd,
                }) && (
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
                        if (Object.keys(formRef.current.errors).length !== 0) {
                          setErrorMessage(i18n.t('wrongFields'))
                          return setErrorShown(true)
                        }
                        if (
                          user.email !== values.email ||
                          user.username !== values.username ||
                          defaultPwd != values.password
                        )
                          return setAlertShown(true)
                        handleSubmit()
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
    alignItems: 'center'
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

export default ProfileScreen
