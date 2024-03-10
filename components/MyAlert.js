import React, { useRef, useState } from 'react'
import { Modal, Dimensions } from 'react-native'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import i18n from '../locales/i18n'

import MyText from './MyText'
import MyFormField from './MyFormField'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

function MyAlert({
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const formRef = useRef()
  const { colors: colorsByTheme } = useTheme()
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
    info: {
      color: colorsByTheme.medium_blue_light_blue,
      icon: 'information',
    },
  }
  const sizeProps = {
    small: {
      width: SCREEN_WIDTH - SCREEN_WIDTH / 4,
      height: 160,
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
  const handleOnPress = () => {
    if (formRef.current !== undefined) {
      values = formRef.current.values
      onPress(values.password)
    }
    onClose()
  }
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(i18n.t('fieldRequired'))
      .label(i18n.t('password'))
      .min(8, i18n.t('zodPasswordLength'))
      .matches(/[A-Z]/, i18n.t('zodPassword'))
      .matches(/[0-9]/, i18n.t('zodPassword')),
  })

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <View
            style={[styles.icon, { backgroundColor: typeProps[type].color }]}
          >
            <MaterialCommunityIcons
              name={typeProps[type].icon}
              size={24}
              color="white"
            />
          </View>
        </View>
        <View
          style={[
            styles.window,
            {
              backgroundColor: colorsByTheme.white_darker_blue,
              width: sizeProps[size].width,
              minHeight: sizeProps[size].height,
              padding: sizeProps[size].height / 20,
            },
          ]}
        >
          {size == 'small' ? (
            <View style={styles.smallMessage}>
              <MyText
                textColor="black"
                style={[styles[type], { textAlign: 'center' }]}
              >
                {message}
              </MyText>
            </View>
          ) : (
            <View
              style={[
                styles.mediumMessage,
                {
                  marginTop: 33 - sizeProps[size].height / 20,
                },
              ]}
            >
              <MyText
                style={[
                  styles.title,
                  {
                    color: colorsByTheme.black_white,
                  },
                ]}
              >
                {title}
              </MyText>
              <MyText
                style={[
                  styles.message,
                  {
                    color: colorsByTheme.black_white,
                  },
                ]}
              >
                {message}
              </MyText>
              <Formik
                initialValues={{ password: '' }}
                validationSchema={validationSchema}
                innerRef={formRef}
              >
                {({ values, handleChange }) => (
                  <View style={{ width: '90%' }}>
                    <MyFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      themeColor={colorsByTheme.black_white}
                      name="password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secureTextEntry={!isPasswordVisible}
                      textContentType="password"
                      isPasswordField={true}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      passwordVisible={isPasswordVisible}
                      showEye={true}
                    />
                  </View>
                )}
              </Formik>
            </View>
          )}
          <View style={styles.btnContainer}>
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
              onPress={() => handleOnPress()}
            >
              <Text style={styles.btnTitle}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  message: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  btnTitle: {
    color: 'white',
    fontWeight: '500',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  iconCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    top: 32,
    borderColor: 'white',
    zIndex: 1,
  },
  btn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    height: 40,
    width: 80,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 32,
  },
  error: {
    fontWeight: 'bold',
  },
  mediumMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  smallMessage: {
    marginTop: 28,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
  },
})

export default MyAlert
