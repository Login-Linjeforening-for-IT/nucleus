import { ES } from '../../styles/eventStyles';
import { Text } from 'react-native';
import React from 'react';

/**
 * NOTE: SHOULD BE COMBINDED WITH MonthNO
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color for the text based on theme
 * @returns 
 */
export default function MonthEN(month, color) {
    const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];  
    return <Text style={{...ES.monthText, color: color}}>{monthsEN[month - 1]}</Text>;
}