import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react'
import { StyleSheet, View } from 'react-native'
import {
  AgendaList,
  CalendarProvider,
  LocaleConfig,
  Calendar,
} from 'react-native-calendars'
import AgendaItem from '../components/calendar/AgendaItem'
import { themeColor, lightThemeColor } from '../components/calendar/theme'
import { useTheme } from '@react-navigation/native'
import colors from '../config/colors'
import assignments from '../api/assignments'
import MyButton from '../components/MyButton'
import MyText from '../components/MyText'
import AuthContext from '../auth/authContext'
import dateTranslationHU from '../locales/hu/date'
import dateTranslationEN from '../locales/hu/date'
import i18n from '../locales/i18n'
import languageContext from '../locales/LanguageContext'
import routes from '../navigation/routes'
import { endOfDay } from 'date-fns'
import MyAlert from '../components/MyAlert'
LocaleConfig.locales['hu'] = dateTranslationHU
LocaleConfig.locales['en'] = dateTranslationEN

export default function ReportScreen({ navigation, route }) {
  const leftArrowIcon = require('../assets/arrows/previous.png')
  const rightArrowIcon = require('../assets/arrows/next.png')
  const [markedDays, setMarkedDays] = useState(null)
  const [agendaItems, setAgendaItems] = useState(null)
  const { colors: colorsByTheme } = useTheme()
  const periodColor = colors.light_green
  const dotColor = colors.orange
  const { language } = useContext(languageContext)
  const { user, setUser } = useContext(AuthContext)

  const [infoShown, setInfoShown] = useState(false)

  const calendarTheme = {
    backgroundColor: colorsByTheme.white_darker_blue,
    calendarBackground: colorsByTheme.white_darker_blue,
    textSectionTitleColor: colorsByTheme.medium_white,
    selectedDayBackgroundColor: colors.soft_blue,
    selectedDayTextColor: '#ffffff',
    monthTextColor: colorsByTheme.medium_white,
    //todayBackgroundColor: colorsByTheme.light_blue_dark_blue,
    // todayTextColor: 'red',
    dayTextColor: colorsByTheme.black_white,
    textDisabledColor: colors.light,
    arrowColor: colorsByTheme.medium_blue_yellow,
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAgendaItems()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    getMarkedDays()
    getAgendaItems()
  }, [route.params?.delete])

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
    const result = await assignments.getAssignments(
      endOfDay(new Date()).toISOString(),
    )
    if (!result?.ok) {
      console.log(result)
    } else {
      result.data.items.forEach((element) => {
        const i = convertMarkedEvent(element)
        if (i.type == 'dot') {
          markedDays[i.date] = i.marking
        } else {
          if (i.isOneDay) {
            markedDays[i.start] = i.marking
          }
          if (i.betweenDays) {
            markedDays[i.dateStart] = i.markingStart
            markedDays[i.dateEnd] = i.markingEnd
            console.log(i.betweenDays.length)
            i.betweenDays.forEach((markedDay) => {
              markedDays[markedDay.date] = markedDay.marking
            })
          } else {
            markedDays[i.start] = i.marking
          }
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
    const assignees = assignment.assignees
    console.log(assignment.assignees, assignment.start)
    const isAssigned = assignees
      .map((ass) => ass._id == user._id)
      .includes(true)
    console.log(isAssigned)
    if (isAssigned) {
      if (endFormattedString === startFormattedString) {
        const eventObject = {
          type: 'period',
          isOneDay: true,
          start: startFormattedString,
          marking: {
            // marked: true,
            startingDay: startFormattedString,
            endingDay: startFormattedString,
            color: periodColor,
          },
        }
        return eventObject
      } else {
        const eventObject = {
          type: 'period',
          isOneDay: false,
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
    } else {
      const eventObject = {
        type: 'dot',
        date: startFormattedString,
        marking: {
          marked: true,
          dotColor: dotColor,
        },
      }
      return eventObject
    }
  }

  const convertAgendaItem = (assignment) => {
    const startFormattedString = formatDate(new Date(assignment.start))
    const endFormattedString = formatDate(new Date(assignment.end))
    const titleDate = formatDate(new Date(assignment.start))
    const title = assignment.title
    const hasReport = assignment?.report
    console.log(hasReport)
    const eventObject = {
      title: titleDate,
      data: [
        {
          _id: assignment._id,
          title: title,
          start: assignment.start,
          color: hasReport ? periodColor : dotColor,
          assignees: assignment.assignees,
          hasReport: hasReport
        },
      ],
    }
    return eventObject
  }

  const convertVector = (vector) => {
    const array = []
    vector.forEach((item) => {
      const existingItemIndex = array.findIndex(
        (obj) => obj.title === item.title,
      )
      if (existingItemIndex !== -1) {
        array[existingItemIndex].data = array[existingItemIndex].data.concat(
          item.data,
        )
      } else {
        array.push(item)
      }
    })
    return array
  }

  const getAgendaItems = async () => {
    const result = await assignments.getAssignments(
      endOfDay(new Date()).toISOString(),
    )
    if (!result?.ok) {
    } else {
      const eventsVector = []
      result.data.items.forEach((element) => {
        const i = convertAgendaItem(element)
        eventsVector.push(i)
      })
      //console.log(eventsVector)
      const newArray = convertVector(eventsVector)
      //console.log(newArray)
      setAgendaItems(newArray)
    }
  }

  const handleReportTouched = (assignment) => {
    // console.log(user._id)
    // console.log(assignment.assignees)
    const isAssigned = assignment.assignees
    .map((ass) => ass._id == user._id)
    .includes(true)
    if (!isAssigned) {
        return setInfoShown(true)
    }
    console.log(assignment)
    if (assignment.hasReport == null) {
      return navigation.navigate(routes.ADD_REPORT, {id: assignment._id})
    }
    return navigation.navigate(routes.EDIT_REPORT, {id: assignment._id})
  }

  const [selected, setSelected] = useState('')

  const renderItem = useCallback(({ item }) => {
    return (
      <AgendaItem
        isReport={true}
        item={item}
        dotColor={item.color}
        onItemPress={() => {
          handleReportTouched(item)
        }}
        key={item._id}
      />
    )
  }, [])

  LocaleConfig.defaultLocale = language

  return (
    <>
      <CalendarProvider date={new Date().toDateString()}>
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
          sectionStyle={[
            styles.section,
            {
              backgroundColor: colorsByTheme.white_dark_blue,
              color: colors.medium,
            },
          ]}
          dayFormat={'MMMM d'}
        />
      </CalendarProvider>
      <MyAlert
        visible={infoShown}
        type="info"
        size="small"
        button={i18n.t('close')}
        message={i18n.t('notAssigned')}
        onClose={() => {
          setInfoShown(false)
        //   navigation.navigate(routes.ASSIGNMENTS)
        }}
      />
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
    textTransform: 'capitalize',
  },
})
