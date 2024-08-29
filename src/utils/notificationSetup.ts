import { setNotificationStateTrue } from "@redux/notifications"
import { useDispatch } from "react-redux"
import messaging from "@react-native-firebase/messaging"
import subscribeToTopic from "@utils/subscribeToTopic"
import { Dispatch, UnknownAction } from "redux"
import { resetTheme } from "@redux/theme"
import { Alert, PermissionsAndroid, Platform } from "react-native"

type initializeNotificationsProps = {
    shouldRun: boolean
    hasBeenSet: boolean[]
    setShouldSetupNotifications: React.Dispatch<React.SetStateAction<boolean>>
    dispatch: Dispatch<UnknownAction>
}

/**
 * Sets up initial notifications
 * @param shouldRun Specifies if notifications should be initialised, starts as true and is set to false when the setup is completed 
 * @param hasBeenSet Specifies if the notifications have already been initialized, in which case it will not run. Used between rerenders before hasBeenSet has updated
 * @param setShouldSetupNotifications Setter function for the shouldRun variable
 */
export default function initializeNotifications ({shouldRun, hasBeenSet, 
setShouldSetupNotifications, dispatch }: initializeNotificationsProps) {
    if (shouldRun && !hasBeenSet[1]) {
        dispatch(resetTheme())
        notificationSetup()
        setShouldSetupNotifications(false) 
    } 
}

/**
 * Runs when the app is first opened to setup initial notifications
 */
export async function notificationSetup() {
    const dispatch = useDispatch()
    const granted = await messaging().requestPermission()

    if (granted) {
        const topics = ["IMPORTANT", "BEDPRES", "TEKKOM", "CTF", "SOCIAL", "KARRIEREDAG", "FADDERUKA", "LOGIN", "ANNET"]

        for (const topic of topics) {
            await subscribeToTopic(`n${topic}`)
        }
    }

    dispatch(setNotificationStateTrue({category: "SETUP"}))
}

export async function requestNotificationPermission() {
    console.log(Platform.Version)
    try {
        // Check if we're on Android, as POST_NOTIFICATIONS is Android-specific
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const notificationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    
            if (!notificationPermission) {
                // If permission not already granted, request it
                const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                
                if (status === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Notification permission granted.');
                    return true;
                } else if (status === PermissionsAndroid.RESULTS.DENIED) {
                    Alert.alert(
                        'Notification Permission Denied',
                        'Notification permission was denied. Please allow it to receive notifications.',
                        [{ text: 'OK', onPress: () => {} }]
                    );
                    return false;
                } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    Alert.alert(
                        'Notification Permission Disabled',
                        'You have disabled notification permissions. To enable notifications, go to Settings > Apps > Login > Notifications.',
                        [{ text: 'OK', onPress: () => {} }]
                    )
                    return false
                }
            } else {
                console.log('Notification permission already granted.')
                return true
            }
        } else {
            // For iOS, use Firebase's requestPermission API
            const authStatus = await messaging().requestPermission()
            const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL
    
            if (enabled) {
                console.log('Notification permission granted.');
                return true;
            } else {
                Alert.alert(
                    'Notification Permission Denied',
                    'Notification permission was denied. Please allow it to receive notifications.',
                    [{ text: 'OK', onPress: () => {} }]
                );
                return false;
            }
        }
    } catch (error) {
        console.error('Failed to request notification permission', error);
        Alert.alert(
            'Error',
            'An error occurred while requesting notification permission. Please try again later.',
            [{ text: 'OK', onPress: () => {} }]
        );
        return false;
    }
}