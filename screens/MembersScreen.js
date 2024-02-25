import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import colors from '../config/colors'
import membersApi from '../api/members'

import Screen from './Screen'
import MembersAutoComplete from '../components/MembersAutoComplete'

function MembersScreen() {
  const [members, setMembers] = useState([])
  const handleGetMembers = async (q) => {
    const result = await membersApi.getMembers(q)
    if (!result.ok) {
      return console.log(result) //TODO Hibakezelés
    }
    setMembers([...result.data.items])
  }

  useEffect(() => {
    handleGetMembers()
  }, [])

  return (
    <Screen style={[styles.container, { backgroundColor: colors.medium_blue }]}>
      <MembersAutoComplete
        data={members}
        onSelectMember={(text) => handleGetMembers(text)}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
})

export default MembersScreen
