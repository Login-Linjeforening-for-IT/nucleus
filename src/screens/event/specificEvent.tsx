import Space from "@/components/shared/utils"
import { useCallback, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, Platform, View, Text } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import Swipe from "@components/nav/swipe"
import SpecificEventImage from "@components/event/specificEventImage"
import Countdown from "@components/event/countdown"
import BasicInfo from "@components/event/basicInfo"
import DescriptionAndJoin from "@components/event/descriptionAndJoin"
import { useDispatch } from "react-redux"
import { fetchEventDetails } from "@utils/fetch"
// import { setHistory, setEvent } from "@redux/event"
import Tag from "@components/shared/tag"
import { EventScreenProps } from "@type/screenTypes"
import { EventContext } from "@utils/contextProvider"
import { setEventName } from "@redux/event"

/**
 * @param eventID - The ID of the event to be displayed
 * 
 * @returns
 */
export default function SpecificEventScreen({ route: {params: {eventID}} }: EventScreenProps<'SpecificEventScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const height = Dimensions.get("window").height
    const [event, setEvent] = useState({} as DetailedEventResponse)

    /**
     * Sets the title of the screen in the header
     */
    useEffect(() => {
        const eventName =  lang ? event?.event?.name_no || event?.event?.name_en 
                                : event?.event?.name_en || event?.event?.name_no
        dispatch(setEventName(eventName))
    }, [event])

    useEffect(() => {
        getDetails()
    }, [eventID])

    async function getDetails() {
        const response = await fetchEventDetails(eventID)

        if (response) {
            setEvent(response)
            return true
        }
        else return false
    }
    
    const onRefresh = useCallback(async () => {
        setRefresh(true)
        const details = await getDetails()

        if (details) {
            setRefresh(false)
        }
    }, [refresh])

    return (
        <EventContext.Provider value={event}>
            <Swipe left="EventScreen">
                <View style={{...ES.sesContent, backgroundColor: theme.background}}>
                    <Space height={Platform.OS=="ios" 
                        ? Dimensions.get("window").height / 8.5
                        : Dimensions.get("window").height / 7.5 + (height > 800 && height < 900 ? 15 : 0)
                    } />
                    <ScrollView 
                        showsVerticalScrollIndicator={false} 
                        scrollEventThrottle={100}
                        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                    >
                        <Tag event={event?.event} />
                        <SpecificEventImage />
                        <Space height={10} />
                        <Countdown />
                        <BasicInfo />
                        <DescriptionAndJoin />
                        <Text style={{...ES.id, color: theme.oppositeTextColor}}>Event ID: {event?.event?.id}</Text>
                        <Space height={Dimensions.get("window").height / (Platform.OS === 'ios' ? 3 : 2.75)} />
                    </ScrollView>
                </View>
            </Swipe>
        </EventContext.Provider>
    )
}
