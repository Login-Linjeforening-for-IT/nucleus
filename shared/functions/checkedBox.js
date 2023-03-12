import FetchColor from '../../styles/fetchTheme';
import { ES } from '../../styles/eventStyles';
import Svg, {Rect} from 'react-native-svg';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

/**
 * Function for displaying a small checked box, should be used together with CheckBox
 * @see CheckBox
 * @returns View containing a checked box
 */
export default function CheckedBox() {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={ES.checkedBox}>
            <Svg width="24" height="24" fill={FetchColor(theme, 'ORANGE')} stroke={FetchColor(theme, 'ORANGE')} strokeWidth={1}>
            <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}