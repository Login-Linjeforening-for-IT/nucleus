import { View } from 'react-native';
import React from 'react';

/**
 * Function for creating an empty view, for adding spaces between objects such as views paragraphs etc
 * @param {float} height    How big the space should be
 * @returns             Empty view of the given height
 */
export default function Space (height) {
    return(
        <View style={{height: height}}/>
    );
}