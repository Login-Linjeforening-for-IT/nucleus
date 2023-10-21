import AsyncStorage from "@react-native-async-storage/async-storage"
import { ErrorMessage } from "@/components/shared/utils"
import storeEvents from "@/utils/storeEvents"
import React, { useEffect, useState, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import EventList from "@components/event/eventList"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import NavigateFromPushNotification 
from "@/utils/navigateFromPushNotification"
import initializeNotifications 
from "@/utils/notificationSetup"
import Filter, {
    filterCategories,
    filterBoth,
    FilterUI,
} from "@/components/shared/filter"
import LastFetch, { fetchClicked, fetchStored, getData } from "@/utils/fetch"
import { View, StatusBar as StatusBarReact } from "react-native"
import { ScreenProps } from "@interfaces"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import LogoNavigation from "@/components/shared/logoNavigation"
import FilterButton from "@/components/shared/filterButton"
import DownloadButton from "@/components/shared/downloadButton"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificEventScreen from "./specificEvent"
import { 
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"
import handleSwipe from "@/utils/handleSwipe"
import { setClickedEvents, setEvents, setLastFetch, setLastSave, setRenderedEvents } from "@redux/event"

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
    // Clicked categories
    const [clickedCategory, setClickedCategory] = useState<CategoryWithID[]>([])
    // Download state
    const [downloadState, setDownloadState] = useState(new Date())
    // Filter text input declaration
    const [input, setInput] = useState("")
    // Push notification
    const [pushNotification, setPushNotification] = useState(false)
    const [pushNotificationContent, setPushNotificationContent] = 
        useState<JSX.Element | undefined>(undefined)
    // Notification state
    const [shouldSetupNotifications, setShouldSetupNotifications] = useState(true)
    // Clears text input
    const textInputRef = useRef(null)
    
    // Redux states
    const notification = useSelector((state: ReduxState) => state.notification)
    const { events, clickedEvents, search, lastSave, renderedEvents } = useSelector((state: ReduxState) => state.event)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification({navigation, theme,
        setPushNotification, setPushNotificationContent})

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [<FilterUI
                    textInputRef={textInputRef}
                    setClickedCategory={setClickedCategory}
                    clickedCategory={clickedCategory}
                    setInput={setInput}
                />],
                left: [<LogoNavigation navigation={navigation} />],
                right: [<FilterButton
                    clickedCategory={clickedCategory}
                    input={input}
                    dispatch={dispatch}
                />, 
                <DownloadButton
                    clickedEvents={clickedEvents}
                    setDownloadState={setDownloadState}
                    downloadState={downloadState}
                />]
            }
        } as Partial<BottomTabNavigationOptions>)
            
    },[
        navigation, 
        clickedCategory, 
        input, 
        textInputRef, 
        setClickedCategory, 
        clickedCategory, 
        setInput, 
    ])

    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked events
            (async() => {
                const events = await getData()
                const clicked = await fetchClicked()

                if (events) {
                    dispatch(setEvents(events))
                    dispatch(setLastFetch(LastFetch()))
                }

                if (clicked) {
                    dispatch(setClickedEvents(clicked))
                }
            })()
        }, [])
    )

    storeEvents({events, clickedEvents})

    //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    useEffect(() => {
        // If the filter is not null or there are categories clicked
        if (input.length || clickedCategory.length > 0) {
            // If the filter is not null but no categories are clicked
            if (input.length && clickedCategory.length === 0)  {
                // If the length of the filter search text is equal 0
                if (input.length === 0) {
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                    // Resets renderedEvents to all events
                    dispatch(setRenderedEvents([...events]))
                }
                // Run filter function if the filter search text is not empty
                Filter({
                    input,
                    setRenderedEvents: dispatch(setRenderedEvents), 
                    events, 
                    clickedEvents, 
                    clickedCategory
                })
            } else {
                // If the filter is not null and there are categories clicked
                if (input.length && clickedCategory.length > 0) {
                    // If the filter text is not empty calls filterBoth function
                    if (input.length > 0) {
                        filterBoth({clickedCategory, clickedEvents, 
                        events, setRenderedEvents: dispatch(setRenderedEvents), input})
                    }
                    // When categories are clicked but there is no input text
                    else {filterCategories({events, clickedEvents, 
                        clickedCategory, setRenderedEvents})}
                } else {filterCategories({events, clickedEvents, 
                    clickedCategory, setRenderedEvents: dispatch(setRenderedEvents)})}
            }
        // If the filter input is null only filter categories
        } else {
            // If the filter is not null but no categories are clicked
            if (input.length && clickedCategory.length === 0 ) {
                // If the filter length is 0
                if (input.length === 0) {
                    // Resets renderedEvents
                    setRenderedEvents([...events])
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                }
                // Resets if there is no text to filter
            } else setRenderedEvents([...events])
        }

        // Listens to changes in these arrays
    }, [input, clickedCategory])

    // --- LOADING INITIAL DATA ---
    useEffect(() => {
        // Fetches API
        // Fetches clickedEvents
        (async() => {
            const events = await getData()
            const clicked = await fetchClicked()

            if (events) {
                dispatch(setEvents(clicked))
                dispatch(setLastFetch(LastFetch()))
            }

            if (clicked) {
                dispatch(setClickedEvents(clicked))
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

    // --- RESETS RENDERED EVENTS
    async function RenderEvents() {
        // Updates the rendered array
        dispatch(setRenderedEvents([...events]))
        // Updates cache
        await AsyncStorage.setItem("cachedEvents", JSON.stringify(events))
    }

    // --- CHECKS FOR AND FIXES INCORRECT RENDER ---
    if (events.length > 0 && events.length !== renderedEvents.length) {
        // Fixes any errors if the user is not currently filtering
        if (!input.length) clickedCategory.length === 0 ? RenderEvents() : null
        // Fixes any potential render errors after user has been searching
        else if (input.length === 0 && clickedCategory.length === 0) {
            RenderEvents()
        }
    }

    // --- SETUP CODE ONCE APP IS DOWNLOADED---
    // Displays when the API was last fetched successfully
    if (lastSave === "") {(async() => {dispatch(setLastSave(LastFetch()))})()
}
    initializeNotifications({
        shouldRun: shouldSetupNotifications,
        setShouldSetupNotifications: setShouldSetupNotifications,
        hasBeenSet: notification["SETUP"]
    })

    // --- DISPLAYS THE EVENTSCREEN ---
    return (
        <EventStack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}>
            <EventStack.Screen name="root">
                {({navigation}) => (
                    <GestureHandlerRootView>
                    <PanGestureHandler
                        onGestureEvent={(event: PanGestureHandlerGestureEvent) => 
                            handleSwipe({navigation, event,screenRight: "Ads"})}
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
                )}
            </EventStack.Screen>
            <EventStack.Screen 
                name="SpecificEventScreen"
                component={SpecificEventScreen}
            />
        </EventStack.Navigator>
    )
}
