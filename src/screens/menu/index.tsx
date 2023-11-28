import { nativeApplicationVersion } from "expo-application"
import { Navigation } from "@interfaces"
import Feedback from "@/components/menu/feedback"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"

import CS from "@styles/clusterStyles"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import en from "@text/menu/en.json"
import no from "@text/menu/no.json"
import T from "@styles/text"
import LogoNavigation from "@/components/shared/logoNavigation"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import AboutScreen from "./about"
import BusinessScreen from "./business"
import NotificationScreen from "./notifications"
import InternalScreen from "./internal"
import LoginScreen from "./login"
import ProfileScreen from "./profile"
import ReportScreen from "./report"
import SettingScreen from "./settings"
import SmallProfile from "@components/profile/smallProfile"
import Header from "@components/nav/header"
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import Swipe from "@components/nav/swipe"

type MenuItemProps = {
    index: number
    item: ItemProps
    navigation: Navigation
    setting: SettingProps[]
    feedback: boolean
    toggleFeedback: () => void
    login: boolean
}

const MenuStack = createStackNavigator<MenuStackParamList>()

const screens: Record<string, React.FC<any>> = {
    "ProfileScreen": ProfileScreen,
    "SettingScreen": SettingScreen,
    "NotificationScreen": NotificationScreen,
    "AboutScreen": AboutScreen,
    "BusinessScreen": BusinessScreen,
    "ReportScreen": ReportScreen,
    "LoginScreen": LoginScreen,
    "InternalScreen": InternalScreen
}


export default function MenuScreen(): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang  )
    const { login } = useSelector((state: ReduxState) => state.login )
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme )
    const { id, name, image } = useSelector((state: ReduxState) => 
    state.profile )
    const profile = { id: 0, name: "Eirik Hanasand", image}
    const text: Setting = lang ? no as Setting : en as Setting

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    return (
        <MenuStack.Navigator
            screenOptions={{
                animationEnabled: false,
                headerTransparent: true,
                header: props => <Header {...props} />
            }}>
            <MenuStack.Screen name="MenuScreen">
                {({navigation})=> {
                    // --- SET THE COMPONENTS OF THE HEADER ---
                    useEffect(()=>{
                        navigation.setOptions({
                            headerComponents: {
                                left: [<LogoNavigation />],
                            }} as Partial<BottomTabNavigationOptions>)   
                        },[navigation])
                    return(
                        <Swipe left="AdScreenRoot">
                            <View style={{
                                ...GS.content, 
                                backgroundColor: theme.darker
                            }}>
                                <Space height={Dimensions.get("window").height / 9} /> 
                                {login ? SmallProfile({navigation, 
                                    profile, login}) : null}
                                <FlatList
                                    style={{minHeight: "100%"}}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={1}
                                    keyExtractor={(item) => `${item.id}`}
                                    data={text.setting}
                                    renderItem={({item, index}) => {
                                        if (item.nav === "ProfileScreen") return null
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
                                <Space height={Dimensions.get("window").height / 10} /> 
                            </View>
                        </Swipe>
                    )
                }}
            </MenuStack.Screen>
            {text.setting.map(item => {
                return(
                    <MenuStack.Screen 
                        name={item.nav as MenuRoutes}
                        component={screens[item.nav]}
                        key={item.id}
                    />
                )  
            })}
        </MenuStack.Navigator>
    )
}

function MenuItem({index, item, navigation, setting, feedback, 
toggleFeedback}: MenuItemProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const info = lang ? no : en

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}
            >
                <Cluster>
                    <View style={{...CS.clusterBack}}>
                        <View style={CS.twinLeft}>
                            <Text style={{...T.text20, color: theme.textColor}}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={CS.twinRight}>
                            <Image 
                                style={CS.arrowImage}
                                source={require("@assets/icons/dropdownBase.png")}
                            />
                        </View>
                    </View>
                </Cluster>
            </TouchableOpacity>
            <View>
                <Space height={10} /> 
                <Feedback
                    index={index}
                    setting={setting}
                    feedback={feedback}
                    toggleFeedback={toggleFeedback}
                />
            </View>
            {index === setting.length-1 
            ?   <Text style={{...T.contact, color: theme.oppositeTextColor}}>
                    {info.version}{nativeApplicationVersion}
                </Text>
            : null}
        </View>
    )
}
