import React, { useContext, useState } from 'react'
import { Image, StyleSheet, View, useColorScheme } from 'react-native'
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
import { useFormikContext } from 'formik'
import AssContext from '../AssContext'

export default function LoginScreen({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const { user, setUser } = useContext(AuthContext)
  const [association, setAssociation] = useState('')
  const { colors: colorsByTheme } = useTheme()
  const colorScheme = useColorScheme()
  // const [associations, setAssociations] = useState()

  const handleForgettenPassword = () => {
    console.log('TODO forgotten password')
  }

  const handleSubmit = async ({ username, password }) => {
    const result = await auth.login(association._id, username, password)
    if (!result.ok) {
      console.log(result)
      return setLoginFailed(true)
    }
    setLoginFailed(false)
    console.log(result.data)
    setUser(result.data)
    console.log(user)
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('username')),
    password: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('password')),
    associationId: Yup.string().required(i18n.t('fieldRequired')),
  })

  const handleNavigateAssociation = () => {
    console.log('click!')
    navigation.navigate('Associations')
  }
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
      <MyForm
        initialValues={{
          username: '',
          password: '',
          associationId: association._id ?? '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        style={styles.form}
      >
        <View style={styles.form}>
          <AssContext.Provider value={{ association, setAssociation }}>
            <SelectAssociation
              onPress={handleNavigateAssociation}
            />
          </AssContext.Provider>
          <MyFormField
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
            placeholder={i18n.t('password')}
            secureTextEntry={!isPasswordVisible}
            textContentType="password"
            isPasswordField={true}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            passwordVisible={isPasswordVisible}
          />
          {/* {associations && <AssociationSelector associations={associations} />} */}
        </View>
        {/* {associations && (
          <AutoComplete
            data={associations}
            onChangeText={handleGetAssociations}
          />
        )} */}
        {/* <MySubmitButton title={i18n.t('loginButton')} /> */}
      </MyForm>
      {/* <MyButton
        title={i18n.t('forgotMyPassword')}
        onPress={handleForgettenPassword}
        color="light_blue"
      /> */}
      {/* <MyButton title="getAssociations" onPress={handleGetAssociations} /> */}
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
