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

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/4
import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/4

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
 * Function for subscribing and unsubscribing from notification topics.
 * Notification categories will be enum values while events will be numbers.
 * @param {*} topicID Topic identifier (enum category or number eventID)
 * @param {bool} status  true/false Subscribe or unsubscribe from given topic.
 */
export async function topic(topicID, status) {
    const granted = await messaging().requestPermission();
    if(granted) {
      status ? await messaging().subscribeToTopic(`${topicID}`) : await messaging().unsubscribeFromTopic(`${topicID}`);
      Alert.alert((status ? "Subscribed to ":"Unsubscribed from ") + "topic", topicID)
    }
}