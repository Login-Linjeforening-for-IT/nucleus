import AS from "@styles/adStyles"
import BellIcon from "@components/shared/bellIcon"
import Cluster from "@/components/shared/cluster"
import React from "react"
import Space from "@/components/shared/utils"
import T from "@styles/text"
import { AdClusterLocation, AdClusterImage } from "@/components/ads/ad"
import { setAd, setClickedAds, toggleSearch } from "@redux/ad"
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { TouchableOpacity, Dimensions, Text, View } from "react-native"
import { Navigation } from "@interfaces"
import { LinearGradient } from "expo-linear-gradient"
import TopicManager from "@utils/topicManager"

type Ad = {
    ad: AdProps
    index: number
    embed?: boolean
}

export default function AdCluster({ad, index, embed}: Ad): JSX.Element {
    const { search, clickedAds } = useSelector((state: ReduxState) => state.ad)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const isOrange = clickedAds.some(ads => ads.id === ad.id) ? true : false
    const navigation: Navigation = useNavigation()
    const logo = ad.organization_logo ? ad.organization_logo : undefined
    const top = embed 
        ? ad.highlight ? -3 : 0
        : ad.highlight ? 0 : -5

    function isClicked() {
        for (const clickedAd of clickedAds) {
            if (ad.id === clickedAd.id) return true
        }
        return false
    }

    function handleClick() {
        dispatch(setClickedAds(clickedAds.some(ads => ads.id === ad.id)
        ? clickedAds.filter((x) => x.id !== ad.id)
        : [...clickedAds, ad]))
        TopicManager({topic: `${lang ? 'n' : 'e'}a${ad.id}`, unsub: isClicked() ? true : false})
    }

    return (
        <>
            <TouchableOpacity onPress={() => {
                search && dispatch(toggleSearch())
                dispatch(setAd(ad))
                navigation.navigate("SpecificAdScreen")
            }}>
                <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  colors={ad.highlight?['#FF512F', '#F09819', '#FF512F']:['#000000cc', '#000000cc']}
                  style={{borderRadius: 5, marginBottom: ad.highlight ? 4 : 0}}>
                <Cluster marginVertical={4} highlight={ad.highlight}>
                <View style={{...AS.adBack, top}}>
                        <View style={AS.adViewLeft}>
                            <AdClusterImage url={logo} />
                        </View>
                        <View style={AS.adViewMid}>
                            <AdClusterLocation ad={ad} />
                        </View>
                        <TouchableOpacity onPress={handleClick}>
                            <View style = {{left: -5, top: 3}}>
                                <BellIcon orange={isOrange} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Cluster>
                </LinearGradient>
            </TouchableOpacity>
            <ListFooter index={index} />
        </>
    )
}

/**
 * Displays the footer last fetch time item
 * @param index Index of each element, will only render for the last item of the
 * list
 */
export function ListFooter ({index}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { lastFetch, renderedAds, skills } = useSelector((state: ReduxState) => state.ad)

    return (
        <>
            {index === renderedAds.length - 1 && <Text style={{...T.contact, 
                color: theme.oppositeTextColor}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastFetch}.
                </Text>}
            {index === renderedAds.length - 1 && 
                <Space height={Dimensions.get("window").height / 7}/>}
            
        </>
    )
}
