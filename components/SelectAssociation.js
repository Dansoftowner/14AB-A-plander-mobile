import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MyFormField from './MyFormField';
import i18n from '../locales/i18n';
import MyText from './MyText';
import MyTextInput from './MyTextInput';
import AssContext from '../AssContext';

function SelectAssociation({onPress}) {
  const {association, setAssociation} = useContext(AssContext);
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
            <MyTextInput value={association.name ?? ''} title={association.name ?? 'Association'} icon='police-badge-outline' isButton={true}/>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default SelectAssociation;