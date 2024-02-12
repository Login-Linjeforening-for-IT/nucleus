import { Platform, Text, TouchableOpacity } from "react-native"
import GS from "@styles/globalStyles"
import no from "@text/tag/no.json"
import en from "@text/tag/en.json"
import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
    interpolate
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

    // Event handlers
    const [isMounted, setIsMounted] = useState(false)
    const [initial, setInitial] = useState(true)
    const initialDelay = 150
    const height = 400

    // Shared value for reanimated library
    const translateY = useSharedValue(height)
    const opacity = useSharedValue(0)

    useEffect(() => {
        // Set isMounted to true once the component is mounted
        setIsMounted(true)
    }, [])

    useEffect(() => {
        // Trigger the initial slide-up animation when the component mounts
        if (isMounted) {
            runOnJS(slideUp)()
            runOnJS(setVisible)(true)
        }
    }, [isMounted, tag])


    function getInfo() {
        const values = Object.values(TagInfo)

        for (const value of values) {
            if (value.title === tag.title) {
                return value.body
            }
        }

        return ''
    }
    
    // Animates the sliding 
    const animation = useAnimatedStyle(() => {
        const interpolatedOpacity = interpolate(translateY.value, [200, 400], [1, 0])
        opacity.value = interpolatedOpacity

        return {
            transform: [{ translateY: translateY.value }],
            opacity: interpolatedOpacity
        }
    })

    // Slides the card up from the bottom
    function slideUp() {
        setTimeout(() => {
            translateY.value = withTiming(200, { duration: 300 } )
        }, 350 + (initial ? initialDelay : 0))
        setInitial(false)
    }

    function slideDown() {
        translateY.value = withTiming(400, { duration: 300 })
    }

    function changeVisibility() {
        if (visible) {
            runOnJS(slideDown)()
            setTimeout(() => {
                runOnJS(dispatch)(setTag({ title: "", body: "" }))
            }, 120);
            setTimeout(() => {
                runOnJS(setVisible)(false)
            }, 100)
        } else {
            runOnJS(slideUp)()
            runOnJS(setVisible)(true)
        }
    }

    return (
        <TouchableOpacity 
            activeOpacity={1}
            onPress={() => changeVisibility()} 
            style={{
                opacity: interpolate(translateY.value, [200, 400], [1, 0]),
                backgroundColor: theme.transparentAndroid,
                height: Platform.OS=="ios" ? "100%" : "95%",
                width: "100%",
                position: "absolute",
                zIndex: tag.title ? 1 : -1,
            }}>
            <Animated.View style={[GS.animatedCard, animation, {backgroundColor: theme.dark, alignItems: "center"}]}>
                <Text style={{fontSize: 20, color: theme.textColor, marginTop: 5}}>{tag.title || ''}</Text>
                <Text style={{fontSize: 18, color: theme.textColor, margin: 5, marginHorizontal: 12}}>{getInfo() || ''}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
}
