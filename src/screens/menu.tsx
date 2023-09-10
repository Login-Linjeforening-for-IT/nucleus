import { nativeApplicationVersion } from "expo-application"
import { Navigation, ScreenProps } from "@interfaces"
import Feedback from "@shared/components/feedback"
import Cluster from "@shared/functions/cluster"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { CS } from "@styles/clusterStyles"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"

type MenuItemProps = {
    index: number
    item: ItemProps
    navigation: Navigation
    theme: number
    lang: boolean
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

export default function MenuScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { login } = useSelector( (state: ReduxState) => state.login )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const { id, name, image } = useSelector( (state: ReduxState) => state.profile )
    const profile = { id: 0, name: "Eirik Hanasand", image}

    const setting = [
        {id: 1, nav: "SettingScreen",   title: lang ? "Innstillinger" : "Settings" },
        // {id: 2, nav: "ReportScreen",   title: lang ? "Varsle" : "Report" },
        {id: 3, nav: "AboutScreen",     title: lang ? "Om oss" : "About Login"    },
        {id: 4, nav: "BusinessScreen",  title: lang ? "For bedrifter" : "For companies" },
        {id: 5, nav: "LoginScreen",     title: lang ? "Innsida (verv)" : "Intranet (verv)"},
    ]

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    return(
        <View>
            <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
                <FlatList
                style={{minHeight: "100%"}}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                keyExtractor={(item) => `${item.id}`}
                data={setting}
                renderItem={({item, index}) => (
                    <MenuItem 
                        index={index}
                        item={item}
                        navigation={navigation}
                        theme={theme}
                        lang={lang}
                        setting={setting}
                        feedback={feedback}
                        toggleFeedback={toggleFeedback}
                        login={login}
                    />
                    )}
                />
                {Space(Dimensions.get("window").height / 10)}
            </View>
            <TopMenu navigation={navigation} screen="menu" title={lang ? "Meny" : "Menu"}/>
        </View>
    )
}

function MenuItem({index, item, navigation, theme, lang, setting, feedback, 
toggleFeedback, login}: MenuItemProps) {

    return(
        <View>
            {index === 0 ? Space(Dimensions.get("window").height/8): null}
            {/* {index === 0 ? SmallProfile(navigation, theme, lang, profile, login) : null} */}
            <TouchableOpacity onPress={() => item.id === 5 && login 
                ? navigation.navigate("InternalScreen", item) 
                : navigation.navigate(item.nav, item)}
            >
                <Cluster>
                    <View style={{...CS.clusterBack}}>
                        <View style={CS.twinLeft}>
                            <Text style={{
                                ...T.text20, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
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
                {Space(10)}
                <Feedback
                    index={index}
                    setting={setting}
                    feedback={feedback}
                    theme={theme}
                    lang={lang}
                    toggleFeedback={toggleFeedback}
                />
            </View>
            {index === setting.length-1 
            ?   <Text style={{
                    ...T.contact, 
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {lang 
                        ? `Versjon ${nativeApplicationVersion}`
                        : `Version ${nativeApplicationVersion}`
                    }
                </Text>
            : null}
        </View>
    )
}