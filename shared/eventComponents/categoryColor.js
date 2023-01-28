/**
 * Function for fetching the color of a category
 * @param {string} category 
 * @returns Hex color
 */
export default function CategoryColor(category) {
    switch (category) {
        case 'TEKKOM':          return '#A206C9';   // purple
        case 'SOCIAL':          return '#D62F43';   // red
        case 'CTF':             return '#2DA62B';   // green
        case 'KARRIEREDAG':     return '#02DEDE';   // light blue
        case 'FADDERUKA':       return '#FA75A6';   // pink
        case 'BEDPRES':         return '#4060E3';   // dark blue
        case 'LOGIN':           return '#FD8738';   // orange
        default:                return '#555B5F';   // gray
    }
}