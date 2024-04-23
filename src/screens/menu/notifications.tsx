import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import React, { useEffect, useState } from "react"
import { Navigation, NotificationScreenProps } from "@interfaces"
import { useSelector } from "react-redux"
import TopMenu from "@/components/shared/topMenu"
import { View, Text, Dimensions, TouchableOpacity } from "react-native"
import NS from "@styles/notificationStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotificationText from "@/components/notification/notificationText"
import Swipe from "@components/nav/swipe"
import { useNavigation } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"

type NotificationInAppProps = {
    item: NotificationListProps
}

type NotificationList = {
    list: NotificationListProps[]
}

export default function NotificationScreen({navigation, back}: NotificationScreenProps): JSX.Element {
    const [list, setList] = useState(undefined)
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    useEffect(() => {
        (async() => {
            const temp = await AsyncStorage.getItem("notificationList")
            temp && setList(JSON.parse(temp))
        })()
    }, [])
    
    useEffect(() => {
        setTimeout(() => (async() => {
            const temp = await AsyncStorage.getItem("notificationList")
            temp && setList(JSON.parse(temp))
        })(), 10000)
    }, [list])

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker}}>
                    <Space height={Dimensions.get("window").height / 8.1} />
                    {Array.isArray(list)
                        ? <List list={list} /> 
                        : <Text style={{...NS.error, color: theme.oppositeTextColor}}>
                            {lang 
                                ? "Du har ingen varslinger nå. Kom tilbake senere." 
                                : "You have no notifications at this time. Check back later."}
                        </Text>}
                        <Space height={Dimensions.get("window").height / 3} />
                </View>
                <TopMenu 
                    navigation={navigation}
                    screen="notifications"
                    title={lang ? "Varslinger" : "Notifications"}
                    back={back} 
                />
            </View>
        </Swipe>
    )
}

function Notification({item}: NotificationInAppProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const navigation: Navigation = useNavigation()
    const time = displayTime(item.time)

    function navigateIfPossible() {
        // Checks if the object has any properties, and if so navigates to SES
        if (Object.keys(item.data).length) {
            navigation.navigate("SpecificEventScreen", {item: item.data})
        }
    }

    return (
        <TouchableOpacity onPress={navigateIfPossible}>
            <Cluster marginVertical={12}>
                <View style={NS.notificationBack}>
                    <View style={NS.notificationView}>
                        <NotificationText title={item.title} body={item.body} />
                    </View>
                    <Text style={{...NS.time, right: 32, color: theme.titleTextColor}}>
                        {time}
                    </Text>
                </View>
            </Cluster>
        </TouchableOpacity>
    )
}

function displayTime(time: string): string {
    const date = new Date(time)
    const currentTime = new Date()
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentTime.getTime() - date.getTime()
  
    // Check if the time is within the last 24 hours
    if (timeDifference <= 24 * 60 * 60 * 1000) {
        // If within 24 hours, display the time
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    } else {
        // If not within 24 hours, display the date
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return `${day}.${month}`
    }
}

function List({list}: NotificationList): JSX.Element {
    if (!list) return <></>

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            scrollEventThrottle={100}
            style={{minHeight: "100%"}}
        >
            {list.map((item, index) => <Notification key={index} item={item} />)}
        </ScrollView>
    )
}