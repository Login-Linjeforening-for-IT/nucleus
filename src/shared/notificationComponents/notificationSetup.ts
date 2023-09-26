import { setNotificationStateTrue } from "@redux/notifications"
import { useDispatch } from "react-redux"

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6
// import messaging from "@react-native-firebase/messaging"
// import subscribeToTopic from "@shared/notificationComponents/subscribeToTopic"
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6

type initializeNotificationsProps = {
    shouldRun: boolean
    hasBeenSet: boolean
    setShouldSetupNotifications: React.Dispatch<React.SetStateAction<boolean>>
}

// Sets up initial notifications
export default function initializeNotifications ({shouldRun, hasBeenSet, 
setShouldSetupNotifications }: initializeNotificationsProps) {
    if (shouldRun && !hasBeenSet) {
        notificationSetup()
        setShouldSetupNotifications(false) 
    } 
}

/**
 * Runs when the app is first opened to setup initial notifications
 */
export async function notificationSetup() {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 2/6
    return null // For testing in Expo
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 2/6
    const dispatch = useDispatch()
    const granted = await messaging().requestPermission()

    if (granted) {
        await subscribeToTopic("norwegianIMPORTANT")
        await subscribeToTopic("norwegianBEDPRES")
        await subscribeToTopic("norwegianTEKKOM")
        await subscribeToTopic("norwegianCTF")
        await subscribeToTopic("norwegianSOCIAL")
        await subscribeToTopic("norwegianKARRIEREDAG")
        await subscribeToTopic("norwegianFADDERUKA")
        await subscribeToTopic("norwegianLOGIN")
        await subscribeToTopic("norwegianANNET")
    }

    dispatch(setNotificationStateTrue({category: "SETUP"}))
}