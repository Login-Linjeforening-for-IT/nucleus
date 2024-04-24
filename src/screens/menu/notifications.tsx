import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Navigation } from "@interfaces"
import { useSelector } from "react-redux"
import { View, Text, Dimensions, TouchableOpacity, Platform, Animated, TouchableHighlight } from "react-native"
import NS from "@styles/notificationStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotificationText from "@/components/notification/notificationText"
import Swipe from "@components/nav/swipe"
import { useNavigation } from "@react-navigation/native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import { Swipeable } from 'react-native-gesture-handler'
import TrashCan from "@components/menu/navigation"
import handleSwipe from "@utils/handleSwipe"

type NotificationModalProps = {
    item: NotificationListProps
    list: NotificationListProps[]
    id: number
    setList: React.Dispatch<React.SetStateAction<NotificationListProps[] | null>>
}

type NotificationList = {
    list: NotificationListProps[]
    getList: () => Promise<true | undefined>
    setList: React.Dispatch<React.SetStateAction<NotificationListProps[] | null>>
}

export default function NotificationScreen(): JSX.Element {
    const [list, setList] = useState<NotificationListProps[] | null>(null)
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    async function getList() {
        const temp = await AsyncStorage.getItem("notificationList")

        if (temp) {
            setList(JSON.parse(temp))
            return true
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker, paddingHorizontal: 0}}>
                    <Space height={Dimensions.get("window").height / 8.1} />
                    {Array.isArray(list)
                        ? <List list={list} getList={getList} setList={setList} /> 
                        : <Text style={{...NS.error, color: theme.oppositeTextColor}}>
                            {lang 
                                ? "Du har ingen varslinger nå. Kom tilbake senere." 
                                : "You have no notifications at this time. Check back later."}
                        </Text>}
                        <Space height={Dimensions.get("window").height / 3} />
                </View>
            </View>
        </Swipe>
    )
}

function Notification({item, list, id, setList}: NotificationModalProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme);
    const [isSwiping, setIsSwiping] = useState<boolean>(false)
    const navigation: Navigation = useNavigation();
    const time = displayTime(item.time);
    const swipeableRef = useRef<Swipeable | null>(null);

    function navigateIfPossible() {
        // Checks if the object has any properties, and if so navigates to SES
        if (Object.keys(item.data).length) {
            navigation.navigate("SpecificEventScreen", {item: item.data});
        }
    }

    function renderRightActions(_: any, dragX: any) {
        if (dragX._parent._a?._animation?._lastVelocity > 1500 || dragX._parent._a?._animation?._lastPosition > 150) {
            navigation.navigate("MenuScreen")
        }
        if (dragX._parent._a?._animation?._lastPosition < -Dimensions.get("window").width / 2) {
            deleteNotification()
            dragX._parent._a._animation._lastPosition = 0
        }

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => deleteNotification()}>
                <View style={{ 
                    minWidth: 70,
                    backgroundColor: 'red', 
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center', 
                    justifyContent: 'flex-end',
                    height: "100%"
                }}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <TrashCan />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        );
    };

    async function deleteNotification() {
        // Copies the list to ensure that React detects the change since splice mutates the list undetectably.
        const newList: NotificationListProps[] = [...list];
        newList.splice(id, 1);
        setList(newList);
        await AsyncStorage.setItem("notificationList", JSON.stringify(newList))
        swipeableRef.current?.close()
    }

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            ref={swipeableRef}
            containerStyle={{backgroundColor: "red"}}
            // Indents corners as soon as they start dragging
            onSwipeableWillOpen={() => {
                setIsSwiping(true)
            }}
            // Removes borderRadius on close
            onSwipeableWillClose={() => {
                setIsSwiping(false)
            }}
        >
            {/* 
                Using TouchableHighlight since we want feedback on touch, but 
                not opacity change, since the background is red because of the
                delete functionality. Therefore we "highlight" the click using a
                different foreground color instead. 
            */}
            <TouchableHighlight 
                activeOpacity={1} 
                onPress={navigateIfPossible} 
                style={{backgroundColor: theme.darker, borderTopRightRadius: isSwiping ? 8 : 0, borderBottomRightRadius: isSwiping ? 8 : 0}}
            >
                <Animated.View>
                    <Cluster marginVertical={12} noColor={true}>
                        <View style={[NS.notificationBack]}>
                            <View style={NS.notificationView}>
                                <NotificationText title={item.title} body={item.body} />
                            </View>
                            <Text style={{...NS.time, right: 32, color: theme.titleTextColor}}>
                                {time}
                            </Text>
                        </View>
                    </Cluster>
                </Animated.View>
            </TouchableHighlight>
        </Swipeable>
    );
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

function List({list, getList, setList}: NotificationList): JSX.Element {
    if (!list) return <></>

    const offset = Dimensions.get("window").height / (Platform.OS === "ios" ? 3.8 : 3.8 )
    const [refresh, setRefresh] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const temp = await getList()

        if (temp) {
            setRefresh(false)
        }
    }, [refresh]);

    return (
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            scrollEventThrottle={100}
            style={{minHeight: "100%", top: -5}}
        >
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            {list.map((item, index) => <Notification key={index} list={list} item={item} id={index} setList={setList}/>)}
            <Space height={offset} />
        </ScrollView>
    )
}
