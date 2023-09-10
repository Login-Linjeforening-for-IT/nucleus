import NavigateFromPushNotification from "@shared/notificationComponents/navigateFromPushNotification"
import LastFetch, { fetchState, fetchStored, getData } from "@shared/eventComponents/fetch"
import handleDownload, { timeSinceDownload } from "@shared/eventComponents/calendar"
import notificationSetup from "@shared/notificationComponents/notificationSetup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Space, { ErrorMessage } from "@shared/components/utils"
import storeEvents from "@shared/eventComponents/storeEvents"
import React, { useEffect, useState, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import EventList from "@shared/eventComponents/eventList"
import { useDispatch, useSelector } from "react-redux"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { MS } from "@styles/menuStyles"
import { BlurView } from "expo-blur"
import Filter, {
    fetchRelevantCategories,
    filterCategories,
    filterBoth,
    FilterUI,
} from "@shared/eventComponents/filter"

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native"
import { ScreenProps } from "@interfaces"

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
    // Events from api
    const [events, setEvents] = useState<EventProps[]>([])
    // Events currently displayed
    const [renderedArray, setRenderedArray] = useState<EventProps[]>([])
    // Clicked events
    const [clickedEvents, setClickedEvents] = useState<EventProps[]>([])
    // Clicked categories
    const [clickedCategory, setClickedCategory] = useState([])
    // Last time API was fetched successfully
    const [lastSave, setLastSave] = useState("")
    // Download state
    const [downloadState, setDownloadState] = useState(new Date())
    // Filter text input declaration
    const [input, setInput] = useState("")
    // Clears text input
    const textInputRef = useRef(null)
    // Relevant categories to filter
    const [relevantCategories, setRelevantCategories] = useState<CategoryWithID[]>([])
    // Search bar visibility boolean
    const [search, setSearch] = useState(false)
    const notification =    useSelector( (state: ReduxState) => state.notification)
    const { lang  } =       useSelector( (state: ReduxState) => state.lang)
    const { login } =       useSelector( (state: ReduxState) => state.login)
    const { theme } =       useSelector( (state: ReduxState) => state.theme)
    const { calendarID } =  useSelector( (state: ReduxState) => state.misc)
    const dispatch = useDispatch()

    // Allows for navigation to a specific page if the app is opened by a push notification
    NavigateFromPushNotification({navigation})

    // All categories to filter - DO NOT CHANGE IDS
    const category = [
        {id: 2, category: "TEKKOM"},
        {id: 3, category: "SOCIAL"},
        {id: 4, category: "CTF"},
        {id: 5, category: "KARRIEREDAG"},
        {id: 6, category: "FADDERUKA"},
        {id: 7, category: "BEDPRES"},
        {id: 8, category: "LOGIN"},
        {id: 9, category: "ANNET"}
    ]

    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked events
            fetchState(setClickedEvents)
        }, [])
    )

    storeEvents({events, clickedEvents})

    //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    useEffect(() => {
        // If the filter is not null or there are categories clicked
        if (input.length || clickedCategory.length > 0) {
            // If the filter is not null but no categories are clicked
            if(input.length && clickedCategory.length === 0)  {
                // If the length of the filter search text is equal 0
                if (input.length === 0) {
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                    // Resets renderedArray to all events
                    setRenderedArray([...events])
                }
                // Run filter function if the filter search text is not empty
                Filter({input, setRenderedArray, events, clickedEvents, clickedCategory})
            }else{
                // If the filter is not null and there are categories clicked
                if(input.length && clickedCategory.length > 0){
                    // If the filter text is not empty calls filterBoth function
                    if(input.length > 0) {filterBoth({clickedCategory, clickedEvents, events, setRenderedArray, input})}
                    // filterCategories if filter text is empty but categories are clicked
                    else {filterCategories({events, clickedEvents, clickedCategory, setRenderedArray})}
                } else {filterCategories({events, clickedEvents, clickedCategory, setRenderedArray})}
            }
        // If the filter input is null only filter categories
        } else {
            // If the filter is not null but no categories are clicked
            if(input.length && clickedCategory.length === 0 ) {
                // If the filter length is 0
                if(input.length === 0) {
                    // Resets renderedArray
                    setRenderedArray([...events])
                    // Resets filter input
                    setInput("")
                    // Resets clicked categories
                    setClickedCategory([])
                }
                // If the filter text is null reset renderedArray to equal events
            } else setRenderedArray([...events])
        }

        // Listens to changes in these arrays
    }, [input, clickedCategory])

    // --- LOADING INITIAL DATA ---
    useEffect(() => {
        // Fetches API
        getData({setEvents, setRenderedArray, setLastSave, events})
        // Fetches clickedEvents
        fetchState(setClickedEvents)
        // Fetches categories available to filter
        fetchRelevantCategories({setRelevantCategories, clickedEvents, events, category})
        events.length ? setRenderedArray([...events]) : fetchStored({setRenderedArray, setState: setEvents})
    // Renders when the screen is loaded
    }, [])

    //  --- UPDATES FILTER ON EVENT CHANGE ---
    useEffect(() => {
        // Updates relevant categories to filter
        fetchRelevantCategories({setRelevantCategories, clickedEvents, events, category})
        // Listens for changes in these arrays
    }, [events.length, clickedEvents.length])

    // --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    useEffect(() => {
        let interval: Interval = 0

        // Only when filter is closed to prevent "no match" issue
        if(!search){
            interval = setInterval(() => {
                // Storing the current time
                (async() => {
                    // Storing in AsyncStorage
                    await AsyncStorage.setItem("lastFetch", new Date().toISOString())
                    // Fetches cache
                    getData({setEvents, setRenderedArray, setLastSave, events})
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
        setRenderedArray([...events])
        // Updates cache
        await AsyncStorage.setItem("cachedEvents", JSON.stringify(events))
    }

    function toggleSearch() {
        setSearch(prevSearch => !prevSearch)
    }

    // --- CHECKS FOR AND FIXES INCORRECT RENDER ---
    if(events.length > 0 && events.length !== renderedArray.length){
        // Fixes any errors if the user is not currently filtering
        if (!input.length) clickedCategory.length === 0 ? RenderEvents():null
        // Fixes any errors if the user has been searching, but is not doing so now
        else input.length === 0 && clickedCategory.length === 0 ? RenderEvents() : null
    }

    // --- SETUP CODE ONCE APP IS DOWNLOADED---
    // Displays when the API was last fetched successfully
    if(lastSave === "") (async() => {setLastSave(await LastFetch())})()
    // Sets up initial notifications
    if(!notification["SETUP"]) notificationSetup()

    // --- DISPLAYS THE EVENTSCREEN ---
    return(
        <View>
            <StatusBar style={theme === 0 || theme === 2 || theme === 3 ? "light" : "dark"} />
            <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
                {search === true && Space(Dimensions.get("window").height/9)}
                <FilterUI
                    textInputRef={textInputRef}
                    setRenderedArray={setRenderedArray}
                    setClickedCategory={setClickedCategory}
                    relevantCategories={relevantCategories}
                    clickedCategory={clickedCategory}
                    theme={theme}
                    search={search}
                    setInput={setInput}
                    items={events}
                />

                <EventList
                    navigation={navigation}
                    renderedArray={renderedArray}
                    clickedEvents={clickedEvents}
                    search={search}
                    theme={theme}
                    lang={lang}
                    relevantCategories={relevantCategories}
                    notification={notification}
                    setClickedEvents={setClickedEvents}
                    lastSave={lastSave}
                    events={events}
                    ErrorMessage={ErrorMessage}
                />
                {Space(Dimensions.get("window").height/3)}
            </View>

            {/* ========================= DISPLAY TOP MENU ========================= */}
            {Platform.OS === "ios" 
                ? <BlurView style={MS.topMenu} intensity={30}/>
                : <View style={{
                    ...MS.topMenu, 
                    backgroundColor: FetchColor({theme, variable: "TRANSPARENTANDROID"})}}
                />
            }
            <View style={{...MS.topMenu, backgroundColor: FetchColor({theme, variable: "TRANSPARENT"})}}>
                <TouchableOpacity style={MS.logoBackground}>
                <Image 
                    style={MS.tMenuIcon} 
                    source={theme === 0 || theme === 2 || theme === 3 
                        ? require("@assets/logo/loginText.png")
                        : require("@assets/logo/loginText-black.png")} 
                />
                </TouchableOpacity>
                {
                lang ?
                    <Text style={{
                        ...MS.smallTitle, 
                        left: "-5%", 
                        color: FetchColor({theme, variable: "TITLETEXTCOLOR"})
                    }}>
                        Arrangementer
                    </Text>
                :
                    <Text style={{
                        ...MS.filterScreenTitle, 
                        left: "-5%", 
                        color: FetchColor({theme, variable: "TITLETEXTCOLOR"})
                    }}>
                        Events
                    </Text>
                }
                {renderedArray != null ?
                    <View style={MS.multiTop}>
                        {clickedEvents.length > 0 ?
                            <TouchableOpacity 
                                style={MS.touchableIcon} 
                                onPress={async () => await handleDownload({
                                    setDownloadState, downloadState, clickedEvents, 
                                    calendarID, dispatch})}>
                                <Image 
                                    style={MS.multiIcon}
                                    source={theme === 0 || theme === 2 || theme === 3 
                                        ? timeSinceDownload(downloadState) >= 1000 
                                            ? require("@assets/icons/download.png")
                                            : require("@assets/icons/download-orange.png")
                                        : require("@assets/icons/download-black.png")} />
                            </TouchableOpacity>
                        :null}

                        {renderedArray.length > 0 || clickedCategory.length > 0 || input.length ?
                            <TouchableOpacity 
                                style={MS.touchableIcon} 
                                onPress={toggleSearch}
                            >
                                {search
                                    ? <Image 
                                        style={MS.multiIcon} 
                                        source={require("@assets/icons/filter-orange.png")}
                                    />
                                    : <Image 
                                        style={MS.multiIcon} 
                                        source={theme === 0 || theme === 2 || theme === 3 
                                            ? require("@assets/icons/filter.png") 
                                            : require("@assets/icons/filter-black.png")
                                        }
                                    />
                                }
                            </TouchableOpacity>
                        :null}
                    </View>
                :null}
            </View>
        </View>
    )
}