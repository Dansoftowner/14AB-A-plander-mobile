import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import MyText from '../components/MyText'
import RadioGroup from 'react-native-radio-buttons-group'
import reports from '../api/reports'
import i18n from '../locales/i18n'
import EditProfileFields from '../components/EditProfileFields'
import { Formik } from 'formik'
import colors from '../config/colors'
import DropDownList from '../components/DropDownList'
import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton'
import AuthContext from '../auth/authContext'
import routes from '../navigation/routes'
import MyAlert from '../components/MyAlert'
import { useTheme } from '@react-navigation/native'

function AddReport({ navigation, route }) {
  const [errorShown, setErrorShown] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [assignmentId, setAssignmentId] = useState('')
  //   const { user, setUser } = useContext(AuthContext)

  const options = [
    { value: 'Jelző-figyelő járőrözés', label: 'Jelző-figyelő járőrözés' },
    { value: 'Rendezvénybiztosítás', label: 'Rendezvénybiztosítás' },
    { value: 'Iskolaszolgálat', label: 'Iskolaszolgálat' },
    { value: 'Gépjárműfelderítés', label: 'Gépjárműfelderítés' },
    { value: 'Postáskísérés', label: 'Postáskísérés' },
  ]

  useEffect(() => {
    if (route.params.id !== -1) {
      setAssignmentId(route.params.id)
    }
  }, [route.params.id])

  const formRef = useRef()

  const handleSubmit = async () => {
    const values = formRef.current.values
    console.log(values._id)
    const result = await reports.postReport(
      assignmentId,
      values.method,
      values.purpose,
      values.licensePlateNumber == '' ? undefined : values.licensePlateNumber,
      values.startKm == 0 ? undefined : values.startKm,
      values.endKm == 0 ? undefined : values.endKm,
      values.externalOrganization == ''
        ? undefined
        : values.externalOrganization,
      values.externalRepresentative == ''
        ? undefined
        : values.externalRepresentative,
      values.description == '' ? undefined : values.description,
    )
    if (!result?.ok) {
      console.log(result.data)
      setErrorMessage(result.data.message)
      return setErrorShown(true)
    }
    setSuccessMessage(i18n.t('createdReport'))
    return setSuccessShown(true)
  }

  const [selectedMode, setSelectedMode] = useState('')
  const [selectedType, setSelectedType] = useState()
  const { colors: colorsByTheme } = useTheme()
  const methodRadioButtons = useMemo(
    () => [
      {
        id: 'vehicle',
        label: i18n.t('vehicle'),
        value: 'vehicle',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white,
        },
        color: colors.medium_blue,
        borderColor: colors.medium_blue,
        // containerStyle: {
        //     backgroundColor: colors.medium_blue
        // }
      },
      {
        id: 'bicycle',
        label: i18n.t('bicycle'),
        value: 'bicycle',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white,
        },
        color: colors.medium_blue,
        borderColor: colors.medium_blue,
      },
      {
        id: 'pedestrian',
        label: i18n.t('pedestrian'),
        value: 'pedestrian',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white,
        },
        color: colors.medium_blue,
        borderColor: colors.medium_blue,
      },
    ],
    [],
  )
  const typeRadioButtons = useMemo(() => [
    {
      id: 'independent',
      label: i18n.t('independent'),
      value: 'independent',
      size: 18,
      labelStyle: {
        fontSize: 18,
        color: colorsByTheme.black_white,
      },
      color: colors.medium_blue,
      borderColor: colors.medium_blue,
    },
    {
      id: 'corporate',
      label: i18n.t('corporate'),
      value: 'corporate',
      size: 18,
      labelStyle: {
        fontSize: 18,
        color: colorsByTheme.black_white,
      },
      color: colors.medium_blue,
      borderColor: colors.medium_blue,
    },
  ])
  //selectedRadioButtonStyle()
  return (
    <ScrollView style={{ backgroundColor: colorsByTheme.white_black }}>
      <MyAlert
        visible={errorShown}
        type="error"
        size="small"
        button={i18n.t('close')}
        message={errorMessage}
        onClose={() => setErrorShown(false)}
      />
      <MyAlert
        visible={successShown}
        type="success"
        size="small"
        button={i18n.t('close')}
        message={successMessage}
        onClose={() => {
          setSuccessShown(false)
          navigation.navigate(routes.REPORTS)
        }}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{
            method: '',
            purpose: '',
            licensePlateNumber: '',
            startKm: 0,
            endKm: 0,
            externalOrganization: '',
            externalRepresentative: '',
            description: '',
          }}
          onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize //ez nagyon fontos!
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <View style={styles.form}>
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('reportMethod')}
              </MyText>
              <RadioGroup
                radioButtons={methodRadioButtons}
                containerStyle={{ width: 350, justifyContent: 'center' }}
                //value={values.method}
                selectedId={values.method}
                onPress={(item) => {
                  console.log(item)
                  setSelectedMode(item)
                  //selectedRadioButtonStyle()
                  setFieldValue('method', item)
                }}
                //   onPress={() => setFieldValue('method', values.method)}
                //   selectedId={values.method}
                layout="row"
              />
              {values.method === 'vehicle' && (
                <>
                  <EditProfileFields
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('licensePlateNumber')}
                    icon="car"
                    name="licensePlateNumber"
                    title={i18n.t('licenseplate')}
                    placeholder={i18n.t('optional')}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'space-between',
                    }}
                  >
                    <EditProfileFields
                      themeColor="black"
                      textColor="black"
                      values={values}
                      onChangeText={handleChange('startKm')}
                      icon="speedometer-slow"
                      name="startKm"
                      title={i18n.t('km')}
                      placeholder={i18n.t('startValue')}
                      width={170}
                      maxLength={6}
                      style={{ marginRight: 10, fontWeight: '400' }}
                    />
                    <EditProfileFields
                      themeColor="black"
                      textColor="black"
                      values={values}
                      onChangeText={handleChange('endKm')}
                      icon="speedometer"
                      name="endKm"
                      placeholder={i18n.t('finishValue')}
                      width={170}
                      maxLength={6}
                    />
                  </View>
                </>
              )}

              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('assignmentType')}
              </MyText>
              <RadioGroup
                containerStyle={{ width: 350, justifyContent: 'center' }}
                radioButtons={typeRadioButtons}
                value={selectedType}
                selectedId={selectedType}
                onPress={(item) => {
                  console.log(item)
                  setSelectedType(item)
                }}
                //   onPress={() => setFieldValue('method', values.method)}
                //   selectedId={values.method}
                layout="row"
              />
              {selectedType === 'corporate' && (
                <>
                  <EditProfileFields
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('externalOrganization')}
                    icon="crowd"
                    name="externalOrganization"
                    title={i18n.t('externalOrg')}
                  />
                  <EditProfileFields
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('externalRepresentative')}
                    icon="account-tie-hat"
                    name="externalRepresentative"
                    title={i18n.t('externalRep')}
                  />
                </>
              )}

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <MyButton
                  onPress={() =>
                    navigation.navigate(routes.MEMBERS, { path: 'add' })
                  }
                  title={i18n.t('add')}
                  style={{ marginTop: 10, width: 'auto' }}
                /> */}
              </View>
              <MyText
                textColor="black"
                style={{ fontWeight: 'bold', paddingBottom: 5 }}
              >
                {i18n.t('purpose')}
              </MyText>
              <DropDownList
                value={values.purpose}
                data={options}
                onChange={(item) => {
                  setFieldValue('purpose', item.value), console.log(item)
                }}
              />

              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('description')}
                name="description"
                title={i18n.t('description')}
                multiline={true}
                placeholder={i18n.t('extraordinaryEvent')}
                numberOfLines={5}
                style={{ textAlignVertical: 'top', fontWeight: '400' }}
                placeholderTextColor={colorsByTheme.medium_white}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <View>
                  <MyButton
                    textStyle={{ color: 'white' }}
                    title={i18n.t('save')}
                    style={{
                      backgroundColor: colorsByTheme.medium_green_light_green,
                      width: 100,
                      marginLeft: 20,
                    }}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    marginHorizontal: 20,
    paddingTop: 30,
  },
})

export default AddReport
