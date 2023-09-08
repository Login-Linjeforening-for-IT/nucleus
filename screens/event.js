import NavigateFromPushNotification from 'login/shared/notificationComponents/navigateFromPushNotification';
import LastFetch, { fetchState, fetchStored, getData } from 'login/shared/eventComponents/fetch';
import handleDownload, { timeSinceDownload } from 'login/shared/eventComponents/calendar';
import notificationSetup from 'login/shared/notificationComponents/notificationSetup';
import notificationArray from 'login/shared/notificationComponents/notificationArray';
import AsyncStorage from '@react-native-async-storage/async-storage';     // Localstorage
import Space, { errorMessage } from 'login/shared/components/utils';
import storeEvents from 'login/shared/eventComponents/storeEvents';
import EventList from 'login/shared/eventComponents/eventList';
import React, { useEffect, useState, useRef } from 'react';               // React imports
import { useFocusEffect } from '@react-navigation/native';                // useFocusEffect       (do something when the screen is displayed)
import { useDispatch, useSelector } from 'react-redux';                   // Redux
import FetchColor from 'login/styles/fetchTheme';                         // Function to fetch theme color
import { GS } from 'login/styles/globalStyles';                           // Global styles
import { StatusBar } from 'expo-status-bar';                              // Status bar
import { MS } from 'login/styles/menuStyles';                             // Menu styles
import { BlurView } from 'expo-blur';                                     // Blur effect
import Filter, { 
    fetchRelevantCategories, 
    filterCategories, 
    toggleFilter,
    filterInput, 
    filterBoth, 
    FilterUI, 
} from 'login/shared/eventComponents/filter';
import {                                                                  // React native components
    Text,                                                                 // Text component
    View,                                                                 // View component
    Image,                                                                // Image component
    TouchableOpacity,                                                     // TouchableOpacity     (custom button)
    Dimensions,                                                           // Size of the device
    Platform,                                                             // Operating system
} from 'react-native';                                                    // React native

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
export default function EventScreen({ navigation }) {                       //  Exports the screen
    const [events, setEvents] = useState([]);                               //  Events from api
    const [renderedArray, setRenderedArray] = useState([]);                 //  Events currently displayed
    const [clickedEvents, setClickedEvents] = useState([]);                 //  Clicked events
    const [clickedCategory, setClickedCategory] = useState([]);             //  Clicked categories
    const [lastSave, setLastSave] = useState(null)                          //  Last time API was fetched successfully
    const [downloadState, setDownloadState] = useState(null)                //  Download state
    const [filter, setFilter] = useState({input: null});                    //  Filter text input declaration
    const textInputRef = useRef(null);                                      //  Clears text input
    const [relevantCategories, setRelevantCategories] = useState([]);       //  Relevant categories to filter
    const [search, toggleSearch] = useState({status: 0})                    //  Search bar visibility boolean
    const notification = useSelector( (state) => state.notification )       //  Fetches notification state
    const { lang  }    = useSelector( (state) => state.lang  )              //  Language state
    const { login }    = useSelector( (state) => state.login )              //  Loginstatus
    const { theme }    = useSelector( (state) => state.theme )              //  Theme state
    const { calendarID } = useSelector( (state) => state.misc ) 
    const dispatch = useDispatch()       

    NavigateFromPushNotification({navigation})                              //  Allows for navigation to a specific page if the app is opened by a push notification

    const [category] = useState([                                           //  All categories to filter - DO NOT CHANGE IDS 
        {id: '2', category: 'TEKKOM'},                                          
        {id: '3', category: 'SOCIAL'},
        {id: '4', category: 'CTF'},
        {id: '5', category: 'KARRIEREDAG'}, 
        {id: '6', category: 'FADDERUKA'},
        {id: '7', category: 'BEDPRES'},
        {id: '8', category: 'LOGIN'},
        {id: '9', category: 'ANNET'}
    ]);                                           

    notificationArray(category)

    useFocusEffect(                                                         //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
        React.useCallback(() => {                                           // Callback to avoid too many rerenders
            fetchState(setClickedEvents)                                    // Function to fetch clicked events
        }, [])
    );

    storeEvents(events, clickedEvents)

    useEffect(() => {                                                       //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
        if (filter.input != null || clickedCategory.length > 0) {           // If the filter is not null or there are categories clicked
            if(filter.input != null && clickedCategory.length == 0)  {      // If the filter is not null but no categories are clicked
                if (filter.input.length == 0) {                             // If the length of the filter search text is equal 0
                    filterInput(setFilter, null, filter);                   // Resets filter input
                    setClickedCategory([]);                                 // Resets clicked categories
                    setRenderedArray([...events])                           // Resets renderedArray to all events
                }
                Filter(filter, setRenderedArray, events, clickedEvents, clickedCategory);                                                         // Run filter function if the filter search text is not empty
            }else{
                if(filter.input != null && clickedCategory.length > 0){           // If the filter is not null and there are categories clicked
                    if(filter.input.length > 0) {filterBoth(clickedCategory, clickedEvents, events, setRenderedArray, filter);}                     // If the filter text is not empty calls filterBoth function
                    else {filterCategories(events, clickedEvents, clickedCategory, setRenderedArray)}                                        // filterCategories if filter text is empty but categories are clicked
                } else {filterCategories(events, clickedEvents, clickedCategory, setRenderedArray)}
            }                                         // If the filter input is null only filter categories
        } else {
            if(filter.input != null && clickedCategory.length == 0 ) {          // If the filter is not null but no categories are clicked
                if(filter.input.length == 0) {                                    // If the filter length is 0
                    setRenderedArray([...events]);                                  // Resets renderedArray
                    filterInput(setFilter, null, filter);                                              // Resets filter input
                    setClickedCategory([]);                                         // Resets clicked categories
                }
            } else setRenderedArray([...events]);                               // If the filter text is null reset renderedArray to equal events
        }

    }, [filter, clickedCategory]);                                          //  Listens to changes in these arrays

    useEffect(() => {                                                       //  --- LOADING INITIAL DATA ---
        getData(setEvents, setRenderedArray, setLastSave, events);                            //  Fetches API
        fetchState(setClickedEvents);                                                         //  Fetches clickedEvents
        fetchRelevantCategories(setRelevantCategories, clickedEvents, events, category); //  Fetches categories available to filter
        events.length ? setRenderedArray([...events]) : fetchStored(setRenderedArray, setEvents);  
    }, [])                                                                   //  Renders when the screen is loaded

    useEffect(() => {                                                       //  --- UPDATES FILTER ON EVENT CHANGE ---
        fetchRelevantCategories(setRelevantCategories, clickedEvents, events, category); //  Updates relevant categories to filter
    }, [events.length, clickedEvents.length]);                              //  Listens for changes in these arrays

    useEffect(() => {                                                       //  --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
        let interval = null;

        if(!search.status){                                                 //  Only when filter is closed to prevent "no match" issue
            interval = setInterval(() => {        
                (async() => {                                               // Storing the current time
                    await AsyncStorage.setItem('lastFetch', new Date().toISOString()) //  Storing in AsyncStorage 
                    getData(setEvents, setRenderedArray, setLastSave, events);        //  Fetches cache
                })()           
            }, 10000);                                                      //  Runs every 10 seconds
        } else clearInterval(interval)                                      //  Clears the interval when the filter is opened

        return () => clearInterval(interval)                                //  Clears interval when unmounted to prevent memory leaks
    }, [search.status]);

    async function RenderEvents() {                                         //  --- RESETS RENDERED EVENTS
        setRenderedArray([...events])                                       //  Updates the rendered array
        await AsyncStorage.setItem('cachedEvents', JSON.stringify(events))  //  Updates cache
    }

    if(events.length > 0 && events.length !== renderedArray.length){        //  --- CHECKS FOR AND FIXES INCORRECT RENDER ---
        if (!filter.input) clickedCategory.length == 0 ? RenderEvents():null                 // Fixes any errors if the user is not currently filtering
        else filter.input.length == 0 && clickedCategory.length == 0 ? RenderEvents() : null // Fixes any errors if the user has been searching, but is not doing so now
    }

                                                                            //  --- SETUP CODE ONCE APP IS DOWNLOADED---
    if(lastSave == null) (async() => {setLastSave(await LastFetch())})()    //  Displays when the API was last fetched successfully
    if(!notification["SETUP"]) notificationSetup();                         //  Sets up initial notifications
  
    return(                                                                 //  --- DISPLAYS THE EVENTSCREEN ---
        <View> 
            <StatusBar style={theme == 0 || theme == 2 || theme == 3 ? 'light' : 'dark'} />
            <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
                {search.status == 1 && Space(Dimensions.get('window').height/9)}
                <FilterUI 
                    textInputRef={textInputRef}
                    setRenderedArray={setRenderedArray}
                    setClickedCategory={setClickedCategory}
                    relevantCategories={relevantCategories}
                    clickedCategory={clickedCategory}
                    theme={theme}
                    search={search}
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
                    errorMessage={errorMessage}
                />
                {Space(Dimensions.get('window').height/3)}
            </View>    

            {/* ========================= DISPLAY TOP MENU ========================= */}
            {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
            <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
                <TouchableOpacity style={MS.logoBackground}>
                <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('login/assets/logo/loginText.png') : require('login/assets/logo/loginText-black.png')} />
                </TouchableOpacity>
                {
                lang ?
                    <Text style={{... MS.smallTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Arrangementer</Text>
                : 
                    <Text style={{... MS.filterScreenTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Events</Text>
                }
                
                {renderedArray != null ? 
                    <View style={MS.multiTop}>
                        {clickedEvents.length > 0 ? 
                            <TouchableOpacity style={MS.touchableIcon} onPress={async () => await handleDownload(setDownloadState, downloadState, clickedEvents, calendarID, dispatch)}>
                                <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? timeSinceDownload(downloadState) >= 1000 ? require('login/assets/icons/download.png'):require('login/assets/icons/download-orange.png') : require('login/assets/icons/download-black.png')} />
                            </TouchableOpacity>
                        :null}

                        {renderedArray.length > 0 || clickedCategory.length > 0 || filter.input != null ? 
                            <TouchableOpacity style={MS.touchableIcon} onPress={() => toggleFilter(toggleSearch, search)}>
                                {search.status 
                                    ? <Image style={MS.multiIcon} source={require('login/assets/icons/filter-orange.png')} />
                                    : <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('login/assets/icons/filter.png') : require('login/assets/icons/filter-black.png')} />
                                }
                            </TouchableOpacity>
                        :null}
                    </View>
                :null}
            </View>
        </View>
    )
};