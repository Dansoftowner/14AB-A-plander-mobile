import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MyText from '../components/MyText';
import MyButton from '../components/MyButton';
import {useTheme} from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditField from '../components/EditField';

function MemberListItem({name, onPress}) {
    const { colors: colorsByTheme } = useTheme()  

  return (
    <View style={{padding: 5, width: 350, borderRadius: 5, borderColor: 'black', borderWidth: 1}}>
        <MyText textColor='black'>
            {name}
        </MyText>
        <EditField type='delete' onPress={onPress} style={{position: 'absolute', right: 0, margin: 5}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default MemberListItem;