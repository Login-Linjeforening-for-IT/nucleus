import { ScrollView } from "react-native"
import { useSelector } from "react-redux"
import AdCluster from "./adCluster"
import { ErrorMessage } from "@components/shared/utils"
import Space from "@/components/shared/utils"
import { Dimensions, Platform } from "react-native"

/**
 * Displays the ad list
 */
export default function AdList (): JSX.Element {
    const { ads, search, renderedAds } = useSelector((state: ReduxState) => state.ad)
    const { skills } = useSelector((state: ReduxState) => state.ad)

    // Copies renderedEvents because it's read only
    let adList: AdProps[] = [...renderedAds]
    adList.sort((a, b)=>(Number(b.highlight)-Number(a.highlight)))

    if (!renderedAds.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedAds.length > 0) {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {search === false
                    ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8 : 7.5)} />
                    : <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 4.2 : 3.1)} />
                }
                {adList.map((ad, index) => <AdCluster index={index} ad={ad} key={index} />)}
            </ScrollView>
        )
    } else {
        return <ErrorMessage argument={!ads.length ? "wifi" : "nomatch"} />
    }
}