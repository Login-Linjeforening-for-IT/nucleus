import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import { useSelector } from 'react-redux';
import { 
    View, 
} from 'react-native';
import FetchColor from '../../styles/fetchTheme';
/**
 * Function for drawing a dynamic line, can be adjusted as you wish using the height and width
 * @param {*} height    Height of the line
 * @param {*} width     Width of the line
 * @returns             View of the given size based on theme
 */
export default function Line (height, width, fill) {

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
            <Svg 
                width={width} 
                height={height} 
                fill={fill ? fill : FetchColor(theme, 'ORANGE')}>
                <Rect x='1' y='1' width={width} height={height}/>
            </Svg>
        </View>
    );
}