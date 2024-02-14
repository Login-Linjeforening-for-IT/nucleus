import Card from "@components/shared/card"
import Space from "@components/shared/utils"
import { Text, View } from "react-native"
import Description from "./description"
import JoinButton from "./joinButton"
import { useSelector } from "react-redux"
import T from "@styles/text"

export default function DescriptionAndJoin() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const name = lang ? event.name_no || event.name_en : event.name_en || event.name_no

    return (
        <Card>
            <View>
                <Space height={5} />
                <Text style={{...T.centered20, color: theme.textColor}}>
                    {name}
                </Text>
            </View>
            <Space height={5} />
            <Description />
            <Space height={10} />
            <JoinButton />
        </Card>
    )
}