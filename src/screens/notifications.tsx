import topic from "@shared/notificationComponents/topic"
import Cluster from "@shared/functions/cluster"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import React, { useEffect } from "react"
import { BlurView } from "expo-blur"
import { Navigation, ScreenProps } from "@interfaces"
import { useSelector } from "react-redux"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
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

export default function NotificationScreen({back}: {back: string}, 
{ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const list = useSelector((state: ReduxState) => state.list)

    return (
        <View>
            <View style={{
                    ...GS.content, 
                    backgroundColor: FetchColor({theme, variable: "DARKER"})
            }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => `${item.data.eventID}`}
                    data={list}
                    renderItem={({item}) => (
                        <Notification
                            title={item.title}
                            body={item.body}
                            theme={theme}
                            data={item}
                        />
                    )}
                />
                {Space(Dimensions.get("window").height/3)}
            </View>
            <TopMenu 
                navigation={navigation}
                screen="notifications"
                title={lang ? "Varslinger" : "Notifications"}
                back={back} 
            />
        </View>
    )
}

// function Option({index, theme, item}: OptionProps): JSX.Element {
//     return (
//         <View>
//             {index === 0 ? Space(Dimensions.get("window").height/8): null}
//             <TouchableOpacity onPress={() => topic({topicID: 
//                 "maintenance", lang: index === 1 ? true : undefined})}>
//                 <Cluster>
//                     <Text style={{
//                         ...T.centered20, 
//                         color: FetchColor({theme, variable: "TEXTCOLOR"})
//                         }}>
//                         {item.title}
//                     </Text>
//                 </Cluster>
//             </TouchableOpacity>
//         </View>
//     )
// }

type NotificationInAppProps = {
    title: string
    body: string
    data: any
    theme: number
}

export function Notification(props: NotificationInAppProps, 
navigation: Navigation): JSX.Element {
    const title = props.title.length > 35 ? `${props.title.slice(0,35)}...` : props.title
    const body = props.body.length > 70 ? `${props.body.slice(0,70)}...` : props.body

    return (
        <Cluster>
            {Platform.OS === "ios"
                    ? <BlurView style={GS.notificationDropdownBlur} intensity={50}/>
                    : <View style={{
                        ...GS.notificationDropdown,
                        backgroundColor: FetchColor({theme: props.theme,
                            variable: "TRANSPARENTANDROID"})}}
                />}
            <TouchableOpacity style={GS.notificationDropdownTouchable} onPress={() => {
                navigation.navigate("SpecificEventScreen", {item: props})
            }}>
                <View style={GS.notificationDropdown}>
                    <Text style={{
                        ...GS.notificationDropdownTitle,
                        color: FetchColor({theme: props.theme, variable: "TEXTCOLOR"}),
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        ...GS.notificationDropdownBody,
                        color: FetchColor({theme: props.theme, variable: "TEXTCOLOR"}),
                    }}>
                        {body}
                    </Text>
                </View>
            </TouchableOpacity>
        </Cluster>
    )
}