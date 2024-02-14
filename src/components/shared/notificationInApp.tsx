import React from "react"
import GS from "@styles/globalStyles"
import { View, Text, Platform, TouchableOpacity } from "react-native"
import { BlurView } from "expo-blur"

type NotificationInAppProps = {
    title: string
    body: string
    data: any
    theme: Theme
}

export default function NotificationInApp(props: NotificationInAppProps): JSX.Element {
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
                        backgroundColor: props.theme.transparentAndroid}}
                />}
            <TouchableOpacity style={GS.notificationDropdownTouchable} onPress={() => {
                // navigation.navigate("SpecificEventScreen", {item: props})
            }}>
                <View style={GS.notificationDropdown}>
                    <Text style={{
                        ...GS.notificationDropdownTitle,
                        color: props.theme.textColor,
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        ...GS.notificationDropdownBody,
                        color: props.theme.textColor,
                    }}>
                        {body}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}
