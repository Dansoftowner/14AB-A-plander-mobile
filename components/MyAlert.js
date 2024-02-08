import { Modal, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
// import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'

import { Screen } from 'react-native-screens'
//import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ALERT_WIDTH = SCREEN_WIDTH - SCREEN_WIDTH / 4


export default function FancyAlert({ visible, handleClose, icon, message, button }) {
  const { colors: colorsByTheme } = useTheme()
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
        <View style={[styles.icon, { borderRadius: 32, backgroundColor: colorsByTheme.medium_red_light_red }]}>
          <MaterialCommunityIcons name={icon} size={24} color="white" />
        </View>
      </View>
      <View style={[styles.content, {backgroundColor: 'white'}]}>
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 33
            }}
          >
            <Text style={{color: 'black'}}>{message}</Text>
          </View>
          <View style={{ backgroundColor: 'pink', marginBottom: 10, alignItems: 'center'}}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colorsByTheme.medium_red_light_red}]} onPress={handleClose}>
              <Text style={{color: 'white', fontWeight: '500'}}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>)
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
    width: 120
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

