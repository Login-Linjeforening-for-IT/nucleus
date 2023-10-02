import FetchColor from "@styles/fetchTheme"
import NS from "../../styles/notificationStyles"
import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"

type NotificationTextProps = {
    theme: number
    title: string
    body: string
}

/**
 * Visual representation of the location on the Notification Cluster
 *
 * @returns JSX Element containing the text displayed for each notification
 */
export default function NotificationText({title, body}: NotificationTextProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    
    return (
        <View>
            <View>
                <Text style={{
                    ...NS.title, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {title}
                </Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={{
                    ...NS.loc,
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {body}
                </Text>
            </View>
        </View>
    )
}
