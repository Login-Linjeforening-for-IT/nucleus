import { setNotificationStateTrue } from "@redux/notifications"
import { useDispatch } from "react-redux"
import messaging from "@react-native-firebase/messaging"
import subscribeToTopic from "@utils/subscribeToTopic"
import { Dispatch, UnknownAction } from "redux"
import { resetTheme } from "@redux/theme"
import { PermissionsAndroid } from "react-native"

type initializeNotificationsProps = {
    shouldRun: boolean
    hasBeenSet: boolean
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
    if (shouldRun && !hasBeenSet) {
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
    if(await messaging().requestPermission()){
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        }
        // TODO: Handle denied permission and request to never prompt again
    }
}
