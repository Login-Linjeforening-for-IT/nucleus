import { useDispatch } from 'react-redux';

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
// import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8

/**
 * Runs when the app is first opened to setup initial notifications
 */
export default async function notificationSetup() {
  return null; // For testing in Expo
  // COMMENT OUT WHILE TESTING IN EXPO 6/8 - COMMENT IN THE ABOVE LINE INSTEAD
  const dispatch = useDispatch()
  const granted = await messaging().requestPermission();
  if   (granted) {
    await messaging().subscribeToTopic("norwegianIMPORTANT");
        await messaging().subscribeToTopic("norwegianEVENTS");
        await messaging().subscribeToTopic("norwegianBEDPRES");
        await messaging().subscribeToTopic("norwegianTEKKOM");
        await messaging().subscribeToTopic("norwegianCTF");
        await messaging().subscribeToTopic("norwegianSOCIAL")
        await messaging().subscribeToTopic("norwegianKARRIEREDAG");
        await messaging().subscribeToTopic("norwegianFADDERUKA");
        await messaging().subscribeToTopic("norwegianLOGIN");
        await messaging().subscribeToTopic("norwegianANNET").then(dispatch(changeNotificationState("SETUP")));
  } 
}