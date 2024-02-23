import React, { useEffect, useMemo, useRef, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import MyText from '../components/MyText'
import RadioGroup from 'react-native-radio-buttons-group'
import reports from '../api/reports'
import i18n from '../locales/i18n'
import EditProfileFields from '../components/EditProfileFields'
import { Formik } from 'formik'
import colors from '../config/colors'
function AddReport({ navigation, route }) {
  const handleGetReport = async (reportID) => {
    const result = await reports.getReport(reportID)
    if (!result?.ok) {
      return console.log(result.data)
    }
    return setReport(result.data)
  }

  const [report, setReport] = useState(null)

  const options = [
    { value: '', label: '' },
    { value: 'Jelző-figyelő járőrözés', label: 'Jelző-figyelő járőrözés' },
    { value: 'Rendezvénybiztosítás', label: 'Rendezvénybiztosítás' },
    { value: 'Iskolaszolgálat', label: 'Iskolaszolgálat' },
    { value: 'Gépjárműfelderítés', label: 'Gépjárműfelderítés' },
    { value: 'Postáskísérés', label: 'Postáskísérés' },
  ]

  useEffect(() => {
    if (route.params.id !== -1) {
      // setAssignmentId(route.params.id)
      handleGetReport(route.params.id)
    }
  }, [route.params.id])

  const formRef = useRef()

  useEffect(() => {
    selectedRadioButtonStyle()
  }, selectedMode)

  const selectedRadioButtonStyle = () => {
    methodRadioButtons.forEach((button) => {
      if (button.id === selectedMode) {
        button.color = colors.medium_blue
        button.borderColor = colors.medium_blue
      } else {
        button.color = colors.light
        button.borderColor = colors.light
      }
    })
  }

  const [selectedMode, setSelectedMode] = useState('')
  const [selectedType, setSelectedType] = useState(
    report?.externalOrganization == '' ? 'independent' : 'corporate',
  )
  const methodRadioButtons = useMemo(
    () => [
      {
        id: 'vehicle',
        label: 'Gépkocsi',
        value: 'vehicle',
        size: 18,
        labelStyle: {
          fontSize: 18,
        },
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
        },
      },
      {
        id: 'pedestrian',
        label: 'Gyalogos',
        value: 'pedestrian',
        size: 18,
        labelStyle: {
          fontSize: 18,
        },
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
      },
    },
    {
      id: 'corporate',
      label: 'Közös',
      value: 'corporate',
      size: 18,
      labelStyle: {
        fontSize: 18,
      },
    },
  ])
  selectedRadioButtonStyle()
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          method: report?.method == null ? '' : report?.method,
          purpose: report?.purpose == null ? '' : report?.purpose,
          licensePlateNumber:
            report?.licensePlateNumber == null
              ? ''
              : report?.licensePlateNumber,
          startKm: report?.startKm == null ? -1 : report?.startKm,
          endKm: report?.endKm == null ? -1 : report?.endKm,
          externalOrganization:
            report?.externalOrganization == null
              ? ''
              : report?.externalOrganization,
          externalRepresentative:
            report?.externalRepresentative == null
              ? ''
              : report?.externalRepresentative,
          description: report?.description == null ? '' : report?.description,
          location: report?.location == null ? '' : report?.location,
        }}
        //onSubmit={handleSubmit}
        innerRef={formRef}
        enableReinitialize //ez nagyon fontos!
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          validateForm,
          setTouched,
          touched,
        }) => (
          <View style={styles.form}>
            <MyText
              textColor="black"
              style={{ fontWeight: 'bold', paddingBottom: 5 }}
            >
              Szolgálat módja
            </MyText>
            <RadioGroup
              radioButtons={methodRadioButtons}
              //value={values.method}
              selectedId={values.method}
              onPress={(item) => {
                console.log(item)
                setSelectedMode(item)
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
                <EditProfileFields
                  themeColor="black"
                  textColor="black"
                  values={values}
                  onChangeText={handleChange('startKm')}
                  icon="map-marker-outline"
                  name="startKm"
                  title="KM óra állása"
                  placeholder={i18n.t('optional')}
                />
              </>
            )}

            <MyText
              textColor="black"
              style={{ fontWeight: 'bold', paddingBottom: 5 }}
            >
              Szolgálat típusa
            </MyText>
            <RadioGroup
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
              {i18n.t('assignmentStart')}
            </MyText>

            <MyText
              textColor="black"
              style={{ fontWeight: 'bold', paddingBottom: 5 }}
            >
              {i18n.t('assignmentEnd')}
            </MyText>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: 30,
              }}
            >
              <MyText textColor="black">
                {report ? JSON.stringify(report) : ''}
              </MyText>
              <MyText textColor="black">{JSON.stringify(values)}</MyText>

              {/* <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('save')}
                  style={{ width: 100, backgroundColor: 'green' }}
                  onPress={handleAddAssignment}
                /> */}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  form: {
    marginHorizontal: 20,
    paddingTop: 30,
  },
})

export default AddReport
