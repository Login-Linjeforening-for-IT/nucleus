// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
// import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"
// COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

import { ScreenProps } from "@interfaces"
import { useEffect, useState } from "react"
import NotificationInApp from "@/components/shared/notificationInApp"
import { useDispatch } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface PushNotificationProps extends ScreenProps {
    theme: number
    setPushNotification: React.Dispatch<React.SetStateAction<boolean>>
    setPushNotificationContent: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
}

type StoreNotificationProps = {
    title: string
    body: string
    data: any
}

/**
 * Navigates from a push notification to the relevant page
 * 
 * Example remoteMessage:
 * 
 * messageId: stringified number - Id of the message
 * 
 * data: object - Contains data object passed with notification, typically 
 * contains an event or a page to navigate to
 * 
 * notification {
 *    title: string - Notification title,
 *    body: string - Notification body
 * }
 * 
 * from: stringified number - Id of the topic as a number
 * 
 * @param {Navigation} navigation Navigation from BottomTabNavigation
 */
export default function NavigateFromPushNotification({ navigation, theme, 
setPushNotification, setPushNotificationContent }: PushNotificationProps) {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
    return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

    const [event, setEvent] = useState<{ [key: string]: any } 
    | undefined>(undefined)

    useEffect(() => {
        // Check whether the app was opened from a tapped notification
        const unsubscribeOnOpen = messaging().onNotificationOpenedApp(
            (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                if (remoteMessage && remoteMessage.notification 
                    && remoteMessage.notification.title 
                    && remoteMessage.notification.body) {
                        const title = remoteMessage.notification.title
                        const body = remoteMessage.notification.body
                        const data = remoteMessage.data
        
                        StoreNotification({title, body, data})
                        setEvent(remoteMessage.data)
                }
        })

        // Check if the app was opened by a notification when it was terminated
        messaging().getInitialNotification().then((remoteMessage: 
            FirebaseMessagingTypes.RemoteMessage | null) => {
                if (remoteMessage && remoteMessage.notification 
                    && remoteMessage.notification.title 
                    && remoteMessage.notification.body) {
                        const title = remoteMessage.notification.title
                        const body = remoteMessage.notification.body
                        const data = remoteMessage.data
        
                        StoreNotification({title, body, data})
                        setEvent(remoteMessage.data)
                }
        })

        return unsubscribeOnOpen
    })

    // Handles foreground, should display a custom push notification in-app
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage: 
            FirebaseMessagingTypes.RemoteMessage) => {
            if (remoteMessage && remoteMessage.notification 
            && remoteMessage.notification.title 
            && remoteMessage.notification.body) {
                const title = remoteMessage.notification.title
                const body = remoteMessage.notification.body
                const data = remoteMessage.data

                StoreNotification({title, body, data})
                setPushNotification(true)

                const notificationElement = (
                    () => NotificationInApp({title, body, data, theme}, navigation)
                )
                setPushNotificationContent(notificationElement)
            }
        })

        return unsubscribe
    }, [])

    if (event) {
        const temp = event
        setEvent(undefined)
        navigation.navigate("SpecificEventScreen", {item: temp})
    }
}

/**
 * Stores notifications in the notification list
 * 
 * @param title Title of the notification
 * @param body Body of the notification
 * @param data Event data sent with the notification
 */
function StoreNotification({ title, body, data }: StoreNotificationProps) {
    (async() => {
        // Get the stored notification list from AsyncStorage
        const storedString = await AsyncStorage.getItem("notificationList")
        let storedArray = []

        // Check if the list contained anything, and if so set it as the stored array
        if (storedString) {
            storedArray = JSON.parse(storedString)
        }

        // Adds the new notification to the start of the list
        const newItem = { title, body, data, time: new Date() }
        storedArray.unshift(newItem)
        
        // Store the updated array back to AsyncStorage
        await AsyncStorage.setItem("notificationList", JSON.stringify(storedArray))
    })()
}
