import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from '../components/MyText'
import Screen from './Screen'
import { useTheme } from '@react-navigation/native'
import AutoComplete from '../components/AutoComplete'
import AssociationSelector from '../components/AssociationSelector'
import MyButton from '../components/MyButton'
import associationsHook from '../api/associations'
import MyForm from '../components/MyForm'
import AssContext from '../AssContext'

function AssociationsScreen(props) {
  const { colors: colorsByTheme } = useTheme()
  const [associations, setAssociations] = useState()
  // const handleSelectAssociation = (item) => {
  //   console.log(item)
  // }

  const handleGetAssociations = async (q) => {
    const result = await associationsHook.getAssociations(q)
    if (!result.ok) {
      return console.log(result)
    }
    //console.log(result.data)
    setAssociations([...result.data.items])
    console.log(associations.length)
  }

  useEffect(() => {
    handleGetAssociations('')
  }, [])

  return (
    <Screen
      style={[
        styles.container,
        { backgroundColor: colorsByTheme.Login_background },
      ]}
    >
      {/* <MyForm initialValues={{ associationId: '' }} style={styles.form}> */}
      {/* <MyButton title="getAssociations" onPress={handleGetAssociations('')} /> */}
      <AssContext.Provider value={{ association, setAssociation }}>
        <AutoComplete
          data={associations}
          selectAssociation={(text) => handleGetAssociations(text)}
        />
      </AssContext.Provider>
      {/* </MyForm> */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
})

export default AssociationsScreen
