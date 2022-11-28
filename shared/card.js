import React from 'react';
import { StyleSheet, View } from 'react-native';
const GLOBAL = require('../styles/themes/dark')


export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    );
};

export function CardSmaller(props) {
    return(
        <View style={styles.cardSmaller}>
            <View>
                { props.children }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: GLOBAL.THEME.DARKER,
        marginHorizontal: 4, 
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 18
    },
    cardSmaller: {
        borderRadius: 20,
        backgroundColor: GLOBAL.THEME.DARKER,
    }
});