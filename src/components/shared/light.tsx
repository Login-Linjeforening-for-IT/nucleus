import Svg, { Circle } from "react-native-svg"
import ES from "@styles/eventStyles"
import { View } from "react-native"
import React from "react"

/**
 * NOTE: SHOULD BE COMBINDED WITH REDLIGHT INTO LIGHT AND TAKE COLOR AS PARAMETER
 * Function for drawing a green light
 * @returns Green Light svg
 */
export default function GreenLight() {
    return (
        <View style={ES.size}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle 
                    cx="50" 
                    cy="50" 
                    r="50" 
                    stroke="green" 
                    strokeWidth=".5" 
                    fill="green" 
                />
            </Svg>
        </View>
    )
}

/**
 * NOTE: SHOULD BE COMBINDED WITH GREENLIGHT
 * Function for drawing a red colored light svg
 * @returns Red colored light svg
 */
export function RedLight() {
    return (
    <View style={ES.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill="red" />
        </Svg>
    </View>
    )
}
