import Svg, { Circle } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';
import { View } from 'react-native';
import React from 'react';

/**
 * NOTE: SHOULD BE COMBINDED WITH GREENLIGHT AND GRAYLIGHT
 * Function for drawing a red colored light svg
 * @returns Red colored light svg
 */
export default function RedLight() {    //Red colored light svg
    return(
    <View style={ES.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill="red" />
        </Svg>
    </View>
    );
};