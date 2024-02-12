import { View, ScrollView, Dimensions } from "react-native"
import Cluster from "@/components/shared/cluster"
import AS from "@styles/adStyles"
import { useSelector } from "react-redux"
import React from "react"
import Swipe from "@components/nav/swipe"
import AdInfo, { 
    AdBanner,
    AdDescription,
    AdMedia,
    AdTitle,
    AdUpdateInfo
} from "@/components/ads/ad"
  
export default function SpecificAdScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { ad } = useSelector((state: ReduxState) => state.ad )

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
    )
}
