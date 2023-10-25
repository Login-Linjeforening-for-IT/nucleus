import topic from "@/utils/topic"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React from "react"
import Swipe from "@components/nav/swipe"
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"


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
                <View style={{
                        ...GS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        keyExtractor={(item) => `${item.id}`}
                        data={setting}
                        renderItem={({item, index}) => (
                            <Option index={index} item={item} />
                        )}
                    />
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
                    <Text style={{
                        ...T.centered20, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                        {item.title}
                    </Text>
                </Cluster>
            </TouchableOpacity>
        </View>
    )
}
