import topic from "@shared/notificationComponents/topic"
import Cluster from "@shared/functions/cluster"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import { ScreenProps } from "@interfaces"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import React from "react"
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"


type OptionProps = {
    index: number
    theme: number
    item: ItemProps
}

type ItemProps = {
    id: number
    title: string
}

export default function InternalScreen({ navigation }: ScreenProps): 
JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )

    const setting = [
        {id: 0, title: "Subscribe to maintenance"},
        {id: 1, title: "Unsubscribe from maintenance"},
    ]

  return (
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
                    <Option index={index} theme={theme} item={item} />
                )}
            />
            {Space(Dimensions.get("window").height/3)}
        </View>
        <TopMenu 
            navigation={navigation}
            screen="internal"
            title={lang ? "Internt" : "Intranet"}
            back={"MenuScreen"} 
        />
    </View>
  )
}

function Option({index, theme, item}: OptionProps): JSX.Element {
    return (
        <View>
            {index === 0 ? Space(Dimensions.get("window").height/8): null}
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