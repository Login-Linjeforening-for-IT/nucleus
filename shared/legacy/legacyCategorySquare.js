import React from 'react';
import {View} from 'react-native';
import Svg, {Rect} from 'react-native-svg';
import {ES} from '../../styles/eventStyles';
import color from '../eventComponents/categoryColor';

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: 'CATEGORY'
 * @returns                 Small circle of the categories color
 */
export default function LegacyCategorySquare(category) { // SVG showing the color of the category
    return (
        <View style={
            ES.eventLight
        }>
            <Svg width={45}
                height={70}
                fill={
                    color(category)
            }>
                <Rect width={45}
                    height={70}
                    ry={10}/>
            </Svg>
        </View>
    );
};
