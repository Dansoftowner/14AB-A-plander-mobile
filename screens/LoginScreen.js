import React, { useContext, useState } from 'react'
import { Appearance, Image, StyleSheet, View, useColorScheme } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'

import i18n from '../locales/i18n'
import auth from '../api/auth'
import AuthContext from '../auth/authContext'
import { useFormDispatch, useFormState } from '../components/FormContext'
import storage from '../auth/storage'
import routes from '../navigation/routes'

import MyButton from '../components/MyButton'
import MyFormField from '../components/MyFormField'
import MyText from '../components/MyText'
import Screen from './Screen'
import SelectAssociation from '../components/SelectAssociation'
import MyAlert from '../components/MyAlert'
import members from '../api/members'
import languageContext from '../locales/LanguageContext'

export default function LoginScreen({ navigation }) {
  const form = React.useRef()
  const dispatch = useFormDispatch()
  const { values: formValues, errors: formErrors } = useFormState('user')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setUser } = useContext(AuthContext)
  const { colors: colorsByTheme } = useTheme()
  const colorScheme = useColorScheme()
  const { setLanguage } = useContext(languageContext)

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

  const handleSubmit = async () => {
    form.current.setTouched({
      username: true,
      password: true,
      association: true,
    })
    form.current.validateForm()
    if (Object.keys(form.current.errors).length !== 0) {
      return
    }
    const { association, username, password } = form.current.values
    const result = await auth.login(association._id, username, password)
    if (!result.ok) {
      console.log(result)
      setErrorMessage(result.data.message)
      return setLoginFailed(true)
    }
    setLoginFailed(false)
    setUser(result.data)
    await storage.storeToken(result.headers['x-plander-auth'])
    members.getPreferences().then(res => {
      setLanguage(res.data.language || 'hu')
      Appearance.setColorScheme(res.data.colorMode || 'light')
    }).catch(err => {
      console.log(err)
      setErrorMessage(result.data.message)
      setLoginFailed(true)
    })
  }

  const handleNavigateAssociation = () => {
    navigation.navigate(routes.ASSOCIATIONS)
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

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.Login_background },
      ]}
    >
      <MyAlert
        visible={loginFailed}
        type="error"
        size="small"
        button="Close"
        message={errorMessage}
        onClose={() => setLoginFailed(false)}
      />
      <View style={styles.headerContainer}>
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
        initialTouched={{ username: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <View style={styles.form}>
            <SelectAssociation
              onPress={handleNavigateAssociation}
              name="association"
              title={values.association?.name ?? i18n.t('associationSelector')}
              subtitle={i18n.t('associationSelector')}
            />
            <MyFormField
              value={values.username}
              onChangeText={handleChange('username')}
              autoCapitalize="none"
              autoCorrect={false}
              icon="account-outline"
              name="username"
              placeholder={i18n.t('username')}
              themeColor="white"
              placeholderTextColor={colorsByTheme.Login_placeholders}
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
              themeColor="white"
              showEye={true}
              placeholderTextColor={colorsByTheme.Login_placeholders}
            />
            <MyButton
              title={i18n.t('loginButton')}
              style={styles.loginButton}
              onPress={handleSubmit}
            />
            {/* <MyButton
              title={i18n.t('forgotMyPassword')}
              onPress={handleForgettenPassword}
            /> */}
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
    marginVertical: 40,
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
