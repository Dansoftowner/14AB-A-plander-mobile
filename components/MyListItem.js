import React from 'react'

import { View, StyleSheet } from 'react-native'

import MyText from './MyText'
import SmallButton from './SmallButton'

function MyListItem({ onPress, item }) {
  return (
    <View style={styles.container}>
      <MyText textColor="black">{item.name}</MyText>
      <SmallButton
        type="delete"
        onPress={() => onPress(item)}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    margin: 5,
  },
  container: {
    padding: 5,
    width: 350,
    borderRadius: 5,
  },
})

export default MyListItem
