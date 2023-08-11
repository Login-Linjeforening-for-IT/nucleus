import registerForPushNotificationsAsync from '../shared/notificationComponents/registerForPushNotificationAsync';
import removeDuplicatesAndOld from '../shared/eventComponents/removeDuplicatesAndOld';
import notificationSetup from '../shared/notificationComponents/notificationSetup';
import updateCalendar from '../shared/eventComponents/calendar/updateCalendar';
import createCalendar from '../shared/eventComponents/calendar/createCalendar';
import calendarExists from '../shared/eventComponents/calendar/calendarExists';
import AsyncStorage from '@react-native-async-storage/async-storage';       // Localstorage
import DynamicCircle from '../shared/eventComponents/dynamicCircle';
import CompareDates from '../shared/functions/compareDates';
import topic from '../shared/notificationComponents/topic';
import React, { useEffect, useState, useRef } from 'react';                 // React imports
import currentTime from '../shared/functions/currentTime';
import CheckedBox from '../shared/functions/checkedBox';
import { useSelector, useDispatch } from 'react-redux';                     // Redux
import Check from '../shared/eventComponents/check';
import Bell from '../shared/eventComponents/bell';
import CheckBox from '../shared/functions/checkBox';
import * as Notifications from 'expo-notifications';                        // Local notifications
import { setCalendarID } from '../redux/misc';
import Space from '../shared/functions/space';
import FetchColor from '../styles/fetchTheme';                              // Function to fetch theme color
import { GS } from '../styles/globalStyles';                                // Global styles
import { StatusBar } from 'expo-status-bar';                                // Status bar
import { AS } from '../styles/adStyles';                                    // Ad styles
import { MS } from '../styles/menuStyles';                                  // Menu styles
import { BlurView } from 'expo-blur';                                       // Blur effect
import { T } from '../styles/text';                                         // Text styles
import {                                                                    // React native components
  Text,                                                                     // Text component
  View,                                                                     // View component
  Image,                                                                    // Image component
  FlatList,                                                                 // Flatlist component   (basic list)
  TextInput,                                                                // Text input component (allows the user to type)
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Dimensions,                                                               // Size of the device
  Platform,                                                                 // Operating system
} from 'react-native';                                                      // React native
import { useFocusEffect } from '@react-navigation/native';                  // useFocusEffect       (do something when the screen is displayed)
import LastFetch from '../shared/functions/lastfetch';
import Cluster from '../shared/functions/cluster';
import AdClusterLocation from '../shared/adComponents/adClusterLocation';
import AdClusterImage from '../shared/adComponents/adClusterImage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Parent AdScreen function
 * 
 * Handles: 
 * - Displaying ads
 * - Filtering ads
 * - Notification Management
 * - Event notifications, both scheduling and cancelling
 * 
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */
export default function AdScreen({ navigation }) {                          //  Exports the screen
  const [ads, setAds] = useState([]);                                       //  Ads from api
  const [renderedArray, setRenderedArray] = useState([]);                   //  Ads currently displayed
  const [clickedAds, setClickedAds] = useState([]);                         //  Clicked ads
  const [clickedAdType, setClickedAdType] = useState([]);                   //  Clicked ad types
  const [lastSave, setLastSave] = useState(null)                            //  Last time API was fetched successfully
  const [DS, setDS] = useState(null)                                        //  Download state
  const [filter, setFilter] = useState({input: null});                      //  Filter text input declaration
  const textInputRef = useRef(null);                                        //  Clears text input
  const dispatch = useDispatch()                                            //  Dispatch to change Redux state
  const [relevantAds, setRelevantAds] = useState([]);                       //  Relevant ads to filter
  const [search, toggleSearch] = useState({status: 0})                      //  Search bar visibility boolean
  const notification = useSelector( (state) => state.notification )         //  Fetches notification state
  const { lang  }    = useSelector( (state) => state.lang  )                //  Language state
  const { theme }    = useSelector( (state) => state.theme )                //  Theme state
  const { calendarID } = useSelector( (state) => state.misc )               //  Calendar ID
  const eventPage   = () => { navigation.navigate('EventScreen') } // Navigate to eventPage
  const menuPage   = () => { navigation.navigate('MenuScreen') }
  const [expoPushToken, setExpoPushToken] = useState('');                   //  Array for notification token
  const [pushNotification, setPushNotification] = useState(false);          //  Array for setting the push notification
  const notificationListener = useRef();                                    //  Notification listener
  const responseListener = useRef();                                        //  Response listener (if it was sent or not)                                     

  // TEMPORARY TESTDATA
    const [addata] = useState([
        {
            id: 1, 
            title_no: 'Prosjektleder', 
            title_en: 'Project Manager', 
            position_title_no: 'Prosjektleder', 
            position_title_en: 'Project Manager', 
            description_short_no: 'Vi søker en dyktig JavaScript-utvikler til å være prosjektleder for vår nettside. Jobben krever 1 års ledererfaring eller styring av team. Du må ha erfaring med JavaScript og gode designferdigheter. Det er en fordel om du er kjent med forskjellige frameworks slik som React og nextjs.', 
            description_short_en: 'Managing projects.', 
            description_long_no: 'Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut.', 
            description_long_en: 'Experienced project manager sought to lead various projects. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet this is a long description in English.', 
            job_type: 'Fulltid', 
            application_deadline: '2023-05-13T18:00:00Z', 
            banner_image: 'https://cdn.login.no/img/ads/adbanner.png', 
            organization: 'Login - Linjeforeningen for IT', 
            application_url: 'https://org1.example.com/apply1', 
            created_at: '2023-05-13T18:00:00Z', 
            updated_at: '2023-05-13T18:00:00Z',
            shortname: 'ORG1', 
            name_no: 'Organisasjon 1', 
            name_en: 'Organization 1', 
            description_no: 'Dette er en norsk organisasjon.', 
            description_en: 'This is a Norwegian organization.', 
            link_homepage: 'https://org1.example.com', 
            link_linkedin: 'https://linkedin.com/org1', 
            link_facebook: 'https://facebook.com/org1', 
            link_instagram: 'https://instagram.com/org1', 
            logo: 'https://cdn.login.no/img/ads/adcompany.png',
            city: 'Oslo',
            skill: 'Bruker ikke Thinkpad\nAnti Arch\nLiker JavaScript\nLang fartstid med nettsideutvikling'
        },
        {
            id: 2, 
            title_no: 'Utvikler', 
            title_en: 'Developer', 
            position_title_no: 'Utvikler', 
            position_title_en: 'Developer', 
            description_short_no: 'Utvikling av programvare.', 
            description_short_en: 'Software development.', 
            description_long_no: 'Erfaren utvikler søkes for å jobbe med spennende prosjekter.', 
            description_long_en: 'Experienced developer sought to work on exciting projects.', 
            job_type:  'Part time', 
            application_deadline: '2023-05-13T18:00:00Z',
            banner_image: 'https://cdn.login.no/img/ads/adbannerblue.png', 
            organization: 'mnemonic', 
            application_url: 'https://org2.example.com/apply2', 
            created_at: '2023-05-13T18:00:00Z', 
            updated_at: '2023-05-13T18:00:00Z',
            shortname: 'ORG2', 
            name_no: 'Organisasjon 2', 
            name_en: 'Organization 2', 
            description_no: 'Dette er en norsk organisasjon.', 
            description_en: 'This is a Norwegian organization.', 
            link_homepage: 'https://org2.example.com', 
            link_linkedin: 'https://linkedin.com/org2', 
            link_facebook: 'https://facebook.com/org2', 
            link_instagram: 'https://instagram.com/org2', 
            logo: 'https://cdn.login.no/img/ads/adcompanyblue.png',
            city: 'Trondheim',
            skill: 'Programming'
        },
        {id: 3, title_no: 'Pentester'},
        {id: 4, title_no: 'Dokumentasjonsansvarlig'},
        {id: 5, title_no: 'SOC Trainee'},
        {id: 6, title_no: 'Docker ekspert', logo: 'https://cdn.login.no/img/ads/adcompanyblue.png', banner_image: 'https://cdn.login.no/img/ads/adbannerblue.png'},
        {id: 7, title_no: 'Etisk hacker', logo: 'https://cdn.login.no/img/ads/adcompanyblue.png', banner_image: 'https://cdn.login.no/img/ads/adbannerblue.png'},
        {id: 8, title_no: 'Spillutvikler'},
        {id: 9, title_no: 'Machine learning internship'},
        {id: 10, title_no: 'Machine learning summerinternship for 4-5th year student'},
    ])

  // TEMPORARY TESTDATA

  /**
   * Executes the download itself, updates existing calendar or creates a new calendar if no calendar exists.
   * 
   * @param clickedAds    Array of ads the user has joined
   * @param calendarID    ID of the calendar if one does already exist
   * 
   * @see calendarExists  Checks if the calendar storage is defined and if it still exists on the device
   * @see setCalendarID   Stores the ID of a new calendar in localstorage
   * @see updateCalendar  Updates the ads for a calendar that is found 
   * @see createCalendar  Creates a new calendar if no calendar is to be found
   */
  async function executeDownload(clickedAds, calendarID) {
      if (typeof await calendarExists(calendarID) != "undefined") await updateCalendar(clickedAds, calendarID)
      else dispatch(setCalendarID(await createCalendar(clickedAds)));
  }

  /**
   * Handles press of download button, changes color of the button 
   * and downloads if more than 3 seconds since last download
   * 
   * @see executeDownload Executes the download if permitted
   * @see currentTime Returns the current time as a string of the IFO8 format
   */
  async function handleDownload() {
    if(DS == null) {
      setDS(currentTime());
      await executeDownload(clickedAds, calendarID);
    } else {
      if(timeSinceDownload() >= 1000) await executeDownload(clickedAds, calendarID);
      setDS(currentTime());
    }
  }

  /**
   * Checks how long its been since the ads were last downloaded and returns the time in seconds.
   * 
   * @returns int, seconds
   */
  function timeSinceDownload() {
    const now = new Date (currentTime());
    const before = new Date (DS);
    return now-before;
  }

  /**
   * Fetches data from API, formats the response, sets the cache, updates the ads on the screen,
   * catches any errors and fetches localstorage, and handles errors. 
   */
  async function getData() {                                                //  --- FETCHING DATA FROM API ---
    try {
        setRenderedArray([...addata])
    //   fetch('https://api.login.no/events')                                  // PRODUCTION
    //   //fetch('https://tekkom:rottejakt45@api.login.no:8443/events')        // TESTING
    //   .then(response=>response.json())                                      // Formatting the response
    //   .then(data=>setAds(data))                                             // Setting the response
    //   .then(setRenderedArray([...ads]))                                     // Updates the renderedarray to equal cache
    //   .then(async() => setLastSave(await LastFetch()));                     // Updates last fetch displayed on the screen
      if(addata.length > 0) await AsyncStorage.setItem('cachedAds', JSON.stringify(addata))  // Setting the cache
    } catch (e) {                                                           // Catches any errors (missing wifi)
      (async() => {                                                         // Immediately invoked function expression (IIFE)
        try {     
          let cache = await AsyncStorage.getItem('cachedAds')               // Tries to fetch ad cache
          if(cache) cache = JSON.parse(cache); setAds([...cache])           // If cached ads was found save them in ad array
        } catch (e) {console.warn('Failed to fetch cache: ' + e)}           // If cache was not found tell the user cache wasnt found (custom notification needs to go here)
      })    
    }
  }

  const toggleSearchBar = () => {                                           //  --- SEARCH BAR VISIBILITY ---
    toggleSearch({
      ...search,
      status: !search.status
    });
  }

  const filterInput = (val) => {                                            //  --- UPDATES FILTER TEXT INPUT ---
      setFilter({                                                           // Function to set filter
      ...filter,                                                            // Spread operator to spread filter
      input: val,                                                           // Change input to 'val'
      });
  }
  
  const filterText = () => {                                                //  --- FILTERS TEXT ---
    let textFiltered = ads.filter(ad => ad.adname.toLowerCase().includes(filter.input.toLowerCase()));
    let uniqueFiltered = removeDuplicatesAndOld(ads, textFiltered);
    setRenderedArray([...uniqueFiltered]);                                  // Converts to lowercase, filters and updates
  }
  
  const Filter = () => {                                                    //  --- PARENT FILTER FUNCTION ---
    if (filter.input != null) {                                             // If filter.input is not null
      if (clickedAdType.length > 0){                                        // If the user has clicked something
        if(filter.input.length > 0){  filterBoth()}                         // Filter both text and categories if the text is longer than 0
        else{setRenderedArray([...ads])}                                    // Update the displayed ads if the text is not longer than 0
      } else filterText()                                                   // If no categories are clicked only filter text
    } else if (clickedAdType.length > 0) {fetchRelevantAds()}               // if the filter is null but categories are clicked only filter categories
    else{setRenderedArray([...ads])}                                        // If both are null or 0 update the displayed ads
  }
  
  const fetchRelevantAds = () => {                                          //  --- FETCHES RELEVANT CATEGORIES TO FILTER ---
    relevantAds.unshift({id: '1', type: 'PÅMELDT'})                         // Filters then adds PÅMELDT since no ad has this attribute
    setRelevantAds([...relevantAds])                                        // Updates categories available to filter
  }

  const fetchState = async() => {                                           //  --- FETCHES CLICKED ADS ---
    let foundState = await AsyncStorage.getItem('clickedAds');              // Fetches the cache
    if (foundState != null) {                                               // If cache exists
      let parsed = JSON.parse(foundState)                                   // Parses from string to objects
      setClickedAds(parsed)                                                 // Function to update the clickedAds array
    } 
  }

  const fetchStoredAds = async() => {                                       // --- FETCHING STORED ADS IF NO WIFI ---
    let tempArray = await AsyncStorage.getItem('cachedAds')                 // Fetches cache
    if(tempArray != null){                                                  // If cache exists
      let parsed = JSON.parse(tempArray);                                   // Parses from string to objects
      setRenderedArray([...parsed]);                                        // Updates the renderedarray to equal cache
      setAds([...parsed]);                                                  // Updates the ads array to equal cache
    }
  }

  useFocusEffect(                                                           //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
  React.useCallback(() => {                                                 // Callback to avoid too many rerenders
    fetchState()                                                            // Function to fetch clicked ads
  }, [])
);

  if (clickedAds.length > 0) {                                              //  --- STORING FIRSTCOMING AND ALL CLICKED EVENT ---
    (async() => {                                                           // IIFE
      let storedID = 0;                                                     // Variable that takes the ID of the stored ad

      let unique = removeDuplicatesAndOld(ads, clickedAds);

      if(unique) {
        for (let i = 0; i < unique.length; i++) {                           // Finds the firstcoming ad 
          if (CompareDates((unique[i]).startt, (unique[storedID]).startt) == true) storedID = i;
        }
        
        await AsyncStorage.setItem("clickedAds", JSON.stringify(unique))                                 // Stores clicked ads
        if(unique[storedID]) await AsyncStorage.setItem("firstAd", JSON.stringify((unique[storedID])))   // Stores firstcoming clicked ads
      }
    })();
  };

  useEffect(() => {                                                         //  --- NOTIFICATION MANAGEMENT ---
    registerForPushNotificationsAsync(lang).then(token => setExpoPushToken(token));

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

  useEffect(() => {                                                         //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    if (filter.input != null || clickedAds.length > 0) {                    // If the filter is not null or there are categories clicked
      if(filter.input != null && clickedAds.length == 0)  {                 // If the filter is not null but no categories are clicked
        if (filter.input.length == 0) {                                     // If the length of the filter search text is equal 0
          filterInput(null);                                                // Resets filter input
          setClickedAds([]);                                                // Resets clicked categories
          setRenderedArray([...ads])                                        // Resets renderedArray to all ads
        }
        Filter();                                                           // Run filter function if the filter search text is not empty
      }else{
        if(filter.input != null && clickedAds.length > 0){                  // If the filter is not null and there are categories clicked
          if(filter.input.length > 0) {filterBoth();}                       // If the filter text is not empty calls filterBoth function
        }
      }                                           // If the filter input is null only filter categories
    }else{
      if(filter.input != null && clickedAds.length == 0 ) {                 // If the filter is not null but no categories are clicked
        if(filter.input.length == 0) {                                      // If the filter length is 0
          setRenderedArray([...ads]);                                       // Resets renderedArray
          filterInput(null);                                                // Resets filter input
          setClickedAds([]);                                                // Resets clicked categories
        }
      } else setRenderedArray([...ads]);                                    // If the filter text is null reset renderedArray to equal ads
    }

  }, [filter, clickedAdType]);                                              //  Listens to changes in these arrays

  useEffect(() => {                                                         //  --- LOADING INITIAL DATA ---
    getData();                                                              //  Fetches API
    fetchState();                                                           //  Fetches clickedAds
    fetchRelevantAds();                                              //  Fetches categories available to filter
    ads.length ? setRenderedArray([...ads]) : fetchStoredAds();  
  },[])                                                                     //  Renders when the screen is loaded

  useEffect(() => {                                                         //  --- UPDATES FILTER ON EVENT CHANGE ---
    fetchRelevantAds();                                              //  Updates relevant categories to filter
  }, [ads.length, clickedAds.length]);                                      //  Listens for changes in these arrays

  useEffect(() => {                                                         //  --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    let interval = null;
    if(!search.status){                                                     //  Only when filter is closed to prevent "no match" issue
      interval = setInterval(() => {        
        (async() => {                                                       // Storing the current time
          var year     = new Date().getFullYear()                           // Current year
          var month    = 1 + new Date().getMonth()                          // Current month
          var day      = new Date().getDate()                               // Current day
          var hour     = new Date().getHours()                              // Current hour
          var minute   = new Date().getMinutes()                            // Current minute

          if(month < 10) month = '0' + month                                // Checking and fixing missing 0
          if(day < 10) day = '0' + day                                      // Checking and fixing missing 0
          if(hour < 10) hour = '0' + hour                                   // Checking and fixing missing 0
          if(minute < 10) minute = '0' + minute                             // Checking and fixing missing 0

          var currentTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00Z'       // Current full date
          await AsyncStorage.setItem('lastFetch', currentTime)              //  Storing in AsyncStorage 
          getData();                                                        //  Fetches cache
        })()           
      }, 10000);                                                            //  Runs every 10 seconds
    }else{
      clearInterval(interval)                                               //  Clears the interval when the filter is opened
    }
    return () => clearInterval(interval)                                    //  Clears interval when unmounted to prevent memory leaks
  }, [search.status]);

  async function RenderAds() {                                              //  --- RESETS RENDERED EVENTS
    setRenderedArray([...ads])                                              //  Updates the rendered array
    await AsyncStorage.setItem('cachedAds', JSON.stringify(ads))            //  Updates cache
  }

  if(ads.length > 0 && ads.length !== renderedArray.length){                //  --- CHECKS FOR AND FIXES INCORRECT RENDER ---
    if (!filter.input) clickedAds.length == 0 ? RenderAds():null                    //  Fixes any errors if the user is not currently filtering
    else filter.input.length == 0 && clickedAds.length == 0 ? RenderAds() : null    // Fixes any errors if the user has been searching, but is not doing so now
  }

                                                                            //  --- SETUP CODE ONCE APP IS DOWNLOADED---
  if(lastSave == null) (async() => {setLastSave(await LastFetch())})()      //  Displays when the API was last fetched successfully
  if(!notification["SETUP"]) notificationSetup();                           //  Sets up initial notifications

  return(
    <View>
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
            {Space(Dimensions.get('window').height/8.1)}
            <View>
              <View style={{height : '50%'}}/>
              <Text style={{...T.centeredOppositeColor, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Kommer snart!":"Coming soon!"}</Text>
            </View>
        </View>
        {/* ========================= DISPLAY TOP MENU ========================= */}
        {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
        <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.logoBackground} onPress={() => eventPage()}>
            <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
        </TouchableOpacity>
        {
            lang ?
            <Text style={{... MS.smallTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Jobbannonser</Text>
            : 
            <Text style={{... MS.filterScreenTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Job listings</Text>
        }
        
        {renderedArray != null ? 
            <View style={MS.multiTop}>
            {clickedAds.length > 0 ? 
                <TouchableOpacity style={MS.touchableIcon} onPress={async () => await handleDownload()}>
                <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? timeSinceDownload() >= 1000 ? require('../assets/icons/download.png'):require('../assets/icons/download-orange.png') : require('../assets/icons/download-black.png')} />
                </TouchableOpacity>
            :null}

            {renderedArray.length > 0 || clickedAds.length > 0 || filter.input != null ? 
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
        {/* ========================= DISPLAY BOTTOM MENU ========================= */}
        {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
        <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={MS.bMenuIconTO}>
            <Image style={MS.bMenuIcon} source={require('../assets/menu/business-orange.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
            <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png')} />
        </TouchableOpacity>
        </View>     
    </View>
  )
  
  return(                                                                   //  --- DISPLAYS THE EVENTSCREEN ---
    <View> 
      <StatusBar style={theme == 0 || theme == 2 || theme == 3 ? 'light' : 'dark'} />
      {/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        {/* ----- RENDERS FILTER ----- */}
        {search.status == 1? Space(Dimensions.get('window').height/8.1):null}
        {search.status ? 
          <View>
            <View style={AS.absoluteView}>
              <TextInput 
                ref={textInputRef}
                style={{...AS.filterText, backgroundColor: FetchColor(theme, 'DARKER')}}
                maxLength={40}
                placeholder='Søk..'
                placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                textAlign='center'
                onChangeText={(val) => filterInput(val)}
                selectionColor={FetchColor(theme, "ORANGE")}
              />
              <TouchableOpacity onPress={() => filterInput(null) + setRenderedArray([...ads]) + textInputRef.current.clear()}>
                <Image style={AS.filterResetIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/icons/reset.png') : require('../assets/icons/reset-black.png')} />
              </TouchableOpacity>
            </View>
          </View>
        :null}
        {/* ----- RENDERS ADS ----- */}
        {renderedArray != null ? renderedArray.length != null ? search.status ? Space(10) :null:null:null}
        {renderedArray != null ? 
          renderedArray.length > 0 ? 
            <FlatList
              style={{minHeight: '100%'}}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={(ad) => ad.id}
              data={renderedArray}
              renderItem={({item: ad, index}) => (
                <View> 
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificAdScreen', {item: ad})}>
                  {index == 0 && search.status == 0? Space(Dimensions.get('window').height/8.1): null}
                        <Cluster>
                            <View style={AS.adBack}>
                                <View style={AS.adViewLeft}>
                                    <AdClusterImage image={ad.logo}/>
                                </View>
                                <View style={AS.adViewMid}>
                                    {AdClusterLocation(ad, theme, lang)}
                                </View>
                                <View style={AS.adViewRight}>
                                    <TouchableOpacity onPress={() => {
                                    // topic(ad.id, lang, 0, (ad.category).toLowerCase(), notificationArray(ad.category))
                                    setClickedAds(clickedAds.some(ads => ads.id === ad.id) ? clickedAds.filter((x) => x.id !== ad.id):[...clickedAds, ad])
                                    }}>
                                        <View style = {AS.bellPosition}>
                                            <Bell orange={clickedAds.some(ads => ads.id === ad.id) ? true:false}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Cluster>
                        {index == renderedArray.length-1 ? Space(6):null}
                        {index == renderedArray.length-1 ? <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Oppdatert kl:':'Updated:'} {lastSave}.</Text>:null}
                        {index == renderedArray.length-1 ? Space((Dimensions.get('window').height/3)+20):null} 
                        {index == renderedArray.length-1 && search.status == 1 ? Space(152.5):null}
                    </TouchableOpacity>
                </View>
              )}
            /> 
          : 
          ads.length == 0 ?
            <View style={{alignSelf: 'center', maxWidth: '80%'}}>
              <View style={{height : '58%'}}/>
              <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer.":"Check your wifi connection and try again. Contact TEKKOM if the issue persists."}</Text>
            </View>
          :
            <View>
              <View style={{height : '50%'}}/>
              <Text style={{...T.centeredOppositeColor, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? "Ingen treff":"No matching ads"}</Text>
            </View>
        : 
          <View style={{alignSelf: 'center', maxWidth: '80%'}}>
            <View style={{height : '58%'}}/>
            <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer.":"Check your wifi connection and try again. Contact TEKKOM if the issue persists."}</Text>
          </View>
        }
        {Space(Dimensions.get('window').height/3)}
      </View>    

      {/* ========================= DISPLAY TOP MENU ========================= */}
      {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.logoBackground} onPress={() => eventPage()}>
            <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
        </TouchableOpacity>
        {
          lang ?
            <Text style={{... MS.smallTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Jobbannonser</Text>
          : 
            <Text style={{... MS.filterScreenTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Job listings</Text>
        }
        
        {renderedArray != null ? 
          <View style={MS.multiTop}>
            {clickedAds.length > 0 ? 
              <TouchableOpacity style={MS.touchableIcon} onPress={async () => await handleDownload()}>
                <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? timeSinceDownload() >= 1000 ? require('../assets/icons/download.png'):require('../assets/icons/download-orange.png') : require('../assets/icons/download-black.png')} />
              </TouchableOpacity>
            :null}

            {renderedArray.length > 0 || clickedAds.length > 0 || filter.input != null ? 
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
      {/* ========================= DISPLAY BOTTOM MENU ========================= */}
      {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={MS.bMenuIconTO}>
          <Image style={MS.bMenuIcon} source={require('../assets/menu/business-orange.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png')} />
        </TouchableOpacity>
      </View>     
    </View>
  )
};