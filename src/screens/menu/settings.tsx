import { Text, View, Dimensions, Platform } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Notification from "@/components/settings/notification"
import ThemeSwitch from "@/components/settings/themeSwitch"
import Reminders from "@/components/settings/reminders"
import Language from "@/components/settings/language"
import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import en from "@text/menu/settings/en.json"
import no from "@text/menu/settings/no.json"
import T from "@styles/text"
import Swipe from "@components/nav/swipe"
import { JSX } from 'react'

type ClusterWithSwitchProps = {
    obj: infoProps
    category: string
}

type infoProps = {
    title: string
    description?: string 
}

export default function SettingScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{...GS.content, backgroundColor: theme.darker}}>
                    <Content />
                </View>
            </View>
        </Swipe>
    )
}

function Content(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const info = lang ? no.info : en.info
    const height = Dimensions.get("window").height
    const extraHeight = Platform.OS === 'ios' ? 0 : height > 800 && height < 900 ? 20 : 10

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Space height={Dimensions.get("window").height / 8.1 + extraHeight} /> 
            <Cluster marginHorizontal={0}>
                <View style={GS.notificationBack}>
                    <View style={GS.view}>
                        <Text style={{
                            ...GS.notificationText, 
                            color: theme.textColor
                        }}>
                            {info[0].title}
                        </Text>
                        <Text style={{
                            ...GS.notificationTip, 
                            color: theme.oppositeTextColor
                        }}>
                            {info[0].description}
                        </Text>
                    </View>
                    <View style={GS.view2}><ThemeSwitch/></View>
                </View>
            </Cluster>

            <Cluster>
                <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{...GS.notificationText, color: theme.textColor}}>
                            {info[1].title}
                        </Text>
                    <Text style={{
                        ...GS.notificationTip, 
                        color: theme.oppositeTextColor
                    }}>
                        {info[1].description}
                    </Text>
                </View>
                    <Language/>
                </View>
            </Cluster>

            <Space height={10} />
            <Text style={{...T.text30, color: theme.oppositeTextColor}}>
                    {info[2].title}
            </Text>
            <Space height={10} />
            <SwitchCluster obj={info[3]} category="IMPORTANT" />
            <Space height={10} />
            <Text style={{...T.text25, color: theme.oppositeTextColor}}>
                {info[4].title}
            </Text>
            <Space height={10} />
            <SwitchCluster obj={info[5]}  category="BEDPRES" />
            <SwitchCluster obj={info[6]}  category="TEKKOM" />
            <SwitchCluster obj={info[7]}  category="CTF" />
            <SwitchCluster obj={info[8]}  category="SOCIAL" />
            <SwitchCluster obj={info[9]}  category="KARRIEREDAG" />
            <SwitchCluster obj={info[10]} category="FADDERUKA" />
            <SwitchCluster obj={info[11]} category="LOGIN" />
            <SwitchCluster obj={info[12]} category="ANNET" />

            <Space height={10} />
            <Text style={{...T.text25,color: theme.oppositeTextColor}}>
                {info[13].title}
            </Text>
            <Space height={10} />
            <Reminders/>
            <Space height={Dimensions.get("window").height / (Platform.OS === 'ios' ? 6 : 7)} />
        </ScrollView>
    )
}

function SwitchCluster({obj, category}: ClusterWithSwitchProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Cluster>
            <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{
                        ...GS.notificationText, 
                        color: theme.textColor
                    }}>
                        {obj.title}
                    </Text>
                    <Text style={{
                        ...GS.notificationTip, 
                        color: theme.oppositeTextColor
                    }}>
                        {obj.description}
                    </Text>
                </View>
                <Notification category={category}/>
            </View>
            <Space height={5} />
        </Cluster>
    )
}
