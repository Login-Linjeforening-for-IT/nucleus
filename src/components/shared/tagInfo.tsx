import { Dimensions, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import GS from "@styles/globalStyles"
import no from "@text/tag/no.json"
import en from "@text/tag/en.json"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming 
} from "react-native-reanimated"
import { setTag } from "@redux/event"

export default function TagInfo() {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const TagInfo = lang ? no : en


    // Dimensions of the screen window
    const height = Dimensions.get("window").height
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
        translateY.value = withTiming(0)
    }

    // Checks if it has slid up yet, and slides it up if not
    if (shouldTrigger === true) {
        slideUp()
        setShouldTrigger(false)
    }

    if (tag) {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => setTag("")} style={{height: "100%", width: "100%", position: "absolute", zIndex: 2}}>
                <Animated.View style={[GS.animatedCard, animation, {backgroundColor: theme.darker, height: Dimensions.get("window").height / 2, width: "100%", position: "absolute", bottom: -50, borderRadius: 20}]}>
                    <Text style={{fontSize: 20, color: theme.textColor, textAlign: "center", top: 5}}>{tag}</Text>
                    <Text style={{fontSize: 18, padding: 5, color: theme.textColor}}>{getInfo()}</Text>
                </Animated.View>
            </TouchableOpacity>
        )
    } else {
        <Animated.View style={[GS.animatedCard, animation, {backgroundColor: theme.darker, height: Dimensions.get("window").height / 2, width: "100%", position: "absolute", bottom: -50, borderRadius: 20}]}>
            <Text style={{fontSize: 20, color: theme.textColor, textAlign: "center", top: 5}}>{tag}</Text>
            <Text style={{fontSize: 18, padding: 5, color: theme.textColor}}>{getInfo()}</Text>
        </Animated.View>
    }
}