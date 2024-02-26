import Space from "@/components/shared/utils"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, Platform, ScrollView, View, Text } from "react-native"
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
import { StackScreenProps } from "@react-navigation/stack"

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen({route:{params}}: StackScreenProps<EventStackParamList>): JSX.Element {
    if (params==undefined) return <></>
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event:{event} } = useSelector((state: ReduxState) => state.event)

    // if (deepLinkID) {
    //     const response = fetchEventDetails(deepLinkID)

    //     if (response) {
    //         dispatch(setEvent(response))
    //     }
    // }

    const dispatch = useDispatch()
    const descriptionCheck = lang ? 'description_no' : 'description_en'

    async function getDetails() {
        if (!params) return
        const response = await fetchEventDetails(params.eventID)

        if (response) dispatch(setEvent(response))
    }

    useEffect(() => {
        getDetails()
    }, [params])

    if(!event) return <></>

    return (
        <Swipe left="EventScreen">
            <View style={{...ES.sesContent, backgroundColor: theme.background}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Space height={Platform.OS=="ios" 
                        ? Dimensions.get("window").height / 8.5
                        : Dimensions.get("window").height / 6.15
                    } />
                    <Tag event={event} />
                    <SpecificEventImage />
                    <Space height={10} />
                    <Countdown />
                    <BasicInfo />
                    <DescriptionAndJoin />
                    <Text style={{
                        alignSelf: 'center', 
                        fontSize: 15, 
                        color: theme.oppositeTextColor,
                        marginVertical: 10
                    }}>Event ID: {event && event?.id}</Text>
                    <Space height={Dimensions.get("window").height / (Platform.OS === 'ios' ? 3 : 2.75)} />
                </ScrollView>
            </View>
            <TagInfo />
        </Swipe>
    )
}