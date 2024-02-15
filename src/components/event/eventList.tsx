import Space, { ErrorMessage } from "@/components/shared/utils"
import React, { useState } from "react"
import { Dimensions, Platform, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Seperator from "./seperator"
import EventCluster from "./eventCluster"
import handleRefresh from "@utils/handleRefresh"
import Refresh from "./refresh"
import LastFetch, { fetchEvents } from "@utils/fetch"
import { setEvents, setLastFetch } from "@redux/event"

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
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()

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

    async function getDetails() {
        const events = await fetchEvents()
    
        if (events.length) {
            dispatch(setEvents(events))
            dispatch(setLastFetch(LastFetch()))
            return true
        }
    }

    if (!renderedEvents.length && !search) {
        return <ErrorMessage argument="wifi" />
    } 
    
    if (renderedEvents.length > 0) {
        const usedIndexes: number[] = []

        return (
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                onScroll={(event) => handleRefresh({event, setRefresh, getDetails})} 
                scrollEventThrottle={100}
            >
                <Space height={Dimensions.get("window").height / (search 
                    ? (Platform.OS === "ios" ? 8.2 : 7.8) 
                    : (Platform.OS === "ios" ? 3.85 : 3.1)
                )} />
                <Refresh display={refresh}/>
                {renderedEvents.map((event, index) => (
                    <SeperatedEvents 
                        item={event} 
                        index={index} 
                        key={index} 
                        usedIndexes={usedIndexes}
                    />
                ))}
            </ScrollView>
        )
    }

    return <ErrorMessage argument={!events.length ? "wifi" : "nomatch"} />
}
