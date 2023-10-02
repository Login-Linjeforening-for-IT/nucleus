import notificationArray from "@/utils/notificationArray"
import { AdClusterLocation, AdClusterImage } from "@/components/ads/ad"
import topic from "@/utils/topic"
import BellIcon from "@/components/events/bellIcon"
import { TouchableOpacity, View} from "react-native"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import React from "react"

type AdListItemProps = {
    clickedAds: AdProps[]
    ad: AdProps
    theme: number
    lang: boolean
    setClickedAds: React.Dispatch<React.SetStateAction<any[]>>
}

export function AdListItem({clickedAds, ad, theme, lang, setClickedAds}: 
AdListItemProps): JSX.Element {

    const isOrange = clickedAds.some(ads => ads.id === ad.id) ? true : false

    return (
        <Cluster marginVertical={4}>
            <View style={AS.adBack}>
                <View style={AS.adViewLeft}>
                    <AdClusterImage url={ad.logo} />
                </View>
                <View style={AS.adViewMid}>
                    <AdClusterLocation ad={ad} theme={theme} />
                </View>
                <View style={AS.adViewRight}>
                    <TouchableOpacity onPress={() => {
                        // Doesnt work as we have not made categories for 
                        // advertisements yet.
                        // topic({topicID: ad.id, lang, status: 0, category: 
                        // (ad.category).toLowerCase(),
                        //     catArray: notificationArray(ad.category)})
                        setClickedAds(clickedAds.some(ads => ads.id === ad.id)
                            ? clickedAds.filter((x) => x.id !== ad.id)
                            : [...clickedAds, ad])
                    }}>
                        <View style = {AS.bellPosition}>
                            <BellIcon orange={isOrange} theme={theme} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Cluster>
    )
}
