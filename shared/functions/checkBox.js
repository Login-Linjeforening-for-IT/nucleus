import FetchColor from '../../styles/fetchTheme';
import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import { ES } from '../../styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

/**
 * Function for displaying a small check box, should be used together with CheckedBox
 * @see CheckBox
 * @returns View containg a checkable box
 */
export default function CheckBox() {

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={ES.checkBox}>
            <Svg width={24} height={24} fill={FetchColor(theme, 'DARKER')} stroke={FetchColor(theme, 'ORANGE')} strokeWidth={1}>
                <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}