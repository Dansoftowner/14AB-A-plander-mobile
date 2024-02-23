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
function AddReport({ navigation, route }) {
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

  const handleDeleteReport = async () => {
    console.log('delete')
  }

  const handleSubmit = async () => {

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
    <ScrollView>
      <View style={styles.container}>
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
          }}
          onSubmit={handleSubmit}
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
                containerStyle={{ paddingVertical: 5 }}
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
                containerStyle={{ paddingVertical: 5 }}
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
                onChange={(item) => setFieldValue('purpose', item)}
              />

              <EditProfileFields
                themeColor="black"
                textColor="black"
                values={values}
                onChangeText={handleChange('description')}
                name="description"
                title="Külső szervezet képviselője"
                multiline={true}
                placeholder="Ha történt rendkívüli esemény..."
                numberOfLines={5}
                style={{ textAlignVertical: 'top', fontWeight: '400' }}
              />

                    <View style={{ flexDirection: 'column' }}>
                        <MyText textColor='black'>
                            {JSON.stringify({alma: 'alma', korte: 'korte'})}
                        </MyText>
                        <MyText textColor='black'>
                            {JSON.stringify({korte: 'korte', alma: 'alma'})}
                        </MyText>
                        <MyText textColor='black'>
                        {JSON.stringify({alma: 'alma', korte: 'korte'}) == JSON.stringify({korte: 'korte', alma: 'alma'}) ? "true" : "false"}

                        </MyText>
    <MyText textColor="black">{JSON.stringify({ _id: report?._id,  author: report?.author, ...values,  submittedAt: report?.submittedAt})}</MyText>
                      <MyText textColor="black">{JSON.stringify(report)}</MyText>
                    </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <MyButton
                  textStyle={{ color: 'white' }}
                  title={i18n.t('delete')}
                  style={{ width: 100, backgroundColor: 'red' }}
                  onPress={handleDeleteReport}
                />


                {JSON.stringify({ _id: report?._id,  author: report?.author, ...values,  submittedAt: report?.submittedAt}) != JSON.stringify(report) &&
                  user.roles.includes('president') && (
                    <View>
                      <MyButton
                        textStyle={{ color: 'white' }}
                        title={i18n.t('save')}
                        style={{
                          backgroundColor: 'green',
                          width: 100,
                          marginLeft: 20,
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

export default AddReport
