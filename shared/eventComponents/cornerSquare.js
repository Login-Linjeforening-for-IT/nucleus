import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import Svg, { Rect } from 'react-native-svg';
import { View } from 'react-native';
import React from 'react';

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: 'CATEGORY'
 * @returns                 Small circle of the categories color
 */
export default function CornerSquare(theme, corner) {  //SVG showing the color of the category
    let p3 = 13, p4 = 102, p5 = 0, p6 = 160, p7 = 70, p8 = 345;

    return(
        <View style={{...GS.personImage, transform: [{ rotate: `${90*corner}deg` }]}}>
            <View>
                {/** ORANGE */}
                <Svg width={115} height={115} fill={FetchColor(theme, "ORANGE")}>
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND INSIDE*/}
                <Svg left={p3} bottom={p4} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND FIRST CLOCKWISE */}
                <Svg left={p5} bottom={p6} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={23} height={13} />
                </Svg>

                {/** BACKGROUND LAST CLOCKWISE*/}
                <Svg left={p7} bottom={p8} width={115} height={115} fill={FetchColor(theme, "DARKER")}>
                    <Rect width={13} height={20} />
                </Svg>
            </View>
        </View>
    );
};