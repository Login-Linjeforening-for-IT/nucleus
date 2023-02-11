/**
 * This file is a collection of functions needed for notification management
 * 
 * Contains:
 * - SchedulePushNotification                                                           // Schedule push notification
 * - cancelScheduledNotification                                                        // Cancel a scheduled notification
 * - registerForPushNotificationsAsync                                                  // Give user the "allow notifications prompt"
 */
import {fetchEmoji} from '../shared/eventComponents/otherComponents';                   // Components used to display event
import * as Device from 'expo-device';                                                  // Device user is using
import * as Notifications from 'expo-notifications';                                    // Local notifications
import { NotificationDelay } from '../shared/eventComponents/notificationDelay';        // Delay in seconds until push notification should be sent
import {                                                                                // React native components
  Platform,                                                                             // Operating system
  Alert                                                                                 // Alerts the user
} from 'react-native';                                                                  // React native
import { useDispatch } from 'react-redux';

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8

/**
 * Function for scheduling push notifications
 * @param {string} title    Notification title
 * @param {string} body     Notification Body
 * @param {date} sendtime   Time the notification should be sent
 */
export async function SchedulePushNotification(props, lang) {                           // --- SCHEDULE PUSH NOTIFICATION ---
    const emoji = fetchEmoji(props)                                                     // Fetches emoji from emoji function
    await Notifications.scheduleNotificationAsync({
      content: {  
        title: props.eventname + emoji,                                                 // Notification title
        body: lang ? 'Begynner om en time! 🏃':'Starts in one hour! 🏃',                // Notificaton body
      },
      trigger: { seconds: NotificationDelay(props) },                                   // Triggers 1 hour before event
      identifier: JSON.stringify(props.eventID)                                         // ID of the notification
    });
};
  
/**
 * Function for canceling scheduled using the id of the event
 * @param {event} props   Event object
 */
export async function cancelScheduledNotification(props) {                              // --- CANCEL SCHEDULED PUSH NOTIFICATION ---
    const eventID = JSON.stringify(props.eventID)                                       // Converting to string
    await Notifications.cancelScheduledNotificationAsync(eventID)                       // Canceling the scheduled push notification
};
  
/**
 * Made by Expo - 
 * Function for getting push notification permission from the user
 * @returns Push notification token
 */
export async function registerForPushNotificationsAsync(lang) {                         // --- GETTING PUSH NOTIFICATION PERMISSION ---
let token;

if (Platform.OS === 'android') { 
    await Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
    });
}

if (Device.isDevice) {                                                                  // Checks for physical device 
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    }
    if (finalStatus !== 'granted') {
    return;                                                                             // Alert here if user schedules notification without granted status
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token); // Logs the token
} else {
    Alert.alert(lang ? 'Varslinger er ikke tilgjengelig på simulatorer.': 'Notifications are not available on simulators');
}

return token;
};

/**
 * **Function for subscribing and unsubscribing from notification topics**
 * 
 * When changing language it will setup notifications to follow language.
 * 
 * @param {string} topicID Topic identifier - "langChange" passed when changing language
 * @param {boolean} lang Language, 1 for norwegian, 0 for english
 * @param {boolean} status  true/false Subscribe or unsubscribe from given topic.
 */
export async function topic(topicID, lang, status) {
    // return null; // For testing in Expo
    // COMMENT OUT WHILE TESTING IN EXPO 6/8 - COMMENT IN THE ABOVE LINE INSTEAD
    const granted = await messaging().requestPermission();
    var topic = lang ? "norwegian"+topicID:"english"+topicID;

    if(granted) {
      if(topicID == "langChange") {
        if(lang) {
          await messaging().unsubscribeFromTopic("englishIMPORTANT");
          await messaging().unsubscribeFromTopic("englishREMINDERS");
          await messaging().unsubscribeFromTopic("englishEVENTS");
          await messaging().unsubscribeFromTopic("englishBEDPRES");
          await messaging().unsubscribeFromTopic("englishTEKKOM");
          await messaging().unsubscribeFromTopic("englishCTF");
          await messaging().unsubscribeFromTopic("englishSOCIAL");
          return null;
        }else{
          await messaging().unsubscribeFromTopic("norwegianIMPORTANT");
          await messaging().unsubscribeFromTopic("norwegianREMINDERS");
          await messaging().unsubscribeFromTopic("norwegianEVENTS");
          await messaging().unsubscribeFromTopic("norwegianBEDPRES");
          await messaging().unsubscribeFromTopic("norwegianTEKKOM");
          await messaging().unsubscribeFromTopic("norwegianCTF");
          await messaging().unsubscribeFromTopic("norwegianSOCIAL");
          return null;
        }
      } else status ? await messaging().subscribeToTopic(`${topic}`) : await messaging().unsubscribeFromTopic(`${topic}`);
    }
}

/**
 * Runs when the app is first opened to setup initial notifications
 */
export async function notificationSetup() {
  // return null; // For testing in Expo
  // COMMENT OUT WHILE TESTING IN EXPO 6/8 - COMMENT IN THE ABOVE LINE INSTEAD
  const dispatch = useDispatch()
  const granted = await messaging().requestPermission();
  if   (granted) {
    await messaging().subscribeToTopic("norwegianIMPORTANT");
    await messaging().subscribeToTopic("norwegianREMINDERS");
    await messaging().subscribeToTopic("norwegianEVENTS");
    await messaging().subscribeToTopic("norwegianBEDPRES");
    await messaging().subscribeToTopic("norwegianTEKKOM");
    await messaging().subscribeToTopic("norwegianCTF");
    await messaging().subscribeToTopic("norwegianSOCIAL").then(dispatch(changeNotificationState("SETUP")));
  } 
}