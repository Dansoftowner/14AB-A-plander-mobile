import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'

import RadioGroup from 'react-native-radio-buttons-group'
import { Formik } from 'formik'
import {add} from 'date-fns'

import i18n from '../locales/i18n'
import reports from '../api/reports'
import colors from '../config/colors'
import routes from '../navigation/routes'
import AuthContext from '../auth/authContext'

import DropDownList from '../components/DropDownList'
import InputField from '../components/InputField'
import MyAlert from '../components/MyAlert'
import MyButton from '../components/MyButton'
import MyText from '../components/MyText'

function EditReport({ navigation, route }) {
  const [errorShown, setErrorShown] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successShown, setSuccessShown] = useState(false)
  const [assignmentId, setAssignmentId] = useState('')
  const [assignmentAssignees, setAssignmentAssignees] = useState([])
  const { user } = useContext(AuthContext)
  const [report, setReport] = useState(null)
  const formRef = useRef()
  const [isAssigned, setIsAssigned] = useState(false)
  const [selectedMode, setSelectedMode] = useState(
    report?.mode === undefined ? '' : report.mode,
  )
  const [selectedType, setSelectedType] = useState(
    report?.externalOrganization == undefined ? 'independent' : 'corporate',
  )
  const { colors: colorsByTheme } = useTheme()
  const options = [
    { value: 'Jelző-figyelő járőrözés', label: 'Jelző-figyelő járőrözés' },
    { value: 'Rendezvénybiztosítás', label: 'Rendezvénybiztosítás' },
    { value: 'Iskolaszolgálat', label: 'Iskolaszolgálat' },
    { value: 'Gépjárműfelderítés', label: 'Gépjárműfelderítés' },
    { value: 'Postáskísérés', label: 'Postáskísérés' },
  ]
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

  const handleGetReport = async (reportID) => {
    const result = await reports.getReport(reportID)
    if (!result?.ok) {
      return console.log(result.data)
    }
    return setReport(result.data)
  }

  const handleViewReport = async () => {
    console.log(report)
    navigation.navigate(routes.VIEW_PDF, {id: assignmentId})
  }

  const handleDeleteReport = async () => {
    if (add(new Date(report.submittedAt), {days: 3}) < new Date()) {
      setErrorMessage(i18n.t('3dayError'))
      return setErrorShown(true)
    }
    const result = await reports.deleteReport(assignmentId)
    if (!result?.ok) {
      console.log(result.data)
      setErrorMessage(result.data.message)
      return setErrorShown(true)
    }
    setSuccessMessage(i18n.t('removedAssignment'))
    return setSuccessShown(true)
  }

  const handleSubmit = async () => {
    if (add(new Date(report.submittedAt), {days: 3}) < new Date()) {
      setErrorMessage(i18n.t('3dayError'))
      return setErrorShown(true)
    }
    const values = formRef.current.values
    if (values.startKm >= values.endKm) {
      setErrorMessage(i18n.t('errorStartEndKm'))
      return setErrorShown(true)
    }
    if (values.externalRepresentative != '' && values.externalOrganization.length <= 4) {
      setErrorMessage(i18n.t('A külső szerevezet képviselőjének legalább 5 karakter hosszúnak kell lennie'))
      return setErrorShown(true)
    }
    const result = await reports.patchReport(
      assignmentId,
      values.method,
      values.purpose,
      values.licensePlateNumber == '' || values.method != 'vehicle'
        ? undefined
        : values.licensePlateNumber,
      values.startKm == 0 || values.method != 'vehicle'
        ? undefined
        : values.startKm,
      values.endKm == 0 || values.method != 'vehicle'
        ? undefined
        : values.endKm,
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
    setSuccessMessage(i18n.t('modifiedAssignment'))
    return setSuccessShown(true)
  }

  useEffect(() => {
    if (route.params.id !== -1) {
      setAssignmentId(route.params.id)
      setAssignmentAssignees(route.params.assignees)
      const isassigned = route.params.assignees.map((ass) => ass._id == user._id).includes(true)
      setIsAssigned(isassigned)
      console.log(isassigned)
      handleGetReport(route.params.id)
    }
  }, [route.params.id])

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
                {i18n.t('reportMethod')}
              </MyText>
              <RadioGroup
                radioButtons={methodRadioButtons}
                containerStyle={{ width: 350, justifyContent: 'center' }}
                selectedId={values.method}
                layout="row"
                onPress={(item) => {
                  console.log(item)
                  setSelectedMode(item)
                  setFieldValue('method', item)
                }}
              />
              {values.method === 'vehicle' && (
                <>
                  <InputField
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('licensePlateNumber')}
                    icon="car"
                    name="licensePlateNumber"
                    title={i18n.t('licenseplate')}
                    placeholder={i18n.t('optional')}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <InputField
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
                    <InputField
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
                layout="row"
                containerStyle={{
                  paddingVertical: 5,
                  justifyContent: 'center',
                }}
                radioButtons={typeRadioButtons}
                value={selectedType}
                selectedId={selectedType}
                onPress={(item) => setSelectedType(item)}
              />
              {selectedType === 'corporate' && (
                <>
                  <InputField
                    themeColor="black"
                    textColor="black"
                    values={values}
                    onChangeText={handleChange('externalOrganization')}
                    icon="crowd"
                    name="externalOrganization"
                    title={i18n.t('externalOrg')}
                  />
                  <InputField
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
              {/* <MyText textColor='black'>
                {isAssigned}
              </MyText> */}
              <InputField
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
              <View style={styles.btnContainer}>
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('download')}
                  style={{
                    width: 120,
                    backgroundColor: colorsByTheme.medium_yellow_light_yellow,
                  }}
                  onPress={handleViewReport}
                />
                {(user.roles.includes('president') || isAssigned) &&
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('delete')}
                  style={{
                    width: 100,
                    marginLeft: 10,
                    backgroundColor: colorsByTheme.medium_red_light_red,
                  }}
                  onPress={handleDeleteReport}
                />
                }

                {((user.roles.includes('president') || isAssigned) && ((JSON.stringify({
                  _id: report?._id,
                  author: report?.author,
                  ...values,
                  submittedAt: report?.submittedAt,
                }) != JSON.stringify(report) ||
                  report?.description === undefined))) && (
                    <View>
                      <MyButton
                        textStyle={{ color: 'white' }}
                        title={i18n.t('save')}
                        style={{
                          backgroundColor:
                            colorsByTheme.medium_green_light_green,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
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
