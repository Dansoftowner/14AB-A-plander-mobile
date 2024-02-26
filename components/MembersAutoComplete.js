import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import colors from '../config/colors'
import routes from '../navigation/routes'

import MyText from './MyText'
import MyTextInput from './MyTextInput'

function MembersAutoComplete({ data, onSelectMember }) {
  const navigation = useNavigation()
  const route = useRoute()
  const handleSelectedMember = (item) => {
    console.log(item)
    if (route.params.path === 'add') {
      navigation.navigate(routes.ADD_ASSIGMENT, {
        id: -1,
        member: item,
      })
    }
    if (route.params.path === 'edit') {
      navigation.navigate(routes.EDIT_ASSIGMENT, {
        id: -1,
        member: item,
      })
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View>
        <MyTextInput
          icon="magnify"
          onChangeText={(text) => {
            onSelectMember(text)
          }}
          style={styles.input}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectedMember(item)}>
              {item?.name && (
                <MyText style={[styles.text, { color: colors.medium_dark }]}>
                  {item.name}
                </MyText>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {},
  text: {
    paddingVertical: 2,
  },
  input: {
    marginVertical: 2,
    borderRadius: 15,
  },
  list: {
    backgroundColor: 'white',
    borderRadius: 15,
  },
})

export default MembersAutoComplete
