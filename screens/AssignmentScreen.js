import React, { useCallback, useState, useEffect, useContext } from 'react'
import { StyleSheet, View, useColorScheme } from 'react-native'
import { useTheme } from '@react-navigation/native'
import {
    AgendaList,
    CalendarProvider,
    LocaleConfig,
    Calendar,
} from 'react-native-calendars'

import { addDays, differenceInDays, endOfMonth, isEqual, min, startOfDay, startOfMonth } from 'date-fns'

import AuthContext from '../auth/authContext'
import assignments from '../api/assignments'
import colors from '../config/colors'
import i18n from '../locales/i18n'
import languageContext from '../locales/LanguageContext'
import routes from '../navigation/routes'

import dateTranslationHU from '../locales/hu/date'
import dateTranslationEN from '../locales/en/date'

import AgendaItem from '../components/AgendaItem'
import MyButton from '../components/MyButton'
import MyText from '../components/MyText'
import MarkNotation from '../components/MarkNotation'

LocaleConfig.locales['hu'] = dateTranslationHU
LocaleConfig.locales['en'] = dateTranslationEN

export default function AssignmentScreen({ navigation }) {
    const { language } = useContext(languageContext)
    const { user } = useContext(AuthContext)
    const rightArrowIcon = require('../assets/arrows/next.png')
    const { colors: colorsByTheme } = useTheme()
    const periodColor = colorsByTheme.periodColor
    const dotColor = colorsByTheme.dotColor
    const leftArrowIcon = require('../assets/arrows/previous.png')
    const colorScheme = useColorScheme()

    const [selected, setSelected] = useState('')
    const [monthOfCalendar, setMonthOfCalendar] = useState(new Date())

    const [markedDays, setMarkedDays] = useState(null)
    const [agendaItems, setAgendaItems] = useState(null)
    const calendarThemeLight = {
        backgroundColor: colorsByTheme.white_darker_blue,
        calendarBackground: colors.white,
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

    useEffect(() => {
        getAssignmentDates(new Date())
    }, [])

    const getAssignmentDates = async (startDate) => {
        const result = await assignments.getAssignments(startOfMonth(startDate), endOfMonth(startDate))
        if (result.data.items.length > 0) {
            convertToMarkedDays(result.data.items)
            convertToAgendaItems(result.data.items)
        }
        else {
            setAgendaItems([])
            setMarkedDays({})
        }
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
        const markedDays = {}
        const soonestDate = notAssignedList.length > 0 ? min([assignedList[0].start ?? assignedList[0].end, notAssignedList[0].date]) : assignedList[0].start
        const daysUntilMonthEnda = differenceInDays(endOfMonth(soonestDate), soonestDate)
        for (let i = 0; i < daysUntilMonthEnda + 1; i++) {
            const element = addDays(soonestDate, i)
            const inAssignedList = assignedList.some(item => isEqual(item.start, element))
            const inNotAssignedList = notAssignedList.some(item => isEqual(item.date, element))
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
        return markedDays
    }
    const convertToAgendaItems = (items) => {
        setAgendaItems([])
        const eventsVector = []
        items.forEach((element) => {
            const i = convertAgendaItem(element)
            eventsVector.push(i)
        })
        const newArray = convertAgendaVectorToObject(eventsVector)
        setAgendaItems(newArray)
    }
    const convertAgendaVectorToObject = (vector) => {
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
    const convertAgendaItem = (assignment) => {
        const isAssigned = assignment.assignees.map((ass) => ass._id == user._id).includes(true)
        const titleDate = formatDate(new Date(assignment.start))
        const title = assignment.title
        const eventObject = {
            title: titleDate,
            data: [
                {
                    _id: assignment._id,
                    title: title,
                    start: assignment.start,
                    color:
                        isAssigned ? periodColor : dotColor,
                },
            ],
        }
        return eventObject
    }
    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}` //Example: 2024-02-03
    }
    const setSelectedDay = (selectedDay) => {
        for (const date in markedDays) {
            if (date === selectedDay) {
                markedDays[date]["selected"] = true;
            } else {
                markedDays[date]["selected"] = false;
            }
        }
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <AgendaItem
                item={item}
                key={item => item._id}
                color={item.color}
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
                        getAssignmentDates(new Date(date.dateString))
                    }}
                    onDayPress={(day) => {
                        setSelectedDay(day.dateString)
                    }}
                    monthFormat={language == 'hu' ? 'yyyy MMMM' : 'MMMM yyyy'}
                    style={[styles.calendar, { borderColor: colors.light }]}
                    theme={colorScheme === "light" ? calendarThemeLight : calendarThemeDark}
                    firstDay={1}
                    animateScroll
                    markingType={'period'}
                    markedDates={markedDays}
                    leftArrowImageSource={leftArrowIcon}
                    rightArrowImageSource={rightArrowIcon}
                />
                {
                    (agendaItems != null && agendaItems.length != 0) && (
                        <MarkNotation title={i18n.t('inAssignment')} color={periodColor} />
                    )
                }
                {user.roles.includes('president') && (
                    <View style={{ alignItems: 'center' }}>
                        <MyButton
                            style={{ width: 200, marginTop: 5, marginBottom: 10 }}
                            title={i18n.t('addAssignment')}
                            onPress={() => navigation.navigate(routes.ADD_ASSIGMENT)}
                        />
                    </View>
                )}
                {agendaItems == null || agendaItems.length == 0 ? (
                    <View style={styles.agendaListContainer}>
                        <MyText textColor="black" style={styles.notAssignedMonthTitle}>
                            {i18n.t('noAssMonth')}
                        </MyText>
                    </View>
                ) : (
                    <AgendaList
                        sections={agendaItems ?? []}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        sectionStyle={[
                            styles.section,
                            {
                                backgroundColor: colorsByTheme.white_dark_blue,
                                color: colors.medium,
                            },
                        ]}
                        dayFormat={language == 'hu' ? 'MMMM d' : 'd MMMM'}
                    />
                )}
            </CalendarProvider>
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
    notAssignedMonthTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 10,
        textAlign: 'center'
    },
    agendaListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    header: {
        backgroundColor: 'lightgrey',
    },
    section: {
        textTransform: 'capitalize',
    },
})
