import Card from "@components/shared/card"
import Space from "@components/shared/utils"
import { Text, View } from "react-native"
import Description from "./description"
import JoinButton from "./joinButton"
import { useSelector } from "react-redux"
import T from "@styles/text"
import Skeleton from "@components/shared/skelleton"

export default function DescriptionAndJoin() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    let name = ''
    if(event&&Object.keys(event).length){
        name = lang ? event.event.name_no || event.event.name_en : event.event.name_en || event.event.name_no
    }
    
    
    return (
        <Card>
            <Skeleton loading={!Boolean(event&&Object.keys(event).length)} height={300}>
                <View>
                    <Space height={5} />
                    <Text style={{...T.text20, color: theme.textColor}}>
                        {name}
                    </Text>
                </View>
                <Space height={5} />
                <Description />
                <Space height={10} />
                <JoinButton />
            </Skeleton>
        </Card>
    )
}