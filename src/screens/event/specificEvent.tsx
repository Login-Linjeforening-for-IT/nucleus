import Space from "@/components/shared/utils"
import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, Platform, View, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Swipe from "@components/nav/swipe"
import SpecificEventImage from "@components/event/specificEventImage"
import Countdown from "@components/event/countdown"
import BasicInfo from "@components/event/basicInfo"
import DescriptionAndJoin from "@components/event/descriptionAndJoin"
import { useDispatch } from "react-redux"
import { fetchEventDetails } from "@utils/fetch"
import { setEvent } from "@redux/event"
import Tag from "@components/shared/tag"
import TagInfo from "@components/shared/tagInfo"
import Refresh from "@components/event/refresh"
import handleRefresh from "@utils/handleRefresh"

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event } = useSelector((state: ReduxState) => state.event)
    const [refresh, setRefresh] = useState(false)
    // if (deepLinkID) {
    //     const response = fetchEventDetails(deepLinkID)

    //     if (response) {
    //         dispatch(setEvent(response))
    //     }
    // }

    const dispatch = useDispatch()
    const descriptionCheck = lang ? 'description_no' : 'description_en'

    async function getDetails() {
        const response = await fetchEventDetails(event.id)

        if (response) {
            dispatch(setEvent(response))
            return true
        }
    }

    if (!(descriptionCheck in event)) {
        getDetails()
    }

    return (
        <Swipe left="EventScreen">
            <View style={{...ES.sesContent, backgroundColor: theme.background}}>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    onScroll={(event) => handleRefresh({event, setRefresh, getDetails})} 
                    scrollEventThrottle={100}
                >
                    <Space height={Platform.OS=="ios" 
                        ? Dimensions.get("window").height / 8.5
                        : Dimensions.get("window").height / 6.15
                    } />
                    <Refresh display={refresh}/>
                    <Tag event={event} />
                    <SpecificEventImage />
                    <Space height={10} />
                    <Countdown />
                    <BasicInfo />
                    <DescriptionAndJoin />
                    <Text style={{...ES.id, color: theme.oppositeTextColor}}>Event ID: {event.id}</Text>
                    <Space height={Dimensions.get("window").height / (Platform.OS === 'ios' ? 3 : 2.75)} />
                </ScrollView>
            </View>
            <TagInfo />
        </Swipe>
    )
}
