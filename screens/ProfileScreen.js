import React, { useState } from 'react'
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
// {
//   "_id": "652f866cfc13ae3ce86c7ce7",
//   "isRegistered": true,
//   "email": "bverchambre0@alibaba.com",
//   "username": "gizaac0",
//   "name": "Reizinger Szabolcs",
//   "address": "Hungary, 7300 PillaFalva Maniel utca 12.",
//   "idNumber": "589376QN",
//   "phoneNumber": "+86 (120) 344-7474",
//   "guardNumber": "08/0019/161373",
//   "roles": [
//     "member",
//     "president"
//   ]
// }

function ProfileScreen({ navigation }) {
  const form = React.useRef()
  const dispatch = useFormDispatch()
  const { values: formValues, errors: formErrors } = useFormState('user')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [newPwd, setNewPwd] = useState('00000000AA')
  const [newPwdRepeat, setNewPwdRepeat] = useState('00000000AA')
  
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

  React.useEffect(() => {
    navigation.addListener('blur', () => {
      //if (form.current) {
        //const { values, errors } = form.current
        dispatch({
          type: 'UPDATE_VALUES',
          payload: {
            id: 'user',
            data: { ...user },
          },
        })
      //}
    })
  }, []) //talán így?

  // const validationSchema = Yup.object().shape({
    //   username: Yup.string()
    //     .required(i18n.t('fieldRequired'))
  //     .label(i18n.t('username')),
  //   password: Yup.string()
  //     .required(i18n.t('fieldRequired'))
  //     .label(i18n.t('password')),
  //   association: Yup.object().required(i18n.t('fieldRequired')),
  // })
  
  const handleSubmit = () => {
    console.log('submit')
  }
  
  const { user } = useAuth()
  // const user = {
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

  const originalUser = user
  return (
    <ScrollView>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="account-circle"
          size={200}
          color="black"
        />
        <MyText textColor="black" style={{ fontWeight: 'bold', fontSize: 25 }}>
          {user.name}'s details
        </MyText>
        <Formik
          innerRef={form}
          initialValues={formValues}
          initialErrors={formErrors}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <View style={styles.form}>
              <EditProfileFields
                enabled={false}
                icon="email-outline"
                title="Email"
                value="email"
                themeColor="black"
                textColor="black"
                values={values}
                handleChange={handleChange}
              />
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Email
              </MyText>
              <View style={styles.field}>
                <MyFormField
                  themeColor="black"
                  title={user.email}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email-outline"
                  name="email"
                  enabled={false}
                  width={335}
                  style={{ fontWeight: '400' }}
                />
                <EditField style={{ marginLeft: 10 }} />
              </View>
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Username
              </MyText>
              <View style={styles.field}>
                <MyFormField
                  themeColor="black"
                  title={user.username}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  width={335}
                  icon="at"
                  name="username"
                  enabled={false}
                  style={{ fontWeight: '400' }}
                />
                <EditField style={{ marginLeft: 10 }} />
              </View>
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Password
              </MyText>
              <View style={styles.field}>
                <MyFormField
                  themeColor="black"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock-outline"
                  name="password"
                  title={newPwd}
                  enabled={false}
                  width={335}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={!isPasswordVisible}
                  textContentType="password"
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  passwordVisible={isPasswordVisible}
                  style={{ fontWeight: '400' }}
                />
                <EditField style={{ marginLeft: 10 }} />
              </View>
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Phone number
              </MyText>
              <View style={styles.field}>
                <MyFormField
                  themeColor="black"
                  title={user.phoneNumber}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="phone-outline"
                  name="phone"
                  enabled={false}
                  width={335}
                  style={{ fontWeight: '400' }}
                />
                <EditField style={{ marginLeft: 10 }} />
              </View>
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Address
              </MyText>
              <MyFormField
                themeColor="black"
                title={values.address}
                value={values.address} //A userben minden mező értéke benne van, a values üres
                onChangeText={() => {
                  handleChange('address')
                  console.log(values)
                }}
                autoCapitalize="none"
                autoCorrect={false}
                icon="map-marker-outline"
                name="address"
                style={{ fontWeight: '400' }}
              />
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Identity card number
              </MyText>
              <MyFormField
                themeColor="black"
                title={user.idNumber}
                value={values.idNumber}
                onChangeText={handleChange('idNumber')}
                autoCapitalize="none"
                autoCorrect={false}
                icon="card-account-details-outline"
                name="idNumber"
                style={{ fontWeight: '400' }}
              />
              <MyText
                textColor="black"
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                Guard number
              </MyText>
              <View style={styles.field}>
                <MyFormField
                  themeColor="black"
                  title={user.guardNumber}
                  value={values.guardNumber}
                  onChangeText={handleChange('guardNumber')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="card-text-outline"
                  name="guardNumber"
                  style={{ fontWeight: '400' }}
                />
              </View>
              <View style={styles.regFinished}>
                <MyText textColor="black" style={styles.reg}>
                  Registration finished
                </MyText>
                <MaterialCommunityIcons
                  name="check-decagram-outline"
                  size={24}
                  color="black"
                />
              </View>
              {originalUser != user && (
                <View>
                  <MySubmitButton title="Save" />
                </View>
              )}
              <Text>
                {JSON.stringify(user)}
                {JSON.stringify(originalUser)}
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
    // justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    flexDirection: 'row',
    // backgroundColor: "red",
    //justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  form: {
    marginHorizontal: 20,
    paddingTop: 30,
  },
  reg: {
    marginRight: 5,
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
