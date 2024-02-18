import React, { useRef, useCallback, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  LocaleConfig,
  Calendar,
} from 'react-native-calendars'
//import { agendaItems, getMarkedDates } from './agendaItems'
import AgendaItem from './AgendaItem'
import { getTheme, themeColor, lightThemeColor } from './theme'

const leftArrowIcon = require('../../assets/arrows/previous.png')
const rightArrowIcon = require('../../assets/arrows/next.png')
//const ITEMS = agendaItems;

import { useTheme } from '@react-navigation/native'
import colors from '../../config/colors'
import assignments from '../../api/assignments'
import MyButton from '../MyButton'
import MyText from '../MyText'

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
  dayNamesShort: ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'],
  today: 'Ma',
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Month is zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}


const destructureItem = (assignment) => {
  const start = new Date(assignment.start)
  const end = new Date(assignment.end)
  const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  console.log(duration)
  const titleDate = formatDate(new Date(assignment.start))
  const hour = new Date(assignment.start).getHours()
  console.log(new Date(assignment.start))
  const title = assignment.title
  const eventObject = {
    title: titleDate,
    data: {
      duration: duration,
      hour: hour,
      title: title
    },
  }
  console.log(eventObject)
  return eventObject
}

const destructureDay = (assignment) => {
  const start = formatDate(new Date(assignment.start))
  const end = formatDate(new Date(assignment.end))
  //console.log(start.getDay(), end.getDay())
  if (end === start) {
    console.log('dot')
    const eventObject = {
      type: 'dot',
      date: start,
      marking: {
        marked: true,
        selectedColor: 'yellow',
      },
    }
    console.log(eventObject)
    return eventObject
  } else {
    console.log('period')
    const eventObject = {
      type: 'period',
      dateStart: start,
      dateEnd: end,
      markingStart: {
        startingDay: true,
        color: 'green',
      },
      markingEnd: {
        endingDay: true,
        color: 'green',
      },
    }
    console.log(eventObject)
    return eventObject
  }
}

const ExpandableCalendarScreen = (props) => {

  const itemsAgenda = async () => {
    const result = await assignments.getAssignments()
    if (!result?.ok) {
      console.log(result)
    } else {
      // marked = result.data
      console.log(result.data.items)
      const eventsVector = []
      result.data.items.forEach((element) => {
        console.log(element)
        const i = destructureItem(element)
        eventsVector.push(i)
      })
      console.log(eventsVector)
      console.log(eventsVector)
      return eventsVector
      //const markedDays = result.data.items.map(item => {})
      //return result.data.items
    }
  }

  const agendaItems = itemsAgenda()


  const getMarkedDays = async () => {
    const result = await assignments.getAssignments()
    if (!result?.ok) {
      console.log(result)
    } else {
      // marked = result.data
      console.log(result.data.items)
      const markedDayObject = {}
      result.data.items.forEach((element) => {
        console.log(element)
        const i = destructureDay(element)
        if (i.type == 'dot') {
          markedDayObject[i.date] = i.marking
        } else {
          markedDayObject[i.dateStart] = i.markingStart
          markedDayObject[i.dateEnd] = i.markingEnd
        }
      })
      console.log(markedDayObject)
      console.log(...markedDayObject)
      return markedDayObject
      //const markedDays = result.data.items.map(item => {})
      //return result.data.items
    }
  }
  // const {weekView} = props;
  // const marked = getMarkedDays();
  // const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  })
  const [selected, setSelected] = useState('')
  //const marked = getMarkedDays()
  const { colors: colorsByTheme } = useTheme()
  const marked = getMarkedDays()
  console.log(marked)
  // {
  //   '2024-02-15': { marked: true, selectedColor: 'yellow' },
  //   '2024-02-19': { color: 'green', startingDay: true },
  //   '2024-02-20': { color: 'green'},
  //   '2024-02-21': { color: 'green', endingDay: true },
  //   '2024-02-18': {marked: true, dotColor: 'red'},
  // }
  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({item}) => {
    return <AgendaItem item={item}/>;
  }, []);
  LocaleConfig.defaultLocale = 'hu'

  return (
    <>
      <CalendarProvider
        date={new Date()}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        theme={todayBtnTheme.current}
        // todayBottomMargin={16}
      >
        <Calendar
          //current={Date.now()}
          onDayPress={(day) => {
            console.log('selected day', day)
            setSelected(day.dateString)
          }}
          monthFormat={'yyyy MMMM'}
          style={{
            //borderWidth: 1,
            borderColor: colors.light,
            height: 350,
            borderRadius: 10,
            margin: 5,
            overflow: 'hidden',
          }}
          disableWeekScroll
          theme={{
            backgroundColor: colorsByTheme.white_black,
            calendarBackground: colorsByTheme.white_black,
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayBackgroundColor: colorsByTheme.light_blue_dark_blue,
            todayTextColor: colorsByTheme.white_black,
            dayTextColor: 'black',
            textDisabledColor: colors.light,
            arrowColor: colorsByTheme.medium_blue_yellow,
          }}
          firstDay={0}
          markingType={'period'}
          markedDates={
            {
            // [selected]: {
            //   selected: true,
            //   disableTouchEvent: true,
            //   selectedDotColor: 'black',
            // },
            //marked
            '2024-02-15': { marked: true, selectedColor: 'yellow' },
            '2024-02-19': { color: 'green', startingDay: true },
            '2024-02-19': {dotColor: 'red'},
            '2024-02-20': { color: 'green'},
            '2024-02-21': { color: 'green', endingDay: true },
            '2024-02-18': {marked: true, dotColor: 'red'},
          }
            // '2012-05-17': {marked: true},
            // '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            // '2012-05-19': {disabled: true, disableTouchEvent: true}
          }
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        />
        <AgendaList
        sections={agendaItems}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        dayFormat={'MMMM d'}
      />
      </CalendarProvider>
      {/* <MyButton onPress={itemsAgenda} /> */}
      {/* <MyText textColor=''>
        {agendaItems[0].title}
      </MyText> */}
    </>
  )
}

export default ExpandableCalendarScreen

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
})
