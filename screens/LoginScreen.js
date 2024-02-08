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
import AssociationSelector from '../components/AssociationSelector'
import AutoComplete from '../components/AutoComplete'
import SelectAssociation from '../components/SelectAssociation'
import { Form, Formik, useFormikContext } from 'formik'
import AssContext from '../AssContext'
import MyErrorMessage from '../components/MyErrorMessage'
import { FormProvider } from '../components/FormContext'
import { useFormDispatch, useFormState } from '../components/FormContext'
import NewMyAlert from '../components/NewMyAlert'
import FancyAlert from '../components/MyAlert'
import { storeToken } from '../auth/storage'
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
    console.log('itt')
    const { association, username, password } = values
    console.log(values)
    const result = await auth.login(association._id, username, password)
    if (!result.ok) {
      console.log(result)
      setErrorMessage(result.data.message)
      return setLoginFailed(true)
    }
    setLoginFailed(false)
    setUser(result.data)
    storeToken(result.headers['x-auth-token'])
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('username')),
    password: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('password')),
    association: Yup.object().required(i18n.t('fieldRequired')),
  })

  const handleNavigateAssociation = () => {
    navigation.navigate('Associations')
  }

  // const handleSubmitNew = async (values, validateForm) => {
  //   // dispatch({
  //   //   type: 'UPDATE_ERRORS',
  //   //   payload: {
  //   //     id: 'user',
  //   //     data: { values, errors },
  //   //   }})
  //   //console.log(values)

  // }

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.Login_background },
      ]}
    >
      <FancyAlert
        icon="exclamation"
        message={errorMessage}
        button="Close"
        visible={loginFailed}
        handleClose={() => setLoginFailed(false)}
      />
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
            {/* <Button
              title="Submit"
              mode="contained"
              onPress={() => {
                dispatch({
                  type: 'UPDATE_FORM',
                  payload: {
                    id: 'user',
                    data: { values, errors },
                  },
                })
                alert(JSON.stringify(values, null, 2))
                handleSubmit()
              }}
            ></Button> */}
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //a felső három most lett hozzáadva
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
