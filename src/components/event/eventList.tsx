import Space, { ErrorMessage } from "@components/shared/utils"
import { useState, useCallback } from "react"
import { Dimensions, Platform, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Seperator from "./seperator"
import EventCluster from "./eventCluster"
import LastFetch, { fetchEvents } from "@utils/fetch"
import { setEvents, setLastFetch } from "@redux/event"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import getHeight from "@utils/getHeight"
import getCategories from "@utils/getCategories"

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
export default function EventList (): JSX.Element {
    const { events, renderedEvents, search, categories, clickedEvents } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
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

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        const details = await getDetails()

        if (details) {
            setRefresh(false)
        }
    }, [refresh]);
    
    const cat = getCategories({lang, categories})
    const offset = search 
    ? (Dimensions.get("window").height / ((Platform.OS === "ios" ? 3.6 : 3)) - (100 - getHeight(cat.length + clickedEvents.length)))
    : Dimensions.get("window").height / (Platform.OS === "ios" ? 8.2 : 7.8 )

    if (renderedEvents.length > 0) {
        const usedIndexes: number[] = []

        return (
            <>
                <ScrollView 
                    style={{paddingTop: offset }}
                    showsVerticalScrollIndicator={false} 
                    scrollEventThrottle={100}
                >
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                    <Content usedIndexes={usedIndexes}/>
                    <Space height={offset} />
                </ScrollView>
            </>
        )
    }

    return <ErrorMessage argument={!events ? "wifi" : "nomatch"} screen="event" />
}

function Content({usedIndexes}: ContentProps) {
    const {renderedEvents } = useSelector((state: ReduxState) => state.event)

    return renderedEvents.map((event, index) => (
        <View key={`View${index}`}>
            <Seperator key={`Seperator${index}`} item={event} usedIndexes={usedIndexes} />
            <EventCluster key={index} item={event} index={index} />
        </View>
    ))
}
