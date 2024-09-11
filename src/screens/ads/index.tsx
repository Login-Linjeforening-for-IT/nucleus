import AdList from "@components/ads/adList"
import DownloadButton from "@components/shared/downloadButton"
import GS from "@styles/globalStyles"
import LastFetch, { fetchAds } from "@/utils/fetch"
import LogoNavigation from "@/components/shared/logoNavigation"
import React, { useEffect, useState } from "react"
import Swipe from "@components/nav/swipe"
import { FilterButton, FilterUI } from "@components/shared/filter"
import { StatusBar } from "expo-status-bar"
import { setAds, setLastFetch, setLastSave } from "@redux/ad"
import { useFocusEffect } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { View } from "react-native"
import { AdScreenProps } from "@type/screenTypes"

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
export default function AdScreen({ navigation }: AdScreenProps<'AdScreen'>): JSX.Element {
    // Push notification
    const [pushNotification, setPushNotification] = useState(false)
    const [pushNotificationContent, setPushNotificationContent] = 
        useState<JSX.Element | undefined>(undefined)
    
    // Redux states
    const { search, lastSave, skills } = useSelector((state: ReduxState) => state.ad)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const ads = useSelector((state: ReduxState) => state.ad.ads)
    const dispatch = useDispatch()

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

    // Fetches API and updates cache every 10 seconds
    useEffect(() => {
        let interval: Interval = 0

        // Only when filter is closed to prevent "no match" issue
        if (!search) {
            interval = setInterval(() => {
                // Storing the current time
                (async() => {
                    const ads = await fetchAds()

                    if (ads.length) {
                        dispatch(setAds(ads))
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

    useEffect(() => {
        // --- SETUP CODE ONCE APP IS DOWNLOADED---
        // Displays when the API was last fetched successfully
        if (lastSave === "") {(async() => {dispatch(setLastSave(LastFetch()))})()
    }
    }, [lastSave])

    // Sets the component of the header
    useEffect(()=>{
        const right = ads.length ? [skills.length ? <FilterButton /> : null, <DownloadButton screen="ad" />] : []
        navigation.setOptions({
            headerComponents: {
                bottom: [<FilterUI />],
                left: [<LogoNavigation />],
                right
            }} as any)   
    },[navigation])

    // --- DISPLAYS THE EVENTSCREEN ---
    return (
        <Swipe left="EventNav" right="MenuNav">
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
    )
            
}
