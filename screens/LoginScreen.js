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
import useAuth from '../auth/useAuth'
import AuthContext from '../auth/authContext'
import AssociationSelector from '../components/AssociationSelector'
import AutoComplete from '../components/AutoComplete'
import SelectAssociation from '../components/SelectAssociation'
import { Form, Formik, useFormikContext } from 'formik'
import AssContext from '../AssContext'
import MyErrorMessage from '../components/MyErrorMessage'
// import { FormProvider } from './components/form-context'
import { useFormDispatch, useFormState } from '../components/FormContext'

export default function LoginScreen({ navigation, route }) {
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
  const { user, setUser } = useContext(AuthContext)
  const { colors: colorsByTheme } = useTheme()
  const colorScheme = useColorScheme()
  const [association, setAssociation] = useState()
  const [isAssociationSelected, setIsAssociationSelected] = useState(true)
  //const formikProps = useFormikContext()
  // const [association, setAssociation] = useState('')
  // const [associations, setAssociations] = useState()

  const handleForgettenPassword = () => {
    console.log('TODO forgotten password')
  }

  const handleSubmitI = async ({user}) => {
    console.log('itt')
    // if (!association) {
    //   return setIsAssociationSelected(false)
    // }
    return console.log(user)
    const result = await auth.login(association._id, username, password)
    if (!result.ok) {
      console.log(result)
      return setLoginFailed(true)
    }
    setLoginFailed(false)
    console.log(result.data)
    setUser(result.data)
    console.log(user)
    // return alert('You must choose an association!')
  }

  const validationSchema = Yup.object().shape({
    user: Yup.object().shape({
      valeus: Yup.object().shape({
        username: Yup.string()
          .required(i18n.t('fieldRequired'))
          .label(i18n.t('username')),
        password: Yup.string()
          .required(i18n.t('fieldRequired'))
          .label(i18n.t('password')),
        association: Yup.object().required(i18n.t('fieldRequired')),
      }),
    }),
  })

  const handleNavigateAssociation = () => {
    navigation.navigate('Associations')
  }

  // useEffect(() => {
  //   if (route.params?.association) {
  //     //console.log(route.params?.association)
  //     setAssociation(route.params?.association)
  //     //console.log(association)
  //     //formikProps.setFieldValue('association', route.params?.association) //ezt kell módosítani
  //   }
  // }, [route.params])
  // const {setFieldValue} = useFormikContext();
  // const handleGetAssociations = async () => {
  //   const result = await associationsHook.getAssociations()
  //   if (!result.ok) {
  //     return console.log(result)
  //   }
  //   //console.log(result.data)
  //   setAssociations([...result.data.items])
  //   console.log(associations.length)
  // }

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.Login_background },
      ]}
    >
      <View style={styles.headerContainer}>
        <Image
          source={
            colorScheme === 'light'
              ? require('../assets/plander_logo_light.png')
              : require('../assets/plander_logo_dark.png')
          }
          style={styles.image}
        />
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
        // validationSchema={validationSchema}
        onSubmit={handleSubmitI}
        enableReinitialize
      >
        {({ values, errors, handleChange, handleSubmit, submitForm }) => (
          <View style={styles.form}>
            <SelectAssociation
              onPress={handleNavigateAssociation}
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
            <Text>{JSON.stringify(values, null, 2)}</Text>
            <Button
              title={i18n.t('loginButton')}
              onPress={submitForm}
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
      {/* <View style={styles.form}>
        <Button
          title="Next"
          mode="contained"
          onPress={() => {
            navigation.push('Associations')
          }}
        ></Button>
      </View> */}
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
  image: {
    width: 125,
    height: 125,
  },
  title: {
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
})
