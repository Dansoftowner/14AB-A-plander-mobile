import { Modal, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
// import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import * as Yup from 'yup'
import { Screen } from 'react-native-screens'
import MyText from './MyText'
import MyButton from './MyButton'
import { Formik } from 'formik'
import i18n from '../locales/i18n'
import MyFormField from './MyFormField'
//import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const ALERT_WIDTH = SCREEN_WIDTH - SCREEN_WIDTH / 4
function UpdatedAlertMessage({
  visible,
  onClose,
  onPress,
  message,
  button,
  title,
  close,
  type,
  size,
}) {
  const { colors: colorsByTheme } = useTheme()
  // const colorCalcualted = (color) => {
  //   if (color === 'red') {
  //     return colorsByTheme.medium_red_light_red
  //   }
  //   if (color === 'green') {
  //     return colorsByTheme.medium_green_light_green
  //   }
  //   if (color === 'yellow') {
  //     return colorsByTheme.medium_yellow_light_yellow
  //   }
  //   if (color === 'blue') {
  //     return colorsByTheme.medium_blue_light_blue
  //   }
  // }
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const typeProps = {
    error: {
      color: colorsByTheme.medium_red_light_red,
      icon: 'exclamation',
    },
    confirmation: {
      color: colorsByTheme.medium_yellow_light_yellow,
      icon: 'lock-open',
    },
    success: {
      color: colorsByTheme.medium_green_light_green,
      icon: 'check',
    },
  }
  const sizeProps = {
    small: {
      width: SCREEN_WIDTH - SCREEN_WIDTH / 4,
      height: 150,
    },
    medium: {
      width: SCREEN_WIDTH - SCREEN_WIDTH / 6,
      height: 250,
    },
    large: {
      width: SCREEN_WIDTH - SCREEN_WIDTH / 8,
      height: 350,
    },
  }
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('password'))
      .min(8, i18n.t('zodPasswordLength'))
      .matches(/[A-Z]/, i18n.t('zodPassword'))
      .matches(/[0-9]/, i18n.t('zodPassword')),
  })
  const formRef = useRef()
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', //szürke háttér
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            styles.iconCircle,
            { top: 32, borderColor: 'white', zIndex: 1 },
          ]}
        >
          <View
            style={[
              styles.icon,
              { borderRadius: 32, backgroundColor: typeProps[type].color },
            ]}
          >
            <MaterialCommunityIcons
              name={typeProps[type].icon}
              size={24}
              color="white"
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: sizeProps[size].width,
            minHeight: sizeProps[size].height,
            borderRadius: 16,
            padding: sizeProps[size].height / 20,
          }}
        >
          {size == 'small' ? (
            <View
              style={{
                marginTop: 28,
                width: '100%',
                backgroundColor: 'pink',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MyText textColor="black" style={styles[type]}>
                {message}
              </MyText>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                //backgroundColor: 'pink',
                marginTop: 33 - sizeProps[size].height / 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <MyText
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: colorsByTheme.black_white,
                  padding: 10,
                }}
              >
                {title}
              </MyText>
              <MyText
                style={{
                  fontSize: 18,
                  color: colorsByTheme.black_white,
                  padding: 10,
                  textAlign: 'center',
                }}
              >
                {message}
              </MyText>
              <Formik
                initialValues={{ password: '' }}
                validationSchema={validationSchema}
                innerRef={formRef}
                //onSubmit={handleSubmitI}
              >
                {({ values, handleChange }) => (
                  <View style={{ width: '90%' }}>
                    <MyFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      themeColor={colorsByTheme.black_white}
                      //icon="lock-outline"
                      name="password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      //placeholder={i18n.t('password')}
                      secureTextEntry={!isPasswordVisible}
                      textContentType="password"
                      isPasswordField={true}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      passwordVisible={isPasswordVisible}
                      showEye={true}
                    />
                  </View>
                  // <MyText>{JSON.stringify(values)}</MyText>
                )}
              </Formik>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              // backgroundColor: 'red',
              width: '70%',
            }}
          >
            {close && (
              <TouchableOpacity
                style={[
                  styles.btn,
                  { backgroundColor: colorsByTheme.light_medium },
                ]}
                onPress={onClose}
              >
                <Text
                  style={{
                    color: colorsByTheme.black_white,
                    fontWeight: '500',
                  }}
                >
                  {close}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: typeProps[type].color }]}
              onPress={() => {
                values = formRef.current.values
                onPress(values.password)
                onClose()
              }}
            >
              <Text
                style={{ color: colorsByTheme.white_black, fontWeight: '500' }}
              >
                {button}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.btn, { backgroundColor: colorCalcualted(color) }]}
              onPress={handleClose}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {button}
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* <View
            style={{
              flex: 1,
              justifyContent: alignment,
              alignItems: 'center',
              marginTop: 33,
              paddingTop: 33,
              backgroundColor: 'blue',
              width: 200,
              flexDirection: 'column',
            }}
          >
          </View>
          <View style={{ backgroundColor: 'pink', width: '100%' }}>
            <MyText
              textColor="black"
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                backgroundColor: 'pink',
              }}
            >
              Helloooo
            </MyText>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignItems: alignment,
              backgroundColor: 'green',
            }}
          >
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colorCalcualted(color) }]}
              onPress={handleClose}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {button}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  iconCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    //marginBottom: 5,
    // alignSelf: 'stretch',
    height: 40,
    width: 80,
    // marginHorizontal: 50,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  error: {
    fontWeight: 'bold',
  },
})

export default UpdatedAlertMessage
