import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from './Screen'
import MyText from '../components/MyText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
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

function ProfileScreen(props) {
  const { user } = useAuth()
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="account-circle" size={200} color="black" />
      <MyText textColor="black">{user.username}</MyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default ProfileScreen
