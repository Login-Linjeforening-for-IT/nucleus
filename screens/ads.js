import NavigateFromPushNotification from 'login/shared/notificationComponents/navigateFromPushNotification';
import LastFetch, { fetchState, fetchStored, getData } from 'login/shared/eventComponents/fetch';
import handleDownload, { timeSinceDownload } from 'login/shared/eventComponents/calendar';
import notificationSetup from 'login/shared/notificationComponents/notificationSetup';
import notificationArray from 'login/shared/notificationComponents/notificationArray';
import { AdClusterLocation, AdClusterImage } from 'login/shared/components/ad';
import { ListFooter } from '../shared/eventComponents/eventList';
import AsyncStorage from '@react-native-async-storage/async-storage';       // Localstorage
import Space, { errorMessage } from 'login/shared/components/utils';
import storeAds from 'login/shared/eventComponents/storeEvents';
import BellIcon from 'login/shared/eventComponents/bellIcon';
import React, { useEffect, useState, useRef } from 'react';                 // React imports
import { useFocusEffect } from '@react-navigation/native';                  // useFocusEffect       (do something when the screen is displayed)
import { useDispatch, useSelector } from 'react-redux';                     // Redux
import Cluster from 'login/shared/functions/cluster';
import FetchColor from 'login/styles/fetchTheme';                           // Function to fetch theme color
import { GS } from 'login/styles/globalStyles';                             // Global styles
import { StatusBar } from 'expo-status-bar';                                // Status bar
import { AS } from 'login/styles/adStyles';                                 // Ad styles
import { MS } from 'login/styles/menuStyles';                               // Menu styles
import { T } from 'login/styles/text';                                      // Text styles
import { BlurView } from 'expo-blur';                                       // Blur effect
import {                                                                    // React native components
    TouchableOpacity,                                                       // TouchableOpacity     (custom button)
    Dimensions,                                                             // Size of the device
    FlatList,                                                               // Flatlist component   (basic list)
    Platform,                                                               // Operating system
    View,                                                                   // View component
    Image,                                                                  // Image component
    Text,                                                                   // Text component
} from 'react-native';                                                      // React native
import Filter, { 
    fetchRelevantCategories, 
    filterCategories, 
    toggleFilter,
    filterInput, 
    filterBoth, 
    FilterUI, 
} from 'login/shared/eventComponents/filter';

/**
 * Parent EventScreen function
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
    const [ads, setAds] = useState([]);                                     //  Ads from api
    const [renderedArray, setRenderedArray] = useState([]);                 //  Ads currently displayed
    const [clickedAds, setClickedAds] = useState([]);                       //  Clicked Ads
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
            fetchState(setClickedAds)                                    // Function to fetch clicked ads
        }, [])
    );

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


    storeAds(ads, clickedAds)

    useEffect(() => {                                                       //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
        if (filter.input != null || clickedCategory.length > 0) {           // If the filter is not null or there are categories clicked
            if(filter.input != null && clickedCategory.length == 0)  {      // If the filter is not null but no categories are clicked
                if (filter.input.length == 0) {                             // If the length of the filter search text is equal 0
                    filterInput(setFilter, null, filter);                   // Resets filter input
                    setClickedCategory([]);                                 // Resets clicked categories
                    setRenderedArray([...ads])                           // Resets renderedArray to all ads
                }
                Filter(filter, setRenderedArray, ads, clickedAds, clickedCategory);                                                         // Run filter function if the filter search text is not empty
            }else{
                if(filter.input != null && clickedCategory.length > 0){           // If the filter is not null and there are categories clicked
                    if(filter.input.length > 0) {filterBoth(clickedCategory, clickedAds, ads, setRenderedArray, filter);}                     // If the filter text is not empty calls filterBoth function
                    else {filterCategories(ads, clickedAds, clickedCategory, setRenderedArray)}                                        // filterCategories if filter text is empty but categories are clicked
                } else {filterCategories(ads, clickedAds, clickedCategory, setRenderedArray)}
            }                                         // If the filter input is null only filter categories
        } else {
            if(filter.input != null && clickedCategory.length == 0 ) {          // If the filter is not null but no categories are clicked
                if(filter.input.length == 0) {                                    // If the filter length is 0
                    setRenderedArray([...ads]);                                  // Resets renderedArray
                    filterInput(setFilter, null, filter);                                              // Resets filter input
                    setClickedCategory([]);                                         // Resets clicked categories
                }
            } else setRenderedArray([...ads]);                               // If the filter text is null reset renderedArray to equal ads
        }

    }, [filter, clickedCategory]);                                          //  Listens to changes in these arrays

    useEffect(() => {                                                       //  --- LOADING INITIAL DATA ---
        // getData(setAds, setRenderedArray, setLastSave, ads);                            //  Fetches API
        setRenderedArray([...addata])
        if(addata.length > 0) (async() => {
            await AsyncStorage.setItem('cachedAds', JSON.stringify(addata))
        })
        // fetchState(setClickedAds);                                                         //  Fetches clickedAds
        // fetchRelevantCategories(setRelevantCategories, clickedAds, ads, category); //  Fetches categories available to filter
        // ads.length ? setRenderedArray([...ads]) : fetchStored(setRenderedArray, setAds, "ads");  
    }, [])                                                                   //  Renders when the screen is loaded

    useEffect(() => {                                                       //  --- UPDATES FILTER ON EVENT CHANGE ---
        fetchRelevantCategories(setRelevantCategories, clickedAds, ads, category); //  Updates relevant categories to filter
    }, [ads.length, clickedAds.length]);                              //  Listens for changes in these arrays

    useEffect(() => {                                                       //  --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
        let interval = null;

        if(!search.status){                                                 //  Only when filter is closed to prevent "no match" issue
            interval = setInterval(() => {        
                (async() => {                                               // Storing the current time
                    await AsyncStorage.setItem('lastFetch', new Date().toISOString()) //  Storing in AsyncStorage 
                    getData(setAds, setRenderedArray, setLastSave, ads);        //  Fetches cache
                })()           
            }, 10000);                                                      //  Runs every 10 seconds
        } else clearInterval(interval)                                      //  Clears the interval when the filter is opened

        return () => clearInterval(interval)                                //  Clears interval when unmounted to prevent memory leaks
    }, [search.status]);

    async function RenderAds() {                                         //  --- RESETS RENDERED EVENTS
        setRenderedArray([...ads])                                       //  Updates the rendered array
        await AsyncStorage.setItem('cachedAds', JSON.stringify(ads))  //  Updates cache
    }

    if(ads.length > 0 && ads.length !== renderedArray.length){        //  --- CHECKS FOR AND FIXES INCORRECT RENDER ---
        if (!filter.input) clickedCategory.length == 0 ? RenderAds():null                 // Fixes any errors if the user is not currently filtering
        else filter.input.length == 0 && clickedCategory.length == 0 ? RenderAds() : null // Fixes any errors if the user has been searching, but is not doing so now
    }

                                                                            //  --- SETUP CODE ONCE APP IS DOWNLOADED---
    if(lastSave == null) (async() => {setLastSave(await LastFetch())})()    //  Displays when the API was last fetched successfully
    if(!notification["SETUP"]) notificationSetup();                         //  Sets up initial notifications
  
    return(                                                                 //  --- DISPLAYS THE EVENTSCREEN ---
    <View> 
        <StatusBar style={theme == 0 || theme == 2 || theme == 3 ? 'light' : 'dark'} />
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
            {search.status == 1? Space(Dimensions.get('window').height/8.1):null}
            <FilterUI 
                textInputRef={textInputRef}
                setRenderedArray={setRenderedArray}
                setClickedCategory={setClickedCategory}
                relevantCategories={relevantCategories}
                clickedCategory={clickedCategory}
                theme={theme}
                search={search}
            />
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
                    {index == 0 && search.status == 0 ? Space(Dimensions.get('window').height/8.1) : null}
                        <AdListItem clickedAds={clickedAds} ad={ad} theme={theme} lang={lang} setClickedAds={setClickedAds} />
                        <ListFooter 
                            index={index}
                            renderedArray={renderedArray}
                            search={search}
                            relevantCategories={relevantCategories}
                            lastSave={lastSave}
                            lang={lang}
                            theme={theme}
                        />
                    </TouchableOpacity>
                </View>
                )}
            /> 
            : 
            ads.length == 0 ? errorMessage("wifi", theme, lang) : errorMessage("nomatch", theme, lang)
        : errorMessage("wifi", theme, lang)}
        {Space(Dimensions.get('window').height/3)}
        </View>    

        {/* ========================= DISPLAY TOP MENU ========================= */}
        {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
        <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.logoBackground} onPress={() => eventPage()}>
            <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('login/assets/logo/loginText.png') : require('login/assets/logo/loginText-black.png')} />
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
                <TouchableOpacity style={MS.touchableIcon} onPress={async () => await handleDownload(setDownloadState, downloadState, clickedAds, calendarID, dispatch)}>
                <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? timeSinceDownload(downloadState) >= 1000 ? require('login/assets/icons/download.png'):require('login/assets/icons/download-orange.png') : require('login/assets/icons/download-black.png')} />
                </TouchableOpacity>
            :null}

            {renderedArray.length > 0 || clickedAds.length > 0 || filter.input != null ? 
                <TouchableOpacity style={MS.touchableIcon} onPress={() => toggleFilter(toggleSearch, search)}>
                {search.status ? 
                    <Image style={MS.multiIcon} source={require('login/assets/icons/filter-orange.png')} />
                :
                    <Image style={MS.multiIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('login/assets/icons/filter.png') : require('login/assets/icons/filter-black.png')} />
                }
                </TouchableOpacity>
            :null}
            </View>
        :null}

        </View>   
    </View>
    )
};

function AdListItem({clickedAds, ad, theme, lang, setClickedAds}) {
    const isOrange = clickedAds.some(ads => ads.id === ad.id) ? true : false

    return(
        <Cluster>
            <View style={AS.adBack}>
                <View style={AS.adViewLeft}>
                    <AdClusterImage image={ad.logo}/>
                </View>
                <View style={AS.adViewMid}>
                    <AdClusterLocation item={ad} theme={theme} lang={lang} /> 
                </View>
                <View style={AS.adViewRight}>
                    <TouchableOpacity onPress={() => {
                        topic(
                            ad.id, lang, 0, (ad.category).toLowerCase(), 
                            notificationArray(ad.category)
                        )
                        setClickedAds(clickedAds.some(ads => ads.id === ad.id) 
                            ? clickedAds.filter((x) => x.id !== ad.id)
                            : [...clickedAds, ad])
                    }}>
                        <View style = {AS.bellPosition}>
                            <BellIcon orange={isOrange}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Cluster>
    )
}