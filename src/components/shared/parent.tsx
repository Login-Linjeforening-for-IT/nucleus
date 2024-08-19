import Swipe from "@components/nav/swipe"
import { ReactNode } from "react"
import { Dimensions, View } from "react-native"
import { useSelector } from "react-redux"
import GS from "@styles/globalStyles"
import Space from "./utils"
import { LinearGradient } from "expo-linear-gradient"

type ParentProps = {
    children?: ReactNode
    left?: string
    right?: string
    noPadding?: boolean
    colors?: string[]
}

export default function Parent({children, left, right, noPadding, colors}: ParentProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Swipe left={left} right={right}>
            <LinearGradient
                colors={colors || [theme.darker, theme.darker]}
                style={{...GS.content, paddingHorizontal: noPadding ? undefined : 12}}
            >
            <View style={{...GS.content, paddingHorizontal: noPadding ? undefined : 12}}>
                <Space height={Dimensions.get("window").height / 8} />
                {children}
            </View>
            </LinearGradient>
        </Swipe>
    )
}