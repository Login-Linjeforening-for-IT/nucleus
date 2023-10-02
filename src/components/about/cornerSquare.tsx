import { random } from "@/components/shared/utils"
import Svg, { Rect } from "react-native-svg"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { View } from "react-native"
import React from "react"
import { useSelector } from "react-redux"

type CornerSquareProps = {
    corner: number
    type?: boolean
}

/**
 * Function for drawing a small square of the category of the event
 * @param {string} category Category of the event, Format: "CATEGORY"
 * @returns Small circle of the categories color
 */
export default function CornerSquare({corner, type}: CornerSquareProps):
JSX.Element {
    let p1 = 10, p2 = 100, p3 = 13, p4 = 102, p5 = 0, p6 = 160, p7 = 70, 
    p8 = 345

    const { theme } = useSelector((state: ReduxState) => state.theme)

    if (type) {
        while (corner != 0 && corner != 2) corner = random({min: 0, max: 3})
        if (corner === 0 || corner === 2) {
            p1 = 0, p2 = 0, p3 = 13, p4 = 137, p5 = 0, p6 = 195, p7 = 70, 
            p8 = 380
        }
    }

    return (
        <View style={type ? {
            ...GS.aboutImage,
            top: corner === 1 || corner === 3 ? 100:null, 
            maxWidth: corner === 1 || corner === 3 ? 100:null, 
            transform: [{ rotate: `${90*corner}deg` }]}
            : {
                ...GS.personImage, 
                transform: [{ rotate: `${90*corner}deg` }]
        }}>
            <View style={{maxHeight: 220}}>
                {/** ORANGE */}
                <Svg 
                    style={{left: type ? p1:null, bottom: type ? p2 : null}} 
                    width={type ? 150:115} 
                    height={type?150:115} 
                    fill={FetchColor({theme, variable: "ORANGE"})}
                >
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND INSIDE*/}
                <Svg 
                    style={{left: p3, bottom: p4}} 
                    width={115} 
                    height={115} 
                    fill={FetchColor({theme, variable: "DARKER"})}>
                    <Rect width={13} height={70} />
                    <Rect width={70} height={13} />
                </Svg>

                {/** BACKGROUND FIRST CLOCKWISE */}
                <Svg 
                    style={{left: p5, bottom: p6}} 
                    width={115} 
                    height={115} 
                    fill={FetchColor({theme, variable: "DARKER"})}>
                    <Rect width={20} height={13} />
                </Svg>

                {/** BACKGROUND LAST CLOCKWISE*/}
                <Svg 
                    style={{left: p7, bottom: p8}} 
                    width={115} 
                    height={115} 
                    fill={FetchColor({theme, variable: "DARKER"})}>
                    <Rect width={13} height={20} />
                </Svg>
            </View>
        </View>
    )
}
