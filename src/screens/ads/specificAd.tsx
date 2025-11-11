import { View, Dimensions } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useState, useEffect, JSX } from "react"
import Swipe from "@components/nav/swipe"
import AdInfo, {
    AdBanner,
    AdDescription,
    AdMedia,
    AdTitle,
    AdUpdateInfo
} from "@/components/ads/ad"
import { setAdName } from "@redux/ad"
import { fetchAdDetails } from "@utils/fetch"
import { AdScreenProps } from "@type/screenTypes"
import { AdContext } from "@utils/contextProvider"

export default function SpecificAdScreen({ route: { params: { adID } } }: AdScreenProps<'SpecificAdScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const [ad, setAd] = useState({} as GetJobProps)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const height = Dimensions.get("window").height

    useEffect(() => {
        const adName = lang ? ad.title_no || ad.title_en
            : ad.title_en || ad.title_no
        dispatch(setAdName(adName))
    }, [ad])


    useEffect(() => {
        getDetails()
    }, [adID])


    async function getDetails() {
        const response = await fetchAdDetails(adID)

        if (response) {
            setAd(response)
            return true
        }
    }

    // Handels the refresh of the page
    const onRefresh = useCallback(async () => {
        setRefresh(true)
        const details = await getDetails()

        if (details) {
            setRefresh(false)
        }
    }, [refresh])

    return (
        <AdContext.Provider value={ad}>
            <Swipe left="AdScreen">
                <View>
                    <View style={{
                        ...AS.content,
                        backgroundColor: theme.darker,
                        paddingTop: Dimensions.get("window").height / 9.7 + (height > 800 && height < 900 ? 15 : 0),
                        paddingBottom: Dimensions.get("window").height / 3
                    }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={100}
                            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                        >
                            <Cluster marginHorizontal={12} marginVertical={22}>
                                <AdBanner url={ad.banner_image} />
                                <AdTitle ad={ad} />
                                <AdInfo ad={ad} />
                                <AdDescription ad={ad} />
                                <AdMedia ad={ad} />
                                <AdUpdateInfo ad={ad} />
                            </Cluster>
                        </ScrollView>
                    </View>
                </View>
            </Swipe>
        </AdContext.Provider>
    )
}
