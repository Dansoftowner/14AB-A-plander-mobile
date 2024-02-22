import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MyText from '../components/MyText';
import MyButton from '../components/MyButton';
import {useTheme} from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditField from '../components/EditField';

function MemberListItem({onPress, item}) {
    const { colors: colorsByTheme } = useTheme()  

  return (
    <View style={{padding: 5, width: 350, borderRadius: 5}}>
        <MyText textColor='black'>
            {item.name}
            {/* {item._id} */}
        </MyText>
        <EditField type='delete' onPress={() => onPress(item)} style={{position: 'absolute', right: 0, margin: 5}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default MemberListItem;