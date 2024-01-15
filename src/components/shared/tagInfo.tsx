import { Dimensions, Text, TouchableOpacity } from "react-native"
import GS from "@styles/globalStyles"
import no from "@text/tag/no.json"
import en from "@text/tag/en.json"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming 
} from "react-native-reanimated"
import { setTag } from "@redux/event"
import { useDispatch } from "react-redux"

export default function TagInfo() {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()
    const TagInfo = lang ? no : en

    // Dimensions of the screen window
    const height = 500
    const width = Dimensions.get("window").width

    // Shared value for reanimated library
    const translateY = useSharedValue(height)

    // Trigger for slideUp animation
    const [shouldTrigger, setShouldTrigger] = useState(false)

    // Tries to hide the component, checks to avoid double calls
    const [hiding, setHiding] = useState(false)
    function tryToHide() {
        if (!hiding) {
            setHiding(true)
            // runOnJS(() => hide())
        }
    }

    function getInfo() {
        const keys = Object.keys(TagInfo)
        const values = Object.values(TagInfo)
        const index = keys.indexOf(tag)
        return values[index]
    }

    // Animates the sliding
    const animation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    })

    // Slides the card up from the bottom
    function slideUp() {
        translateY.value = withTiming(200)
    }

    // Checks if it has slid up yet, and slides it up if not
    if (shouldTrigger === true) {
        slideUp()
        setShouldTrigger(false)
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => {dispatch(setTag('')); setShouldTrigger(true)}} style={{height: "100%", width: "100%", position: "absolute", zIndex: tag ? 1 : -1}}>
            <Animated.View style={[GS.animatedCard, animation, {backgroundColor: theme.dark, alignItems: "center"}]}>
                <Text style={{fontSize: 20, color: theme.textColor, marginVertical: 5}}>{tag}</Text>
                <Text style={{fontSize: 18, color: theme.textColor}}>{getInfo()}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}