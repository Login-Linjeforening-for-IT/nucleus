import AdList from "@components/ads/adList"
import DownloadButton from "@components/shared/downloadButton"
import GS from "@styles/globalStyles"
import Header from "@components/nav/header"
import LastFetch, { fetchAdDetails, fetchAds } from "@/utils/fetch"
import LogoNavigation from "@/components/shared/logoNavigation"
import NavigateFromPushNotification 
from "@/utils/navigateFromPushNotification"
import React, { useEffect, useState } from "react"
import SpecificAdScreen from "./specificAd"
import Swipe from "@components/nav/swipe"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { FilterButton, FilterUI } from "@components/shared/filter"
import { ScreenProps } from "@interfaces"
import { StatusBar } from "expo-status-bar"
import { setAds, setLastFetch, setLastSave } from "@redux/ad"
import { useFocusEffect } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { View } from "react-native"

const AdStack = createStackNavigator<AdStackParamList>()

/**
 * Parent AdScreen component
 *
 * Handles:
 * - Displaying ads
 * - Filtering ads
 * - Notification Management
 * - Ad notifications, both scheduling and cancelling
 *
 * @param {navigation} Navigation Navigation route
 * @returns AdScreen
 */
export default function AdScreen({ navigation }: ScreenProps): JSX.Element {
    // Push notification
    const [pushNotification, setPushNotification] = useState(false)
    const [pushNotificationContent, setPushNotificationContent] = 
        useState<JSX.Element | undefined>(undefined)
    
    // Redux states
    const { search, lastSave } = useSelector((state: ReduxState) => state.ad)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Navigates if the app is opened by a push notification
    NavigateFromPushNotification({navigation, theme,
        setPushNotification, setPushNotificationContent})

    // Fetches ads when screen is focused
    useFocusEffect(
        // Callback to avoid too many rerenders
        React.useCallback(() => {
            // Function to fetch clicked ads
            (async() => {
                const ads = await fetchAds()

                if (ads.length) {
                    dispatch(setAds(ads))
                    dispatch(setLastFetch(LastFetch()))
                }
            })()
        }, [])
    )

    // Loads initial data
    useEffect(() => {
        // IIFE to fetch API
        (async() => {
            const ads = await fetchAds()

            if (ads.length) {
                dispatch(setAds(ads))
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

    // --- DISPLAYS THE EVENTSCREEN ---
    return (
        <AdStack.Navigator screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props} />
        }}>
            <AdStack.Screen name="AdScreen">
                {({navigation}) => {
                    // --- SET THE COMPONENTS OF THE HEADER ---
                    useEffect(()=>{
                        navigation.setOptions({
                            headerComponents: {
                                bottom: [<FilterUI />],
                                left: [<LogoNavigation />],
                                right: [<FilterButton />, <DownloadButton screen="ad" />]
                            }} as Partial<BottomTabNavigationOptions>)   
                    },[navigation])

                    return (
                        <Swipe left="EventScreenRoot" right="MenuScreenRoot">
                            <View>
                                <StatusBar style={isDark ? "light" : "dark"} />
                                <View style={{
                                    ...GS.content,
                                    paddingHorizontal: 5,
                                    backgroundColor: theme.darker
                                }}>
                                    {pushNotification && pushNotificationContent}
                                    <AdList />
                                </View>
                            </View>
                        </Swipe>
                    )}}
            </AdStack.Screen>
            <AdStack.Screen 
                name="SpecificAdScreen"
                component={SpecificAdScreen}
            />
        </AdStack.Navigator>
    )
}
