import CategorySquare, { CategoryCircle } from "@/components/shared/category"
import { FetchJoinLink } from "@/utils/fetch"
import Space, { Month } from "@/components/shared/utils"
import { CardSmaller } from "@/components/shared/card"
import { GetEndTime } from "@components/event/time"
import React, { useEffect, useState } from "react"
import RenderHTML from "react-native-render-html"
import EventTime from "@components/event/time"
import FetchColor from "@styles/fetchTheme"
import Card from "@/components/shared/card"
import { SvgUri } from "react-native-svg"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import {
    Alert,
    Dimensions,
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { StaticImage } from "@/components/about/social"
import { useDispatch } from "react-redux"
import { setClickedEvents } from "@redux/event"
import Swipe from "@components/nav/swipe"

type handleLinkProps = {
    mazeref: string
    street: string
    organizer: string
}

type JoinButtonProps = {
    link: string
}

type MapProps = {
    event: DetailedEvent
    handleLink: ({mazeref, street, organizer}: handleLinkProps) => void
}

type CategoryProps = {
    event: EventProps
}

type DescriptionProps = {
    no: string
    en: string
}

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen(): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const stored = useSelector((state: ReduxState) => state.event)
    const [event, setEvent]=useState<DetailedEvent | EventProps>(stored.event)
    const name = lang ? event.name_no : event.name_en
    let description = ""

    function fetchEvent() {
        fetch(`https://api.login.no/events/${event.id}`)
        .then(response => response.json())
        .then(data => setEvent(data))
    }
    
    useEffect(() => { 
        fetchEvent() 
    }, [event])

    let link
    
    if ("description_no" in event && "description_en" in event) {
        link = FetchJoinLink(lang ? event.description_no : event.description_en)
        description = lang ? event.description_no : event.description_en
    }

    function handleLink({mazeref, street, organizer}: handleLinkProps) {
        if (mazeref.length) {
            Linking.openURL(`https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=${mazeref}`).catch(() => {
                Alert.alert("Mazemap kunne ikke åpnes", `Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: M${mazeref}`)
            })
            return
        }

        if (street === "Orgkollektivet") {
            Linking.openURL("https://link.mazemap.com/tBlfH1oY").catch(() =>{
                Alert.alert("Mazemap kunne ikke åpnes", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: wZDe8byp")
            })
        }

        if (organizer === "HUSET") {
            Linking.openURL("https://link.mazemap.com/O1OdhRU4").catch(() => {
                Alert.alert("Mazemap kunne ikke åpnes.", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: MGfrIBrd")
            })
        }
    }

    const textNO = {
        start: "Starter:      ",
        end: "Slutter:       ",
        host: "Arrangør:   ",
        more: "Mer info"
    }

    const textEN = {
        start: "Starts:         ",
        end: "Ends:           ",
        host: "Organizer:   ",
        more: "More info"
    }

    const text = lang ? textNO : textEN

    return (
        <Swipe left="EventScreen">
            <View>
                <View style={{...ES.sesContent, backgroundColor: FetchColor({theme, variable: "BACKGROUND"})}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Space height={Dimensions.get("window").height / 8 - 5} />
                    {(event.image_small).includes(".svg") ?
                        <SvgUri
                            style={{alignSelf: "center"}}
                            width={(Dimensions.get("window").width)/1.2}
                            height={Dimensions.get("window").width/3}
                            uri={`https://cdn.login.no/img/events/${event.image_small}`}
                        />
                    : (event.image_small).includes(".png") ? <Image 
                        style={ES.specificEventImage}
                        source={{uri: `https://cdn.login.no/img/events/${event.image_small}`}}
                    /> : <StaticImage event={event} />}
                    <Space height={10} />

                    <CardSmaller>
                        <View style={ES.specificEventInfoView}>
                            <Card>
                                <View style={{left: -10}}>
                                <CategorySquare category={event.category_name_no} />
                                <Text style={{
                                    ...ES.eventClusterDayText, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                    {event.time_start[8]}
                                    {event.time_start[9]}
                                </Text>

                                <Text style={{
                                    ...ES.monthText, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                <Month
                                    month={parseInt(event.time_start[5] + event.time_start[6])}
                                    color={FetchColor({theme, variable: "TEXTCOLOR"})}
                                />
                                </Text>
                                </View>
                            </Card>
                            <EventTime 
                                time_start={event.time_start}
                                time_end={"time_end" in event ? event.time_end : ""} 
                            />
                        </View>
                    </CardSmaller>

                    <Card>
                        <View style={ES.specificEventInfoView}>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.start}
                            </Text>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                            {event.time_start[11]}{event.time_start[12]}:
                            {event.time_start[14]}{event.time_start[15]}
                            </Text>
                        </View>

                        <View style={ES.specificEventInfoView}>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.end}
                            </Text>
                            {"time_end" in event && <GetEndTime time_end={event.time_end} />}
                        </View>

                        <View style={{flexDirection: "row"}}>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                    {lang ? "Lokasjon:   " : "Location:     "}
                            </Text>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                TBA!
                            </Text>
                            <Map event={event} handleLink={handleLink} />
                        </View>

                        <Category event={event} />

                        <View style={ES.specificEventInfoView}>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.host}
                            </Text>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {event.organizer}{("organizerlink" in event && 
                                event.organizerlink) || event.discordlink 
                                || event.fblink ? " - " : null}
                            </Text>
                            {event.discordlink && <TouchableOpacity 
                                style={{minWidth: 70}} 
                                onPress={() => 
                                    {Linking.openURL(`${event.discordlink}`)}}>
                                    <View style={ES.row}>
                                        <Text style={{
                                            ...T.mazemap, 
                                            color: FetchColor({theme, variable: "ORANGE"})
                                        }}>
                                            Discord
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            {event.link && !event.discordlink &&
                                <TouchableOpacity 
                                    style={{minWidth: 70}} 
                                    onPress={() => {
                                        Linking.openURL(`${event.discordlink}`)
                                    }}>
                                        <View style={ES.row}>
                                            <Text style={{
                                                ...T.mazemap, 
                                                color: FetchColor({theme, variable: "ORANGE"})
                                            }}>
                                                Facebook
                                            </Text>
                                        </View>
                                </TouchableOpacity>
                            }
                            {("organizerlink" in event && event.organizerlink) && (event.discordlink || event.fblink) &&
                            <Text style={{...T.specificEventInfo, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{" - "}</Text>}
                            {("organizerlink" in event) && event.organizerlink &&
                            <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${event.organizerlink}`)}}>
                                    <View style={ES.row}>
                                        <Text style={{
                                            ...T.mazemap, 
                                            color: FetchColor({theme, variable: "ORANGE"})
                                        }}>
                                            {text.more}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </Card>

                    <Card>
                        <View>
                        <Space height={5} />
                            <Text style={{
                                ...T.centered20, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {name}
                            </Text>
                        </View>
                        <Space height={5} />
                        <Description description={lang ? event.description_no : event.description_en} />
                        <Space height={10} />
                        <JoinButton link={link ? link : ""} />
                    </Card>
                        <Space height={Dimensions.get("window").height / 3 + 10} />
                    </ScrollView>
                </View>
            </View>
        </Swipe>
    )
}

function JoinButton({link}: JoinButtonProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event, clickedEvents } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()
    
    function updateStorage() {
        if (!clickedEvents.some(clicked => clicked.id === event.id)) {
            dispatch(setClickedEvents([...clickedEvents, event]))
        }
    }

    if (link.length) {
        return (
            <TouchableOpacity onPress={() => {
                updateStorage()
                Linking.openURL(link)
            }}>
                <View style={{
                    ...ES.eventButton, 
                    backgroundColor: FetchColor({theme, variable: "ORANGE"})
                }}>
                    <Text style={{
                        ...T.centered20, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        {lang ? "Meld meg på":"Join event"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

function Category({event}: CategoryProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const category = lang ? event.category_name_no  : event.category_name_en

    return (
        <View style={ES.specificEventInfoView}>
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {lang ? "Kategori:      " : "Category:      "}
            </Text>
            <CategoryCircle category={category} />
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {category}
            </Text>
        </View>
    )
}

function Map({event, handleLink}: MapProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    if (("mazeref" in event) && event.mazeref || (
        event.location_name_no === "Orgkollektivet" 
        || event.location_name_no === "HUSET")) {
        return (
            <TouchableOpacity 
                style={{minWidth: 70}} 
                onPress={() => {handleLink({mazeref: "mazeref" in event 
                    ? event.mazeref 
                    : "", 
                street: event.street, organizer: event.organizer})}}>
                <View style={ES.row}>
                    <Text 
                        style={{
                            ...T.specificEventInfo, 
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}>
                            {" - "}
                        </Text>
                    <Text 
                        style={{
                            ...T.mazemap, 
                            color: FetchColor({theme, variable: "ORANGE"})
                        }}>
                                {lang ? "Kart" : "Map"}
                    </Text>
                    <Image 
                        style={ES.mazemapIcon} 
                        source={require("@assets/icons/mazemap.png")}/>
                </View>
            </TouchableOpacity>
        )
    }
}

function Description({description}: {description: string}) {
    const { theme } = useSelector((state: ReduxState) => state.theme) 

    return (
        <RenderHTML
            baseStyle={{
                maxWidth: "100%",
                color: FetchColor({theme, variable: "TEXTCOLOR"}),
            }}
            contentWidth={0}
            source={{html: description}}
        />
    )
}