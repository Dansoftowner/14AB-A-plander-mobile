import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import MyFormField from './MyFormField'
import i18n from '../locales/i18n'
import MyButton from './MyButton'
import MyText from './MyText'
import MyTextInput from './MyTextInput'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import colors from '../config/colors'

function AssociationsAutoComplete({ data, selectAssociation, setFieldValue }) {
  const { colors: colorsByTheme } = useTheme()
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback>
      <View>
        <MyTextInput
          onChangeText={(text) => {
            selectAssociation(text)
          }}
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
          }}
          style={[
            styles.list,
            { backgroundColor: 'white', borderRadius: 15, flexGrow: 0 },
          ]}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setFieldValue('association', item)
                navigation.navigate('Login')
              }}
            >
              <MyText style={[styles.text, { color: colors.medium_dark }]}>
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
  container: {},
  // list: {
  //   height: '80%',
  // },
  text: {
    paddingVertical: 2,
  },
})

export default AssociationsAutoComplete
