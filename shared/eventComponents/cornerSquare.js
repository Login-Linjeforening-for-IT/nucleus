import FetchColor from '../../styles/fetchTheme';
import { ES } from '../../styles/eventStyles';
import Svg, { Rect } from 'react-native-svg';
import random from '../functions/random';
import { View } from 'react-native';
import React from 'react';

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: 'CATEGORY'
 * @returns                 Small circle of the categories color
 */
export default function CornerSquare(theme, corner) {  //SVG showing the color of the category
    let h, w, h1, w1, p1 = 100, p2 = -275, p3 = 113, p4 = -173, p5 = 100, p6 = -115, p7 = 170, p8 = 70;

    if(!corner) corner = random(0,3);

    if (corner == 0) {h = 45; w = "-12.85%", h1 = 0, w1 = 0}
    if (corner == 1) {h = 45; w = "-12.85%", h1 = -2.5, w1 = 307.5}
    if (corner == 2) {h = 45; w = "-12.85%", h1 = -310, w1 = 305}
    if (corner == 3) {h = 45; w = "-12.85%", h1 = -307.5, w1 = -2.5}

    return(
        <View style={{position: 'absolute', left: w, bottom: h}}>
            <View style={{left: w1, bottom: h1, transform: [{ rotate: `${90*corner}deg` }]}}>
                {/** ORANGE */}
                <Svg left={p1} bottom={p2} width={115} height={115} fill={FetchColor(theme, "ORANGE")}>
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