import Swipe from "@components/nav/swipe"
import { ReactNode } from "react"
import { Dimensions, View } from "react-native"
import { useSelector } from "react-redux"
import GS from "@styles/globalStyles"
import Space from "./utils"

type ParentProps = {
    children?: ReactNode
    left?: string
    right?: string
}

export default function Parent({children, left, right}: ParentProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Swipe left={left} right={right}>
            <View style={{...GS.content, backgroundColor: theme.darker}}>
                <Space height={Dimensions.get("window").height / 8} />
                {children}
            </View>
        </Swipe>
    )
}