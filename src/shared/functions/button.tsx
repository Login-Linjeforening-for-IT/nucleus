import FetchColor from "@styles/fetchTheme"
import { SS } from "@styles/settingStyles"
import { useSelector } from "react-redux"
import React, { ReactNode } from "react"
import { View } from "react-native"

type ButtonProps = {
    children: ReactNode
}

/**
 * Returns a Login colored button
 * @param {*} props
 * @returns Button with the content displayed inside
 */
export default function Button (props: ButtonProps) { // Button, Login colored

    const { theme } = useSelector( (state: ReduxState) => state.theme )

    return (
        <View style={{...SS.button, backgroundColor: FetchColor({theme, variable: "ORANGE"})}}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    )
}