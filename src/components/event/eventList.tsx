import notificationArray from "@/utils/notificationArray"
import EventCardLocation from "@components/event/eventCardLocation"
import CategorySquare from "@/components/shared/category"
import topic from "@/utils/topic"
import Space, { Month } from "@/components/shared/utils"
import BellIcon from "@components/event/bellIcon"
import Cluster from "@/components/shared/cluster"
import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import { Navigation } from "@interfaces"
import T from "@styles/text"
import React from "react"
import {
    TouchableOpacity,
    Dimensions,
    FlatList,
    Text,
    View,
    Platform,
} from "react-native"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setClickedEvents } from "@redux/event"

type EventListProps = {
    navigation: Navigation
    renderedArray: EventProps[]
    search: boolean
    relevantCategories: CategoryWithID[]
    notification: NotificationProps
    lastSave: string
    events: EventProps[]
    ErrorMessage: React.FC<ErrorMessageProps>
}

type EventCardProps = {
    navigation: Navigation
    renderedArray: EventProps[]
    search: boolean
    relevantCategories: CategoryWithID[]
    notification: NotificationProps
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
}

type FullCategorySquareProps = {
    item: EventProps
    height?: number
}

type BellProps = {
    item: EventProps
    notification: NotificationProps
}

/**
 * Displays the event list
 */
export default function EventList ({
    navigation,
    renderedArray,
    search,
    relevantCategories,
    notification,
    lastSave,
    events,
    ErrorMessage
}: EventListProps): JSX.Element {

    if (!renderedArray.length && !search) {
        return <ErrorMessage argument="wifi" />
    }

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
                            search={search}
                            relevantCategories={relevantCategories}
                            notification={notification}
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
    />
}

/**
 * Displays one element of the event card array
 */
function EventCard ({
    navigation,
    renderedArray,
    search,
    relevantCategories,
    notification,
    lastSave,
    item,
    index
}: EventCardProps): JSX.Element {    
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate("SpecificEventScreen", {item: item})
            }}>
                {index === 0
                    ? search === false
                        ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                        : <Space height={Platform.OS === "ios" 
                        ? Dimensions.get("window").height / 4
                        : Dimensions.get("window").height / 3.6} />
                    : null}
                <Cluster marginVertical={8}>
                    <View style={ES.eventBack}>
                        <FullCategorySquare item={item} />
                        <EventCardLocation item={item} />
                        <Bell item={item} notification={notification} />
                    </View>
                </Cluster>
                <ListFooter
                    index={index}
                    renderedArray={renderedArray}
                    search={search}
                    relevantCategories={relevantCategories}
                    lastSave={lastSave}
                />
            </TouchableOpacity>
        </View>
    )
}

/**
 * Displays the footer last fetch time item
 */
export function ListFooter({index, renderedArray, search, relevantCategories, 
lastSave}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return (
        <>
            {index === renderedArray.length-1 && <Text style={{...T.contact, 
                color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastSave}.
                </Text>}
            {index === renderedArray.length - 1 && 
                <Space height={Dimensions.get("window").height / 3 + 20}/>}
            {index === renderedArray.length - 1 && search === true &&
                <Space height={40 * (Math.ceil(relevantCategories.length / 3)) + 152.5} />}
        </>
    )
}

/**
 * Displays the category square to the left of each event in the list on the EventScreen
 */
export function FullCategorySquare({item, height}: FullCategorySquareProps) {
    const day = "startt" in item ? `${item.startt[8]}${item.startt[9]}` : new Date().getDate()
    const month = "startt" in item ? parseInt(item.startt[5] + item.startt[6]) : new Date().getMonth() + 1
    const { theme } = useSelector((state: ReduxState) => state.theme)

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
            />
        </View>
    )
}

/**
 * Displays the bell to the right of every event in the eventlist
 */
function Bell({item, notification}: BellProps): JSX.Element {
    const { clickedEvents } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const isOrange = clickedEvents.some(event => event.eventID === item.eventID) 
        ? true 
        : false
    
    return (
        <View style={ES.view3}>
            <TouchableOpacity onPress={() => {
                topic({topicID: `${item.eventID}`, lang, status: false, 
                    category: (item.category).toLowerCase(), catArray: 
                    notificationArray({notification, category: item.category})})
                dispatch(setClickedEvents(
                    clickedEvents.some(event => event.eventID === item.eventID)
                    ? clickedEvents.filter((x) => x.eventID !== item.eventID)
                    : [...clickedEvents, item]
                ))
            }}>
                <View style = {ES.bellPosition}>
                    <BellIcon orange={isOrange} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
