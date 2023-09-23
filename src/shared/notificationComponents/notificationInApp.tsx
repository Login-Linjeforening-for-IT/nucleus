import FetchColor from "@styles/fetchTheme"
import React, { useEffect } from "react"
import { GS } from "@styles/globalStyles"
import { View, Text, Platform, TouchableOpacity } from "react-native"
import { BlurView } from "expo-blur"
import { Navigation, ScreenProps } from "@interfaces"

type NotificationInAppProps = {
    title: string
    body: string
    data: any
    theme: number
}

export default function NotificationInApp(props: NotificationInAppProps, 
navigation: Navigation): JSX.Element {
    console.log(props)
    // useEffect(() => {

    // }, [])
    const title = props.title.length > 35 ? `${props.title.slice(0,35)}...` : props.title
    const body = props.body.length > 70 ? `${props.body.slice(0,70)}...` : props.body

    return (
        <>
            {Platform.OS === "ios"
                    ? <BlurView style={GS.notificationDropdownBlur} intensity={50}/>
                    : <View style={{
                        ...GS.notificationDropdown,
                        backgroundColor: FetchColor({theme: props.theme,
                            variable: "TRANSPARENTANDROID"})}}
                />}
            <TouchableOpacity style={GS.notificationDropdownTouchable} onPress={() => {
                // navigation.navigate("SpecificEventScreen", {item: props})
            }}>
                <View style={GS.notificationDropdown}>
                    <Text style={{
                        ...GS.notificationDropdownTitle,
                        color: FetchColor({theme: props.theme, variable: "TEXTCOLOR"}),
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        ...GS.notificationDropdownBody,
                        color: FetchColor({theme: props.theme, variable: "TEXTCOLOR"}),
                    }}>
                        {body}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}