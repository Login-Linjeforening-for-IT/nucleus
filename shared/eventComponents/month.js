import { ES } from '../../styles/eventStyles';
import { Text } from 'react-native';

/**
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color for the text based on theme
 * @returns 
 */
export default function Month(month, color, lang) {
    const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
    const monthsNO = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];

    return <Text style={{...ES.monthText, color: color}}>{lang ? monthsNO[month - 1]: monthsEN[month - 1]}</Text>;
}