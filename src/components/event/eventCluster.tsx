import Cluster from "@components/shared/cluster"
import { Navigation } from "@interfaces"
import { useNavigation } from "@react-navigation/native"
import { setEvent, toggleSearch } from "@redux/event"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { FullCategorySquare, ListFooter } from "./eventList"
import EventClusterTitle from "./EventClusterTitle"
import Bell from "./bell"
import ES from "@styles/eventStyles"

type EventClusterProps = {
    notification: NotificationProps
    item: EventProps
    index: number
    embed?:boolean
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