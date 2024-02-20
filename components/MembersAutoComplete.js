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
  selectAssociation,
  setFieldValue,
}) {
  const { colors: colorsByTheme } = useTheme()
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MyTextInput
        width={300}
          themeColor='black'
          onChangeText={(text) => {
            selectAssociation(text)
          }}
          style={{ marginVertical: 2, borderRadius: 15 }}
        />
        <EditField type='add' style={{position: 'absolute', right: 25}}/>
        </View>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={[
            styles.list,
            {borderColor: 'black', borderWidth: 1, borderRadius: 15 },
          ]}
          data={data}
          renderItem={({ item }) => (
            <MemberListItem
              onPress={() => {
                setFieldValue('association', item)
                navigation.navigate('Login')
              }}
              name={item.name}
            >
              {/* <MyText
                style={[styles.text, { color: colors.medium_dark}]}
              >
                {item.name ?? ''}
              </MyText> */}
            </MemberListItem>
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
