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
import { View, StatusBar as StatusBarReact } from "react-native"
import { ScreenProps } from "@interfaces"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import LogoNavigation from "@/components/shared/logoNavigation"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificEventScreen from "./specificEvent"
import { setEvents, setLastFetch, setLastSave } from "@redux/event"
import Header from "@components/nav/header"
import Swipe from "@components/nav/swipe"
import { FilterButton, FilterUI } from "@components/shared/filter"
import DownloadButton from "@components/shared/downloadButton"

const EventStack = createStackNavigator<EventStackParamList>()

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
export default function EventScreen({ navigation }: ScreenProps): JSX.Element {
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
                let events = await fetchEvents()
            events[events.length-1].highlight = true

                if (events) {
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
            let events = await fetchEvents()
            events[events.length-1].highlight = true

            if (events) {
                dispatch(setEvents(events))
                dispatch(setLastFetch(LastFetch()))
            }
        })()

    // Renders when the screen is loaded
    }, [])

    // --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    useEffect(() => {
        let interval: Interval = 0

        // Only when filter is closed to prevent "no match" issue
        if (!search) {
            interval = setInterval(() => {
                // Storing the current time
                (async() => {
                    let events = await fetchEvents()
            events[events.length-1].highlight = true

                    if (events) {
                        dispatch(setEvents(events))
                        dispatch(setLastFetch(LastFetch()))
                    }
                })()
                // Runs every 10 seconds
            }, 10000)
            // Clears the interval when the filter is opened
        } else clearInterval(interval)

        // Clears interval when unmounted to prevent memory leaks
        return () => clearInterval(interval)
    }, [search])

    useEffect(() => {
        // --- SETUP CODE ONCE APP IS DOWNLOADED---
        // Displays when the API was last fetched successfully
        if (lastSave === "") {(async() => {dispatch(setLastSave(LastFetch()))})()
    }
    }, [lastSave])
    initializeNotifications({
        shouldRun: shouldSetupNotifications,
        setShouldSetupNotifications,
        hasBeenSet: notification["SETUP"]
    })

    // Displays the EventScreen
    return (
        <EventStack.Navigator screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props} />
        }}>
            <EventStack.Screen name="EventScreen">
                {({navigation}) => {
                    // Sets the component of the header
                    useEffect(()=>{
                        navigation.setOptions({
                            headerComponents: {
                                bottom: [<FilterUI />],
                                left: [<LogoNavigation />],
                                right: [<FilterButton />, <DownloadButton />]
                            }} as Partial<BottomTabNavigationOptions>)   
                    }, [navigation])

                    return (
                        <Swipe right="AdScreenRoot">
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
                    )}}
            </EventStack.Screen>
            <EventStack.Screen 
                name="SpecificEventScreen"
                component={SpecificEventScreen}
            />
        </EventStack.Navigator>
    )
}
