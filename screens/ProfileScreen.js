import React, { useEffect, useState } from 'react'
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

function ProfileScreen() {
  const { user } = useAuth()
  const savedUser = {
    _id: '652f866cfc13ae3ce86c7ce7',
    isRegistered: true,
    email: 'bverchambre0@alibaba.com',
    username: 'gizaac0',
    name: 'Reizinger Szabolcs',
    address: 'Hungary, 7300 PillaFalva Maniel utca 12.',
    idNumber: '589376QN',
    phoneNumber: '+86 (120) 344-7474',
    guardNumber: '08/0019/161373',
    roles: ['member', 'president'],
  }
  const originalUser = user
  const [newPwd, setNewPwd] = useState('00000000AA')
  const [newPwdRepeat, setNewPwdRepeat] = useState('00000000AA')
  const [isPasswordEditable, setisPasswordEditable] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  })
  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={200}
            color="black"
          />
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {user.name}'s details
        </MyText>
        {user.roles.includes('president') && (
          <MyText textColor="black" style={styles.role}>
            President
          </MyText>
        )}
        <Formik
          // innerRef={form}
          initialValues={user}
          // initialErrors={formErrors}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize //ez nagyon fontos!
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <View style={styles.form}>
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('email')}
                icon="email-outline"
                name="email"
                title="E-mail"
                enabled={false}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('username')}
                icon="at"
                name="username"
                title="Username"
                enabled={false}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                value={newPwd}
                values={values}
                onChangeText={setNewPwd('password')}
                icon="lock-outline"
                name="password"
                title="Password"
                enabled={false}
                isPasswordField={true}
                showEye={false}
                setPasswordEditable={() =>
                  setisPasswordEditable(!isPasswordEditable)
                }
              />
              {isPasswordEditable && (
                <EditProfileFields
                  visible={false}
                  themeColor="black"
                  textColor="black"
                  value={newPwdRepeat}
                  values={values}
                  onChangeText={setNewPwdRepeat('password')}
                  icon="lock-outline"
                  name="password"
                  title="Please type your password again"
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
                title="Phone number"
                enabled={false}
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('address')}
                icon="map-marker-outline"
                name="address"
                title="Address"
              />

              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('idNumber')}
                icon="card-account-details-outline"
                name="idNumber"
                title="Identity card number"
              />
              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('guardNumber')}
                icon="card-text-outline"
                name="guardNumber"
                title="Guard number"
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
                  color="black"
                />
              </View>
              {values != user && (
                <View>
                  <MySubmitButton title="Save" />
                </View>
              )}
              <Text>
                {JSON.stringify(values)}
                {JSON.stringify(savedUser)}
              </Text>
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
