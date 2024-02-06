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

function AutoComplete({
  data,
  handleChange,
  values,
  onChangeText,
  selectAssociation,
  setFieldValue,
}) {
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
          style={{ marginVertical: 2, borderRadius: 15 }}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={[
            styles.list,
            { backgroundColor: colorsByTheme.white_black, borderRadius: 15 },
          ]}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setFieldValue('association', item)
                navigation.navigate('Login')
                //console.log(item)
              }}
            >
              <MyText
                style={[styles.text, { color: colorsByTheme.medium_white }]}
              >
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
  list: {
    height: '80%',
  },
  text: {
    paddingVertical: 2,
  },
})

export default AutoComplete
