import registerForPushNotificationsAsync from '../shared/notificationComponents/registerForPushNotificationAsync';
import LastFetch, { removeDuplicatesAndOld } from '../shared/eventComponents/fetch';
import notificationSetup from '../shared/notificationComponents/notificationSetup';
import { CheckBox, CheckedBox, SmallCheck } from '../shared/eventComponents/check';
import notificationArray from '../shared/notificationComponents/notificationArray';
import handleDownload, { timeSinceDownload } from '../shared/functions/download';
import EventCardLocation from '../shared/eventComponents/eventCardLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';     // Localstorage
import Space, { Month, errorMessage } from '../shared/components/utils';
import CategorySquare from '../shared/eventComponents/category'
import CompareDates from '../shared/functions/compareDates';
import topic from '../shared/notificationComponents/topic';
import React, { useEffect, useState, useRef } from 'react';               // React imports
import { useFocusEffect } from '@react-navigation/native';                // useFocusEffect       (do something when the screen is displayed)
import * as Notifications from 'expo-notifications';                      // Local notifications
import Bell from '../shared/eventComponents/bell';
import Cluster from '../shared/functions/cluster';
import FetchColor from '../styles/fetchTheme';                            // Function to fetch theme color
import { GS } from '../styles/globalStyles';                              // Global styles
import { StatusBar } from 'expo-status-bar';                              // Status bar
import { ES } from '../styles/eventStyles';                               // Event styles
import { useSelector } from 'react-redux';                                // Redux
import { MS } from '../styles/menuStyles';                                // Menu styles
import { BlurView } from 'expo-blur';                                     // Blur effect
import { T } from '../styles/text';                                       // Text styles
import {                                                                  // React native components
  Text,                                                                   // Text component
  View,                                                                   // View component
  Image,                                                                  // Image component
  FlatList,                                                               // Flatlist component   (basic list)
  TextInput,                                                              // Text input component (allows the user to type)
  TouchableOpacity,                                                       // TouchableOpacity     (custom button)
  Dimensions,                                                             // Size of the device
  Platform,                                                               // Operating system
} from 'react-native';                                                    // React native

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    })
});

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
export default function EventScreen({ navigation }) {                     //  Exports the screen
  const [events, setEvents] = useState([]);                               //  Events from api
  const [renderedArray, setRenderedArray] = useState([]);                 //  Events currently displayed
  const [clickedEvents, setClickedEvents] = useState([]);                 //  Clicked events
  const [clickedCategory, setClickedCategory] = useState([]);             //  Clicked categories
  const [lastSave, setLastSave] = useState(null)                          //  Last time API was fetched successfully
  const [downloadState, setDownloadState] = useState(null)                                      //  Download state
  const [filter, setFilter] = useState({input: null});                    //  Filter text input declaration
  const textInputRef = useRef(null);                                      //  Clears text input
  const [relevantCategories, setRelevantCategories] = useState([]);       //  Relevant categories to filter
  const [search, toggleSearch] = useState({status: 0})                    //  Search bar visibility boolean
  const notification = useSelector( (state) => state.notification )       //  Fetches notification state
  const { lang  }    = useSelector( (state) => state.lang  )              //  Language state
  const { login }    = useSelector( (state) => state.login )              //  Loginstatus
  const { theme }    = useSelector( (state) => state.theme )              //  Theme state
  const { calendarID } = useSelector( (state) => state.misc )             //  Calendar ID
  const [expoPushToken, setExpoPushToken] = useState('');                 //  Array for notification token
  const [pushNotification, setPushNotification] = useState(false);        //  Array for setting the push notification
  const notificationListener = useRef();                                  //  Notification listener
  const responseListener = useRef();                                      //  Response listener (if it was sent or not)
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

  /**
   * Fetches data from API, formats the response, sets the cache, updates the events on the screen,
   * catches any errors and fetches localstorage, and handles errors. 
   */
  async function getData() {                                              //  --- FETCHING DATA FROM API ---
    try {
      fetch('https://api.login.no/events')                                // PRODUCTION
      //fetch('https://tekkom:rottejakt45@api.login.no:8443/events')      // TESTING
      .then(response=>response.json())                                    // Formatting the response
      .then(data=>setEvents(data))                                        // Setting the response
      .then(setRenderedArray([...events]))                                // Updates the renderedarray to equal cache
      .then(async() => setLastSave(await LastFetch()));                   // Updates last fetch displayed on the screen
      if(events.length > 0) await AsyncStorage.setItem('cachedEvents', JSON.stringify(events))  // Setting the cache
    } catch (e) {                                                         // Catches any errors (missing wifi)
      (async() => {                                                       // Immediately invoked function expression (IIFE)
        try {     
          let cache = await AsyncStorage.getItem('cachedEvents')          // Tries to fetch event cache
          if(cache) cache = JSON.parse(cache); setEvents([...cache])      // If cached events was found save them in event array
        } catch (e) {console.warn('Failed to fetch cache: ' + e)}         // If cache was not found tell the user cache wasnt found (custom notification needs to go here)
      })    
    }
  }

  const toggleSearchBar = () => {                                         //  --- SEARCH BAR VISIBILITY ---
    toggleSearch({
      ...search,
      status: !search.status
    });
  }

  const filterInput = (val) => {                                          //  --- UPDATES FILTER TEXT INPUT ---
      setFilter({                                                         // Function to set filter
      ...filter,                                                          // Spread operator to spread filter
      input: val,                                                         // Change input to 'val'
      });
  }

  const filterBoth = () => {                                              //  --- FILTERS CATEGORIES AND TEXT ---
    const clickedFound = clickedCategory.find(item => item.category === 'PÅMELDT'); // Checks if PÅMELDT is clicked                                     
    if(clickedFound) {                                                    // If PÅMELDT is clicked
      if(clickedCategory.length > 1){                                     // If at least one category is clicked filters based on category
        let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
        let concatenatedArray = [];                                       // Temporary array
        clickedEvents.forEach(event => {                                  // Goes through every clickedEvent
          let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID); // Checks for duplicates
          if (!duplicateExists) { concatenatedArray.push(event) }         // If no duplicate pushes to temporary array
        });
        let newConcatenatedArray = categoryFiltered.concat(concatenatedArray);   // Concatinates clickedEvents and filtered events
        const filtered = newConcatenatedArray.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
        let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
        setRenderedArray([...uniqueFiltered]);                            // Updates renderedArray
      }else{                                                              // If only PÅMELDT is clicked
        let filtered = clickedEvents.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));            // Filters text
        let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
        setRenderedArray([...uniqueFiltered]);                            // Updates renderedArray
      }
    }else{                                                                  // If PÅMELDT is not clicked filter events normally
      let filtered = events.filter(event => clickedCategory.some(category => category.category === event.category));        // Filters categories
      filtered = filtered.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));              // Filters text
      let uniqueFiltered = removeDuplicatesAndOld(events, filtered);
      setRenderedArray([...uniqueFiltered]);                              // Updates renderedArray                                   // Updates the renderedArray
    }
  }
  
  const filterText = () => {                                              //  --- FILTERS TEXT ---
    let textFiltered = events.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
    let uniqueFiltered = removeDuplicatesAndOld(events, textFiltered);
    setRenderedArray([...uniqueFiltered]);                                  // Converts to lowercase, filters and updates
  }

  const filterCategories = () => {                                        //  --- FILTERS CATEGORIES ---
    const clickedFound = clickedCategory.find(object => object.category === 'PÅMELDT'); // True or false if user is enrolled to some events 
    if (clickedFound) {                                                   // If the user is enrolled to events
      if(clickedCategory.length > 1){                                     // If the user has clicked at least 1 category
        let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
        let concatenatedArray = [];                                       // Declares temporary array
        clickedEvents.forEach(event => {                                  // Goes through every clicked event
          let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID);  // Checks for duplicates
          if (!duplicateExists) { concatenatedArray.push(event) }         // Removes duplicates
        });
        concatenatedArray = categoryFiltered.concat(concatenatedArray);   // Combines categoryFiltered and concatenatedArray
        let uniqueFiltered = removeDuplicatesAndOld(events, concatenatedArray);
        setRenderedArray([...uniqueFiltered])                          // Updates renderedEvents to equal categories filtered
      }else{                                                              // If only PÅMELDT is clicked only render the events in the clickedEvents array
        const categoryFiltered = clickedEvents.filter(event => clickedCategory.some(category => event.category === event.category)); 
        let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered);
        setRenderedArray([...uniqueFiltered])                           // if there are no enrolled events filters and updates rendered array
      }
    }else{                                                                // If the PÅMELDT category is not active
      const categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category)); 
      let uniqueFiltered = removeDuplicatesAndOld(events, categoryFiltered);
      setRenderedArray([...uniqueFiltered])                             // Filter categories normally and update the renderedArray
    }
  }
  
  const Filter = () => {                                                  //  --- PARENT FILTER FUNCTION ---
    if (filter.input != null) {                                           // If filter.input is not null
      if (clickedCategory.length > 0){                                    // If the user has clicked something
        if(filter.input.length > 0){  filterBoth()}                       // Filter both text and categories if the text is longer than 0
        else{setRenderedArray([...events])}                               // Update the displayed events if the text is not longer than 0
      } else filterText()                                                      // If no categories are clicked only filter text
    } else if (clickedCategory.length > 0) {filterCategories()}           // if the filter is null but categories are clicked only filter categories
    else{setRenderedArray([...events])}                                   // If both are null or 0 update the displayed events
  }
  
  const fetchRelevantCategories = () => {                                 //  --- FETCHES RELEVANT CATEGORIES TO FILTER ---
    if(clickedEvents.length > 0) {                                        // Adding enrolled option (PÅMELDT) filter option if > 0 enrolled events
      const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
      relevantCategories.unshift({id: '1', category: 'PÅMELDT'})          // Filters then adds PÅMELDT since no event has this attribute
      setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }else{                                                                // Sets filter options if there are no enrolled events
      const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
      setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }
  }

  const fetchState = async() => {                                         //  --- FETCHES CLICKED EVENTS ---
    let foundState = await AsyncStorage.getItem('clickedEvents');         // Fetches the cache
    if (foundState != null) {                                             // If cache exists
      let parsed = JSON.parse(foundState)                                 // Parses from string to objects
      setClickedEvents(parsed)                                            // Function to update the clickedEvents array
    } 
  }

  const fetchStoredEvents = async() => {                                  //  --- FETCHING STORED EVENTS IF NO WIFI ---
    let tempArray = await AsyncStorage.getItem('cachedEvents')            //  Fetches cache
    if(tempArray != null){                                                // If cache exists
      let parsed = JSON.parse(tempArray);                                 // Parses from string to objects
      setRenderedArray([...parsed]);                                      // Updates the renderedarray to equal cache
      setEvents([...parsed]);                                             // Updates the events array to equal cache
    }
  }

  useFocusEffect(                                                         //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
  React.useCallback(() => {                                               // Callback to avoid too many rerenders
    fetchState()                                                          // Function to fetch clicked events
  }, [])
);

  if (clickedEvents.length > 0) {                                         //  --- STORING FIRSTCOMING AND ALL CLICKED EVENT ---
    (async() => {                                                         // IIFE
      let storedID = 0;                                                   // Variable that takes the ID of the stored event

      let unique = removeDuplicatesAndOld(events, clickedEvents);

      if(unique) {
        for (let i = 0; i < unique.length; i++) {                              // Finds the firstcoming event 
          if (CompareDates((unique[i]).startt, (unique[storedID]).startt) == true) storedID = i;
        }
        
        await AsyncStorage.setItem("clickedEvents", JSON.stringify(unique))                                 // Stores clicked events
        if(unique[storedID]) await AsyncStorage.setItem("firstEvent", JSON.stringify((unique[storedID])))   // Stores firstcoming clicked events
      }
    })();
  };

  useEffect(() => {                                                       //  --- NOTIFICATION MANAGEMENT ---
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(pushNotification => {
      setPushNotification(pushNotification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {                                                       //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    if (filter.input != null || clickedCategory.length > 0) {             // If the filter is not null or there are categories clicked
      if(filter.input != null && clickedCategory.length == 0)  {          // If the filter is not null but no categories are clicked
        if (filter.input.length == 0) {                                   // If the length of the filter search text is equal 0
          filterInput(null);                                              // Resets filter input
          setClickedCategory([]);                                         // Resets clicked categories
          setRenderedArray([...events])                                   // Resets renderedArray to all events
        }
        Filter();                                                         // Run filter function if the filter search text is not empty
      }else{
        if(filter.input != null && clickedCategory.length > 0){           // If the filter is not null and there are categories clicked
          if(filter.input.length > 0) {filterBoth();}                     // If the filter text is not empty calls filterBoth function
          else{filterCategories()}                                        // filterCategories if filter text is empty but categories are clicked
        }
        else{filterCategories()}}                                         // If the filter input is null only filter categories
    }else{
      if(filter.input != null && clickedCategory.length == 0 ) {          // If the filter is not null but no categories are clicked
        if(filter.input.length == 0) {                                    // If the filter length is 0
          setRenderedArray([...events]);                                  // Resets renderedArray
          filterInput(null);                                              // Resets filter input
          setClickedCategory([]);                                         // Resets clicked categories
        }
      } else setRenderedArray([...events]);                               // If the filter text is null reset renderedArray to equal events
    }

  }, [filter, clickedCategory]);                                          //  Listens to changes in these arrays

  useEffect(() => {                                                       //  --- LOADING INITIAL DATA ---
    getData();                                                            //  Fetches API
    fetchState();                                                         //  Fetches clickedEvents
    fetchRelevantCategories();                                            //  Fetches categories available to filter
    events.length ? setRenderedArray([...events]) : fetchStoredEvents();  
  },[])                                                                   //  Renders when the screen is loaded

  useEffect(() => {                                                       //  --- UPDATES FILTER ON EVENT CHANGE ---
    fetchRelevantCategories();                                            //  Updates relevant categories to filter
  }, [events.length, clickedEvents.length]);                              //  Listens for changes in these arrays

  useEffect(() => {                                                       //  --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    let interval = null;

    if(!search.status){                                                   //  Only when filter is closed to prevent "no match" issue
      interval = setInterval(() => {        
        (async() => {                                                     // Storing the current time
          await AsyncStorage.setItem('lastFetch', new Date().toISOString()) //  Storing in AsyncStorage 
          getData();                                                      //  Fetches cache
        })()           
      }, 10000);                                                          //  Runs every 10 seconds
    }else{
      clearInterval(interval)                                             //  Clears the interval when the filter is opened
    }
    return () => clearInterval(interval)                                  //  Clears interval when unmounted to prevent memory leaks
  }, [search.status]);

  async function RenderEvents() {                                         //  --- RESETS RENDERED EVENTS
    setRenderedArray([...events])                                         //  Updates the rendered array
    await AsyncStorage.setItem('cachedEvents', JSON.stringify(events))    //  Updates cache
  }

  if(events.length > 0 && events.length !== renderedArray.length){        //  --- CHECKS FOR AND FIXES INCORRECT RENDER ---
    if (!filter.input) clickedCategory.length == 0 ? RenderEvents():null//  Fixes any errors if the user is not currently filtering
    else filter.input.length == 0 && clickedCategory.length == 0 ? RenderEvents() : null // Fixes any errors if the user has been searching, but is not doing so now
  }

                                                                          //  --- SETUP CODE ONCE APP IS DOWNLOADED---
  if(lastSave == null) (async() => {setLastSave(await LastFetch())})()    //  Displays when the API was last fetched successfully
  if(!notification["SETUP"]) notificationSetup();                         //  Sets up initial notifications
  
  return(                                                                 //  --- DISPLAYS THE EVENTSCREEN ---
    <View> 
      <StatusBar style={theme == 0 || theme == 2 || theme == 3 ? 'light' : 'dark'} />
      {/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        {/* ----- RENDERS FILTER ----- */}
        {search.status == 1? Space(Dimensions.get('window').height/9):null}
        {search.status ? 
          <View>
            <View style={ES.absoluteView}>
                <TextInput 
                    ref={textInputRef}
                    style={{...ES.clusterFilterText, backgroundColor: FetchColor(theme, 'DARKER')}}
                    maxLength={40}
                    placeholder='Søk..'
                    placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                    textAlign='center'
                    onChangeText={(val) => filterInput(val)}
                    selectionColor={FetchColor(theme, "ORANGE")}
                />
                <TouchableOpacity onPress={() => filterInput(null) + setRenderedArray([...events]) + setClickedCategory([]) + textInputRef.current.clear()}>
                        <Image style={ES.clusterFilterResetIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/icons/reset.png') : require('../assets/icons/reset-black.png')} />
                </TouchableOpacity>
            </View>
              
              <View style={{...ES.clusterFilterView, backgroundColor: FetchColor(theme, 'DARKER')}}>
                <FlatList
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  keyExtractor={(item) => item.id}
                  data={relevantCategories}
                  renderItem={({item}) => (
                    <View style={ES.clusterCategoryView}>
                      {clickedCategory.includes(item) ?
                        <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                          <View>
                          <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
                            <View><CheckedBox/></View>
                            <View><SmallCheck/></View>
                          </View>
                        </TouchableOpacity>
                      :
                        <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                          <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
                          <CheckBox/>
                        </TouchableOpacity>
                      }
                    </View>
                  )}
                />
              </View>
          </View>
        :null}
        {/* ----- RENDERS EVENTS ----- */}
        {renderedArray != null ? 
          renderedArray.length > 0 ? 
            <FlatList
              style={{minHeight: '100%'}}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={(item) => item.eventID}
              data={renderedArray}
              renderItem={({item, index}) => (
                
                <View> 
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', {item: item})}>
                  {index == 0 && search.status == 0? Space(Dimensions.get('window').height/8.1): null}
                      <Cluster space={8}>
                      {index == 0 ? Space(8):null}
                        <View style={ES.eventBack}>
                          <View>
                              {CategorySquare(item.category)}
                              <Text style={{...ES.eventCardDayText,color: FetchColor(theme, 'TEXTCOLOR')}}>{item.startt[8]}{item.startt[9]}</Text>
                              {Month(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR'), lang)}
                          </View>
                            {EventCardLocation(item, theme, lang)}
                            <View style={ES.view3}>
                                <TouchableOpacity onPress={() => {
                                  topic(item.eventID, lang, 0, (item.category).toLowerCase(), notificationArray(notification, item.category))
                                  setClickedEvents(clickedEvents.some(event => event.eventID === item.eventID) ? clickedEvents.filter((x) => x.eventID !== item.eventID):[...clickedEvents, item])
                                }}>
                                    <View style = {ES.bellPosition}><Bell orange={clickedEvents.some(event => event.eventID === item.eventID) ? true:false} theme={theme} /></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                      </Cluster>
                      {index == renderedArray.length-1 ? <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Oppdatert kl:':'Updated:'} {lastSave}.</Text>:null}
                      {index == renderedArray.length-1 ? Space((Dimensions.get('window').height/3)+20):null} 
                      {index == renderedArray.length-1 && search.status == 1 ? Space(152.5):null}
                      {index == renderedArray.length-1 && search.status == 1 ? Space(40*(Math.ceil(relevantCategories.length/3))):null}
                    </TouchableOpacity>
                </View>
              )}
            /> 
          : 
          events.length == 0 ? errorMessage("wifi", theme, lang) : errorMessage("nomatch", theme, lang)
        : errorMessage("wifi", theme, lang)}
        {Space(Dimensions.get('window').height/3)}
      </View>    

      {/* ========================= DISPLAY TOP MENU ========================= */}
      {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.logoBackground}>
          <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
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
              <TouchableOpacity style={MS.touchableIcon} onPress={async () => await handleDownload(setDownloadState, downloadState, clickedEvents, calendarID)}>
                <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? timeSinceDownload(downloadState) >= 1000 ? require('../assets/icons/download.png'):require('../assets/icons/download-orange.png') : require('../assets/icons/download-black.png')} />
              </TouchableOpacity>
            :null}

            {renderedArray.length > 0 || clickedCategory.length > 0 || filter.input != null ? 
              <TouchableOpacity style={MS.touchableIcon} onPress={() => toggleSearchBar()}>
                {search.status ? 
                  <Image style={MS.multiIcon} source={require('../assets/icons/filter-orange.png')} />
                :
                  <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/icons/filter.png') : require('../assets/icons/filter-black.png')} />
                }
              </TouchableOpacity>
            :null}
          </View>
        :null}
      </View>
    </View>
  )
};