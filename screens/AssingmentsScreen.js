import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'

LocaleConfig.locales['hu'] = {
    monthNames: [
        'január',
        'február',
       'március',
        'április',
       'május',
        'június',
        'július',
        'augusztus',
       'szeptember',
        'október',
        'november',
        'december',
    ],
    monthNamesShort: [
        'jan',
        'feb',
       'márc',
        'ápr',
       'máj',
        'jún',
        'júl',
        'aug',
       'szept',
        'okt',
        'nov',
        'dec',
    ],
    dayNames: [
       'hétfő',
        'kedd',
        'szerda',
        'csütörtök',
        'péntek',
       'szombat',
       'vasárnap',
    ],
    dayNamesShort: ['H', 'K', 'Sz', 'Cs', 'P','Sz','V'],
    today: "Ma"
}
function AssingmentsScreen(props) {
    const { colors: colorsByTheme } = useTheme()

  const [selected, setSelected] = useState('')
    LocaleConfig.defaultLocale = 'hu'
  return (
    <Calendar
      style={{
        borderWidth: 1,
        borderColor: colors.light,
        height: 350,
        borderRadius: 10,
        margin: 5
      }}
      // Specify the current date
      current={Date.now()}
      // Callback that gets called when the user selects a day
      onDayPress={day => {
        console.log('selected day', day);
        setSelected(day.dateString)
      }}
      monthFormat={'MM yyyy'}
      // Mark specific dates as marked
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'black'},
        '2024-02-01': {selected: true, marked: true, selectedColor: 'blue'},
        '2012-03-02': {marked: true},
        '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
      }}
      theme={{
        backgroundColor: colorsByTheme.white_black,
        calendarBackground: colorsByTheme.white_black,
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayBackgroundColor: colorsByTheme.light_blue_dark_blue,
        todayTextColor: colorsByTheme.black_white,
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e',
        arrowColor: colorsByTheme.medium_blue_yellow,
    }}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default AssingmentsScreen
