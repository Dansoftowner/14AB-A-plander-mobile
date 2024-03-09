import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from './MyText';

function MarkNotation({ title, color }) {
    return (
        <View style={styles.container}>
            <View
                style={[styles.dot, { backgroundColor: color }]}
            ></View>
            <MyText textColor='black' style={{ fontWeight: 'bold' }}>
                {title}
            </MyText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 8,
        marginRight: 10,
    }
});

export default MarkNotation;