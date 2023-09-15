// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
// import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"       // Notifications
// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

import { ScreenProps } from "@interfaces"
import { useEffect, useState } from "react"

export default function NavigateFromPushNotification({ navigation }: ScreenProps) {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
    return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
    
    const [event, setEvent] = useState<{ [key: string]: string } 
    | undefined>(undefined)

    useEffect(() => {
        // Check whether the app was opened from a tapped notification
        const unsubscribeOnOpen = messaging().onNotificationOpenedApp(
            (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            setEvent(remoteMessage.data)
        })

        // Check if the app was opened by a notification when it was terminated
        messaging().getInitialNotification().then((remoteMessage: 
            FirebaseMessagingTypes.RemoteMessage | null) => {
            if (remoteMessage && 'data' in remoteMessage) {
                setEvent(remoteMessage.data)
            }
        })

        return unsubscribeOnOpen
    })

    // Handles foreground, should display a custom push notification in-app
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage: 
            FirebaseMessagingTypes.RemoteMessage) => {
            // TODO: Setup a custom dropdown before adding this to let the user 
            // know what happened
            setEvent(remoteMessage.data)
        })

        return unsubscribe
    }, [])

    if (event) {
        const temp = event
        setEvent(undefined)
        navigation.navigate("SpecificEventScreen", {item: temp})
    }
}
