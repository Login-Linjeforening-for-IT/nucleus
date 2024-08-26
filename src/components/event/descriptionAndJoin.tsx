import Card from "@components/shared/card"
import Space from "@components/shared/utils"
import { Text, View } from "react-native"
import Description from "./description"
import JoinButton from "./joinButton"
import { useSelector } from "react-redux"
import T from "@styles/text"
import Skeleton from "@components/shared/skeleton"
import { EventContext } from "@utils/contextProvider"
import { useContext } from "react"

export default function DescriptionAndJoin() {
    const event = useContext(EventContext)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const loading = !Boolean(event&&Object.keys(event).length)
    let name = ''

    
    if(event?.event&&Object.keys(event.event).length){
        name = lang 
            ? event.event.name_no || event.event.name_en 
            : event.event.name_en || event.event.name_no
    }
    
    
    return (
        <Card>
            <Skeleton loading={loading} height={300}>
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