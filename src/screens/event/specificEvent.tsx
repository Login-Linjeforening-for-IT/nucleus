import CategorySquare, { CategoryCircle } from "@/components/shared/category"
import { FetchJoinLink, fetchEventDetails } from "@/utils/fetch"
import Space, { Month } from "@/components/shared/utils"
import { CardSmaller } from "@/components/shared/card"
import { GetEndTime } from "@components/event/time"
import React from "react"
import RenderHTML from "react-native-render-html"
import EventTime from "@components/event/time"
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
import { setClickedEvents, setEvent } from "@redux/event"
import Swipe from "@components/nav/swipe"

type handleLinkProps = {
    mazeref: string
    location: string | null
    organizer: string
}

type JoinButtonProps = {
    link: string
}

type MapProps = {
    event: DetailedEvent
    handleLink: ({mazeref, location, organizer}: handleLinkProps) => void
}

type CategoryProps = {
    event: DetailedEvent
}

/**
 *
 * @param param0
 * @returns
 */
export default function SpecificEventScreen(): JSX.Element {
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { event } = useSelector((state: ReduxState) => state.event)
    const name = lang ? event.name_no : event.name_en
    let description = ""
    const dispatch = useDispatch()

    // if (deepLinkID) {
    //     const response = fetchEventDetails(deepLinkID)

    //     if (response) {
    //         dispatch(setEvent(response))
    //     }
    // }

    let link
    
    if ("description_no" in event && "description_en" in event) {
        link = FetchJoinLink(lang ? event.description_no : event.description_en)
        description = lang ? event.description_no : event.description_en
    }

    function handleLink({mazeref, location, organizer}: handleLinkProps) {
        if (mazeref.length) {
            Linking.openURL(`https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=${mazeref}`).catch(() => {
                Alert.alert("Mazemap kunne ikke åpnes", `Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: M${mazeref}`)
            })
            return
        }

        if (location === "Orgkollektivet") {
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
            <View style={{...ES.sesContent, backgroundColor: theme.background}}>
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
                                color: theme.textColor
                            }}>
                                {event.time_start[8]}
                                {event.time_start[9]}
                            </Text>

                            <Text style={{
                                ...ES.monthText, 
                                color: theme.textColor
                            }}>
                            <Month
                                month={parseInt(event.time_start[5] + event.time_start[6])}
                                color={theme.textColor}
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
                            color: theme.textColor
                        }}>
                            {text.start}
                        </Text>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                        {event.time_start[11]}{event.time_start[12]}:
                        {event.time_start[14]}{event.time_start[15]}
                        </Text>
                    </View>

                    <View style={ES.specificEventInfoView}>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                            {text.end}
                        </Text>
                        {"time_end" in event && <GetEndTime time_end={event.time_end} />}
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                                {lang ? "Lokasjon:   " : "Location:     "}
                        </Text>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                            TBA!
                        </Text>
                        <Map event={event} handleLink={handleLink} />
                    </View>

                    <Category event={event} />

                    <View style={ES.specificEventInfoView}>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                            {text.host}
                        </Text>
                        <Text style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                            {event.organization_name_en || event.organization_name_short}{("link_homepage" in event && 
                            event.link_homepage) || event.link_discord 
                            || event.link_facebook ? " - " : null}
                        </Text>
                        {event.link_discord && <TouchableOpacity 
                            style={{minWidth: 70}} 
                            onPress={() => 
                                {Linking.openURL(`${event.link_discord}`)}}>
                                <View style={ES.row}>
                                    <Text style={{
                                        ...T.mazemap, 
                                        color: theme.orange
                                    }}>
                                        Discord
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {event.link_signup && !event.link_discord &&
                            <TouchableOpacity 
                                style={{minWidth: 70}} 
                                onPress={() => {
                                    Linking.openURL(`${event.link_discord}`)
                                }}>
                                    <View style={ES.row}>
                                        <Text style={{
                                            ...T.mazemap, 
                                            color: theme.orange
                                        }}>
                                            Facebook
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        }
                        {("link_homepage" in event && event.link_homepage) && (event.link_discord || event.link_facebook) &&
                        <Text style={{...T.specificEventInfo, color: theme.textColor}}> - </Text>}
                        {("link_homepage" in event) && event.link_homepage &&
                        <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${event.link_homepage}`)}}>
                                <View style={ES.row}>
                                    <Text style={{
                                        ...T.mazemap, 
                                        color: theme.orange
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
                            color: theme.textColor
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
                    backgroundColor: theme.orange
                }}>
                    <Text style={{
                        ...T.centered20, 
                        color: theme.textColor
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
                color: theme.textColor
            }}>
                {lang ? "Kategori:      " : "Category:      "}
            </Text>
            <CategoryCircle category={category} />
            <Text style={{
                ...T.specificEventInfo, 
                color: theme.textColor
            }}>
                {category}
            </Text>
        </View>
    )
}

function Map({event, handleLink}: MapProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const mazeref = "mazeref" in event ? event.mazeref : ""

    if (("mazeref" in event) && event.mazeref || (
        event.location === "Orgkollektivet" 
        || event.location === "HUSET")) {
        return (
            <TouchableOpacity 
                style={{minWidth: 70}} 
                onPress={() => {handleLink({mazeref: "mazeref" in event 
                    ? event.mazeref 
                    : "", 
                location: event.location, organizer: event.organization_name_short || event.organization_name_en})}}>
                <View style={ES.row}>
                    <Text 
                        style={{
                            ...T.specificEventInfo, 
                            color: theme.textColor
                        }}>
                            {" - "}
                        </Text>
                    <Text 
                        style={{
                            ...T.mazemap, 
                            color: theme.orange
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

    return <RenderHTML
        baseStyle={{maxWidth: "100%", color: theme.textColor}}
        contentWidth={0}
        source={{html: description}}
    />
}