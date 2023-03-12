import Svg, { Circle } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';
import { View } from 'react-native';
import React from 'react';

/**
 * NOTE: SHOULD BE COMBINDED WITH GRAYLIGHT AND REDLIGHT INTO LIGHT AND TAKE COLOR AS PARAMETER
 * Function for drawing a green light 
 * @returns Green Light svg
 */
export default function GreenLight() {  //Green colored light svg
    return(
        <View style={ES.size}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" >
            <Circle cx="50" cy="50" r="50" stroke="green" strokeWidth=".5" fill="green" />
            </Svg>
        </View>
    );
};