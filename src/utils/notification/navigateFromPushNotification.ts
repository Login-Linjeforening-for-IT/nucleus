import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Navigation } from '@/interfaces'

type StoreNotificationProps = {
    title: string
    body: string
    data: any
}

/**
 * Navigates from a push notification to the relevant page using Expo Notifications.
 */
export default function NavigateFromPushNotification() {
    const navigation: Navigation = useNavigation()
    const [event, setEvent] = useState<{ [key: string]: any } | undefined>(undefined)

    useEffect(() => {
        // Request permissions on mount
        registerForPushNotificationsAsync()

        // Listener for notifications received while app is in foreground
        const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
            const { title, body, data } = notification.request.content
            StoreNotification({ title: title || '', body: body || '', data })
            navigation.navigate('NotificationModal', { title, body, data })
        })

        // Listener for notifications tapped/opened by the user
        const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            const { title, body, data } = response.notification.request.content
            StoreNotification({ title: title || '', body: body || '', data })

            if (Object.keys(data || {}).length) {
                setEvent(data)
            } else {
                navigation.navigate('NotificationScreen')
            }
        })

        return () => {
            foregroundSubscription.remove()
            responseSubscription.remove()
        }
    }, [])

    // Navigate to specific event if needed
    useEffect(() => {
        if (event) {
            const temp = event
            setEvent(undefined)
            navigation.navigate('SpecificEventScreen', { item: temp })
        }
    }, [event])
}

/**
 * Stores notifications in AsyncStorage
 */
async function StoreNotification({ title, body, data }: StoreNotificationProps) {
    const storedString = await AsyncStorage.getItem('notificationList')
    let storedArray: any[] = []

    if (storedString) {
        storedArray = JSON.parse(storedString)
    }

    storedArray.unshift({ title, body, data, time: new Date() })
    await AsyncStorage.setItem('notificationList', JSON.stringify(storedArray))
}

/**
 * Requests Expo Push Notification permissions and returns the token if granted
 */
async function registerForPushNotificationsAsync(): Promise<string | null> {
    if (!Constants.isDevice) {
        console.warn('Push notifications are not supported on simulators')
        return null
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notifications!')
        return null
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data
    return token
}
