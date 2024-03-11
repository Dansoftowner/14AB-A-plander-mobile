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
import MyText from '../components/MyText'
import MyAlert from '../components/MyAlert'
import MarkNotation from '../components/MarkNotation'

LocaleConfig.locales['hu'] = dateTranslationHU
LocaleConfig.locales['en'] = dateTranslationEN

export default function AssignmentScreen({ navigation }) {
    const colorScheme = useColorScheme()
    const { colors: colorsByTheme } = useTheme()
    const { language } = useContext(languageContext)
    const { user } = useContext(AuthContext)
    const periodColor = colorsByTheme.periodColor
    const dotColor = colors.orange
    const rightArrowIcon = require('../assets/arrows/next.png')
    const leftArrowIcon = require('../assets/arrows/previous.png')
    const [infoShown, setInfoShown] = useState(false)
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
        if (startDate > new Date()) {
            setAgendaItems([])
            return setMarkedDays({})
        }
        const endParam = isEqual(startOfMonth(startDate), startOfMonth(new Date())) ? new Date() : endOfMonth(startDate)
        const result = await assignments.getAssignments(startOfMonth(startDate), endParam)
        if (result.data.items) {
            convertToMarkedDays(result.data.items)
            convertToAgendaItems(result.data.items)
        }
        else {
            setAgendaItems([])
            setMarkedDays({})
        }
    }
    const convertToMarkedDays = (items) => {
        const hasReportList = []
        const doesNotHaveReportList = []
        items.forEach((item) => {
            const startDate = new Date(item.start)
            const endDate = new Date(item.end)
            const daysBetweenDates = differenceInDays(endDate, startDate)
            if (item.report != null) {
                if (daysBetweenDates > 0) {
                    for (let i = 0; i < daysBetweenDates + 1; i++) {
                        if (i + 1 == daysBetweenDates + 1) {
                            hasReportList.push({ end: startOfDay(endDate) })
                        }
                        else if (i == 0) {
                            hasReportList.push({ start: startOfDay(startDate) })
                        }
                        else {
                            hasReportList.push({ date: startOfDay(addDays(startDate, i)) })
                        }
                    }
                }
                else {
                    hasReportList.push({ start: startOfDay(startDate), end: startOfDay(endDate) })
                }
            }
            else {
                for (let i = 0; i < daysBetweenDates + 1; i++) {
                    doesNotHaveReportList.push({ date: startOfDay(addDays(startDate, i)) })
                }
            }
        })
        const markedDays = {}
        const soonestDate = calculateSoonestDate(hasReportList, doesNotHaveReportList)
        const daysUntilMonthEnda = differenceInDays(endOfMonth(soonestDate), soonestDate)
        for (let i = 0; i < daysUntilMonthEnda + 1; i++) {
            const element = addDays(soonestDate, i)
            const inHasReportList = hasReportList.some(item => isEqual(item.start, element))
            const notInDoesNotHaveReportList = doesNotHaveReportList.some(item => isEqual(item.date, element))
            if (inHasReportList && notInDoesNotHaveReportList) {
                markedDays[formatDate(element)] = {
                    color: periodColor,
                    startingDay: true,
                    endingDay: true,
                    dotColor: dotColor,
                    marked: true,
                }
            }
            else if (inHasReportList) {
                markedDays[formatDate(element)] = {
                    color: periodColor,
                    startingDay: true,
                    endingDay: true,
                }
            }
            else if (notInDoesNotHaveReportList) {
                markedDays[formatDate(element)] = {
                    dotColor: dotColor,
                    marked: true,
                }
            }
        }
        setMarkedDays(markedDays)
        return markedDays
    }
    const calculateSoonestDate = (hasReportList, doesNotHaveReportList) => {
        if (doesNotHaveReportList.length > 0) {
            if (hasReportList.length > 0) {
                return min([hasReportList[0].start, doesNotHaveReportList[0].date])
            }
            return doesNotHaveReportList[0].date
        }
        return hasReportList[0].start
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
                    id: assignment._id,
                    assignees: assignment.assignees,
                    report: assignment.report,
                    title: title,
                    start: assignment.start,
                    isAssigned: isAssigned,
                    color:
                        assignment.report ? periodColor : dotColor,
                },
            ],
        }
        return eventObject
    }
    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
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
    const handleReportTouched = (assignment) => {
        if (!assignment.isAssigned && !user.roles.includes('president')) {
            return setInfoShown(true)
        }
        if (assignment.report == null) {
            return navigation.navigate(routes.ADD_REPORT, { id: assignment.id, assignees: assignment.assignees })
        }
        return navigation.navigate(routes.EDIT_REPORT, { id: assignment.id, assignees: assignment.assignees })
    }
    const renderItem = useCallback(({ item }) => {
        return (
            <AgendaItem
                isReport={true}
                item={item}
                color={item.color}
                key={item => item._id}
                onItemPress={() => {
                    handleReportTouched(item)
                }}
            />
        )
    }, [])

    LocaleConfig.defaultLocale = language

    return (
        <>
            <CalendarProvider date={new Date().toDateString()}>
                <Calendar
                    onMonthChange={(date) => {
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
                {agendaItems == null || agendaItems.length == 0 ? (
                    <View style={styles.agendaListContainer}>
                        <MyText textColor="black" style={styles.notAssignedMonthTitle}>
                            {i18n.t('noRepMonth')}
                        </MyText>
                    </View>
                ) : (
                    <>
                        <MarkNotation title={i18n.t('doneReport')} color={periodColor} />
                        <MarkNotation title={i18n.t('missingReport')} color={dotColor} />
                        <AgendaList
                            sections={agendaItems ?? []}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            sectionStyle={[
                                styles.section,
                                {
                                    backgroundColor: colorsByTheme.white_dark_blue,
                                    color: colors.medium,
                                },
                            ]}
                            dayFormat={language == 'hu' ? 'MMMM d' : 'd MMMM'}
                        />
                    </>
                )}
                <MyAlert
                    visible={infoShown}
                    type="info"
                    size="small"
                    button={i18n.t('close')}
                    message={i18n.t('notAssigned')}
                    onClose={() => setInfoShown(false)}
                />
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
