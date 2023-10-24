import { View, ScrollView, Dimensions } from "react-native"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import Swipe from "@components/nav/swipe"
import AdInfo, { 
    AdBanner, 
    AdTitle, 
    AdDescription, 
    AdUpdateInfo, 
    AdMedia 
} from "@/components/ads/ad"
  
export default function SpecificAdScreen({ route, navigation }: BottomTabScreenProps<AdStackParamList, 'SpecificAdScreen'>): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { item } = route.params

    return (
        <Swipe left="AdScreen">
                <View>
                    <View style={{
                        ...GS.content,
                        backgroundColor: FetchColor({theme, variable: "BACKGROUND"}),
                        paddingTop: Dimensions.get("window").height/8.1,
                        paddingBottom: Dimensions.get("window").height / 3
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Cluster marginHorizontal={12} marginVertical={12}>
                                <AdBanner url={item.banner_image} />
                                <AdTitle ad={item} />
                                <AdInfo props={item} />
                                <AdDescription ad={item} />
                                <AdMedia ad={item} />
                                <AdUpdateInfo ad={item} />
                            </Cluster>
                        </ScrollView>
                    </View>
                </View>
        </Swipe>
    )
}
