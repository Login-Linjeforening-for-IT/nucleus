import { View, Dimensions, BackHandler } from "react-native"
import { RefreshControl, ScrollView } from "react-native-gesture-handler"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import { useDispatch, useSelector } from "react-redux"
import React, { useCallback, useState, useEffect } from "react"
import Swipe from "@components/nav/swipe"
import AdInfo, { 
    AdBanner,
    AdDescription,
    AdMedia,
    AdTitle,
    AdUpdateInfo
} from "@/components/ads/ad"
import { setAd, setHistory } from "@redux/ad"
import { fetchAdDetails } from "@utils/fetch"
import { AdScreenProps } from "@type/screenTypes"
import { useFocusEffect } from "@react-navigation/core"
import { AdContext } from "@utils/contextProvider"
  
export default function SpecificAdScreen({navigation, route:{params: {adID}}}: AdScreenProps<'SpecificAdScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const [ad, setAd] = useState({} as DetailedAdResponse)
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const height = Dimensions.get("window").height

    navigation.setOptions({title: lang ? ad?.job?.title_no || ad?.job?.title_en 
        : ad?.job?.title_en || ad?.job?.title_no})

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.goBack()
                return true
            }
    
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            )
    
            return () => subscription.remove()
        }, [])
    )

    useEffect(() => {
        getDetails()
    }, [adID])


    async function getDetails() {
        const response = await fetchAdDetails(adID)

        if (response){
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
                                <AdBanner url={ad?.job?.banner_image} />
                                <AdTitle ad={ad} />
                                <AdInfo ad={ad?.job} />
                                <AdDescription ad={ad?.job} />
                                <AdMedia ad={ad} />
                                <AdUpdateInfo ad={ad?.job} />
                            </Cluster>
                        </ScrollView>
                    </View>
                </View>
            </Swipe>
        </AdContext.Provider>
    )
}
