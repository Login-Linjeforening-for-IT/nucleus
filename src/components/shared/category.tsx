import { View, Text, Platform } from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import T from "@styles/text"

type CategorySquareProps = {
    color: string
    height?: number
}

/**
 * Function for drawing a small square  with rounded corners of the passed color
 * @param {string} color Color to display
 * @param {string} height Custom height
 * @returns Small square with rounded corners of the passed color
 */
export default function CategorySquare({color, height}: CategorySquareProps): 
JSX.Element {

    return <View style={{
        width: 40, 
        height: height ? 65 + height : 65, 
        borderRadius: 10, 
        backgroundColor: `#${color}`, 
        alignSelf: "center",
        top: Platform.OS === "ios" ? -9 : -8,
        zIndex: -100,
        position: 'absolute'
    }} />
}

/**
 * Header for SES category
 * @returns Text displaying 'Kategori:' or 'Category:'
 */
export function Title() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return <Text style={{...T.specificEventInfo, color: theme.textColor}}>
        {lang ? "Kategori:      " : "Category:      "}
    </Text>
}

/**
 * Circle displaying the passed color
 *
 * @param {string} color Category of the event, Format: "CATEGORY"
 * @returns Small circle of the categories color
 */
export function CategoryCircle({color}: {color: string}): JSX.Element {
    return <View style={{
        right: 10,
        height: 20, 
        width: 20, 
        backgroundColor: `#${color}`, 
        borderRadius: 100
    }} />
}
