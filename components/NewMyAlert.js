import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Screen } from 'react-native-screens'

function NewMyAlert({ visible, icon, message, button, handleClose }) {
  // const [alertVisible, setAlertVisible] = useState(false)

  // const handlePress = useCallback(() => {
  //   setAlertVisible(true)
  // }, [])

  // const handleClose = useCallback(() => {
  //   setAlertVisible(false)
  // }, [])
  return (
    // <Screen style={styles.container}>
    <FancyAlert
      style={styles.alert}
      //icon={}
      //onRequestClose={handleClose}
      //visible={visible}
    >
      <View style={styles.content}>
      </View>
    </FancyAlert>
    // </Screen>
  )
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  alert: {
  },
  
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
    // color: 'blue'
  },
})

export default NewMyAlert
