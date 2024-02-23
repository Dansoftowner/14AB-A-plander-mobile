import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../components/MyText';

function AddReport(props) {
  return (
    <View style={styles.container}>
        <MyText>
            AddReport
        </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

export default AddReport;