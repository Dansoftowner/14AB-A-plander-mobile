import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import MyText from '../components/MyText'
import RadioGroup from 'react-native-radio-buttons-group'
import reports from '../api/reports'
import i18n from '../locales/i18n'
import EditProfileFields from '../components/EditProfileFields'
import { Formik, useFormikContext } from 'formik'
import colors from '../config/colors'
import DropDownList from '../components/DropDownList'
import MyTextInput from '../components/MyTextInput'
import MyButton from '../components/MyButton'
import AuthContext from '../auth/authContext'
import routes from '../navigation/routes'
import MyAlert from '../components/MyAlert'
import { useTheme } from '@react-navigation/native'

function EditReport({ navigation, route }) {
  const [errorShown, setErrorShown] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [assignmentId, setAssignmentId] = useState('')

  const handleGetReport = async (reportID) => {
    const result = await reports.getReport(reportID)
    if (!result?.ok) {
      return console.log(result.data)
    }
    return setReport(result.data)
  }
  const { user, setUser } = useContext(AuthContext)

  const [report, setReport] = useState(null)

  const options = [
    { value: 'Jelző-figyelő járőrözés', label: 'Jelző-figyelő járőrözés' },
    { value: 'Rendezvénybiztosítás', label: 'Rendezvénybiztosítás' },
    { value: 'Iskolaszolgálat', label: 'Iskolaszolgálat' },
    { value: 'Gépjárműfelderítés', label: 'Gépjárműfelderítés' },
    { value: 'Postáskísérés', label: 'Postáskísérés' },
  ]

  //const reportChanged = JSON.stringify({ _id: report?._id,  author: report?.author, ...values,  submittedAt: report?.submittedAt}) != JSON.stringify(report)

  useEffect(() => {
    if (route.params.id !== -1) {
      setAssignmentId(route.params.id)
      handleGetReport(route.params.id)
    }
  }, [route.params.id])

  const formRef = useRef()

  // useEffect(() => {
  //   if (report?.method !== null) {
  //     selectedRadioButtonStyle()
  //   }
  // }, [report?.method])

  // useEffect(() => {
  //   selectedRadioButtonStyle()
  // }, [selectedMode])

  // const selectedRadioButtonStyle = () => {
  //   methodRadioButtons.forEach((button) => {
  //     if (button.id === selectedMode) {
  //       button.color = colors.medium_blue
  //       button.borderColor = colors.medium_blue
  //     } else {
  //       button.color = colors.light
  //       button.borderColor = colors.light
  //     }
  //   })
  // }

  const handleDeleteReport = async () => {
    const result = await reports.deleteReport(assignmentId)
    if (!result?.ok) {
      console.log(result.data)
      setErrorMessage(result.data.message)
      return setErrorShown(true)
    }
    setSuccessMessage('A jelentés sikeresen törölve.')
    return setSuccessShown(true)
  }

  const handleSubmit = async () => {
    const values = formRef.current.values
    // if (values.description == '' && report.description === undefined) {
    //   setErrorMessage('Nincsen elküldhető módosítás!')
    //   return setErrorShown(true)
    // }
    console.log(values._id)
    // if (values.method != 'vehicle') {
    //   setFieldValue('licensePlateNumber', undefined)
    //   formRef.current.setFieldValue('startKm', undefined)
    //   formRef.current.setFieldValue('endKm', undefined)
    // }
    console.log(values.licensePlateNumber)
    const result = await reports.patchReport(
      assignmentId,
      values.method,
      values.purpose,
      values.licensePlateNumber == '' || values.method != 'vehicle' ? undefined : values.licensePlateNumber,
      values.startKm == 0 || values.method != 'vehicle' ? undefined : values.startKm,
      values.endKm == 0 || values.method != 'vehicle' ?  undefined : values.endKm,
      values.externalOrganization == ''
        ? undefined
        : values.externalOrganization,
      values.externalRepresentative == ''
        ? undefined
        : values.externalRepresentative,
      values.description == '' ? undefined : values.description,
    )
    if (!result?.ok) {
      console.log(result)
      setErrorMessage(result.data.message)
      return setErrorShown(true)
    }
    setSuccessMessage('A jelentés sikeresen módosítva.')
    return setSuccessShown(true)
  }

  const [selectedMode, setSelectedMode] = useState(
    report?.mode === undefined ? '' : report.mode,
  )
  const [selectedType, setSelectedType] = useState(
    report?.externalOrganization == undefined ? 'independent' : 'corporate',
  )
  const { colors: colorsByTheme } = useTheme()
  const methodRadioButtons = useMemo(
    () => [
      {
        id: 'vehicle',
        label: 'Gépkocsi',
        value: 'vehicle',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white

        },
        color: colors.medium_blue,
        borderColor: colors.medium_blue,
        // containerStyle: {
        //     backgroundColor: colors.medium_blue
        // }
      },
      {
        id: 'bicycle',
        label: 'Kerékpár',
        value: 'bicycle',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white

        },
        color: colors.medium_blue,
        borderColor: colors.medium_blue,
      },
      {
        id: 'pedestrian',
        label: 'Gyalogos',
        value: 'pedestrian',
        size: 18,
        labelStyle: {
          fontSize: 18,
          color: colorsByTheme.black_white

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
      label: 'Önálló',
      value: 'independent',
      size: 18,
      labelStyle: {
        fontSize: 18,
        color: colorsByTheme.black_white

      },
      color: colors.medium_blue,
      borderColor: colors.medium_blue,
    },
    {
      id: 'corporate',
      label: 'Közös',
      value: 'corporate',
      size: 18,
      labelStyle: {
        fontSize: 18,
        color: colorsByTheme.black_white

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
            method: report?.method == null ? '' : report?.method,
            purpose: report?.purpose == null ? '' : report?.purpose,
            licensePlateNumber:
              report?.licensePlateNumber == null
                ? ''
                : report?.licensePlateNumber,
            startKm: report?.startKm == null ? 0 : report?.startKm,
            endKm: report?.endKm == null ? 0 : report?.endKm,
            externalOrganization:
              report?.externalOrganization == null
                ? ''
                : report?.externalOrganization,
            externalRepresentative:
              report?.externalRepresentative == null
                ? ''
                : report?.externalRepresentative,
            description: report?.description == null ? '' : report?.description,
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
                Szolgálat módja
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
                    title="Gépkocsi rendszáma"
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
                      title="KM óra állása"
                      placeholder="Induláskor"
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
                      placeholder="Érkezéskor"
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
                Szolgálat típusa
              </MyText>
              <RadioGroup
                containerStyle={{ paddingVertical: 5, justifyContent: 'center'}}
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
                    title="Külső szervezet"
                  />
                  <EditProfileFields
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('externalRepresentative')}
                    icon="account-tie-hat"
                    name="externalRepresentative"
                    title="Külső szervezet képviselője"
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
                Szolgálat fajtája
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
                title="Leírás"
                multiline={true}
                placeholder="Ha történt rendkívüli esemény..."
                numberOfLines={5}
                style={{ textAlignVertical: 'top', fontWeight: '400' }}
                placeholderTextColor={colorsByTheme.Login_placeholders}
              />

              {/* <View style={{ flexDirection: 'column' }}>
                <MyText textColor="black">
                  {JSON.stringify({
                    _id: report?._id,
                    author: report?.author,
                    ...values,
                    submittedAt: report?.submittedAt,
                  })}
                </MyText>
                <MyText textColor="black">{JSON.stringify(report)}</MyText>
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <MyButton
                  textStyle={{ color: 'white' }}
                  title='Letöltés'
                  style={{ width: 100, backgroundColor: colorsByTheme.medium_yellow_light_yellow }}
                  onPress={handleDeleteReport}
                />
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('delete')}
                  style={{ width: 100, marginLeft: 10, backgroundColor: colorsByTheme.medium_red_light_red }}
                  onPress={handleDeleteReport}
                />

                {(JSON.stringify({
                  _id: report?._id,
                  author: report?.author,
                  ...values,
                  submittedAt: report?.submittedAt,
                }) != JSON.stringify(report) ||
                  report?.description === undefined) &&
                  user.roles.includes('president') && (
                    <View>
                      <MyButton
                        textStyle={{ color: 'white' }}
                        title={i18n.t('save')}
                        style={{
                          backgroundColor: colorsByTheme.medium_green_light_green,
                          width: 100,
                          marginLeft: 10,
                        }}
                        onPress={handleSubmit}
                      />
                    </View>
                  )}
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

export default EditReport
