import React from 'react'
import { View, StyleSheet } from 'react-native'
import MyText from './MyText'
import MyFormField from './MyFormField'
import EditField from './EditField'

function EditProfileFields({ title, value, icon, themeColor, enabled, textColor, values, handleChange }) {

  //const { user } = useAuth()
  const user = {
    _id: '652f866cfc13ae3ce86c7ce7',
    isRegistered: true,
    email: 'bverchambre0@alibaba.com',
    username: 'gizaac0',
    name: 'Reizinger Szabolcs',
    address: 'Hungary, 7300 PillaFalva Maniel utca 12.',
    idNumber: '589376QN',
    phoneNumber: '+86 (120) 344-7474',
    guardNumber: '08/0019/161373',
    roles: ['member', 'president'],
  }

  return (
    <>
      <MyText textColor={textColor} style={{ fontSize: 16, fontWeight: 'bold' }}>
        {title}
      </MyText>
      <View style={styles.field}>
        <MyFormField
          themeColor={themeColor}
          title={user[value]}
          value={values[value]}
          onChangeText={handleChange(value)}
          autoCapitalize="none"
          autoCorrect={false}
          icon={icon}
          name={value}
          enabled={enabled}
          width={335}
          style={{ fontWeight: '400' }}
        />
        {!enabled && <EditField style={{ marginLeft: 10 }} />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default EditProfileFields
