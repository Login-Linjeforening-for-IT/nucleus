import Space, { ErrorMessage } from "@/components/shared/utils"
import React from "react"
import { Dimensions, Platform, ScrollView } from "react-native"
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
                    ? Dimensions.get("window").height / 3.6
                    : Dimensions.get("window").height / 3} />
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
