import { AdClusterLocation, AdClusterImage } from "@/components/ads/ad"
import BellIcon from "@components/event/bellIcon"
import { TouchableOpacity, View} from "react-native"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import React from "react"

type AdListItemProps = {
    clickedAds: AdProps[]
    ad: AdProps
    setClickedAds: React.Dispatch<React.SetStateAction<any[]>>
}

export function AdListItem({clickedAds, ad, setClickedAds}: 
AdListItemProps): JSX.Element {
    const isOrange = clickedAds.some(ads => ads.id === ad.id) ? true : false

    return (
        <Cluster marginVertical={4}>
            <View style={AS.adBack}>
                <View style={AS.adViewLeft}>
                    <AdClusterImage url={ad.logo} />
                </View>
                <View style={AS.adViewMid}>
                    <AdClusterLocation ad={ad} />
                </View>
                <View style={AS.adViewRight}>
                    <TouchableOpacity onPress={() => {
                        setClickedAds(clickedAds.some(ads => ads.id === ad.id)
                            ? clickedAds.filter((x) => x.id !== ad.id)
                            : [...clickedAds, ad])
                    }}>
                        <View style = {AS.bellPosition}>
                            <BellIcon orange={isOrange} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Cluster>
    )
}
