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

type FullCategorySquareProps = {
    item: EventProps | DetailedEvent
    height?: number
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
 * Displays the footer last fetch time item
 */
export function ListFooter ({index}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { lastFetch, renderedEvents } = useSelector((state: ReduxState) => state.event)

    return (
        <>
            {index === renderedEvents.length-1 && <Text style={{...T.contact, 
                color: theme.oppositeTextColor}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastFetch}.
                </Text>}
            {index === renderedEvents.length - 1 && 
                <Space height={Dimensions.get("window").height / 7}/>}
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
