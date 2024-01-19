import { Dimensions, Platform, Text, TouchableOpacity } from "react-native"
import GS from "@styles/globalStyles"
import no from "@text/tag/no.json"
import en from "@text/tag/en.json"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS
} from "react-native-reanimated"
import { setTag } from "@redux/event"
import { useDispatch } from "react-redux"

export default function TagInfo() {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const TagInfo = lang ? no : en

    const [isMounted, setIsMounted] = useState(false);
    const [initial, setInitial] = useState(true)
    const initialDelay = 150;

    useEffect(() => {
        // Set isMounted to true once the component is mounted
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Trigger the initial slide-up animation when the component mounts
        if (isMounted) {
            runOnJS(slideUp)();
            runOnJS(setVisible)(true);
        }
    }, [isMounted, tag])

    // Dimensions of the screen window
    const height = Dimensions.get("window").height

    // Shared value for reanimated library
    const translateY = useSharedValue(height)

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
        setTimeout(() => {
            translateY.value = withTiming(200, { duration: 200 } )
        }, 350 + (initial ? initialDelay : 0));
        setInitial(false)
    }

    function slideDown() {
        translateY.value = withTiming(400, { duration: 200 })
    }

    function changeVisibility() {
        if (visible) {
            runOnJS(slideDown)()
            setTimeout(() => {
                runOnJS(dispatch)(setTag(''));
                runOnJS(setVisible)(false);
            }, 300);
        } else {
            runOnJS(slideUp)()
            runOnJS(setVisible)(true)
        }
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => changeVisibility()} style={{backgroundColor: theme.transparentAndroid, height: Platform.OS=="ios" ? "100%" : "95%", width: "100%", position: "absolute", zIndex: tag ? 1 : -1}}>
            <Animated.View style={[GS.animatedCard, animation, {backgroundColor: theme.dark, alignItems: "center"}]}>
                <Text style={{fontSize: 20, color: theme.textColor, marginVertical: 5}}>{tag}</Text>
                <Text style={{fontSize: 18, color: theme.textColor}}>{getInfo()}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}