import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import MyText from './MyText'
import MyButton from './MyButton'
import { useTheme } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import EditField from './EditField'

function MemberListItem({ onPress, item }) {
  return (
    <View style={{ padding: 5, width: 350, borderRadius: 5 }}>
      <MyText textColor="black">{item.name}</MyText>
      <EditField
        type="delete"
        onPress={() => onPress(item)}
        style={{ position: 'absolute', right: 0, margin: 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default MemberListItem
