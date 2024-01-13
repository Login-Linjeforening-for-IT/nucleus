import topic from "@/utils/topic"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React from "react"
import Swipe from "@components/nav/swipe"
import { Text, View, TouchableOpacity, Dimensions } from "react-native"


type OptionProps = {
    index: number
    item: ItemProps
}

type ItemProps = {
    id: number
    title: string
}

export default function InternalScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    const setting = [
        {id: 0, title: "Subscribe to maintenance"},
        {id: 1, title: "Unsubscribe from maintenance"},
    ]

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker}}>
                    {setting.map((item, index) => <Option index={index} item={item} key={index} />)}
                    <Space height={Dimensions.get("window").height / 3}/>
                </View>
            </View>
        </Swipe>
    )
}

function Option({index, item}: OptionProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            {index === 0 && <Space height={Dimensions.get("window").height/8} />}
            <TouchableOpacity onPress={() => topic({topicID: 
                "maintenance", lang: index === 1 ? true : undefined})}>
                <Cluster>
                    <Text style={{...T.centered20, color: theme.textColor}}>
                        {item.title}
                    </Text>
                </Cluster>
            </TouchableOpacity>
        </View>
    )
}
