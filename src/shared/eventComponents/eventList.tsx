import notificationArray from "@shared/notificationComponents/notificationArray"
import EventCardLocation from "@shared/eventComponents/eventCardLocation"
import CategorySquare from "@shared/eventComponents/category"
import topic from "@shared/notificationComponents/topic"
import Space, { Month } from "@shared/components/utils"
import BellIcon from "@shared/eventComponents/bellIcon"
import Cluster from "@shared/functions/cluster"
import FetchColor from "@styles/fetchTheme"
import { ES } from "@styles/eventStyles"
import { Navigation } from "@interfaces"
import { T } from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    Dimensions,
    FlatList,
    Text,
    View,
} from "react-native"

type EventListProps = {
    navigation: Navigation
    renderedArray: EventProps[]
    clickedEvents: EventProps[]
    search: boolean
    theme: number
    lang: boolean
    relevantCategories: CategoryWithID[]
    notification: NotificationProps
    setClickedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    lastSave: string
    events: EventProps[]
    ErrorMessage: React.FC<ErrorMessageProps>
}

type EventCardProps = {
    navigation: Navigation
    renderedArray: EventProps[]
    clickedEvents: EventProps[]
    search: boolean
    theme: number
    lang: boolean
    relevantCategories: CategoryWithID[]
    notification: NotificationProps
    setClickedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    lastSave: string
    item: EventProps
    index: number
}

type ListFooterProps = {
    index: number
    renderedArray: EventProps[]
    search: boolean
    relevantCategories: CategoryWithID[]
    lastSave: string
    lang: boolean
    theme: number
}

type FullCategorySquareProps = {
    item: EventProps
    theme: number
    lang: boolean
    height?: number
}

export default function EventList ({
    navigation,
    renderedArray,
    clickedEvents,
    search,
    theme,
    lang,
    relevantCategories,
    notification,
    setClickedEvents,
    lastSave,
    events,
    ErrorMessage,
}: EventListProps): JSX.Element {
    if (!renderedArray.length) return <ErrorMessage 
        argument="wifi" 
        theme={theme} 
        lang={lang} 
    />
    else if (renderedArray.length > 0) {
        return (
            <View>
                <FlatList
                    style={{minHeight: "100%"}}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => `${item.eventID}`}
                    data={renderedArray}
                    renderItem={({item, index}) => (
                        <EventCard
                            navigation={navigation}
                            renderedArray={renderedArray}
                            clickedEvents={clickedEvents}
                            search={search}
                            theme={theme}
                            lang={lang}
                            relevantCategories={relevantCategories}
                            notification={notification}
                            setClickedEvents={setClickedEvents}
                            lastSave={lastSave}
                            item={item}
                            index={index}
                        />
                    )}
                />
            </View>
        )
    } else return <ErrorMessage 
        argument={!events.length ? "wifi" : "nomatch"} 
        theme={theme} 
        lang={lang} 
    />
}

type BellProps = {
    item: EventProps
    lang: boolean
    notification: NotificationProps
    clickedEvents: EventProps[]
    isOrange: boolean
    theme: number
    setClickedEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
}

function EventCard ({
    navigation,
    renderedArray,
    clickedEvents,
    search,
    theme,
    lang,
    relevantCategories,
    notification,
    setClickedEvents,
    lastSave,
    item,
    index,
}: EventCardProps): JSX.Element {
    const isOrange = clickedEvents.some(event => event.eventID === item.eventID) 
        ? true 
        : false

    return (
        <View>
            <TouchableOpacity onPress={() =>
                    navigation.navigate("SpecificEventScreen", {item: item})
            }>
                {index === 0
                    ? search===false? Space(Dimensions.get("window").height/8.1):Space(Dimensions.get("window").height/3.35) :null}
                <Cluster marginVertical={8}>
                    {index === 0 ? Space(8):null}
                    <View style={ES.eventBack}>
                        <FullCategorySquare 
                            item={item} 
                            theme={theme} 
                            lang={lang} 
                        />
                        <EventCardLocation 
                            item={item} 
                            theme={theme} 
                            lang={lang} 
                        />
                        <Bell
                            item={item}
                            lang={lang}
                            notification={notification}
                            clickedEvents={clickedEvents}
                            isOrange={isOrange}
                            theme={theme}
                            setClickedEvents={setClickedEvents}
                        />
                    </View>
                </Cluster>
                <ListFooter
                    index={index}
                    renderedArray={renderedArray}
                    search={search}
                    relevantCategories={relevantCategories}
                    lastSave={lastSave}
                    lang={lang}
                    theme={theme}
                />
            </TouchableOpacity>
        </View>
    )
}

export function ListFooter({index, renderedArray, search, relevantCategories, 
lastSave, lang, theme}: ListFooterProps): JSX.Element {
    return (
        <>
            {index === renderedArray.length-1 && <Text style={{...T.contact, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastSave}.
                </Text>}
            {index === renderedArray.length-1 
                && Space((Dimensions.get("window").height/3)+20)}
            {index === renderedArray.length-1 
                && search === true ? Space(152.5):null}
            {index === renderedArray.length-1 && search === true 
                ? Space(40*(Math.ceil(relevantCategories.length / 3)))
                : null
            }
        </>
    )
}

export function FullCategorySquare({item, theme, lang, height}: FullCategorySquareProps) {
    const day = "startt" in item ? `${item.startt[8]}${item.startt[9]}` : new Date().getDate()
    const month = "startt" in item ? parseInt(item.startt[5] + item.startt[6]) : new Date().getMonth() + 1

    return (
        <View>
            <CategorySquare category={item.category} height={height} />

            <Text style={{
                ...ES.eventCardDayText,
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>{day}</Text>

            <Month
                month={month}
                color={FetchColor({theme, variable: "TEXTCOLOR"})}
                lang={lang}
            />
        </View>
    )
}

function Bell({item, lang, notification, clickedEvents, isOrange, theme, 
setClickedEvents}: BellProps): JSX.Element {
    return (
        <View style={ES.view3}>
            <TouchableOpacity onPress={() => {
                topic({topicID: `${item.eventID}`, lang, status: false, 
                    category: (item.category).toLowerCase(), catArray: 
                    notificationArray({notification, category: item.category})})
                setClickedEvents(
                    clickedEvents.some(event => event.eventID === item.eventID)
                    ? clickedEvents.filter((x) => x.eventID !== item.eventID)
                    : [...clickedEvents, item]
                )
            }}>
                <View style = {ES.bellPosition}>
                    <BellIcon orange={isOrange} theme={theme} />
                </View>
            </TouchableOpacity>
        </View>
    )
}