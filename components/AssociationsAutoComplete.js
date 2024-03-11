import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import { useTheme, useNavigation } from '@react-navigation/native'

import routes from '../navigation/routes'

import MyText from './MyText'
import MyTextInput from './MyTextInput'

function AssociationsAutoComplete({ data, selectAssociation, setFieldValue }) {
  const { colors: colorsByTheme } = useTheme()
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback>
      <View>
        <MyTextInput
          onChangeText={(text) => selectAssociation(text)}
          icon="magnify"
          style={{
            marginVertical: 2,
            borderRadius: 15,
            color: colorsByTheme.white_black,
          }}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            backgroundColor: colorsByTheme.white_dark_blue,
            overflow: 'hidden',
            borderRadius: 10
          }}
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setFieldValue('association', item)
                navigation.navigate(routes.LOGIN)
              }}
            >
              <MyText style={[styles.text, { color: colorsByTheme.black_white }]}>
                {item.name ?? ''}
              </MyText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexGrow: 0,
  },
  text: {
    paddingVertical: 2,
  },
})

export default AssociationsAutoComplete
