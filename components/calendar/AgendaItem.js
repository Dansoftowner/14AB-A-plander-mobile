import isEmpty from 'lodash/isEmpty'
import React, { useCallback } from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { format, set } from 'date-fns'
import { hu } from 'date-fns/locale'
import MyText from '../MyText'
import i18n from '../../locales/i18n'
import colors from '../../config/colors'

export default function AgendaItem({
  item,
  onPress,
  onItemPress,
  isReport = false,
  dotColor = 'blue',
}) {

  const { colors: colorsByTheme } = useTheme()

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={onItemPress} style={[styles.item, {backgroundColor: colorsByTheme.white_dark_blue}]}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: dotColor,
            width: 15,
            height: 15,
            borderRadius: 8,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!isReport ? (
        <View>
          <Text style={[styles.itemTitleText, {color: colorsByTheme.black_white}]}>{item.title}</Text>
          <MyText
            textColor="black"
            style={{ fontSize: 14, paddingHorizontal: 10 }}
          >
            {i18n.t('assignmentStart')}: {format(item.start, 'HH:mm', { locale: hu })}
          </MyText>
        </View>)
        : (
          <View>
          <Text style={[styles.itemTitleText, {color: colorsByTheme.black_white}]}>{item.title}</Text>
          <MyText
            textColor="black"
            style={{ fontSize: 14, paddingHorizontal: 10 }}
          >
            {item.report ? "Jelentés megtekintés" : "Jelentés készítése"}
          </MyText>
        </View>
        )
}
      </View>
      {/* <View
        style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name="pencil"
            size={15}
            color={colorsByTheme.black_white}
          />
        </TouchableWithoutFeedback>
      </View> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemTitleText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
})
