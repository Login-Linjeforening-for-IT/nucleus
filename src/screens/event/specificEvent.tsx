import CategorySquare from "@/components/shared/category"
import { FetchJoinLink } from "@/utils/fetch"
import Space, { Month } from "@/components/shared/utils"
import { CardSmaller } from "@/components/shared/card"
import { GetEndTime } from "@components/event/time"
import React from "react"
import EventTime from "@components/event/time"
import Card from "@/components/shared/card"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import {
    Dimensions,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { useDispatch } from "react-redux"
import Swipe from "@components/nav/swipe"
import Map from "@components/event/map"
import Description from "@components/event/description"
import Category from "@components/event/category"
import JoinButton from "@components/event/joinButton"
import SpecificEventImage from "@components/event/specificEventImage"
import Countdown from "@components/event/countdown"
import BasicInfo from "@components/event/basicInfo"
import DescriptionAndJoin from "@components/event/descriptionAndJoin"

type CategoryProps = {
    event: DetailedEvent
}

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)

    console.log(event)

    // if (deepLinkID) {
    //     const response = fetchEventDetails(deepLinkID)

    //     if (response) {
    //         dispatch(setEvent(response))
    //     }
    // }

    return (
        <Swipe left="EventScreen">
            <View style={{...ES.sesContent, backgroundColor: theme.background}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <Space height={Dimensions.get("window").height / 8 - 5} />
                <SpecificEventImage />
                <Space height={10} />
                <Countdown />
                <BasicInfo />
                <DescriptionAndJoin />
                <Space height={Dimensions.get("window").height / 3 + 10} />
                </ScrollView>
            </View>
        </Swipe>
    )
}