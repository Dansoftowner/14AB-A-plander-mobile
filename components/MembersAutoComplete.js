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
import MemberListItem from '../screens/MemberListItem'
import EditField from './EditField'

function MembersAutoComplete({
  data,
  onSelectMember,
  selectAssociation,
  setFieldValue,
}) {
  const { colors: colorsByTheme } = useTheme()
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback>
      <View>
        <MyTextInput
          icon="magnify"
          onChangeText={(text) => {
            onSelectMember(text)
          }}
          style={{ marginVertical: 2, borderRadius: 15 }}
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
                //onSelectMember(item._id)
                navigation.navigate('EditAssignment', { id: -1, member: item })
                // setFieldValue('association', item)
              }}
            >
              {item?.name && 
              (
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
})

export default MembersAutoComplete
