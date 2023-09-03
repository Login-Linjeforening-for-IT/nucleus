import { changeNotificationState } from '../../redux/notifications';
import { useDispatch } from 'react-redux';

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/6
import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/6

/**
 * Runs when the app is first opened to setup initial notifications
 */
export default async function notificationSetup() {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 5/6
    // return null; // For testing in Expo
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 5/6
    const dispatch = useDispatch()
    const granted = await messaging().requestPermission();

    if   (granted) {
        await messaging().subscribeToTopic("norwegianIMPORTANT");
        await messaging().subscribeToTopic("norwegianBEDPRES");
        await messaging().subscribeToTopic("norwegianTEKKOM");
        await messaging().subscribeToTopic("norwegianCTF");
        await messaging().subscribeToTopic("norwegianSOCIAL")
        await messaging().subscribeToTopic("norwegianKARRIEREDAG");
        await messaging().subscribeToTopic("norwegianFADDERUKA");
        await messaging().subscribeToTopic("norwegianLOGIN");
        await messaging().subscribeToTopic("norwegianANNET")
    }
    
    dispatch(changeNotificationState("SETUP"))
}