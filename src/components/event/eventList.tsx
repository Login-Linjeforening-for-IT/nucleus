import notificationArray from "@/utils/notificationArray"
import EventClusterTitle from "@components/event/EventClusterTitle"
import CategorySquare from "@/components/shared/category"
import topic from "@/utils/topic"
import Space, { ErrorMessage, Month } from "@/components/shared/utils"
import BellIcon from "@components/shared/bellIcon"
import Cluster from "@/components/shared/cluster"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    Dimensions,
    FlatList,
    Text,
    View,
    Platform,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { setClickedEvents, setEvent, toggleSearch } from "@redux/event"
import { useNavigation } from "@react-navigation/native"
import { Navigation } from "@interfaces"

type EventListProps = {
    notification: NotificationProps
}

type EventClusterProps = {
    notification: NotificationProps
    item: EventProps
    index: number
}

type FullCategorySquareProps = {
    item: EventProps | DetailedEvent
    height?: number
}

type BellProps = {
    item: EventProps
    notification: NotificationProps
}

/**
 * Displays the event list
 */
export default function EventList ({notification}: EventListProps): JSX.Element {
    const { events, search, renderedEvents } = useSelector((state: ReduxState) => state.event)

    if (!renderedEvents.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedEvents.length > 0) {
        return (
            <View>
                <FlatList
                    style={{minHeight: "100%"}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => `${item.id}`}
                    data={renderedEvents}
                    renderItem={({item, index}) =>
                        <EventCluster
                            notification={notification}
                            item={item}
                            index={index}
                            key={index}
                        />
                    }
                />
            </View>
        )
    } else {
        return <ErrorMessage argument={!events.length ? "wifi" : "nomatch"} />
    }
}

/**
 * Displays one element of the event card array
 */
function EventCluster ({notification, item, index}: EventClusterProps): 
JSX.Element {
    const { search } = useSelector((state: ReduxState) => state.event)
    const navigation: Navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <View>
            <TouchableOpacity onPress={() => {
                search && dispatch(toggleSearch())
                dispatch(setEvent(item))
                navigation.navigate("SpecificEventScreen")
            }}>
                {index === 0
                    ? search === false
                        ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                        : <Space height={Platform.OS === "ios" 
                        ? Dimensions.get("window").height / 4
                        : Dimensions.get("window").height / 3.6} />
                    : null}
                <Cluster marginVertical={8}>
                    <View style={ES.eventBack}>
                        <FullCategorySquare item={item} />
                        <EventClusterTitle item={item} />
                        <Bell item={item} notification={notification} />
                    </View>
                </Cluster>
            </TouchableOpacity>
            <ListFooter index={index} />
        </View>
    )
}

/**
 * Displays the footer last fetch time item
 */
export function ListFooter ({index}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { search, lastFetch, renderedEvents } = useSelector((state: ReduxState) => state.event)

    return (
        <>
            {index === renderedEvents.length-1 && <Text style={{...T.contact, 
                color: theme.oppositeTextColor}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastFetch}.
                </Text>}
            {index === renderedEvents.length - 1 && 
                <Space height={Dimensions.get("window").height / 3 + 20}/>}
        </>
    )
}

/**
 * Displays the category square to the left of each event in the list on the EventScreen
 */
export function FullCategorySquare({item, height}: FullCategorySquareProps): JSX.Element {
    const day = "time_start" in item ? `${item.time_start[8]}${item.time_start[9]}` : new Date().getDate()
    const month = "time_start" in item ? parseInt(item.time_start[5] + item.time_start[6]) : new Date().getMonth() + 1
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <CategorySquare color={item.category_color} height={height} />
            <Text style={{...ES.eventClusterDayText, color: theme.textColor}}>
                {day}
            </Text>
            <Month month={month} color={theme.textColor} />
        </View>
    )
}

/**
 * Displays the bell to the right of every event in the eventlist
 */
function Bell({item, notification}: BellProps): JSX.Element {
    const { clickedEvents } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const category = lang ? item.category_name_no : item.category_name_en
    const isOrange = clickedEvents.some(event => event.id === item.id) 
        ? true 
        : false
    
    return (
        <View style={ES.view3}>
            <TouchableOpacity style={{paddingBottom: 10}} onPress={() => {
                topic({topicID: `${item.id}`, lang, status: false, 
                    category: (category).toLowerCase(), catArray: 
                    notificationArray({notification, category})})
                dispatch(setClickedEvents(
                    clickedEvents.some(event => event.id === item.id)
                    ? clickedEvents.filter((x) => x.id !== item.id)
                    : [...clickedEvents, item]
                ))
            }}>
                <View style={ES.bellPosition} >
                    <BellIcon orange={isOrange} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
