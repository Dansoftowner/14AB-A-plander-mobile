import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as Yup from 'yup'

import colors from '../config/colors'

import PasswordInput from '../components/PasswordInput'
// import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton'
import Screen from './Screen'
import MyText from '../components/MyText'
import MyFormField from '../components/MyFormField'
import MyForm from '../components/MyForm'
import MySubmitButton from '../components/MySubmitButton'
// import MyErrorMessage from '../components/MyErrorMessage'

// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export default function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  // const handleLogIn = () => {
  //   console.log('TODO login')
  // }
  const handleForgettenPassword = () => {
    console.log('TODO forgotten password')
  }
  const handleSubmit = () => {
    console.log('TODO submit')
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(5).label('Felhasználónév'),
    password: Yup.string().required().min(6).label('Jelszó'),
  })

  // const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Screen style={styles.container}>
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
        <MyText style={styles.title}>Plander</MyText>
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
          placeholder="Felhasználónév"
        />
        <MyFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-outline"
          name="password"
          placeholder="Jelszó"
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
        <MySubmitButton title="Bejelentkezés"/>
      </MyForm>
      <MyButton
        title="Elfelejtett jelszó"
        onPress={handleForgettenPassword}
        color="light_blue"
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.soft_blue,
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
    color: colors.medium_blue,
    paddingLeft: 5,
    fontWeight: 'bold',
  },
})
