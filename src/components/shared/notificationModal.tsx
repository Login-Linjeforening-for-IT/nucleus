import React from "react"
import GS from "@styles/globalStyles"
import { BlurView } from "expo-blur"
import { Navigation } from "@interfaces"
import { View, Text, Platform, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootStackProps } from "@utils/screenTypes"

export default function NotificationModal({route: { params }}: RootStackProps<'NotificationModal'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const navigation: Navigation = useNavigation()
    const isIOS = Platform.OS === "ios"

    // Makes a deep clone since params is read only
    const item = JSON.parse(JSON.stringify(params))

    if (!('title' in item)) {
        item.title = ""
    }

    if (!('body' in item)) {
        item.body = ""
    }

    if (!('data' in item)) {
        item.data = {}
    }

    const title = item.title.length > 35 ? `${item.title.slice(0,35)}...` : item.title
    const body = item.body.length > 70 ? `${item.body.slice(0,70)}...` : item.body

    return (
        <TouchableOpacity 
            style={{flex: 1}}
            onPress={() => navigation.goBack()}
            activeOpacity={1}
        >
            {isIOS
                ? <BlurView style={GS.notificationDropdownBlur} intensity={50}/>
                : <View style={{backgroundColor: theme.transparentAndroid}}
            />}
            <TouchableOpacity 
                style={{
                    ...GS.notificationDropdownTouchable, 
                    backgroundColor: isIOS ? undefined : theme.transparent
                }} 
                onPress={() => {
                    if (Object.keys(item.data).length) {
                        navigation.navigate("SpecificEventScreen", {item: item.data})
                    } else {
                        navigation.navigate("NotificationScreen")
                    }
                }}
            >
                <View>
                    <Text style={{
                        ...GS.notificationDropdownTitle,
                        color: theme.textColor
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        ...GS.notificationDropdownBody,
                        color: theme.textColor,
                    }}>
                        {body}
                    </Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
