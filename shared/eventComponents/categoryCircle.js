import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';

export default function CategoryCircle(condition) {  //SVG showing the color of the category
    if (condition === 'TEKKOM') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#A206C9" />
                </Svg>
            </View>
            );
    }else if (condition === 'SOCIAL') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#D62F43" />
                </Svg>
            </View>
            );
    }else if (condition === 'CTF') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#2DA62B" />
                </Svg>
            </View>
            );
    }else if (condition === 'KARRIEREDAG') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#02DEDE" />
                </Svg>
            </View>
            );
    }else if (condition === 'FADDERUKA') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FA75A6" />
                </Svg>
            </View>
            );
    }else if (condition === 'BEDPRES') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#4060E3" />
                </Svg>
            </View>
            );
    }else if (condition === 'LOGIN') {
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FD8738" />
                </Svg>
            </View>
            );
    }else{
        return(
            <View style={ES.specificEventLight}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill="#FD8738" />
                </Svg>
            </View>
            );
    }
};
