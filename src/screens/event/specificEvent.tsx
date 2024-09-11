import Space from "@/components/shared/utils"
import React, { useCallback, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import { Dimensions, Platform, View, Text, BackHandler } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import Swipe from "@components/nav/swipe"
import SpecificEventImage from "@components/event/specificEventImage"
import Countdown from "@components/event/countdown"
import BasicInfo from "@components/event/basicInfo"
import DescriptionAndJoin from "@components/event/descriptionAndJoin"
import { useDispatch } from "react-redux"
import { fetchEventDetails } from "@utils/fetch"
import { setHistory, setEvent } from "@redux/event"
import Tag from "@components/shared/tag"
import { EventScreenProps } from "@type/screenTypes"
import { useFocusEffect } from "@react-navigation/core"

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen({ navigation, route: {params: {eventID}} }: EventScreenProps<'SpecificEventScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event, history } = useSelector((state: ReduxState) => state.event)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const height = Dimensions.get("window").height

    useFocusEffect(
        React.useCallback(() => {
            // History can possibly be undefined if the user already has a 
            // stored state without this property
            const currentHistory = history || []
            const localHistory = [...currentHistory]
            localHistory.push(eventID)
            dispatch(setHistory(localHistory))

            function onBackPress() {
                if (history.length > 1) {
                    dispatch(setHistory(history.slice(0, history.length - 1)))
                }
                else{
                    dispatch(setHistory([]))
                    navigation.goBack()
                }
                return true
            }
    
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            )
    
            return () => subscription.remove()
        }, [])
    )

    useEffect(() => {
        getDetails()
    }, [history])

    async function getDetails() {
        const response = await fetchEventDetails(history[history?.length - 1])

        if (response) {
            dispatch(setEvent(response))
            return true
        }
    }
    
    const onRefresh = useCallback(async () => {
        setRefresh(true)
        const details = await getDetails()

        if (details) {
            setRefresh(false)
        }
    }, [refresh])

    return (
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
    )
}
