import BellIcon from "@components/shared/bellIcon"
import ES from "@styles/eventStyles"
import { TouchableOpacity, View } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { setClickedEvents } from "@redux/event"
import TopicManager from "@utils/topicManager"

type BellProps = {
    item: EventProps
    embed?: boolean
}


/**
 * Displays the bell to the right of every event in the eventlist
 */
export default function Bell({item, embed}: BellProps): JSX.Element {
    const { clickedEvents } = useSelector((state: ReduxState) => state.event)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const prefix = lang ? 'n' : 'e'
    const topic = `${prefix}${item.id}`

    function isClicked() {
        for (const event of clickedEvents) {
            if (event.id === item.id) return true
        }
        return false
    }
    // Checks if the bell should be orange instead of gray
    const isOrange = clickedEvents.some(event => event.id === item.id) 
        ? true 
        : false
    
    // Prevents X from being clickable
    if (item.canceled) return (
        <View style={ES.view3}>
            <View style={ES.bellPosition} >
                <BellIcon orange={isOrange} canceled={item.canceled} />
            </View>
        </View>
    )

    
    function handleClick() {
        dispatch(setClickedEvents(
            clickedEvents.some(event => event.id === item.id)
            ? clickedEvents.filter((x) => x.id !== item.id)
            : [...clickedEvents, item]
            ))
        TopicManager({topic, unsub: isClicked() ? true : false})
    }
    
    return (
        <View style={{...ES.view3, right: embed ? 0 : 5}}>
            <TouchableOpacity style={{paddingBottom: 30}} onPress={handleClick}>
                <View style={ES.bellPosition} >
                    <BellIcon orange={isOrange} canceled={item.canceled} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
