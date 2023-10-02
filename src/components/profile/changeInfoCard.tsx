import { PanGestureHandler } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import FetchColor from "@styles/fetchTheme"
import { PS } from "@styles/profileStyles"
import { Line } from "@/components/shared/utils"
import React, {useEffect, useState} from "react"
import { T } from "@styles/text"

import {
    TouchableOpacity,
    Dimensions,
    TextInput,
    Keyboard,
    View,
    Text,
} from "react-native"

import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    runOnJS,
} from "react-native-reanimated"

import {
    setAllergies,
    setPreferences,
    setMail,
    setSchoolyear,
    setDegree
} from "@redux/profile"

type ChangeInfoCardProps = {
    theme: number
    lang: boolean
    type: string
    value: number
    hide: () => void
    trigger: boolean
}

/**
 * Function for drawing a very small square of the category of the event
 *
 * @param {string} category    Category of the event, Format: "CATEGORY"
 * @returns                     Small circle of the categories color
 */
export default function ChangeInfoCard({theme, lang, type, value, hide,
trigger}: ChangeInfoCardProps) {

    // Dispatch to change Redux states
    const dispatch = useDispatch()

    // Profile info
    const { degree, schoolyear, mail, preferences, allergies } = 
        useSelector((state: ReduxState) => state.profile)
    const profile = { degree, schoolyear, mail, preferences, allergies }

    // Checks if any info has been edited by the user
    const [edited, setEdited] = useState(false)
    const [text, setText] = useState("")

    // Dimensions of the screen window
    const height = Dimensions.get("window").height
    const width = Dimensions.get("window").width

    // Shared value for reanimated library
    const translateY = useSharedValue(height)

    // Trigger for slideUp animation
    const [shouldTrigger, setShouldTrigger] = useState(trigger)

    // Tries to hide the component, checks to avoid double calls
    const [hiding, setHiding] = useState(false)
    const tryToHide = () => {
        if (!hiding) {
            setHiding(true)
            runOnJS(() => hide())
        }
    }

    // Starts increasing value when swiping starts
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: CTX) => {
            ctx.startY = translateY.value
        },
        // Changes height according to swiping
        onActive: (event, ctx) => {
            translateY.value = ctx.startY + event.translationY
        },
        // Sets the component to hidden when its not visible
        onEnd: (event) => {
            if (event.velocityY > height/2) {
                translateY.value = withTiming(height)
                runOnJS(Keyboard.dismiss)()
            } else {
                translateY.value = withTiming(0)
            }
        },
    })

    // Animates the sliding
    const animation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    })

    // Slides the card up from the bottom
    const slideUp = () => {
        translateY.value = withTiming(0)
    }

    // Checks if it has slid up yet, and slides it up if not
    if (shouldTrigger === true) {
        slideUp()
        setShouldTrigger(false)
    }

    useEffect(() => {
        // Add listener
        const keyboardListener = Keyboard.addListener("keyboardDidHide", 
            _keyboardDidHide)

        // Cleanup function
        return () => {
            keyboardListener.remove()
        }
    }, [])

    // Checks if the keyboard did hide, and if so closes the component
    const _keyboardDidHide = () => {
        translateY.value = withTiming(height)
        tryToHide()
    }

    const checkChange = () => {
        // if (profile[value] != text && text.length > 0) {
        //     setEdited(true)
        // } else {
        //     setEdited(false)
        // }
    }

    const handleText = (val: string) => {
        setText(val)
        checkChange()
    }

    const save = () => {
        switch (value) {
            case 0: dispatch(setDegree(text));       break
            case 1: dispatch(setSchoolyear(text));   break
            case 2: dispatch(setMail(text));         break
            case 3: dispatch(setPreferences(text));  break
            case 4: dispatch(setAllergies(text));    break
        }
    }

    const findBestPlaceHolder = () => {
        switch (value) {
            case 0: return (profile.degree      ? profile.degree      : type)
            case 1: return (profile.schoolyear  ? profile.schoolyear  : type)
            case 2: return (profile.mail        ? profile.mail        : type)
            case 3: return (profile.preferences ? profile.preferences : type)
            case 4: return (profile.allergies   ? profile.allergies   : type)
        }
    }

    // Returns the visual card component
    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[
                    PS.animatedCard, animation,
                    {backgroundColor: FetchColor({theme, variable: "DARKER"})}
                ]}>
                <View style={[
                    PS.animatedView,
                    {backgroundColor: FetchColor({theme, variable: "DARKER"})}
                ]}>
                    <TextInput
                        style={{
                            ...PS.inputText,
                            top: 25,
                            fontSize: 20,
                            color: FetchColor({theme, variable: "TEXTCOLOR"})
                        }}
                        placeholder = {findBestPlaceHolder()}
                        placeholderTextColor={FetchColor({theme,
                            variable: "TITLETEXTCOLOR"})}
                        textAlign="center"
                        keyboardType={value === 1
                            ? "numeric"
                            : value === 2
                                ? "email-address"
                                : "default"
                        }
                        onChangeText={(val) => handleText(val)}
                        autoFocus={true}
                        selectionColor={FetchColor({theme, variable: "ORANGE"})}

                    />
                    <View style={PS.inputInfoView}>
                        <TouchableOpacity style={{left: 20}} onPress={() => tryToHide()}>
                            <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Avbryt" : "Cancel"}</Text>
                        </TouchableOpacity>
                        <Text style={{...T.centered15, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{type}</Text>

                        {edited ?
                            <TouchableOpacity style={{right: 20, backgroundColor: "red"}} onPress={() => save()}>
                                <Text style={{...T.centered15, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Lagre" : "Save"}</Text>
                            </TouchableOpacity>
                        :
                            <Text style={{...T.centered15, right: 20, color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})}}>{lang ? "Lagre" : "Save"}</Text>
                        }
                    </View>
                    <View style={[PS.centeredLine, {top: 20}]}>
                        {Line({height: 2, width: width*(2/3), fill: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})})}
                    </View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    )
}