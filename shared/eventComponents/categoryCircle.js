import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';
import color from './categoryColor';

/**
 * Function for drawing a very small square of the category of the event
 * 
 * @param {string} category    Category of the event, Format: 'CATEGORY'
 * @returns                     Small circle of the categories color
 */
export default function CategoryCircle(category) {  //SVG showing the color of the category
    return(
        <View style={{...ES.specificEventLight, left: -10}}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" >
            <Circle cx="50" cy="50" r="50" fill={color(category)} />
            </Svg>
        </View>
        );
};
