import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MyTextInput from './MyTextInput';

function SelectAssociation({onPress, title}) {

  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
            <MyTextInput title={title} icon='police-badge-outline' isButton={true}/>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default SelectAssociation;