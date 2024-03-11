import { View, ScrollView, Dimensions } from "react-native"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import Swipe from "@components/nav/swipe"
import AdInfo, { 
    AdBanner,
    AdDescription,
    AdMedia,
    AdTitle,
    AdUpdateInfo
} from "@/components/ads/ad"
import { setAd } from "@redux/ad"
import { fetchAdDetails } from "@utils/fetch"
import { StackScreenProps } from "@react-navigation/stack"
  
export default function SpecificAdScreen({navigation, route:{params}}: StackScreenProps<AdStackParamList>): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { ad } = useSelector((state: ReduxState) => state.ad )

    const dispatch = useDispatch()

    navigation.addListener('beforeRemove', (e) => {
        dispatch(setAd(undefined))
    })

    async function getDetails() {
        if (!params) return
        const response = await fetchAdDetails(params.adID)

        if (response) dispatch(setAd(response))
    }

    useEffect(() => {
        if(ad==undefined){
            console.log("fetching event details")
            getDetails()
        }
    }, [params])

    return (
        <Swipe left="AdScreen">
            <View>
                <View style={{
                    ...AS.content,
                    backgroundColor: theme.darker,
                    paddingTop: Dimensions.get("window").height / 9.7,
                    paddingBottom: Dimensions.get("window").height / 3
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Cluster marginHorizontal={12} marginVertical={12}>
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
