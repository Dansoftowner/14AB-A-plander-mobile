import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'

import colors from '../config/colors'
import i18n from '../locales/i18n'
//import PasswordInput from '../components/PasswordInput'
// import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton'
import Screen from './Screen'
import MyText from '../components/MyText'
import MyFormField from '../components/MyFormField'
import MyForm from '../components/MyForm'
import MySubmitButton from '../components/MySubmitButton'
import apiClient from '../api/client'
import auth from '../api/auth'
import useAuth from '../auth/useAuth'
// import MyErrorMessage from '../components/MyErrorMessage'
import { useTheme } from '@react-navigation/native';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const {user} = useAuth();
  const { colors: colorsByTheme } = useTheme();
  // const handleLogIn = () => {
  //   console.log('TODO login')
  // }
  const handleForgettenPassword = () => {
    console.log('TODO forgotten password')
  }

  const handleSubmit = async ({associationId = '652f7b95fc13ae3ce86c7cdf', username, password}) => {
    const result = await auth.login(associationId, username, password);
    if (!result.ok) {
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    
    console.log(result.data);
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(5).label('Felhasználónév'),
    password: Yup.string().required().min(6).label('Jelszó'),
  })

  i18n.locale = 'en';

  //const associationId = '652f7b95fc13ae3ce86c7cdf';
  // const [selectedItem, setSelectedItem] = useState(null);
  return (
    <Screen style={[styles.container, {backgroundColor: colorsByTheme.Login_background}]}>
      {/* <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Gamma' },
        ]}
      /> */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/plander_logo_light.png')}
          style={styles.image}
        />
        <MyText style={[styles.title, {color: colorsByTheme.Login_titleColor}]}>Plander</MyText>
      </View>
      {/* <MyTextInput
        icon="account-outline"
        title="Felhasználónév"
        width="100%"
      ></MyTextInput>
      <PasswordInput
        icon="lock-outline"
        title="Jelszó"
        secureTextEntry={isPasswordVisible}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        passwordVisible={isPasswordVisible}
      />
      <MyButton title="Bejelentkezés" onPress={handleLogIn} /> */}

      <MyForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <MyErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        /> */}
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
          secureTextEntry={isPasswordVisible}
          textContentType="password"
          isPasswordField={true}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          passwordVisible={isPasswordVisible}
        />
        {/* <PasswordInput
          icon="lock-outline"
          title="Jelszó"
          secureTextEntry={isPasswordVisible}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          passwordVisible={isPasswordVisible}
        /> */}
        <MySubmitButton title={i18n.t('loginButton')}/>
      </MyForm>
      <MyButton
        title={i18n.t('forgotMyPassword')}
        onPress={handleForgettenPassword}
        color="light_blue"
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 30,
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
// Login_background: colors.soft_blue,
// Login_dropDownFont: colors.medium,
// Login_buttonBg: colors.medium_blue,
// Login_buttonColor: colors.white,
// Login_textColor: colors.medium,