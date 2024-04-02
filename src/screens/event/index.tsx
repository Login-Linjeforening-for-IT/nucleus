import React, { useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import EventList from "@components/event/eventList"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import GS from "@styles/globalStyles"
import NavigateFromPushNotification 
from "@/utils/navigateFromPushNotification"
import initializeNotifications 
from "@/utils/notificationSetup"
import LastFetch, { fetchEvents } from "@/utils/fetch"
import { View } from "react-native"
import LogoNavigation from "@/components/shared/logoNavigation"
import { setEvents, setLastFetch, setLastSave } from "@redux/event"
import Swipe from "@components/nav/swipe"
import { FilterButton, FilterUI } from "@components/shared/filter"
import DownloadButton from "@components/shared/downloadButton"
import { EventScreenProps } from "@utils/screenTypes"
/**
 * Parent EventScreen component
 *
 * Handles:
 * - Displaying events
 * - Filtering events
 * - Notification Management
 * - Event notifications, both scheduling and cancelling
 *
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */
export default function EventScreen({ navigation }: EventScreenProps<'EventScreen'>): JSX.Element {
    // Push notification
    const [pushNotification, setPushNotification] = useState(false)
    const [pushNotificationContent, setPushNotificationContent] = 
        useState<JSX.Element | undefined>(undefined)
    // Notification state
    const [shouldSetupNotifications, setShouldSetupNotifications] = useState(true)

    // Redux states
    const notification = useSelector((state: ReduxState) => state.notification)
    const { search, lastSave } = useSelector((state: ReduxState) => state.event)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification({navigation, theme,
        setPushNotification, setPushNotificationContent})

    // Fetches events when screen is focused
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // IIFE to fetch clicked events
            (async() => {
                const events = await fetchEvents()

                if (events.length) {
                    dispatch(setEvents(events))
                    dispatch(setLastFetch(LastFetch()))
                }
            })()
        }, [])
    )

    // Loads initial data
    useEffect(() => {
        // IIFE to fetch API
        (async() => {
            const events = await fetchEvents()

            if (events.length) {
                dispatch(setEvents(events))
                dispatch(setLastFetch(LastFetch()))
            }
        })()

    // Renders when the screen is loaded
    }, [])

    useEffect(() => {
        // --- SETUP CODE ONCE APP IS DOWNLOADED---
        // Displays when the API was last fetched successfully
        if (lastSave === "") {(async() => {dispatch(setLastSave(LastFetch()))})()
    }
    }, [lastSave])

    // Sets the component of the header
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [<FilterUI />],
                left: [<LogoNavigation />],
                right: [<FilterButton />, <DownloadButton screen="event"/>]
            }})   
    }, [navigation])

    // initializeNotifications({
    //     shouldRun: shouldSetupNotifications,
    //     hasBeenSet: notification["SETUP"],
    //     setShouldSetupNotifications: setShouldSetupNotifications,
    //     dispatch: dispatch
    // })

    // Displays the EventScreen
    return (
        <Swipe right="EventNav">
            <View>
                <StatusBar style={isDark ? "light" : "dark"} />
                <View style={{
                    ...GS.content,
                    paddingHorizontal: 5,
                    backgroundColor: theme.darker
                }}>
                    {pushNotification && pushNotificationContent}
                    <EventList notification={notification} />
                </View>
            </View>
        </Swipe>
    )
}
