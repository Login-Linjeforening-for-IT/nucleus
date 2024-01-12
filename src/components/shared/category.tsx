import { View, Text, Platform} from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import T from "@styles/text"
import { Month } from "./utils"
import ES from "@styles/eventStyles"

type CategorySquareProps = {
    color: string
    height?: number
    startDate: Date
    endDate: Date | undefined
}

/**
 * Function for drawing a small square  with rounded corners of the passed color
 * @param {string} color Color to display
 * @param {string} height Custom height
 * @returns Small square with rounded corners of the passed color
 */
export default function CategorySquare({color, startDate, endDate}: CategorySquareProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const startDay = startDate.getDate()
    const startMonth = startDate.getMonth()
    const endDay = endDate?.getDate()

    return (
        <View style={{
            width: endDay ? 66 : 42,
            padding: 5,
            height: Platform.OS === "ios" ? 65 : undefined, 
            borderRadius: 10, 
            backgroundColor: `#${color}`,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{...ES.eventClusterDayText, color: theme.textColor}}>
                {startDay}
                {endDay && "-" + endDay}
            </Text>
            <Month month={startMonth} color={theme.textColor} />
        </View>)
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
        borderRadius: 100,
        marginRight: -5
    }} />
}
