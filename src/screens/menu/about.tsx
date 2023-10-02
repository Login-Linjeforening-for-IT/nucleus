import Space, { Line } from "@/components/shared/utils"
import Dropdown from "@/components/about/dropdown"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import en from "@text/about/en.json"
import no from "@text/about/no.json"
import React, {useState} from "react"
import T from "@styles/text"
import { ScreenProps } from "@interfaces"
import Person, { 
    AllComitees, 
    Social, 
    Styret, 
    Copyright
} from "@/components/about/social"
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    Dimensions,
} from "react-native"

type getCommitteeImageProps = {
    style: string
    id: number
}

type CommitteePersonProps = {
    committee: number
    lang: boolean
    theme: number
}

type CommitteeImageTouchableProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
    isDark: boolean
    theme: number
    index: number
}

type CommitteeViewProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
    isDark: boolean
    theme: number
}

type CommitteeContentProps = {
    index: number
    theme: number
    relevantCommittee: CommitteeInfo
    isDark: boolean
    lang: boolean
}

type CommitteeInfo = {
    id: number
    title: string
    quote: string
    description: string
}

export default function AboutScreen({ navigation }: ScreenProps): JSX.Element {
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { login } = useSelector((state: ReduxState) => state.login)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const screenWidth = Dimensions.get("window").width
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false
    const [committee, setCommittee] = useState(0)
    const text = lang ? no : en
    const info = text.committeeSection.info

    return (
        <View>
            <View style={{
                ...GS.content, 
                backgroundColor: FetchColor({theme, variable: "DARKER"})
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Space(Dimensions.get("window").height/8.1)}
                    <Cluster>
                        <Text style={{
                            ...T.bold40, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.title}
                        </Text>
                        {Space(5)}
                        <View style={GS.row}>
                            <Text>
                                {lang 
                                    ? Line({height: 58, width: 5}) 
                                    : screenWidth < 390 
                                        ? Line({height: 94, width: 5}) 
                                        : Line({height: 92, width: 5})}
                            </Text>
                            <View>
                                <Text style={{
                                    ...T.boldWithLine, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                    {text.intro}
                                </Text>
                            </View>
                        </View>
                        {Space(10)}
                        <Dropdown/>
                        {Space(10)}
                        <Styret theme={theme} />
                        {Space(15)}
                        <Text style={{
                            ...T.bold25, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.about.title}
                        </Text>
                        {Space(10)}
                        <View style={GS.row}>
                        <Text>{Line({height: 58, width: 5})}</Text>
                        <View>
                            <Text style={{
                                ...T.boldWithLine, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.about.intro}
                            </Text>
                        </View>
                        </View>
                        {Space(10)}
                        <Text style={{
                            ...T.paragraph, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                            {text.about.body.p1}
                        </Text>
                        {Space(10)}
                        <Text style={{
                            ...T.paragraph, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.about.body.p2}
                        </Text>
                        {Space(15)}
                        <Text style={{
                            ...T.bold25, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.committeeSection.title}
                        </Text>
                        {Space(10)}
                        <Text style={{
                            ...T.boldParagraph, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.committeeSection.intro}
                        </Text>
                        {Space(10)}
                        <CommitteeView
                            setCommittee={setCommittee}
                            committee={committee}
                            isDark={isDark}
                            theme={theme}
                        />
                        {
                            info.map((relevantCommittee, index) => {
                                if (relevantCommittee.id === committee) {
                                    return <CommitteeContent
                                        key={index}
                                        index={index}
                                        theme={theme}
                                        lang={lang}
                                        isDark={isDark}
                                        relevantCommittee={relevantCommittee}
                                    />
                                }
                            })
                        }

                        <CommitteePerson 
                            committee={committee} 
                            theme={theme} 
                            lang={lang}
                        />

                        {Space(10)}
                        <Text style={{
                            ...T.text25, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {text.publicDocs.title}
                        </Text>
                        <View>
                            <Text style={{
                                ...T.paragraph, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.publicDocs.body}
                                {<Text 
                                    style={T.orange15} 
                                    onPress={() => Linking.openURL("https://wiki.login.no")}
                                >
                                    {text.publicDocs.wiki}
                                </Text>}.
                            </Text>
                        </View>
                        {Space(10)}
                        <Social/>
                        <Copyright/>
                    </Cluster>
                    {Space(10)}
                    {Space(Dimensions.get("window").height/3)}
                </ScrollView>
            </View>
        </View>
    )
}

function getCommitteeImage({id, style}: getCommitteeImageProps) {
    const images = [
        {
            selected: require("@assets/committee/styret/styret-orange.png"),
            dark:     require("@assets/committee/styret/styret-black.png"),
            gray:     require("@assets/committee/styret/styret555.png"),
            light:    require("@assets/committee/styret/styret-white.png")
        },
        {
            selected: require("@assets/committee/eventkom/eventkom-orange.png"),
            dark:     require("@assets/committee/eventkom/eventkom-black.png"),
            gray:     require("@assets/committee/eventkom/eventkom555.png"),
            light:    require("@assets/committee/eventkom/eventkom-white.png")
        },
        {
            selected: require("@assets/committee/tekkom/tekkom-orange.png"),
            dark:     require("@assets/committee/tekkom/tekkom-black.png"),
            gray:     require("@assets/committee/tekkom/tekkom555.png"),
            light:    require("@assets/committee/tekkom/tekkom-white.png")
        },
        {
            selected: require("@assets/committee/prkom/pr-orange.png"),
            dark:     require("@assets/committee/prkom/pr-black.png"),
            gray:     require("@assets/committee/prkom/pr555.png"),
            light:    require("@assets/committee/prkom/pr-white.png")
        },
        {
            selected: require("@assets/committee/ctfkom/ctfkom-orange.png"),
            dark:     require("@assets/committee/ctfkom/ctfkom-black.png"),
            gray:     require("@assets/committee/ctfkom/ctfkom555.png"),
            light:    require("@assets/committee/ctfkom/ctfkom-white.png")
        },
        {
            selected: require("@assets/committee/satkom/satkom-orange.png"),
            dark:     require("@assets/committee/satkom/satkom-black.png"),
            gray:     require("@assets/committee/satkom/satkom555.png"),
            light:    require("@assets/committee/satkom/satkom.png")
        }
    ]

    switch (style) {
        case "dark":    return images[id].light
        case "gray":    return images[id].gray
        case "light":   return images[id].dark
        default:        return images[id].selected
    }
}

function CommitteePerson({committee, lang, theme}: CommitteePersonProps) {
    const committees = ["evntkom", "tekkom", "pr", "ctf", "eco"]

    if (committees[committee-1]) {
        return Person({person: committees[committee-1], lang, theme})
    } else return AllComitees({lang,theme})
}

function CommitteeView({setCommittee, committee, isDark, theme}: 
CommitteeViewProps) {
    let elements: JSX.Element[] = []
    
    for (let i = 0; i < 6; i+=3) {
        elements.push(
            <View key={"View" + i} style={GS.parentCommitteeView}>
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i+1}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    isDark={isDark}
                    theme={theme}
                    index={i+2}
                    />
            </View>
        )
    }

    return elements
}

function CommitteeImageTouchable({setCommittee, committee, isDark, theme, 
index}: CommitteeImageTouchableProps): JSX.Element {
    const image = committee === index ? "" : isDark ? "dark" : "gray"

    return (
        <TouchableOpacity onPress={() => setCommittee(index)}>
            <View style={{
                ...GS.committee, 
                backgroundColor: FetchColor({theme, variable: "CONTRAST"})
            }}>
                <Image 
                    style={GS.image80} 
                    source={getCommitteeImage({id: index, style: image})}
                />
            </View>
        </TouchableOpacity>
    )
}

function CommitteeContent({index, theme, relevantCommittee, isDark}: 
CommitteeContentProps) {
    return (
        <View key={index}>
            <Text style={{
                ...T.text30, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                <Image 
                    style={GS.small} 
                    source={getCommitteeImage({
                        id: relevantCommittee.id, 
                        style: isDark ? "dark" : "light"})
                    }
                />
                {relevantCommittee.title}
            </Text>

            {relevantCommittee.quote.length ?
                <>
                    {Space(10)}
                    <View style={GS.row}>
                        <Text>{Line({height: relevantCommittee.quote.length / 2.15, width: 5})}</Text>
                        <Text style={{
                            ...T.boldWithLine, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {relevantCommittee.quote}
                        </Text>
                    </View>
                    {Space(10)}
                </>
                :null
            }

            <Text style={{
                ...T.paragraph, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {relevantCommittee.description}
            </Text>
            {Space(15)}
        </View>
    )
}
