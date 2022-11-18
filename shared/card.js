import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

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
            <View style={styles.cardContentSmaller}>
                { props.children }
            </View>
        </View>
    );
};

export function CardSmall(props) {
    return(
        <View style={styles.cardSmall}>
            <View style={styles.cardContentSmall}>
                { props.children }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        backgroundColor: '#282828',
        marginHorizontal: 4, 
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 18
    },
    cardSmaller: {
        borderRadius: 40,
        backgroundColor: '#282828',
    },
    cardSmall: {
        borderRadius: 20,
        backgroundColor: '#282828',
        marginHorizontal: 4, 
        marginVertical: 6,
    },
    cardContentSmall: {
        marginHorizontal: 18,
        marginVertical: 18
    },
});