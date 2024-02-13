import { Modal, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
// import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

import { Screen } from 'react-native-screens'
import MyText from './MyText'
//import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ALERT_WIDTH = SCREEN_WIDTH - SCREEN_WIDTH / 4

export default function FancyAlert({
  visible,
  handleClose,
  icon,
  message,
  button,
  color,
  title,
  alignment,
}) {
  const { colors: colorsByTheme } = useTheme()
  const colorCalcualted = (color) => {
    if (color === 'red') {
      return colorsByTheme.medium_red_light_red
    }
    if (color === 'green') {
      return colorsByTheme.medium_green_light_green
    }
    if (color === 'yellow') {
      return colorsByTheme.medium_yellow_light_yellow
    }
    if (color === 'blue') {
      return colorsByTheme.medium_blue_light_blue
    }
  }
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* <View style={[styles.iconCircle, { top: 32, borderColor: 'white' }]}>
        <View style={[styles.icon, { borderRadius: 32 }]}>
          <MaterialCommunityIcons name={icon} size={24} color="white" />
        </View>
      </View> */}
        <View
          style={[
            styles.iconCircle,
            { top: 32, borderColor: 'white', zIndex: 1 },
          ]}
        >
          <View
            style={[
              styles.icon,
              { borderRadius: 32, backgroundColor: colorCalcualted(color) },
            ]}
          >
            <MaterialCommunityIcons name={icon} size={24} color="white" />
          </View>
        </View>
        <View style={[styles.content, { backgroundColor: 'white' }]}>
          <View
            style={{
              flex: 1,
              // justifyContent: alignment,
              alignItems: 'center',
              marginTop: 33,
              // paddingTop: 33,
              backgroundColor: 'blue',
              // width: 200,
              flexDirection: 'column',
            }}
          >
            {/* <View
              style={{
                flex: 1,
                // justifyContent: alignment,
                alignItems: 'center',
                marginTop: 33,
                paddingTop: 33,
              }}
            > */}
          </View>
          <View style={{ backgroundColor: 'pink', width: "100%" }}>
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
            {/* <Text style={{ color: 'orange' }}>{message}</Text> */}
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
          </View>
          {/* </View> */}
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: ALERT_WIDTH,
    height: 150,
    borderRadius: 16,
  },
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
    // alignSelf: 'stretch',
    height: 40,
    width: 120,
    // marginHorizontal: 50,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

// FancyAlert.propTypes = {
//   visible: PropTypes.bool.isRequired,
//   icon: PropTypes.node.isRequired,
//   style: PropTypes.object,
//   onRequestClose: PropTypes.func,
// };

// FancyAlert.defaultProps = {
//   style: {},
//   onRequestClose: () => {},
// };
