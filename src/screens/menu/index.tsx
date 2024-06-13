import { nativeApplicationVersion } from "expo-application"
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
import Text from "@components/shared/text"
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import Swipe from "@components/nav/swipe"
import { ItemProps, MenuProps, MenuStackParamList } from "@type/screenTypes"
import { NavigationProp } from "@react-navigation/native"
import NotificationIcon from "@components/notification/notificationIcon"

type MenuItemProps = {
    index: number
    item: ItemProps
    navigation: NavigationProp<MenuStackParamList,'MenuScreen'>
    setting: SettingProps[]
    feedback: boolean
    toggleFeedback: () => void
    login: boolean
}


export default function MenuScreen({ navigation }: MenuProps<'MenuScreen'>): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang  )
    const { login } = useSelector((state: ReduxState) => state.login )
    const { theme } = useSelector((state: ReduxState) => state.theme )
    const { id, name, image } = useSelector((state: ReduxState) => 
    state.profile )
    const profile = { id, name, image}
    const text: Setting = lang ? no as Setting : en as Setting

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    useEffect(()=>{
        navigation.setOptions({
            headerComponents: {
                left: [<LogoNavigation />],
            }} as any)   
        },[navigation])

    return (
        <Swipe left="AdNav">
            <View style={{
                ...GS.content, 
                backgroundColor: theme.darker
            }}>
                <Space height={Dimensions.get("window").height / 8} />
                {/* <SmallProfile navigation={navigation} profile={profile} login={login} /> */}
                {text.setting.map((item, index) => {
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
                            key={index}
                        />
                    )
                })}
                <Space height={Dimensions.get("window").height / 10} /> 
            </View>
        </Swipe>
    )
}

function MenuItem({index, item, navigation, setting, feedback, 
toggleFeedback}: MenuItemProps) {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const info = lang ? no : en
    const version = `${info.version}${nativeApplicationVersion}`

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav)}
            >
                <Cluster>
                    <View style={{...CS.clusterBack}}>
                        <View style={CS.twinLeft}>
                            {item.nav === "NotificationScreen" && <NotificationIcon position="left" />}
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
                    {version}
                </Text>
            : null}
        </View>
    )
}
