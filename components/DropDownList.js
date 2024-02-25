import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import MyText from './MyText'
import colors from '../config/colors'
import { useTheme } from '@react-navigation/native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
function DropDownList({ data, onChange, value }) {
  const [isFocus, setIsFocus] = useState(false)
  const { colors: colorsByTheme } = useTheme()


  return (
    <View style={[styles.container, {backgroundColor: colorsByTheme.white_black}]}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors.dark_blue, borderWidth: 2 },
          { borderColor: colorsByTheme.black_white},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, {color: colorsByTheme.black_white}]}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder=""
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item)
          setIsFocus(false)
        }}
        //   renderLeftIcon={() => (
        //     <MaterialCommunityIcons
        //       style={styles.icon}
        //       color={isFocus ? 'blue' : 'black'}
        //       name="card"
        //       size={20}
        //     />
        //   )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    height: 60,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
})

export default DropDownList
