import notificationSetup from "@/utils/notificationSetup"
import LastFetch, { fetchState, timeSince } from "@/utils/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ListFooter } from "@components/event/eventList"
import Space, { ErrorMessage } from "@/components/shared/utils"
import handleDownload from "@/utils/calendar"
import storeAds from "@/utils/storeEvents"
import { useFocusEffect } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { AdListItem } from "@/components/ads/adListItem"
import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import { ScreenProps } from "@interfaces"
import GS from "@styles/globalStyles"
import en from "@text/ads/en.json"
import { TouchableOpacity, Dimensions, FlatList, View } from "react-native"
import LogoNavigation from "@/components/shared/logoNavigation"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificAdScreen from "./specificAd"

/**
 * Parent EventScreen function
 *
 * Handles:
 * - Displaying ads
 *
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */

const AdStack = createStackNavigator<AdStackParamList>();

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
    const notification =   useSelector( (state: ReduxState) => state.notification)
    const { lang  } =      useSelector( (state: ReduxState) => state.lang)
    const { login } =      useSelector( (state: ReduxState) => state.login)
    const { theme } =      useSelector( (state: ReduxState) => state.theme)
    const { calendarID } = useSelector( (state: ReduxState) => state.misc)
    const dispatch = useDispatch()
    function eventPage () {navigation.navigate("EventScreen")}
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [],
                left: [LogoNavigation(navigation, isDark)],
                right: []
            }
        } as Partial<BottomTabNavigationOptions>)
    }, [navigation])


    //  --- FETCHES CLICKED EVENTS WHEN SCREEN BECOMES VISIBLE ---
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked ads
            fetchState(setClickedAds)
        }, [])
    )

    const addata = en.test


    storeAds({events: ads, clickedEvents: clickedAds})

    //  --- LOADING INITIAL DATA ---
    useEffect(() => {
        //  Fetches API
        // getData(setAds, setRenderedArray, setLastSave, ads)
        setRenderedArray([...addata])
        if (addata.length > 0) (async() => {
            await AsyncStorage.setItem("cachedAds", JSON.stringify(addata))
        })
        // Fetches clickedAds
        // fetchState(setClickedAds)
        // ads.length 
        //     ? setRenderedArray([...ads]) 
        //     : fetchStored(setRenderedArray, setAds, "ads")
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
    if (lastSave === "") (async() => {setLastSave(await LastFetch())})()

    //  --- DISPLAYS THE EVENTSCREEN ---
    return (
        <AdStack.Navigator
        screenOptions={{
            headerShown: false,
            animationEnabled: false
        }}
        >
            <AdStack.Screen
            name="root"
            >
                {({navigation})=>{return(
                    <View>
                    <StatusBar style={isDark ? "light" : "dark"} />
                    <View style={{
                        ...GS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                    }}>
                    {renderedArray != null ?
                        renderedArray.length > 0 ?
                        <FlatList
                            style={{minHeight: "100%"}}
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            keyExtractor={(ad) => `${ad.id}`}
                            data={renderedArray}
                            renderItem={({item: ad, index}) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => 
                                        navigation.navigate("SpecificAdScreen", {item: ad})}>
                                    {index === 0 && Space(Dimensions.get("window").height / 8.1)}
                                        <AdListItem 
                                            clickedAds={clickedAds}
                                            ad={ad}
                                            setClickedAds={setClickedAds}
                                        />
                                        <ListFooter
                                            index={index}
                                            renderedArray={renderedArray}
                                            search={false}
                                            relevantCategories={[]}
                                            lastSave={lastSave}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        :
                        ads.length === 0 
                            ? <ErrorMessage argument="wifi" />
                            : <ErrorMessage argument="nomatch" />
                    : <ErrorMessage argument="wifi" />}
                    {Space(Dimensions.get("window").height/3)}
                    </View>
                </View>
                )}}
            </AdStack.Screen>
            <AdStack.Screen name="SpecificAdScreen" component={SpecificAdScreen}></AdStack.Screen>
        </AdStack.Navigator>
    )
}
