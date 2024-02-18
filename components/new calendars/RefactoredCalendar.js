import React, { useRef, useCallback, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
  AgendaList,
  CalendarProvider,
  LocaleConfig,
  Calendar,
} from 'react-native-calendars'
import AgendaItem from '../../components/calendar/AgendaItem'
import { themeColor, lightThemeColor } from '../../components/calendar/theme'
import { useTheme } from '@react-navigation/native'
import colors from '../../config/colors'
import assignments from '../../api/assignments'
import MyButton from '../MyButton'
import MyText from '../MyText'
// import { agendaItems } from '../calendar/agendaItems'

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
    'vasárnap',
    'hétfő',
    'kedd',
    'szerda',
    'csütörtök',
    'péntek',
    'szombat',
  ],
  dayNamesShort: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
  today: 'Ma',
}

export default function RefactoredCalendar(props) {
  const leftArrowIcon = require('../../assets/arrows/previous.png')
  const rightArrowIcon = require('../../assets/arrows/next.png')
  const [markedDays, setMarkedDays] = useState(null)
  const [agendaItems, setAgendaItems] = useState(null)
//   const ITEMS = agendaItems
  const { colors: colorsByTheme } = useTheme()
  const periodColor = colors.light_green
  const dotColor = colors.light_yellow
  const calendarTheme = {
    backgroundColor: colorsByTheme.white_black,
    calendarBackground: colorsByTheme.white_black,
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: colors.soft_blue,
    selectedDayTextColor: '#ffffff',
    todayBackgroundColor: colorsByTheme.light_blue_dark_blue,
    todayTextColor: colorsByTheme.white_black,
    dayTextColor: 'black',
    textDisabledColor: colors.light,
    arrowColor: colorsByTheme.medium_blue_yellow,
  }
  useEffect(() => {
    getMarkedDays()
    getAgendaItems()
  }, [])

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}` //Example: 2024-02-03
  }

  function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function getDaysDifference(startDate, endDate) {
    const differenceMs = endDate.getTime() - startDate.getTime()
    const differenceDays = differenceMs / (1000 * 60 * 60 * 24)
    return Math.abs(Math.round(differenceDays))
  }

  function getHoursDifference(startDate, endDate) {
    const differenceMs = endDate.getTime() - startDate.getTime()
    const differenceHours = differenceMs / (1000 * 60 * 60)
    return Math.abs(Math.round(differenceHours))
  }

  const getMarkedDays = async () => {
    const markedDays = {}
    const result = await assignments.getAssignments()
    if (!result?.ok) {
      console.log(result)
    } else {
      result.data.items.forEach((element) => {
        const i = convertMarkedEvent(element)
        if (i.type == 'dot') {
          markedDays[i.date] = i.marking
        } else {
          markedDays[i.dateStart] = i.markingStart
          markedDays[i.dateEnd] = i.markingEnd
          console.log(i.betweenDays.length)
          i.betweenDays.forEach((markedDay) => {
            markedDays[markedDay.date] = markedDay.marking
          })
        }
      })
      setMarkedDays(markedDays)
    }
  }

  const convertMarkedEvent = (assignment) => {
    const startFormattedString = formatDate(new Date(assignment.start))
    const endFormattedString = formatDate(new Date(assignment.end))
    const startDate = new Date(assignment.start)
    const endDate = new Date(assignment.end)
    if (endFormattedString === startFormattedString) {
      const eventObject = {
        type: 'dot',
        date: startFormattedString,
        marking: {
          marked: true,
          dotColor: dotColor,
        },
      }
      return eventObject
    } else {
      const eventObject = {
        type: 'period',
        dateStart: startFormattedString,
        dateEnd: endFormattedString,
        markingStart: {
          startingDay: true,
          color: periodColor,
        },
        markingEnd: {
          endingDay: true,
          color: periodColor,
        },
        betweenDays: [],
      }
      const daysBetweenStartEnd = getDaysDifference(startDate, endDate)
      for (let i = 1; i < daysBetweenStartEnd; i++) {
        const betweenDay = {
          date: formatDate(addDays(startDate, i)),
          marking: {
            color: periodColor,
          },
        }
        eventObject.betweenDays.push(betweenDay)
      }
      return eventObject
    }
  }

  const convertAgendaItem = (assignment) => {
    // const start = new Date(assignment.start)
    // const end = new Date(assignment.end)
    const startFormattedString = formatDate(new Date(assignment.start))
    const endFormattedString = formatDate(new Date(assignment.end))
    //const duration = getHoursDifference(start, end)
    const titleDate = formatDate(new Date(assignment.start))
    //const hour = new Date(assignment.start).getHours()
    const title = assignment.title
    const eventObject = {
      title: titleDate,
      data: [
        {
          //duration: duration + ' óra',
          //hour: hour,
          _id: assignment._id,
          title: title,
          color: startFormattedString == endFormattedString ? dotColor : periodColor
        },
      ],
    }
    return eventObject
  }

  const getAgendaItems = async () => {
    const result = await assignments.getAssignments()
    if (!result?.ok) {
    } else {
      // marked = result.data
      const eventsVector = []
      result.data.items.forEach((element) => {
        const i = convertAgendaItem(element)
        eventsVector.push(i)
      })
      console.log(eventsVector)
      setAgendaItems(eventsVector)
      //const markedDays = result.data.items.map(item => {})
      //return result.data.items
    }
  }

  const [selected, setSelected] = useState('')

  const renderItem = useCallback(({ item }) => {
    return <AgendaItem item={item} dotColor={item.color} onPress={() => console.log('szerkesztés')} onItemPress={() => console.log(item)}/>
  }, [])

  LocaleConfig.defaultLocale = 'hu'
  return (
    <>
      <CalendarProvider
      //date={new Date()}
      //showTodayButton={true}
      //theme={todayBtnTheme.current}
      >
        <Calendar
          //current={Date.now()}
          onDayPress={(day) => {
            console.log('selected day', day)
            setSelected(day.dateString)
          }}
          monthFormat={'yyyy MMMM'}
          style={[styles.calendar, { borderColor: colors.light }]}
          disableWeekScroll
          theme={calendarTheme}
          firstDay={1}
          markingType={'period'}
          markedDates={markedDays}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        />
        <AgendaList
          sections={agendaItems ?? []}
          renderItem={renderItem}
          // scrollToNextEvent
          sectionStyle={styles.section}
          dayFormat={'MMMM d'}
        />
      </CalendarProvider>
      {/* <MyButton onPress={() => getAgendaItems()}></MyButton> */}
      {/* <MyText textColor="black">{JSON.stringify(agendaItemsMine ?? [])}</MyText> */}
      {/* <MyText textColor="black">{JSON.stringify(ITEMS ?? [])}</MyText> */}
    </>
  )
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 400,
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden',
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
