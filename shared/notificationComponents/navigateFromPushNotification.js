import messaging from '@react-native-firebase/messaging';       // Notifications
import { useEffect, useState } from 'react';

export default function NavigateFromPushNotification({ navigation }) {
    const [event, setEvent] = useState()

    useEffect(() => {
        // Check whether the app was opened from a tapped notification
        const unsubscribeOnOpen = messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage.data) setEvent(remoteMessage.data)
        });

        // Check if the app was opened by a notification when it was terminated
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                if (remoteMessage.data) setEvent(remoteMessage.data)
            }
            });

        return unsubscribeOnOpen;
    })

    // Handles foreground, should display a custom push notification in-app
    useEffect(() => {
        const unsubscribe = messaging().onMessage(remoteMessage => {
            // Setup a custom dropdown before adding this to let the user know what happened.
            // if (remoteMessage.data) setEvent(remoteMessage.data)
        })

        return unsubscribe
    }, [])

    if (event) {
        const temp = event
        setEvent(null)
        navigation.navigate("SpecificEventScreen", {item: temp})
    }
}