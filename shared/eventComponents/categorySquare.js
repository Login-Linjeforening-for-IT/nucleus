import React from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';

export default function CategorySquare(category) {  //SVG showing the color of the category
    if (category === 'TEKKOM') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#A206C9">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'SOCIAL') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#D62F43">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'CTF') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#2DA62B">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'KARRIEREDAG') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#02DEDE">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'FADDERUKA') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#FA75A6">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'BEDPRES') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#4060E3">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else if (category === 'LOGIN') {
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#FD8738">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }else{
        return(
            <View style={ES.eventLight}>
                <Svg width={45} height={70} fill="#FD8738">
                    <Rect width={45} height={70} ry={10}/>
                </Svg>
            </View>
        );
    }
};
