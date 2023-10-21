import { ListFooter } from "@components/event/eventList"
import Space, { ErrorMessage } from "@/components/shared/utils"
import { useSelector } from "react-redux"
import { AdListItem } from "@/components/ads/adListItem"
import React, { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import FetchColor from "@styles/fetchTheme"
import { ScreenProps } from "@interfaces"
import GS from "@styles/globalStyles"
import { TouchableOpacity, Dimensions, FlatList, View } from "react-native"
import LogoNavigation from "@/components/shared/logoNavigation"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import SpecificAdScreen from "./specificAd"
import handleSwipe from "@/utils/handleSwipe"
import { 
    GestureHandlerRootView,
    PanGestureHandler,
     PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"

/**
 * Parent EventScreen function
 *
 * Handles:
 * - Displaying ads
 *
 * @param {navigation} Navigation Navigation route
 * @returns EventScreen
 */

const AdStack = createStackNavigator<AdStackParamList>();

export default function AdScreen({ navigation }: ScreenProps): JSX.Element {
    // Redux states
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [],
                left: [<LogoNavigation navigation={navigation} />],
                right: []
            }
        } as Partial<BottomTabNavigationOptions>)
    }, [navigation])

    //  --- DISPLAYS THE ADSCREEN ---
    return (
        <AdStack.Navigator
        screenOptions={{
            headerShown: false,
            animationEnabled: false
        }}
        >
            <AdStack.Screen name="root">
                {({navigation}) => (
                    <GestureHandlerRootView>
                        <PanGestureHandler
                            onGestureEvent={(event: PanGestureHandlerGestureEvent) => 
                                handleSwipe({navigation, event, screenLeft: "Events", 
                                screenRight: lang ? "Meny" : "Menu"})}
                        >
                            <View>
                            <StatusBar style={isDark ? "light" : "dark"} />
                            <View style={{
                                ...GS.content, 
                                backgroundColor: FetchColor({theme, variable: "DARKER"})
                            }}>
                            {renderedArray != null ?
                                renderedArray.length > 0 ?
                                <FlatList
                                    style={{minHeight: "100%"}}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={1}
                                    keyExtractor={(ad) => `${ad.id}`}
                                    data={renderedArray}
                                    renderItem={({item: ad, index}) => (
                                        <View key={index}>
                                            <TouchableOpacity onPress={() => 
                                                navigation.navigate("SpecificAdScreen", {item: ad})}>
                                            {index === 0 && <Space height={Dimensions.get("window").height / 8.1} />}
                                                <AdListItem 
                                                    clickedAds={clickedAds}
                                                    ad={ad}
                                                    setClickedAds={setClickedAds}
                                                />
                                                <ListFooter index={index} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                :
                                ads.length === 0 
                                    ? <ErrorMessage argument="wifi" />
                                    : <ErrorMessage argument="nomatch" />
                            : <ErrorMessage argument="wifi" />}
                            <Space height={Dimensions.get("window").height / 3}/>
                            </View>
                        </View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
                )}
            </AdStack.Screen>
            <AdStack.Screen name="SpecificAdScreen" component={SpecificAdScreen}></AdStack.Screen>
        </AdStack.Navigator>
    )
}
