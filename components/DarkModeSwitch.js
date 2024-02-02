import React, { useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyText from './MyText'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'

import { Appearance } from 'react-native'

import i18n from '../locales/i18n'

function DarkMode({lightMode}) {
    const colorMode = Appearance.getColorScheme()
    const { colors: colorsByTheme } = useTheme()
      const handleOnPress = () => {
        if (colorMode === 'light') {
            Appearance.setColorScheme('dark')
            console.log('Dark Mode')
        }
        else{
            Appearance.setColorScheme('light')
            console.log('Light Mode')
        }
      }
      return (
        <View style={[styles.container, {backgroundColor: colorsByTheme.medium_blue_dark_blue}]}>
        <TouchableWithoutFeedback onPress={handleOnPress}>

        <MaterialCommunityIcons
          name={colorMode === 'light' ? 'white-balance-sunny' :'star-crescent'}
          size={30}
          color={colorsByTheme.white_white}
        />
        </TouchableWithoutFeedback>
        <MyText style={[styles.text, { color: colorsByTheme.white_white }]}>
          {colorMode === "light" ? i18n.t('lightmode') : i18n.t('darkmode')}
        </MyText>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        fontWeight: '700',
        marginLeft: 10,
      },
});

export default DarkMode;