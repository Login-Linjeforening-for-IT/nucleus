import Svg, { Rect, Circle } from "react-native-svg"
import { ES } from "@styles/eventStyles"
import { View } from "react-native"
import React from "react"

type CategorySquareProps = {
    category: string
    height?: number
}

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: "CATEGORY"
 * @returns                 Small circle of the categories color
 */
export default function CategorySquare({category, height}: CategorySquareProps): 
JSX.Element {
    return (
        <View style={ES.eventLight}>
            <Svg width={45} height={height ? 65 + height : 65} fill={CategoryColor(category)}>
                <Rect width={40} height={65} ry={10}/>
            </Svg>
        </View>
    )
}

/**
 * // SVG showing the color of the category
 *
 * @param {string} category    Category of the event, Format: "CATEGORY"
 * @returns                     Small circle of the categories color
 */
export function CategoryCircle(category: string): JSX.Element {
    return (
        <View style={{...ES.specificEventLight, left: -10}}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={CategoryColor(category)} />
            </Svg>
        </View>
    )
}

/**
 * Function for fetching the color of a category
 * @param {string} category
 * @returns Hex color
 */
function CategoryColor(category: string): string {
    switch (category) {
        case "TEKKOM":          return "#A206C9" // purple
        case "SOCIAL":          return "#D62F43" // red
        case "CTF":             return "#2DA62B" // green
        case "KARRIEREDAG":     return "#02DEDE" // light blue
        case "FADDERUKA":       return "#FA75A6" // pink
        case "BEDPRES":         return "#4060E3" // dark blue
        case "LOGIN":           return "#FD8738" // orange
        default:                return "#555B5F" // gray
    }
}