import CategorySquare from "@/components/shared/category"
import Space, { ErrorMessage, Month } from "@/components/shared/utils"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import React from "react"
import {
    Dimensions,
    Text,
    View,
    Platform,
    ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import Seperator from "./seperator"
import EventCluster from "./eventCluster"

type EventListProps = {
    notification: NotificationProps
}

type SeperatedEventsProps = {
    item: EventProps
    index: number
    usedIndexes: number[]
}

/**
 * Displays the event list
 */
export default function EventList ({notification}: EventListProps): JSX.Element {
    const { events, search, renderedEvents } = useSelector((state: ReduxState) => state.event)

    // Copies renderedEvents because it's read only
    let eventList: EventProps[] = [...renderedEvents]
    eventList.sort((a, b) => (Number(b.highlight) - Number(a.highlight)))

    function SeperatedEvents({item, index, usedIndexes}: SeperatedEventsProps) { 
        return (
            <>
                <Seperator item={item} usedIndexes={usedIndexes} />
                <EventCluster
                    notification={notification}
                    item={item}
                    index={index}
                    key={index}
                />
            </>
        )
    }

    if (!renderedEvents.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedEvents.length > 0) {
        const usedIndexes: number[] = []
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {search === false
                    ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                    : <Space height={Platform.OS === "ios" 
                    ? Dimensions.get("window").height / 4
                    : Dimensions.get("window").height / 3.6} />
                }
                {eventList.map((event, index) => {
                    return <SeperatedEvents item={event} index={index} key={index} usedIndexes={usedIndexes}/>
                })}
            </ScrollView>
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
                <Cluster marginVertical={4}>
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
    const startDate = item?.time_start ? new Date(item.time_start) : new Date()
    const endDate = item?.time_type=="default" ? new Date(item.time_end) : undefined

    return (
        <View style={{minWidth: 65, flexDirection: 'row'}}>
            <CategorySquare color={item.category_color} height={height} startDate={startDate} endDate={endDate}/>
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
