import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as Yup from 'yup'

import i18n from '../locales/i18n'

import auth from '../api/auth'
import associationsHook from '../api/associations'
import MyButton from '../components/MyButton'
import MyForm from '../components/MyForm'
import MyFormField from '../components/MyFormField'
import MyText from '../components/MyText'
import MySubmitButton from '../components/MySubmitButton'
import Screen from './Screen'
import AuthContext from '../auth/authContext'
import SelectAssociation from '../components/SelectAssociation'
import { Form, Formik, useFormikContext } from 'formik'
import AssContext from '../AssContext'
import MyErrorMessage from '../components/MyErrorMessage'
import { FormProvider } from '../components/FormContext'
import { useFormDispatch, useFormState } from '../components/FormContext'
import storage, { storeToken } from '../auth/storage'
import useAuth from '../auth/useAuth'
import UpdatedAlertMessage from '../components/UpdatedAlertMessage'

export default function LoginScreen({ navigation }) {
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { user, setUser } = useContext(AuthContext)
  const { colors: colorsByTheme } = useTheme()
  const colorScheme = useColorScheme()

  const handleForgettenPassword = () => {
    console.log('TODO forgotten password')
  }

  const handleSubmitI = async (values) => {
    const { association, username, password } = values
    const result = await auth.login(association._id, username, password)
    if (!result.ok) {
      console.log(result)
      setErrorMessage(result.data.message)
      return setLoginFailed(true)
    }
    setLoginFailed(false)
    setUser(result.data)
    storage.storeToken(result.headers['x-plander-auth'])
    console.log(storage.getToken())
}

  const validationSchema = Yup.object().shape({
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
    association: Yup.object().required(i18n.t('fieldRequired')),
  })

  const handleNavigateAssociation = () => {
    navigation.navigate('Associations')
  }

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.Login_background },
      ]}
    >
      <UpdatedAlertMessage
        visible={loginFailed}
        type="error"
        size="small"
        button="Close"
        message={errorMessage}
        onClose={() => setLoginFailed(false)}
        //onPress={() => setErrorShown(false)}
      />
      {/* <FancyAlert
        icon="exclamation"
        message={errorMessage}
        button="Close"
        visible={false}
        handleClose={() => setLoginFailed(false)}
      /> */}
      <View style={styles.headerContainer}>
        {/* {colorScheme === 'dark' ? (
          <LogoDark width={150} height={150} />
        ) : (
          <LogoLight width={150} height={150} />
        )} */}
        {colorScheme === 'dark' ? (
          <Image
            source={require('../assets/logos/dark.png')}
            style={styles.logo}
          />
        ) : (
          <Image
            source={require('../assets/logos/light.png')}
            style={styles.logo}
          />
        )}
        <MyText
          style={[styles.title, { color: colorsByTheme.Login_titleColor }]}
        >
          Plander
        </MyText>
      </View>
      <Formik
        innerRef={form}
        initialValues={formValues}
        initialErrors={formErrors}
        validationSchema={validationSchema}
        onSubmit={handleSubmitI}
        enableReinitialize
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <View style={styles.form}>
            <SelectAssociation
              onPress={handleNavigateAssociation}
              name="association"
              title={values.association?.name ?? 'Association'}
            />
            <MyFormField
              value={values.username}
              onChangeText={handleChange('username')}
              autoCapitalize="none"
              autoCorrect={false}
              icon="account-outline"
              name="username"
              placeholder={i18n.t('username')}
            />
            <MyFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock-outline"
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder={i18n.t('password')}
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              isPasswordField={true}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              passwordVisible={isPasswordVisible}
            />
            {/* {errors && <MyText>{JSON.stringify(errors, null, 2)}</MyText>} */}
            <MyButton
              title={i18n.t('loginButton')}
              style={styles.loginButton}
              onPress={(values) => {
                // const result = await validateForm()
                // console.log(result)
                // if (result == {}) {
                //   console.log('ready to log in')
                // }
                // console.log(errors)
                handleSubmit(values)
              }}
            />
            <MyButton
              title={i18n.t('forgotMyPassword')}
              onPress={handleForgettenPassword}
            />
            <MyButton
              title="Gyors login"
              onPress={
                () => {
                  handleSubmitI({
                    association: { _id: '652f7b95fc13ae3ce86c7cdf' },
                    username: 'gizaac0',
                    password: 'Apple123',
                  })
                }

              }
            />

          </View>
        )}
      </Formik>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  form: {
    marginVertical: 40
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginButton: {
    marginTop: 40,
  },
  image: {
    width: 125,
    height: 125,
  },
  title: {
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  logo: {
    width: 125,
    height: 125,
  },
})
