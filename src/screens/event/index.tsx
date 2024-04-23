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
export default function EventScreen(): JSX.Element {

    // Notification state
    const [shouldSetupNotifications, setShouldSetupNotifications] = useState(true)

    // Redux states
    const notification = useSelector((state: ReduxState) => state.notification)
    const { lastSave } = useSelector((state: ReduxState) => state.event)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification()

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

    initializeNotifications({
        shouldRun: shouldSetupNotifications,
        setShouldSetupNotifications,
        hasBeenSet: notification["SETUP"],
        dispatch
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
                                right: [<FilterButton />, <DownloadButton screen="event" />]
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
                                    <EventList />
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
