import Space from "@/components/shared/utils"
import React from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, ScrollView, View } from "react-native"
import Swipe from "@components/nav/swipe"
import SpecificEventImage from "@components/event/specificEventImage"
import Countdown from "@components/event/countdown"
import BasicInfo from "@components/event/basicInfo"
import DescriptionAndJoin from "@components/event/descriptionAndJoin"

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