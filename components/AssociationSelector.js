import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from './MyText'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import MyFormField from './MyFormField'
import i18n from '../locales/i18n'
// import {RemoteDataSetExample2} from './Test'
import AutoComplete from './AutoComplete'
function AssociationSelector({ associations }) {
  const [selectedItem, setSelectedItem] = useState()
  return (
    <AutocompleteDropdownContextProvider>
      <AutoComplete data={associations}/>
      {/* <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
        ]}>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: '2' }} // or just '2'
          onSelectItem={setSelectedItem}
          dataSet={[
            { id: '1', title: 'Alpha' },
            { id: '2', title: 'Beta' },
            { id: '3', title: 'Gamma' },
          ]}
        />
        </View> */}
        
        {/* {associations.map((association) => (
          <MyText key={association._id} style={styles.text}>
            {association.name}
          </MyText>
        ))} */}
    </AutocompleteDropdownContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  rightButtonsContainer: {
    backgroundColor: 'blue',
  },
  suggestionsListContainer: {
    backgroundColor: 'green',
  },
  suggestionsListTextStyle: {
    color: 'pink',
  },
  inputContainer: {
    backgroundColor: 'magenta',
  },
})

export default AssociationSelector
