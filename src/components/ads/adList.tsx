import { ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import AdCluster from "./adCluster"
import { ErrorMessage } from "@components/shared/utils"
import Space from "@/components/shared/utils"
import { Dimensions, Platform } from "react-native"
import Refresh from "@components/event/refresh"
import { useState } from "react"
import handleRefresh from "@utils/handleRefresh"
import LastFetch, { fetchAdDetails, fetchAds } from "@utils/fetch"
import { setAds, setLastFetch } from "@redux/ad"

/**
 * Displays the ad list
 */
export default function AdList (): JSX.Element {
    const { ads, search, renderedAds } = useSelector((state: ReduxState) => state.ad)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    
    async function getDetails() {
        const ads = await fetchAds()
    
        if (ads.length) {
            const detailedAdPromises = ads.map(async(ad) => {
                const details = await fetchAdDetails(ad)
                return details
            })
    
            const detailedAds = await Promise.all(detailedAdPromises)
    
            dispatch(setAds(detailedAds))
            dispatch(setLastFetch(LastFetch()))
            return true
        }
    }

    // Copies renderedEvents because it's read only
    let adList: AdProps[] = [...renderedAds]
    adList.sort((a, b)=>(Number(b.highlight)-Number(a.highlight)))

    if (!renderedAds.length && !search) {
        return <ErrorMessage argument="wifi" />
    } 
    
    if (renderedAds.length > 0) {
        return (
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                onScroll={(event) => handleRefresh({event, setRefresh, getDetails})} 
                scrollEventThrottle={100}
            >
                <Space height={Dimensions.get("window").height / (search 
                    ? (Platform.OS === "ios" ? 8.2 : 7.8) 
                    : (Platform.OS === "ios" ? 3.85 : 3.1)
                )} />
                <Refresh display={refresh}/>
                {adList.map((ad, index) => <AdCluster index={index} ad={ad} key={index} />)}
            </ScrollView>
        )
    } 
    
    return <ErrorMessage argument={!ads.length ? "wifi" : "nomatch"} />
}