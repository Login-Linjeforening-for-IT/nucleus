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
    Linking,
    Dimensions,
    StyleProp,
    ViewStyle,
} from "react-native"
import Swipe from "@components/nav/swipe"
import { SvgXml } from "react-native-svg"
import prkomSVG from "@assets/committee/prkom/pr-icon.svg"
import ctfkomSVG from "@assets/committee/ctfkom/ctfkom-icon.svg"
import eventkomSVG from "@assets/committee/eventkom/eventkom-icon.svg"
import satkomSVG from "@assets/committee/satkom/satkom-icon.svg"
import bedkomSVG from "@assets/committee/bedkom/bedkom-icon.svg"
import tekkomSVG from "@assets/committee/tekkom/tekkom-icon.svg"
import styretSVG from "@assets/committee/styret/styret-icon.svg"

type getCommitteeImageProps = {
    style?: StyleProp<ViewStyle>
    id: number
    theme: string
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

const committeeImages = [
    styretSVG,
    eventkomSVG,
    tekkomSVG,
    prkomSVG,
    ctfkomSVG,
    satkomSVG,
    bedkomSVG,
]

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
                            <View style={GS.row}>
                                <Text>
                                    {lang
                                        ? <Line height={58} width={5} />
                                        : screenWidth < 390 
                                            ? <Line height={94} width={5} />
                                            : <Line height={92} width={5} />
                                    }
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
                            <View style={GS.row}>
                            <Text>
                                <Line height={58} width={5} />
                            </Text>
                            <View>
                                <Text style={{
                                    ...T.boldWithLine, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                    {text.about.intro}
                                </Text>
                            </View>
                            </View>
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
                                    {<Text 
                                        style={T.orange15} 
                                        onPress={() => Linking.openURL("https://wiki.login.no")}
                                    >
                                        {text.publicDocs.wiki}
                                    </Text>}.
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

// function getCommitteeImage({id, style}: getCommitteeImageProps) {
//     const images = [
//         {
//             selected: require("@assets/committee/styret/styret-orange.png"),
//             dark:     require("@assets/committee/styret/styret-black.png"),
//             gray:     require("@assets/committee/styret/styret555.png"),
//             light:    require("@assets/committee/styret/styret-white.png")
//         },
//         {
//             selected: require("@assets/committee/eventkom/eventkom-orange.png"),
//             dark:     require("@assets/committee/eventkom/eventkom-black.png"),
//             gray:     require("@assets/committee/eventkom/eventkom555.png"),
//             light:    require("@assets/committee/eventkom/eventkom-white.png")
//         },
//         {
//             selected: require("@assets/committee/tekkom/tekkom-orange.png"),
//             dark:     require("@assets/committee/tekkom/tekkom-black.png"),
//             gray:     require("@assets/committee/tekkom/tekkom555.png"),
//             light:    require("@assets/committee/tekkom/tekkom-white.png")
//         },
//         {
//             selected: require("@assets/committee/bedkom/pr-orange.png"),
//             dark:     require("@assets/committee/bedkom/pr-black.png"),
//             gray:     require("@assets/committee/bedkom/pr555.png"),
//             light:    require("@assets/committee/bedkom/pr-white.png")
//         },
//         {
//             selected: require("@assets/committee/ctfkom/ctfkom-orange.png"),
//             dark:     require("@assets/committee/ctfkom/ctfkom-black.png"),
//             gray:     require("@assets/committee/ctfkom/ctfkom555.png"),
//             light:    require("@assets/committee/ctfkom/ctfkom-white.png")
//         },
//         {
//             selected: require("@assets/committee/satkom/satkom-orange.png"),
//             dark:     require("@assets/committee/satkom/satkom-black.png"),
//             gray:     require("@assets/committee/satkom/satkom555.png"),
//             light:    require("@assets/committee/satkom/satkom.png")
//         }
//     ]

//     switch (style) {
//         case "dark":    return images[id].light
//         case "gray":    return images[id].gray
//         case "light":   return images[id].dark
//         default:        return images[id].selected
//     }
// }

function CommitteeImage({id, theme, style}: getCommitteeImageProps){

    let color: string;
    switch (theme) {
        case "dark":    color = '#ffffff'; break;
        case "gray":    color = '#555555'; break;
        case "light":   color = '#000000'; break;
        default:        color = '#fd8738'; break;
    }

    return(
        <SvgXml xml={committeeImages[id]} color={color} style={style}/>
    )
}

function CommitteePerson({committee}: CommitteePersonProps) {
    const committees = ["evntkom", "tekkom", "pr", "ctf", "eco"]

    if (committees[committee-1]) {
        return Person({person: committees[committee-1]})
    } else return AllComitees()
}

function CommitteeView({setCommittee, committee}: CommitteeViewProps) {
    const numRows = 3
    const numCols = 3
    
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)

    let rows: string[][] = []
    for (let i = 0; i < committeeImages.length; i+=numCols) {
        rows.push(committeeImages.slice(i, i+numCols))
    }


    return (
        <View style={{display: "flex", aspectRatio: numRows/numCols, justifyContent: 'space-between'}}>
            {/* Change to use two forloops insted as the content of rows is no longer used */}
            {rows.map((row, rowIndex)=>(
                <View key={rowIndex} style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {row.map((xml, index)=>(
                            <TouchableOpacity key={index} 
                                              onPress={()=>{
                                                setCommittee(rowIndex*3+index)
                                              }}
                                                    style={{...GS.committee, 
                                                    backgroundColor: FetchColor({theme, variable: "CONTRAST"}), 
                                                    width: '30%',
                                                    aspectRatio: 1,  
                                                    justifyContent: 'space-between',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                    }}>
                                <CommitteeImage id={rowIndex*3+index} theme={committee==rowIndex*3+index?"":isDark?"dark":"gray"} style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', width: '80%', aspectRatio: 1}}/>
                            </TouchableOpacity>
                        ))}
                </View>
            ))}
        </View>
    )
}

function CommitteeImageTouchable({setCommittee, committee, 
index}: CommitteeImageTouchableProps): JSX.Element {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const image = committee === index ? "" : isDark ? "dark" : "gray"

    return (
        <TouchableOpacity onPress={() => setCommittee(index)}>
            <View style={{
                ...GS.committee, 
                backgroundColor: FetchColor({theme, variable: "CONTRAST"}),
                width: 100,
                height: 100
            }}>
                {/* <SvgXml xml={prSVG} width={'100%'} height={'100%'}/> */}
                {/* <Image 
                    style={GS.image80} 
                    source={getCommitteeImage({id: index, style: image})}
                /> */}
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
                <CommitteeImage id={relevantCommittee.id} style={GS.small} theme={isDark?"dark":"gray"}/>
                {relevantCommittee.title}
            </Text>

            {relevantCommittee.quote.length > 0 &&
                <>
                    <Space height={10} /> 
                    <View style={GS.row}>
                        <Text>
                            <Line 
                                height={relevantCommittee.quote.length / 2.15}
                                width={5}
                            />
                        </Text>
                        <Text style={{
                            ...T.boldWithLine, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {relevantCommittee.quote}
                        </Text>
                    </View>
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
