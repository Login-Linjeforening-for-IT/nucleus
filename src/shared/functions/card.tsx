import FetchColor from "@styles/fetchTheme"
import { useSelector } from "react-redux"
import { ES } from "@styles/eventStyles"
import { View } from "react-native"
import React from "react"
  
/**
 * Card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Card ({ children }: React.PropsWithChildren<{}>) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const card = (
            <View style={{...ES.card, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
                <View style={ES.cardContent}>
                    { children }
                </View>
            </View>
    )

    return card
}

/**
 * Smaller card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export function CardSmaller ({ children }: React.PropsWithChildren<{}>) {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    const card = (
        <View style={{...ES.cardSmaller, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
            <View>
                { children }
            </View>
        </View>
    )

    return card
}