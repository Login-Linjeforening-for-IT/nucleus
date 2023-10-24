import AsyncStorage from "@react-native-async-storage/async-storage"
import { ErrorMessage } from "@/components/shared/utils"
import React, { useEffect, useState, useRef } from "react"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import EventList from "@components/event/eventList"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import NavigateFromPushNotification 
from "@/utils/navigateFromPushNotification"
import initializeNotifications 
from "@/utils/notificationSetup"
import { FilterUI} from "@/components/shared/filter"
import LastFetch, { getData } from "@/utils/fetch"
import { View, StatusBar as StatusBarReact } from "react-native"
import { ScreenProps } from "@interfaces"
import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import LogoNavigation from "@/components/shared/logoNavigation"
import { FilterButton } from "@/components/shared/filter"
import DownloadButton from "@/components/shared/downloadButton"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificEventScreen from "./specificEvent"
import { 
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"
import handleSwipe from "@/utils/handleSwipe"
import { setEvents, setLastFetch, setLastSave } from "@redux/event"
import Header from "@components/nav/header"

const EventStack = createStackNavigator<EventStackParamList>()

/**
 * Parent EventScreen function
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
    const { search, lastSave, input } = useSelector((state: ReduxState) => state.event)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification({navigation, theme,
        setPushNotification, setPushNotificationContent})

    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked events
            (async() => {
                const events = await getData()

                if (events) {
                    dispatch(setEvents(events))
                    dispatch(setLastFetch(LastFetch()))
                }
            })()
        }, [])
    )

    // --- LOADING INITIAL DATA ---
    useEffect(() => {
        // Fetches API
        // Fetches clickedEvents
        (async() => {
            const events = await getData()

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
                    const events = await getData()

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

    useEffect(()=>{
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

    // --- DISPLAYS THE EVENTSCREEN ---
    return (
        <EventStack.Navigator
        screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props} />
            }}>
            <EventStack.Screen 
                name="EventScreen"
            >
                {({navigation}) => {
                    // --- SET THE COMPONENTS OF THE HEADER ---
                    useEffect(()=>{
                        navigation.setOptions({
                            headerComponents: {
                                bottom: [],
                                left: [<LogoNavigation navigation={navigation}/>],
                                right: []
                            }} as Partial<BottomTabNavigationOptions>)   
                        },[navigation])
                    
                    return (
                    <GestureHandlerRootView>
                    <PanGestureHandler
                        onGestureEvent={(event: PanGestureHandlerGestureEvent) => 
                            handleSwipe({navigation, event,screenRight: "AdScreenRoot"})}
                        >
                        <View>
                        <StatusBar style={isDark ? "light" : "dark"} />
                        <View style={{
                            ...GS.content, 
                            backgroundColor: FetchColor({theme, variable: "DARKER"})
                            }}>
                                {pushNotification && pushNotificationContent}
                                <EventList
                                    navigation={navigation}
                                    notification={notification}
                                    ErrorMessage={ErrorMessage}
                                />
                            </View>
                        </View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
                )}}
            </EventStack.Screen>
            <EventStack.Screen 
                name="SpecificEventScreen"
                component={SpecificEventScreen}
            />
        </EventStack.Navigator>
    )
}
