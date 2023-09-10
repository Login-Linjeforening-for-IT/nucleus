import NavigateFromPushNotification from "@shared/notificationComponents/navigateFromPushNotification"
import handleDownload, { timeSinceDownload } from "@shared/eventComponents/calendar"
import notificationSetup from "@shared/notificationComponents/notificationSetup"
import LastFetch, { fetchState, getData } from "@shared/eventComponents/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ListFooter } from "@shared/eventComponents/eventList"
import Space, { ErrorMessage } from "@shared/components/utils"
import storeAds from "@shared/eventComponents/storeEvents"
import React, { useEffect, useState, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { AdListItem } from "@components/adListItem"
import { ScreenProps } from "@interfaces"
import FetchColor from "@styles/fetchTheme"
import { StatusBar } from "expo-status-bar"
import { GS } from "@styles/globalStyles"
import { MS } from "@styles/menuStyles"
import { BlurView } from "expo-blur"
import {
    TouchableOpacity,
    Dimensions,
    FlatList,
    Platform,
    View,
    Image,
    Text,
} from "react-native"

/**
 * Parent EventScreen function
 *
 * Handles:
 * - Displaying ads
 *
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */
export default function AdScreen({ navigation }: ScreenProps): JSX.Element {
    //  Ads from api
    const [ads, setAds] = useState([])
    //  Ads currently displayed
    const [renderedArray, setRenderedArray] = useState<any>([])
    //  Clicked Ads
    const [clickedAds, setClickedAds] = useState<any[]>([])
    //  Last time API was fetched successfully
    const [lastSave, setLastSave] = useState("")
    //  Download state
    const [downloadState, setDownloadState] = useState(new Date())

    // Redux states
    const notification =    useSelector( (state: ReduxState) => state.notification)
    const { lang  } =       useSelector( (state: ReduxState) => state.lang)
    const { login } =       useSelector( (state: ReduxState) => state.login)
    const { theme } =       useSelector( (state: ReduxState) => state.theme)
    const { calendarID } =  useSelector( (state: ReduxState) => state.misc)
    const dispatch = useDispatch()
    function eventPage () {navigation.navigate("EventScreen")}

    // Allows for navigation to a specific page if the app is
    // opened by a push notification
    NavigateFromPushNotification({navigation})

    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked ads
            fetchState(setClickedAds)
        }, [])
    )

    const [addata] = useState([
        {
            id: 1,
            title_no: "Prosjektleder",
            title_en: "Project Manager",
            position_title_no: "Prosjektleder",
            position_title_en: "Project Manager",
            description_short_no: "Vi søker en dyktig JavaScript-utvikler til å være prosjektleder for vår nettside. Jobben krever 1 års ledererfaring eller styring av team. Du må ha erfaring med JavaScript og gode designferdigheter. Det er en fordel om du er kjent med forskjellige frameworks slik som React og nextjs.",
            description_short_en: "Managing projects.",
            description_long_no: "Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut.",
            description_long_en: "Experienced project manager sought to lead various projects. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet lol dette er en lang beskrivelse over hvordan en lang beskrivelse vil se ut. Lorem ipsum dolor sit amet this is a long description in English.",
            job_type: "Fulltid",
            application_deadline: "2023-05-13T18:00:00Z",
            banner_image: "https://cdn.login.no/img/ads/adbanner.png",
            organization: "Login - Linjeforeningen for IT",
            application_url: "https://org1.example.com/apply1",
            created_at: "2023-05-13T18:00:00Z",
            updated_at: "2023-05-13T18:00:00Z",
            shortname: "ORG1",
            name_no: "Organisasjon 1",
            name_en: "Organization 1",
            description_no: "Dette er en norsk organisasjon.",
            description_en: "This is a Norwegian organization.",
            link_homepage: "https://org1.example.com",
            link_linkedin: "https://linkedin.com/org1",
            link_facebook: "https://facebook.com/org1",
            link_instagram: "https://instagram.com/org1",
            link_discord: "",
            logo: "https://cdn.login.no/img/ads/adcompany.png",
            city: "Oslo",
            skill: "Bruker ikke Thinkpad\nAnti Arch\nLiker JavaScript\nLang fartstid med nettsideutvikling"
        },
        {
            id: 2,
            title_no: "Utvikler",
            title_en: "Developer",
            position_title_no: "Utvikler",
            position_title_en: "Developer",
            description_short_no: "Utvikling av programvare.",
            description_short_en: "Software development.",
            description_long_no: "Erfaren utvikler søkes for å jobbe med spennende prosjekter.",
            description_long_en: "Experienced developer sought to work on exciting projects.",
            job_type:  "Part time",
            application_deadline: "2023-05-13T18:00:00Z",
            banner_image: "https://cdn.login.no/img/ads/adbannerblue.png",
            organization: "mnemonic",
            application_url: "https://org2.example.com/apply2",
            created_at: "2023-05-13T18:00:00Z",
            updated_at: "2023-05-13T18:00:00Z",
            shortname: "ORG2",
            name_no: "Organisasjon 2",
            name_en: "Organization 2",
            description_no: "Dette er en norsk organisasjon.",
            description_en: "This is a Norwegian organization.",
            link_homepage: "https://org2.example.com",
            link_linkedin: "https://linkedin.com/org2",
            link_facebook: "https://facebook.com/org2",
            link_instagram: "https://instagram.com/org2",
            link_discord: "",
            logo: "https://cdn.login.no/img/ads/adcompanyblue.png",
            city: "Trondheim",
            skill: "Programming"
        },
        // {id: 3, title_no: "Pentester"},
        // {id: 4, title_no: "Dokumentasjonsansvarlig"},
        // {id: 5, title_no: "SOC Trainee"},
        // {id: 6, title_no: "Docker ekspert", logo: "https://cdn.login.no/img/ads/adcompanyblue.png", banner_image: "https://cdn.login.no/img/ads/adbannerblue.png"},
        // {id: 7, title_no: "Etisk hacker", logo: "https://cdn.login.no/img/ads/adcompanyblue.png", banner_image: "https://cdn.login.no/img/ads/adbannerblue.png"},
        // {id: 8, title_no: "Spillutvikler"},
        // {id: 9, title_no: "Machine learning internship"},
        // {id: 10, title_no: "Machine learning summerinternship for 4-5th year student"},
    ])


    storeAds({events: ads, clickedEvents: clickedAds})

    //  --- LOADING INITIAL DATA ---
    useEffect(() => {
        //  Fetches API
        // getData(setAds, setRenderedArray, setLastSave, ads)
        setRenderedArray([...addata])
        if(addata.length > 0) (async() => {
            await AsyncStorage.setItem("cachedAds", JSON.stringify(addata))
        })
        //  Fetches clickedAds
        // fetchState(setClickedAds)
        // ads.length ? setRenderedArray([...ads]) : fetchStored(setRenderedArray, setAds, "ads")
    //  Renders when the screen is loaded
    }, [])

    // --- RESETS RENDERED EVENTS
    async function RenderAds() {

        // Updates the rendered array
        setRenderedArray([...ads])

        // Updates cache
        await AsyncStorage.setItem("cachedAds", JSON.stringify(ads))
    }

    // --- SETUP CODE ONCE APP IS DOWNLOADED---
    // Displays when the API was last fetched successfully
    if(lastSave === "") (async() => {setLastSave(await LastFetch())})()

    // Sets up initial notifications
    if(!notification["SETUP"]) notificationSetup()

    //  --- DISPLAYS THE EVENTSCREEN ---
    return(
    <View>
        <StatusBar style={theme === 0 || theme === 2 || theme === 3 ? "light" : "dark"} />
        <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
        {renderedArray != null ?
            renderedArray.length > 0 ?
            <FlatList
                style={{minHeight: "100%"}}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                keyExtractor={(ad) => `${ad.id}`}
                data={renderedArray}
                renderItem={({item: ad, index}) => (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("SpecificAdScreen", {item: ad})}>
                    {index === 0 && Space(Dimensions.get("window").height / 8.1)}
                        <AdListItem 
                            clickedAds={clickedAds}
                            ad={ad}
                            theme={theme}
                            lang={lang}
                            setClickedAds={setClickedAds}
                        />
                        <ListFooter
                            index={index}
                            renderedArray={renderedArray}
                            search={false}
                            relevantCategories={[]}
                            lastSave={lastSave}
                            lang={lang}
                            theme={theme}
                        />
                    </TouchableOpacity>
                </View>
                )}
            />
            :
            ads.length === 0 
                ? <ErrorMessage argument="wifi" theme={theme} lang={lang} />
                : <ErrorMessage argument="nomatch" theme={theme} lang={lang} />
        : <ErrorMessage argument="wifi" theme={theme} lang={lang} />}
        {Space(Dimensions.get("window").height/3)}
        </View>

        {/* ========================= DISPLAY TOP MENU ========================= */}
        {Platform.OS === "ios" ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor({theme, variable: "TRANSPARENTANDROID"})}}/>}
        <View style={{...MS.topMenu, backgroundColor: FetchColor({theme, variable: "TRANSPARENT"})}}>
        <TouchableOpacity style={MS.logoBackground} onPress={() => eventPage()}>
            <Image style={MS.tMenuIcon} source={theme === 0 || theme === 2 || theme === 3 ? require("@assets/logo/loginText.png") : require("@assets/logo/loginText-black.png")} />
        </TouchableOpacity>
        {
            lang ?
            <Text style={{
                ...MS.smallTitle,
                left: "-5%", 
                color: FetchColor({theme, variable: "TITLETEXTCOLOR"})
            }}>
                Jobbannonser
            </Text>
            :
            <Text style={{
                ...MS.filterScreenTitle, 
                left: "-5%", 
                color: FetchColor({theme, variable: "TITLETEXTCOLOR"})
            }}>
                Job listings
            </Text>
        }

        {renderedArray != null ?
            <View style={MS.multiTop}>
            {clickedAds.length > 0 ?
                <TouchableOpacity style={MS.touchableIcon} onPress={async () => 
                await handleDownload({setDownloadState, downloadState,
                clickedEvents: clickedAds, calendarID, dispatch})}>
                <Image 
                    style={MS.multiIcon}
                    source={theme === 0 || theme === 2 || theme === 3 
                        ? timeSinceDownload(downloadState) >= 1000 
                            ? require("@assets/icons/download.png")
                            : require("@assets/icons/download-orange.png") 
                        : require("@assets/icons/download-black.png")} />
                </TouchableOpacity>
            :null}
            </View>
        :null}

        </View>
    </View>
    )
}