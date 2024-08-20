import { setClickedEvents } from "@redux/event"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"

export default function JoinButton() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event, clickedEvents } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()
    const text = lang ? "Meld meg på" : "Join event"
    
    function updateStorage() {
        if (!clickedEvents.some(clicked => clicked.id === event?.event?.id)) {
            dispatch(setClickedEvents([...clickedEvents, event]))
        }
    }

    if (event?.event?.link_signup) {
        return (
            <TouchableOpacity onPress={() => {
                updateStorage()
                Linking.openURL(event.event.link_signup)
            }}>
                <View style={{...ES.eventButton, backgroundColor: theme.orange}}>
                    <Text style={{...T.centered20, color: theme.textColor, paddingTop: 2}}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}