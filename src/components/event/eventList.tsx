import Space, { ErrorMessage } from "@/components/shared/utils"
import { useState, useCallback } from "react"
import { Dimensions, Platform } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Seperator from "./seperator"
import EventCluster from "./eventCluster"
import LastFetch, { fetchEvents } from "@utils/fetch"
import { setEvents, setLastFetch } from "@redux/event"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"

type EventListProps = {
    notification: NotificationProps
}

type SeperatedEventsProps = {
    item: EventProps
    index: number
    usedIndexes: number[]
}

type ContentProps = {
    usedIndexes: number[]
}

/**
 * Displays the event list
 */
export default function EventList ({notification}: EventListProps): JSX.Element {
    const { events, search, renderedEvents } = useSelector((state: ReduxState) => state.event)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()

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

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const details = await getDetails()

        if (details) {
            setRefresh(false)
        }
    }, [refresh]);
    
    if (renderedEvents.length > 0) {
        const usedIndexes: number[] = []

        return (
            <>
            <Space height={Dimensions.get("window").height / (search 
                        ? (Platform.OS === "ios" ? 3.85 : 3.1)
                        : (Platform.OS === "ios" ? 8.2 : 7.8) 
                )} />
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    scrollEventThrottle={100}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                >
                    <Content usedIndexes={usedIndexes}/>
                </ScrollView>
            </>
        )
    }

    return <ErrorMessage argument={!events.length ? "wifi" : "nomatch"} />
}

function Content({usedIndexes}: ContentProps) {
    const {renderedEvents } = useSelector((state: ReduxState) => state.event)

    return renderedEvents.map((event, index) => (
        <SeperatedEvents 
            item={event} 
            index={index} 
            key={index} 
            usedIndexes={usedIndexes}
        />
    ))
}

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
