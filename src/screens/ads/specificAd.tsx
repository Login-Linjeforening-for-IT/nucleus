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
  
export default function SpecificAdScreen({navigation, route:{params: {adID}}}: AdScreenProps<'SpecificAdScreen'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { ad, history } = useSelector((state: ReduxState) => state.ad )
    const [refresh, setRefresh] = useState(false)

    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            let localHistory = [...history]
            localHistory.push(adID)
            dispatch(setHistory(localHistory))

            const onBackPress = () => {
                if (history.length > 1) {
                    dispatch(setHistory(history.slice(0, history.length-1)))
                }
                else{
                    dispatch(setHistory([]))
                    navigation.goBack()
                }
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
    }, [history])


    async function getDetails() {
        const response = await fetchAdDetails(history[history.length-1])

        if (response){
            dispatch(setAd(response))
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
        <Swipe left="AdScreen">
            <View>
                <View style={{
                    ...AS.content,
                    backgroundColor: theme.darker,
                    paddingTop: Dimensions.get("window").height / 9.7,
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
    )
}
