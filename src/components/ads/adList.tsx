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

    let adList: AdProps[] = [...renderedAds] // Copies renderedEvents because it's read only
    adList.sort((a, b)=>(Number(b.highlight)-Number(a.highlight)))

    if (!renderedAds.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedAds.length > 0) {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {search === false
                    ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                    : <Space height={Platform.OS === "ios" 
                        ? Dimensions.get("window").height / (skills.length / 33)
                        : Dimensions.get("window").height / (skills.length / 33)} />
                }
                {adList.map((ad, index) => <AdCluster index={index} ad={ad} key={index} />)}
            </ScrollView>
        )
    } else {
        return <ErrorMessage argument={!ads.length ? "wifi" : "nomatch"} />
    }
}