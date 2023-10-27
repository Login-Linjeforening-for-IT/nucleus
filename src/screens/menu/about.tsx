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
    ScrollView,
    TouchableOpacity,
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
import { TextLink } from "@components/shared/link"

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
    const numRows = 1
    const numCols = Math.ceil(committeeImages.length/numRows)
    
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)

    let rows: string[][] = []
    for (let i = 0; i < committeeImages.length; i+=numCols) {
        rows.push(committeeImages.slice(i, i+numCols))
    }


    return (
        <View style={{display: "flex", aspectRatio: numCols/numRows, justifyContent: 'space-between'}}>
            {rows.map((row, rowIndex)=>(
                <View key={rowIndex} style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    {row.map((xml, index)=>(
                            <TouchableOpacity key={index} 
                                              onPress={()=>{
                                                setCommittee(rowIndex*numCols+index)
                                              }}
                                                    style={{...GS.committee, 
                                                    backgroundColor: FetchColor({theme, variable: "CONTRAST"}), 
                                                    width: Dimensions.get('window').width/numCols-Dimensions.get('window').width/numCols*15/100,
                                                    aspectRatio: 1,  
                                                    justifyContent: 'space-between',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                    }}>
                                <CommitteeImage id={rowIndex*numCols+index} theme={committee==rowIndex*numCols+index?"":isDark?"dark":"gray"} style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto', width: '80%', aspectRatio: 1}}/>
                            </TouchableOpacity>
                        ))}
                </View>
            ))}
        </View>
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
