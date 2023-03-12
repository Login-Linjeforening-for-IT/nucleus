import React from 'react';
import { ES } from '../../styles/eventStyles';
import { View, Image } from 'react-native';

/**
 * WIP - SHOULD RETURN THE IMAGE FOR THE GIVEN EVENT
 * @param {*} condition 
 * @returns 
 */
export default function EventImage(condition) {  //Doesnt work
    if(!condition) {
        return(
            <View>
                <Image style={ES.specificEventImage} source={require('../../assets/categories/default.png')} />
            </View>
        )
    }
}