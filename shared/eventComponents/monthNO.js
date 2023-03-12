import { ES } from '../../styles/eventStyles';
import { Text } from 'react-native';
import React from 'react';
  
/**
 * NOTE: SHOULD BE COMINDED WITH MonthEN
 * Function for displaying the month an event takes place
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color of the text based on theme
 * @returns                 Text containing the month in norwegian
 */
export default function MonthNO(month, color) {
    const monthsNO = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
    return <Text style={{...ES.monthText, color: color}}>{monthsNO[month - 1]}</Text>;
}