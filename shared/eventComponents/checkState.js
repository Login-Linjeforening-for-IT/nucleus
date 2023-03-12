import React from 'react';
import { ES } from '../../styles/eventStyles';
import { View } from 'react-native';
/**
 * Function for checking the state of a given event
 * @param {boolean} condition true / false
 * @returns circle, green circle if condition is true, otherwise gray circle
 */
export default function CheckState(condition) { //Choose the state green/gray
    if (condition == true) {
        return(
            <View style = {ES.greenLight}><GreenLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        ) 
    } else {
        return(
            <View style = {ES.GrayLight}><GrayLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        )
    }
}