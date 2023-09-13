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
import en from "@text/en/menu.json"
import no from "@text/no/menu.json"
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
    const { id, name, image } = useSelector( (state: ReduxState) => 
    state.profile )
    const profile = { id: 0, name: "Eirik Hanasand", image}
    const text = lang ? no : en

    // Feedback options visibility boolean
    const [feedback, setFeedback] = useState(false)

    // --- UPDATES FEEDBACK STATE ---
    function toggleFeedback() {
        setFeedback(prevFeedback => !prevFeedback)
    }

    return (
        <View>
            <View style={{
                ...GS.content, 
                backgroundColor: FetchColor({theme, variable: "DARKER"})
            }}>
                <FlatList
                style={{minHeight: "100%"}}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                keyExtractor={(item) => `${item.id}`}
                data={text.setting}
                renderItem={({item, index}) => (
                    <MenuItem 
                        index={index}
                        item={item}
                        navigation={navigation}
                        theme={theme}
                        lang={lang}
                        setting={text.setting}
                        feedback={feedback}
                        toggleFeedback={toggleFeedback}
                        login={login}
                    />
                    )}
                />
                {Space(Dimensions.get("window").height / 10)}
            </View>
            <TopMenu 
                navigation={navigation} 
                screen={text.nav}
                title={text.screen}
            />
        </View>
    )
}

function MenuItem({index, item, navigation, theme, lang, setting, feedback, 
toggleFeedback, login}: MenuItemProps) {
    const info = lang ? no : en

    return (
        <View>
            {index === 0 ? Space(Dimensions.get("window").height/8): null}
            {/* {index === 0 ? SmallProfile(navigation, theme, lang, 
                profile, login) : null} */}
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
                    {info.version}{nativeApplicationVersion}
                </Text>
            : null}
        </View>
    )
}