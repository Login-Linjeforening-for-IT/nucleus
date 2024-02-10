import Space from "@/components/shared/utils"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, Platform, ScrollView, View } from "react-native"
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
import { EventScreenProps } from "@utils/screenTypes"

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen({ navigation, route: {params: {eventID}} }: EventScreenProps<'SpecificEventScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event } = useSelector((state: ReduxState) => state.event)
    
    const dispatch = useDispatch()

    useEffect(()=>{const fetching = fetchEventDetails(eventID).then((event)=>{
        dispatch(setEvent(event))
    })}, [navigation])

    return (
        <Swipe left="EventScreen">
            <View style={{...ES.sesContent, backgroundColor: theme.background}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Space height={Platform.OS=="ios" ? Dimensions.get("window").height / 8 - 5 : Dimensions.get("window").height / 7} />
                    <Tag event={event} />
                    <SpecificEventImage />
                    <Space height={10} />
                    <Countdown />
                    <BasicInfo />
                    <DescriptionAndJoin />
                    <Space height={Dimensions.get("window").height / 3 + 10} />
                </ScrollView>
            </View>
            <TagInfo />
        </Swipe>
    )
}