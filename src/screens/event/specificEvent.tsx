import CategorySquare, { CategoryCircle } from "@/components/shared/category"
import AsyncStorage from "@react-native-async-storage/async-storage"
import EventLocation from "@components/event/eventLocation"
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
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
  Image,
  View,
  Text,
} from "react-native"
import { StaticImage } from "@/components/about/social"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { 
    PanGestureHandler,
    PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"
import handleSwipe from "@/utils/handleSwipe"
import { useDispatch } from "react-redux"
import { setClickedEvents } from "@redux/event"

type handleLinkProps = {
    mazeref: string
    street: string
    organizer: string
}

type JoinButtonProps = {
    link: string
}

type MapProps = {
    event: DetailedEventProps | EventProps
    handleLink: ({mazeref, street, organizer}: handleLinkProps) => void
}

type CategoryProps = {
    event: EventProps
}

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen({ navigation }: 
BottomTabScreenProps<EventStackParamList>): JSX.Element {

    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const stored = useSelector((state: ReduxState) => state.event)
    const [event, setEvent]=useState<DetailedEventProps | EventProps>(stored.event)

    function getData() {
        fetch(`https://api.login.no/events/${event.eventID}`)
        .then(response => response.json())
        .then(data => setEvent(data))
    }
    
    useEffect(() => { getData() }, [event])

    let link
    
    if ("description" in event) {
        link = FetchJoinLink(event.description)
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
        <PanGestureHandler
            onGestureEvent={(event: PanGestureHandlerGestureEvent) => 
                handleSwipe({navigation, event, screenLeft: "EventScreen"})}
        >
            <View>
                <View style={{...ES.sesContent, backgroundColor: FetchColor({theme, variable: "BACKGROUND"})}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Space height={Dimensions.get("window").height / 8 - 5} />
                    {(event.image).includes(".svg") ?
                        <SvgUri
                            style={{alignSelf: "center"}}
                            width={(Dimensions.get("window").width)/1.2}
                            height={Dimensions.get("window").width/3}
                            uri={`https://cdn.login.no/img/events/${event.image}`}
                        />
                    : (event.image).includes(".png") ? <Image 
                        style={ES.specificEventImage}
                        source={{uri: `https://cdn.login.no/img/events/${event.image}`}}
                    /> : <StaticImage event={event} />}
                    <Space height={10} />

                    <CardSmaller>
                        <View style={ES.specificEventInfoView}>
                            <Card>
                                <View style={{left: -10}}>
                                <CategorySquare category={event.category} />
                                <Text style={{
                                    ...ES.eventCardDayText, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                    {event.startt[8]}
                                    {event.startt[9]}
                                </Text>

                                <Text style={{
                                    ...ES.monthText, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                <Month
                                    month={parseInt(event.startt[5] + event.startt[6])}
                                    color={FetchColor({theme, variable: "TEXTCOLOR"})}
                                />
                                </Text>
                                </View>
                            </Card>
                            <Text>
                                {EventTime({startTime: event.startt, 
                                    endTime: "endt" in event ? event.endt : ""})}
                            </Text>
                        </View>
                    </CardSmaller>

                    <Space height={5} />
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
                            {event.startt[11]}{event.startt[12]}:{event.startt[14]}
                            {event.startt[15]}
                            </Text>
                        </View>

                        <Space height={5} />

                        <View style={ES.specificEventInfoView}>
                            <Text style={{
                                ...T.specificEventInfo, 
                                color: FetchColor({theme, variable: "TEXTCOLOR"})
                            }}>
                                {text.end}
                            </Text>
                            {"endt" in event && GetEndTime({input: event.endt, theme})}
                        </View>

                        <Space height={5} />

                        <View style={{flexDirection: "row"}}>
                            <EventLocation
                                room={event.roomno}
                                campus={event.campus}
                                street={event.street}
                            />

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
                            {event.fblink && !event.discordlink &&
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

                    <Space height={5} />
                        <Card>
                            <View>
                            <Space height={5} />
                                <Text style={{
                                    ...T.centered20, 
                                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                                }}>
                                    {event.eventname}
                                </Text>
                            </View>
                            <Space height={5} />
                            {"description" in event && event.description &&
                                <RenderHTML
                                    baseStyle={{
                                        maxWidth: "100%",
                                        color: FetchColor({theme, variable: "TEXTCOLOR"}),
                                    }}
                                    contentWidth={0}
                                    source={{html: event.description}}
                                />
                            }
                            <Space height={10} />
                            <JoinButton
                                link={link ? link : ""}
                            />
                        </Card>
                        <Space height={Dimensions.get("window").height / 3 + 10} />
                    </ScrollView>
                </View>
            </View>
        </PanGestureHandler>
    )
}

function JoinButton({link}: JoinButtonProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event, clickedEvents } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()
    
    function updateStorage() {
        if (!clickedEvents.some(clicked => clicked.eventID === event.eventID)) {
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

    return (
        <View style={ES.specificEventInfoView}>
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {lang ? "Kategori:      " : "Category:      "}
            </Text>
            {CategoryCircle(event.category)}
            <Text style={{
                ...T.specificEventInfo, 
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {event.category}
            </Text>
        </View>
    )
}

function Map({event, handleLink}: MapProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    if (("mazeref" in event) && event.mazeref || (event.street === 
        "Orgkollektivet" || event.organizer === "HUSET")) {
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
