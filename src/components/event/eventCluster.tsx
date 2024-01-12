import Cluster from "@components/shared/cluster"
import { Navigation } from "@interfaces"
import { useNavigation } from "@react-navigation/native"
import { setEvent, toggleSearch } from "@redux/event"
import { LinearGradient } from "expo-linear-gradient"
import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import EventClusterTitle from "./EventClusterTitle"
import Bell from "./bell"
import ES from "@styles/eventStyles"
import CategorySquare from "@components/shared/category"
import Space, { Month } from "@components/shared/utils"
import T from "@styles/text"

type EventClusterProps = {
    notification: NotificationProps
    item: EventProps
    index: number
    embed?:boolean
}

type FullCategorySquareProps = {
    item: EventProps | DetailedEvent
    height?: number
}

/**
 * Displays one element of the event card array
 */
export default function EventCluster ({notification, item, index, embed}: EventClusterProps): 
JSX.Element {
    const { search } = useSelector((state: ReduxState) => state.event)
    const navigation: Navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <View style={item.highlight && {marginVertical: 2}}>
            <TouchableOpacity onPress={() => {
                search && dispatch(toggleSearch())
                dispatch(setEvent(item))
                navigation.navigate("SpecificEventScreen")
            }}>
                <LinearGradient start={[0, 0.5]}
                  end={[1, 0.5]}
                  // The non highlited items get wraped in an transparrent container
                  colors={item.highlight ? ['#FF512F', '#F09819', '#FF512F'] : ['#000000cc', '#000000cc']}
                  style={{borderRadius: 5, marginBottom: item.highlight ? 2 : 0
                }}>
                    <Cluster marginVertical={8} highlight={item.highlight}>
                        <View style={{...ES.eventBack, left: embed ? -5 : 0}}>
                            <FullCategorySquare item={item} />
                            <EventClusterTitle item={item} />
                            <Bell item={item} notification={notification} embed={embed} />
                        </View>
                    </Cluster>
                </LinearGradient>
            </TouchableOpacity>
            <ListFooter index={index} />
        </View>
    )
}

/**
 * Displays the footer last fetch time item
 */
function ListFooter ({index}: ListFooterProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { lastFetch, renderedEvents } = useSelector((state: ReduxState) => state.event)

    return (
        <>
            {index === renderedEvents.length-1 && <Text style={{...T.contact, 
                color: theme.oppositeTextColor}}>
                    {lang ? "Oppdatert kl:":"Updated:"} {lastFetch}.
                </Text>}
            {index === renderedEvents.length - 1 && 
                <Space height={Dimensions.get("window").height / 7}/>}
        </>
    )
}

/**
 * Displays the category square to the left of each event in the list on the EventScreen
 */
function FullCategorySquare({item, height}: FullCategorySquareProps): JSX.Element {
    const day = "time_start" in item ? `${item.time_start[8]}${item.time_start[9]}` : new Date().getDate()
    const month = "time_start" in item ? parseInt(item.time_start[5] + item.time_start[6]) : new Date().getMonth() + 1
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
            <CategorySquare color={item.category_color} height={height} />
            <Text style={{...ES.eventClusterDayText, color: theme.textColor}}>
                {day}
            </Text>
            <Month month={month} color={theme.textColor} />
        </View>
    )
}
