import { View, ScrollView, Dimensions } from "react-native"
import { SpecificAdScreenProps } from "@interfaces"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React from "react"
import AdInfo, { 
    AdBanner, 
    AdTitle, 
    AdDescription, 
    AdUpdateInfo, 
    AdMedia 
} from "@/components/ads/ad"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { 
    GestureHandlerRootView, 
    PanGestureHandler, 
    PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"
import handleSwipe from "@/utils/handleSwipe"
  
export default function SpecificAdScreen({ route, navigation }: BottomTabScreenProps<AdStackParamList, 'SpecificAdScreen'>): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { item } = route.params

    return (
        <GestureHandlerRootView>
            <PanGestureHandler
                onGestureEvent={(event: PanGestureHandlerGestureEvent) =>
                    handleSwipe({navigation, event, screenLeft: "root"})}
            >
                <View>
                    <View style={{
                        ...GS.content,
                        backgroundColor: FetchColor({theme, variable: "BACKGROUND"})
                    }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {Space(Dimensions.get("window").height/8.1)}
                            <Cluster>
                                <AdBanner url={item.banner_image} />
                                {Space(10)}
                                <AdTitle ad={item} />
                                {Space(10)}
                                <AdInfo props={item} />
                                {Space(10)}
                                <AdDescription ad={item} />
                                {Space(10)}
                                <AdMedia ad={item} />
                                <AdUpdateInfo ad={item} />
                                {Space(10)}
                            </Cluster>
                            {Space(Dimensions.get("window").height / 3)}
                        </ScrollView>
                    </View>
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}
