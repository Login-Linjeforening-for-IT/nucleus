import { nativeApplicationVersion } from "expo-application"
import { Navigation, NotificationScreenProps, ScreenProps } from "@interfaces"
import Feedback from "@/components/menu/feedback"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import CS from "@styles/clusterStyles"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import en from "@text/menu/en.json"
import no from "@text/menu/no.json"
import T from "@styles/text"
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import LogoNavigation from "@/components/shared/logoNavigation"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import InternalScreen from "./internal"
import AboutScreen from "./about"
import BusinessScreen from "./business"
import LoginScreen from "./login"
import NotificationScreen from "./notifications"
import ReportScreen from "./report"
import SettingScreen from "./settings"
import SmallProfile from "@components/profile/smallProfile"
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import handleSwipe from "@/utils/handleSwipe"

type MenuItemProps = {
    index: number
    item: ItemProps
    navigation: Navigation
    setting: SettingProps[]
    feedback: boolean
    toggleFeedback: () => void
    login: boolean
}

type ItemProps = {
    id: number
    nav: string
    title: string
}

const MenuStack = createStackNavigator()

const screens: Record<string, React.FC<any>> = {
    "SettingScreen": SettingScreen,
    "NotificationScreen": NotificationScreen,
    "AboutScreen": AboutScreen,
    "BusinessScreen": BusinessScreen,
    "ReportScreen": ReportScreen,
    "LoginScreen": LoginScreen,
    "InternalScreen": InternalScreen
}


export default function MenuScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang  )
    const { login } = useSelector((state: ReduxState) => state.login )
    const { theme } = useSelector((state: ReduxState) => state.theme )
    const { id, name, image } = useSelector((state: ReduxState) => 
    state.profile )
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false
    const profile = { id: 0, name: "Eirik Hanasand", image}
    const text = lang ? no : en

    // --- SET THE COMPONENTS OF THE HEADER ---
    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                bottom: [],
                left: [LogoNavigation(navigation, isDark)],
                right: []
            }
        } as Partial<BottomTabNavigationOptions>)
    }, [navigation])

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    return (
        <MenuStack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}>
            <MenuStack.Screen 
                name="root">
                {({navigation})=> {
                    return(
                        <GestureHandlerRootView>
                        <PanGestureHandler
                            onGestureEvent={(event: PanGestureHandlerGestureEvent) => 
                                handleSwipe({navigation, event, screenLeft: "Ads"})}
                        >
                            <View style={{
                                ...GS.content, 
                                backgroundColor: FetchColor({theme, variable: "DARKER"})
                            }}>
                                {Space(Dimensions.get("window").height/9)}
                                {login ? SmallProfile({navigation, 
                                    profile, login}) : null}
                                <FlatList
                                    style={{minHeight: "100%"}}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={1}
                                    keyExtractor={(item) => `${item.id}`}
                                    data={text.setting}
                                    renderItem={({item, index}) => {
                                        if (item.nav === "LoginScreen" && login) return null
                                        if (item.nav === "InternalScreen" && !login) return null
                                        return (
                                            <MenuItem 
                                                index={index}
                                                item={item}
                                                navigation={navigation}
                                                setting={text.setting}
                                                feedback={feedback}
                                                toggleFeedback={toggleFeedback}
                                                login={login}
                                            />
                                        )
                                    }}
                                />
                                {Space(Dimensions.get("window").height / 10)}
                            </View>
                        </PanGestureHandler>
                        </GestureHandlerRootView>
                    )
                }}
            </MenuStack.Screen>
            {text.setting.map((item) => (
                    <MenuStack.Screen {...{key: item.title,
                        name: item.title,
                        initialParams: item,
                        component: screens[item.nav]
                    }} />
                )   
            )}
        </MenuStack.Navigator>
    )
}

function MenuItem({index, item, navigation, setting, feedback, 
toggleFeedback, login}: MenuItemProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const info = lang ? no : en

    return (
        <View>
            <TouchableOpacity onPress={() => item.id === 5 && login 
                ? navigation.navigate("InternalScreen", item) 
                : navigation.navigate(item.nav, item)}
            >
                <Cluster>
                    <View style={{...CS.clusterBack}}>
                        <View style={CS.twinLeft}>
                            <Text style={{
                                ...T.text20, 
                                color: FetchColor({theme, variable: 
                            "TEXTCOLOR"})}}>
                                    {item.title}
                            </Text>
                        </View>
                        <View style={CS.twinRight}>
                            <Image 
                                style={CS.arrowImage}
                                source={
                                    require("@assets/icons/dropdownBase.png")
                                }
                            />
                        </View>
                    </View>
                </Cluster>
            </TouchableOpacity>
            <View>
                {Space(10)}
                <Feedback
                    index={index}
                    setting={setting}
                    feedback={feedback}
                    toggleFeedback={toggleFeedback}
                />
            </View>
            {index === setting.length-1 
            ?   <Text style={{
                    ...T.contact, 
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {info.version}{nativeApplicationVersion}
                </Text>
            : null}
        </View>
    )
}
