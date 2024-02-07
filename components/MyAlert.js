import { Modal, Dimensions } from 'react-native'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
// import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Screen } from 'react-native-screens'
//import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ALERT_WIDTH = SCREEN_WIDTH - SCREEN_WIDTH / 4

const FancyAlert = ({ visible, handleClose, icon, message, button }) => (
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
        <View style={[
            styles.iconCircle,
            { top: 32, borderColor: 'white', zIndex: 1 },
          ]}>
          <View style={[styles.icon, { borderRadius: 32 }]}>
            <MaterialCommunityIcons name={icon} size={24} color="white" />
          </View>
        </View>
      <View style={[styles.content]}>
        <Text style={styles.contentText}>{message}</Text>
        <TouchableOpacity style={styles.btn} onPress={handleClose}>
          <Text style={styles.btnText}>{button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)
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
    backgroundColor: "blue",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: ALERT_WIDTH,
    paddingVertical: 16,
    // bottom: -32,
    // paddingHorizontal: 8,
    height: 120,
    borderRadius: 16,
    // backgroundColor: '#EEEEEE',
    // paddingBottom: 16,
  },
  iconCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // btnPrimary: {
  //   width: ALERT_WIDTH - 16,
  //   margin: 8,
  //   padding: 8,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 32,
  // },
  btn: {
    borderRadius: 8,
    // display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#C3272B',
    height: 40,
    marginHorizontal: 50
    // marginTop: 16,
    // paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  icon: {
    flex: 1,
    //display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
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

export default FancyAlert
