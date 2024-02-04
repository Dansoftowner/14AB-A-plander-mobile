import React, { useContext } from 'react'
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
import AssContext from '../AssContext'

function AutoComplete({ data, onChangeText, selectAssociation }) {
  const { colors: colorsByTheme } = useTheme()
  const { association, setAssociation } = useContext(AssContext)
  const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback>
      <View>
        {/* <MyFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="police-badge-outline"
          name="association"
          placeholder={i18n.t('association')}
          onChangeText={onChangeText} 
        />*/}
        <MyTextInput
          onChangeText={(text) => selectAssociation(text)}
          icon="magnify"
          title={association.name ?? 'Association'}
          //value={values['associationId']}
          style={{ marginVertical: 2, borderRadius: 15 }}
        />
        {/* <MyButton title='showData' onPress={() => console.log(data)}/> */}
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={[
            styles.list,
            { backgroundColor: colorsByTheme.white_black, borderRadius: 15 },
          ]}
          data={data}
          renderItem={
            ({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login')
                  setAssociation(item)
                  //setFieldValue('associationId', item._id)
                }}
                // setFieldValue('associationId', item._id)}
              >
                <MyText
                  style={[styles.text, { color: colorsByTheme.medium_white }]}
                >
                  {item.name}
                </MyText>
              </TouchableOpacity>
            )
            // <TouchableWithoutFeedback onPress={() => console.log(item)}>
            //     <MyText>{item.name}</MyText>
            // </TouchableWithoutFeedback>
          }
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
