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
import { TouchableOpacity, Dimensions, Text, View, Platform } from "react-native"
import { Navigation } from "@interfaces"

type Ad = {
    ad: AdProps
    index: number
}

export default function AdCluster({ad, index}: Ad): JSX.Element {
    const { search, clickedAds, skills } = useSelector((state: ReduxState) => state.ad)
    const dispatch = useDispatch()
    const isOrange = clickedAds.some(ads => ads.id === ad.id) ? true : false
    const navigation: Navigation = useNavigation()
    const logo = ad.organization_logo ? ad.organization_logo : undefined

    function handleClick() {
        dispatch(setClickedAds(clickedAds.some(ads => ads.id === ad.id)
        ? clickedAds.filter((x) => x.id !== ad.id)
        : [...clickedAds, ad]))
    }

    return (
        <>
            <TouchableOpacity onPress={() => {
                search && dispatch(toggleSearch())
                dispatch(setAd(ad))
                navigation.navigate("SpecificAdScreen")
            }}>
                {index === 0
                    ? search === false
                        ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                        : <Space height={Platform.OS === "ios" 
                            ? Dimensions.get("window").height / (skills.length / 23.2)
                            : Dimensions.get("window").height / (skills.length / 23.2)} />
                    : null}
                <Cluster marginVertical={4}>
                    <View style={AS.adBack}>
                        <View style={AS.adViewLeft}>
                            <AdClusterImage url={logo} />
                        </View>
                        <View style={AS.adViewMid}>
                            <AdClusterLocation ad={ad} />
                        </View>
                        <View style={AS.adViewRight}>
                            <TouchableOpacity onPress={handleClick}>
                                <View style = {AS.bellPosition}>
                                    <BellIcon orange={isOrange} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Cluster>
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
                <Space height={Dimensions.get("window").height / 3 + 20}/>}
            
        </>
    )
}
