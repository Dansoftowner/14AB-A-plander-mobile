import React, { useCallback, useState } from 'react'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'
import FancyAlert from '../components/MyAlert'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Screen } from 'react-native-screens'

function AlertScreen(props) {
  const [alertVisible, setAlertVisible] = useState(false)

  const handlePress = useCallback(() => {
    setAlertVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setAlertVisible(false)
  }, [])

  return (
    <View style={styles.container}>
        <FancyAlert
          style={styles.alert}
          icon={
            <View style={[styles.icon, { borderRadius: 32 }]}>
              <MaterialCommunityIcons name="check" size={24} color="black" />
            </View>
          }
          onRequestClose={handleClose}
          visible={alertVisible}
        >
          <View style={styles.content}>
            <Text style={styles.contentText}>Failed Successfully</Text>
            <TouchableOpacity style={styles.btn} onPress={handleClose}>
              <Text style={styles.btnText}>Okay :(</Text>
            </TouchableOpacity>
          </View>
        </FancyAlert>

        <Button onPress={handlePress} title="Show Alert" />
        <Text>
            Hali
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
    width: '100%',
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
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#C3272B',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
})

export default AlertScreen
