import React, { useCallback, useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native'
import { useTheme } from '@react-navigation/native'
import {
    AgendaList,
    CalendarProvider,
    LocaleConfig,
    Calendar,
} from 'react-native-calendars'

import { differenceInDays, endOfMonth, isEqual, min, startOfDay, startOfMonth } from 'date-fns'

import AuthContext from '../auth/authContext'
import assignments from '../api/assignments'
import colors from '../config/colors'
import i18n from '../locales/i18n'
import languageContext from '../locales/LanguageContext'
import routes from '../navigation/routes'

import dateTranslationHU from '../locales/hu/date'
import dateTranslationEN from '../locales/en/date'

import AgendaItem from '../components/calendar/AgendaItem'
import MyButton from '../components/MyButton'
import MyText from '../components/MyText'

LocaleConfig.locales['hu'] = dateTranslationHU
LocaleConfig.locales['en'] = dateTranslationEN

export default function AssignmentScreen({ navigation, route }) {
    const { colors: colorsByTheme } = useTheme()
    const colorScheme = useColorScheme()
    const [markedDays, setMarkedDays] = useState(null)
    const [monthOfCalendar, setMonthOfCalendar] = useState(new Date())
    const [agendaItems, setAgendaItems] = useState(null)
    const [selected, setSelected] = useState('')
    const leftArrowIcon = require('../assets/arrows/previous.png')
    const rightArrowIcon = require('../assets/arrows/next.png')
    const { language } = useContext(languageContext)
    const { user } = useContext(AuthContext)
    const periodColor = colors.medium_green
    const dotColor = colors.dark_blue
    const calendarThemeLight = {
        backgroundColor: colorsByTheme.white_darker_blue,
        calendarBackground: colors.light_green,
        textSectionTitleColor: colorsByTheme.medium_white,
        selectedDayBackgroundColor: colors.soft_blue,
        selectedDayTextColor: '#ffffff',
        monthTextColor: colorsByTheme.medium_white,
        dayTextColor: colorsByTheme.black_white,
        textDisabledColor: colors.light,
        arrowColor: colorsByTheme.medium_blue_yellow,
    }
    const calendarThemeDark = {
        backgroundColor: colorsByTheme.white_darker_blue,
        calendarBackground: colors.dark_blue,
        textSectionTitleColor: colorsByTheme.medium_white,
        selectedDayBackgroundColor: colors.soft_blue,
        selectedDayTextColor: '#ffffff',
        monthTextColor: colorsByTheme.medium_white,
        dayTextColor: colorsByTheme.black_white,
        textDisabledColor: colors.light,
        arrowColor: colorsByTheme.medium_blue_yellow,
    }
    const markedDaysDummy = {
        '2024-02-15': {
            color: periodColor,
            startingDay: true,
            endingDay: true,
        },
        '2024-02-18': {
            color: periodColor,
            startingDay: true,
            endingDay: true,
            dotColor: dotColor,
            marked: true,
        },
        //'2024-02-18': {dotColor: dotColor, marked: true},
        '2024-02-19': { marked: true, dotColor: dotColor },
        '2024-02-20': { marked: true, dotColor: dotColor },
        '2024-02-21': {
            marked: true,
            dotColor: dotColor,
            startingDay: true,
            color: periodColor,
        },
        '2024-02-22': { endingDay: true, color: periodColor },
        '2024-02-28': { startingDay: true, color: periodColor },
        '2024-02-29': {
            endingDay: true,
            color: periodColor,
            startingDay: false,
        },
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('lefut a navigáció ás a markedDays')
            console.log(monthOfCalendar)
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        console.log(monthOfCalendar)
    }, [monthOfCalendar])

    const getMarkedDays = async (startDate) => {
        console.log(startDate)
        const result = await assignments.getAssignments(startDate, endOfMonth(startDate))
        console.log(result.data.items)
        setMarkedDays(result.data.items)
        convertToMarkedDays(result.data.items)
    }
    const convertToMarkedDays = (items) => {
        const assignedList = []
        const notAssignedList = []
        items.forEach((item) => {
            const startDate = new Date(item.start)
            const endDate = new Date(item.end)
            const daysBetweenDates = differenceInDays(endDate, startDate)
            if (item.assignees.map((ass) => ass._id == user._id).includes(true)) {
                if (daysBetweenDates > 0) {
                    for (let i = 0; i < daysBetweenDates + 1; i++) {
                        if (i + 1 == daysBetweenDates + 1) {
                            assignedList.push({ end: startOfDay(endDate) })
                        }
                        else if (i == 0) {
                            assignedList.push({ start: startOfDay(startDate) })
                        }
                        else {
                            assignedList.push({ date: startOfDay(addDays(startDate, i)) })
                        }
                    }
                }
                else {
                    assignedList.push({ start: startOfDay(startDate), end: startOfDay(endDate) })
                }
            }
            else {
                for (let i = 0; i < daysBetweenDates + 1; i++) {
                    notAssignedList.push({ date: startOfDay(addDays(startDate, i)) })
                }
            }
        })
        console.log(assignedList)
        console.log(notAssignedList)

        // '2024-02-18': {
        //     color: periodColor,
        //     startingDay: true,
        //     endingDay: true,
        //     dotColor: dotColor,
        //     marked: true,
        // }
        const markedDays = {}
        // console.log(notAssignedList[0].date)
        const soonestDate = notAssignedList.length > 0 ? min([assignedList[0].start ?? assignedList[0].end, notAssignedList[0].date]) : assignedList[0].start
        console.log(soonestDate)
        const daysUntilMonthEnda = differenceInDays(endOfMonth(soonestDate), soonestDate)
        console.log(daysUntilMonthEnda)
        for (let i = 0; i < daysUntilMonthEnda + 1; i++) {
            const element = addDays(soonestDate, i)
            const inAssignedList = assignedList.some(item => isEqual(item.start, element))
            const isPeriod = assignedList.some(item => isEqual(item.start, element) && item.end === undefined)
            const inNotAssignedList = notAssignedList.some(item => isEqual(item.date, element))
            console.log(inAssignedList)
            console.log(inNotAssignedList)
            if (inAssignedList && inNotAssignedList) {
                markedDays[formatDate(element)] = {
                    color: periodColor,
                    startingDay: true,
                    endingDay: true,
                    dotColor: dotColor,
                    marked: true,
                }
            }
            else if (inAssignedList) {
                markedDays[formatDate(element)] = {
                    color: periodColor,
                    startingDay: true,
                    endingDay: true,
                }
            }
            else if (inNotAssignedList) {
                markedDays[formatDate(element)] = {
                    dotColor: dotColor,
                    marked: true,
                }
            }
        }
        setMarkedDays(markedDays)
        console.log(markedDays)
        return markedDays
    }

    // useEffect(() => {
    //   getMarkedDays(startOfMonth(monthOfCalendar), new Date(monthOfCalendar).getMonth() === new Date().getMonth() ? new Date() : endOfMonth(monthOfCalendar))
    //   // getAgendaItems()
    // }, [route.params?.delete])

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

    const renderItem = useCallback(({ item }) => {
        return (
            <AgendaItem
                item={item}
                dotColor={item.color}
                // key={item._id}
                onItemPress={() =>
                    navigation.navigate(routes.EDIT_ASSIGMENT, { id: item._id })
                }
            />
        )
    }, [])

    LocaleConfig.defaultLocale = language

    return (
        <>
            <CalendarProvider date={new Date().toDateString()}>
                <Calendar
                    onMonthChange={(date) => {
                        setMonthOfCalendar(startOfMonth(new Date(date.dateString)))
                        getMarkedDays(new Date(date.dateString))

                        // getAgendaItems(new Date(date.dateString))
                        //console.log(agendaItems)
                    }}
                    onDayPress={(day) => {
                        console.log('selected day', day)
                        setSelected(day.dateString)
                    }}
                    monthFormat={language == 'hu' ? 'yyyy MMMM' : 'MMMM yyyy'}
                    style={[styles.calendar, { borderColor: colors.light }]}
                    disableWeekScroll
                    theme={colorScheme === "light" ? calendarThemeLight : calendarThemeDark}
                    firstDay={1}
                    markingType={'period'}
                    markedDates={markedDays}
                    leftArrowImageSource={leftArrowIcon}
                    rightArrowImageSource={rightArrowIcon}
                />
                {user.roles.includes('president') && (
                    <View style={{ alignItems: 'center' }}>
                        <MyButton
                            style={{ width: 200, marginTop: 5, marginBottom: 10 }}
                            title={i18n.t('addAssignment')}
                            onPress={() => navigation.navigate(routes.ADD_ASSIGMENT)}
                        />
                    </View>
                )}
            </CalendarProvider>
            <ScrollView style={{ padding: 10, marginTop: 180, height: 50 }}>
                {/* {markedDays?.map((day, index) => {
                return (
                    <MyText key={day._id} style={{ marginBottom: 10 }} textColor='black'>
                        {index}. {formatDate(new Date(day.start))} - {formatDate(new Date(day.end))}
                    </MyText>
                )
            })} */}
                {/* <MyText textColor='black'>
    {JSON.stringify(markedDays)}
</MyText> */}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
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
