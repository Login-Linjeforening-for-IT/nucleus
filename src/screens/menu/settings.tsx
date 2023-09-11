import { Text, View, ScrollView, Dimensions } from "react-native"
import Notification from "@shared/functions/notification"
import ThemeSwitch from "@shared/functions/themeSwitch"
import Reminders from "@shared/functions/reminders"
import Language from "@shared/functions/language"
import Cluster from "@shared/functions/cluster"
import Space from "@shared/components/utils"
import FetchColor from "@styles/fetchTheme"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import TopMenu from "@shared/topMenu"
import { ScreenProps } from "@interfaces"
import { T } from "@styles/text"
import React from "react"

type ClusterWithSwitchProps = {
    theme: number
    obj: infoProps
    category: string
}

type infoProps = {
    title: string
    description?: string 
}

export default function SettingScreen( { navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )

    const infoNO = [
        { 
            title: "Tema",
            description: "Endrer appens fargetema."
        },
        { 
            title: "Språk",
            description: "Endrer språk."
        },
        {  
            title: "Varslinger"
        },
        {
            title: "Viktig informasjon",
            description: "Motta varsel om viktig informasjon, som tid for årsmøte etc.",
        },
        {
            title: "Nye arrangementer"
        },
        {
            title: "Bedpres",
            description: "Varsel hver gang det legges ut ny bedriftpresentasjon.",
        },
        {
            title: "TekKom",
            description: "Varsel hver gang det legges ut en TekKom samling.",
        },
        { 
            title: "CTF",
            description: "Varsel hver gang det legges ut en CTF."
        },
        {
            title: "Sosialt",
            description: "Varsel hver gang det legges ut et EvntKom arrangement.",
        },
        {
            title: "Karrieredag",
            description: "Varsel hver gang det legges ut en karrieredag.",
        },
        {
            title: "Fadderuka",
            description: "Varsel hver gang det legges ut et fadderuka arrangement.",
        },
        {
            title: "Login",
            description: "Varsel hver gang det legges ut et arrangement angående foreningens drift.",
        },
        {
            title: "Annet",
            description: "Varsel hver gang det legges ut et ukategorisert arrangement.",
        },
        { 
            title: "Påminnelser"
        },
    ]

    const infoEN = [
        {
            id: 0, 
            title: "Theme",
            description: "Changes the color theme of the app."
        },
        {
            id: 1,
            title: "Language",
            description: "Changes language."
        },
        {
            id: 2,
            title: "Notifications"
        },
        {
            id: 3,
            title: "Important info",
            description: "Recieve notifications about important information, such as annual meetings."
        },
        {
            id: 4,
            title: "New events",
        },
        {
            id: 5,
            title: "Company Presentations",
            description: "Notification every time a company presentation is posted."
        },
        {
            id: 6,
            title: "TekKom",
            description: "Notification every time a TekKom gathering is posted."},
        {
            id: 7,
            title: "CTF",
            description: "Notification every time a CTF is posted."
        },
        {
            id: 8,
            title: "Social",
            description: "Notification every time a EvntKom event is posted."
        },
        {
            id: 9,
            title: "Career day",
            description: "Notification every time a career day is posted."
        },
        {
            id: 10,
            title: "Fadderuka",
            description: "Notification every time a fadderuka event is posted."
        },
        {
            id: 11,
            title: "Login",
            description: "Notification every time a event is posted regarding the operation of Login."
        },
        {
            id: 12,
            title: "Other",
            description: "Notification every time an uncategorized event is posted."
        },
        {
            id: 13,
            title: "Reminders",
        },
    ]

    const info = lang ? infoNO : infoEN

    return (
        <View>
            <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Space(Dimensions.get("window").height/8.1)}
                    <Cluster>
                        <View style={GS.notificationBack}>
                            <View style={GS.view}>
                                <Text style={{...GS.notificationText, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info[0].title}</Text>
                                <Text style={{...GS.notificationTip, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{info[0].description}</Text>
                            </View>
                            <View style={GS.view2}><ThemeSwitch/></View>
                        </View>
                    </Cluster>

                    <Cluster>
                        <View style={GS.notificationBack}>
                        <View style={GS.view}>
                            <Text style={{...GS.notificationText, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{info[1].title}</Text>
                            <Text style={{...GS.notificationTip, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{info[1].description}</Text>
                        </View>
                            <Language/>
                        </View>
                    </Cluster>

                    {Space(10)}
                    <Text style={{...T.text30, left: 15, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{info[2].title}</Text>
                    {Space(10)}

                    <ClusterWithSwitch theme={theme} obj={info[3]} category="IMPORTANT" />

                    {Space(10)}
                    <Text style={{...T.text25, left: 15, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{info[4].title}</Text>
                    {Space(10)}

                    <ClusterWithSwitch theme={theme} obj={info[5]}  category="BEDPRES" />
                    <ClusterWithSwitch theme={theme} obj={info[6]}  category="TEKKOM" />
                    <ClusterWithSwitch theme={theme} obj={info[7]}  category="CTF" />
                    <ClusterWithSwitch theme={theme} obj={info[8]}  category="SOCIAL" />
                    <ClusterWithSwitch theme={theme} obj={info[9]}  category="KARRIEREDAG" />
                    <ClusterWithSwitch theme={theme} obj={info[10]} category="FADDERUKA" />
                    <ClusterWithSwitch theme={theme} obj={info[11]} category="LOGIN" />
                    <ClusterWithSwitch theme={theme} obj={info[12]} category="ANNET" />

                    {Space(10)}
                    <Text style={{...T.text25, left: 15, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{info[13].title}</Text>
                    {Space(10)}
                    <Reminders/>
                    {Space(8)}
                    {Space((Dimensions.get("window").height/3))}
                </ScrollView>
            </View>
            <TopMenu 
                navigation={navigation}
                screen="settings"
                title={lang ? "Innstillinger" : "Settings"}
                back={"MenuScreen"}
            />
        </View>
    )
}

function ClusterWithSwitch({theme, obj, category}: ClusterWithSwitchProps) {
    return (
        <Cluster>
            <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{...GS.notificationText, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{obj.title}</Text>
                    <Text style={{...GS.notificationTip, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{obj.description}</Text>
                </View>
                <Notification category={category}/>
            </View>
            {Space(5)}
        </Cluster>
    )
}