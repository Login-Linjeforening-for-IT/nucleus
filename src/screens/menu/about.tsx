import Space, { Line } from "@/components/shared/utils"
import Dropdown from "@/components/about/dropdown"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import en from "@text/menu/about/en.json"
import no from "@text/menu/about/no.json"
import React, {useState} from "react"
import T from "@styles/text"
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
    Dimensions,
} from "react-native"
import Swipe from "@components/nav/swipe"
import { TextLink } from "@components/shared/link"

type getCommitteeImageProps = {
    style: string
    id: number
}

type CommitteePersonProps = {
    committee: number
}

type CommitteeImageTouchableProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
    index: number
}

type CommitteeViewProps = {
    setCommittee: React.Dispatch<React.SetStateAction<number>>
    committee: number
}

type CommitteeContentProps = {
    index: number
    relevantCommittee: CommitteeInfo
}

type CommitteeInfo = {
    id: number
    title: string
    quote: string
    description: string
}

export default function AboutScreen(): JSX.Element {
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const screenWidth = Dimensions.get("window").width
    const [committee, setCommittee] = useState(0)
    const text = lang ? no : en
    const info = text.committeeSection.info

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{
                    ...GS.content, 
                    backgroundColor: FetchColor({theme, variable: "DARKER"})
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Space height={Dimensions.get("window").height / 8.1} /> 
                        <Cluster>
                            <Text style={{
                                ...T.bold40, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.title}
                            </Text>
                            <Space height={5} />
                            <Line width={5}>
                                <Text style={{
                                        ...T.boldWithLine, 
                                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                                    }}>
                                        {text.intro}
                                </Text>
                            </Line>
                            <Space height={10} />
                            <Dropdown/>
                            <Space height={10} />
                            <Styret />
                            <Space height={15} />
                            <Text style={{
                                ...T.bold25, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.about.title}
                            </Text>
                            <Space height={10} />
                            <Line width={5}>
                                <Text style={{
                                        ...T.boldWithLine, 
                                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                                    }}>
                                        {text.about.intro}
                                </Text>
                            </Line>
                            <Space height={10} />
                            <Text style={{
                                ...T.paragraph, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                                {text.about.body.p1}
                            </Text>
                            <Space height={10} />
                            <Text style={{
                                ...T.paragraph, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.about.body.p2}
                            </Text>
                            <Space height={15} />
                            <Text style={{
                                ...T.bold25, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.committeeSection.title}
                            </Text>
                            <Space height={10} />
                            <Text style={{
                                ...T.boldParagraph, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.committeeSection.intro}
                            </Text>
                            <Space height={10} />
                            <CommitteeView
                                setCommittee={setCommittee}
                                committee={committee}
                            />
                            {
                                info.map((relevantCommittee, index) => {
                                    if (relevantCommittee.id === committee) {
                                        return <CommitteeContent
                                            key={index}
                                            index={index}
                                            relevantCommittee={relevantCommittee}
                                        />
                                    }
                                })
                            }

                            <CommitteePerson committee={committee} />
                            <Space height={10} /> 
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
                                    <TextLink 
                                        url="https://wiki.login.no" 
                                        text={text.publicDocs.wiki} 
                                    />.
                                </Text>
                            </View>
                            <Space height={10} /> 
                            <Social/>
                            <Copyright/>
                        </Cluster>
                        <Space height={Dimensions.get("window").height / 3 + 10} /> 
                    </ScrollView>
                </View>
            </View>
        </Swipe>
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

function CommitteePerson({committee}: CommitteePersonProps) {
    const committees = ["evntkom", "tekkom", "pr", "ctf", "eco"]

    if (committees[committee-1]) {
        return Person({person: committees[committee-1]})
    } else return AllComitees()
}

function CommitteeView({setCommittee, committee}: CommitteeViewProps) {
    let elements: JSX.Element[] = []
    
    for (let i = 0; i < 6; i+=3) {
        elements.push(
            <View key={"View" + i} style={GS.parentCommitteeView}>
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    index={i}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    index={i+1}
                    />
                <CommitteeImageTouchable 
                    setCommittee={setCommittee}
                    committee={committee}
                    index={i+2}
                    />
            </View>
        )
    }

    return elements
}

function CommitteeImageTouchable({setCommittee, committee, 
index}: CommitteeImageTouchableProps): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
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

function CommitteeContent({index, relevantCommittee}: 
CommitteeContentProps) {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    
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

            {relevantCommittee.quote.length > 0 &&
                <>
                    <Space height={10} /> 
                        <Line width={5}>
                            <Text style={{
                                ...T.boldWithLine, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {relevantCommittee.quote}
                            </Text>
                        </Line>
                    <Space height={10} /> 
                </>
            }

            <Text style={{
                ...T.paragraph, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {relevantCommittee.description}
            </Text>
            <Space height={15} /> 
        </View>
    )
}
