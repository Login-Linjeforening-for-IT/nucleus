import * as Notifications from 'expo-notifications';                                    // Local notifications

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
// import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
  
/**
 * Function for canceling scheduled using the id of the event
 * @param {event} props   Event object
 */
export default async function cancelScheduledNotification(props) {                              // --- CANCEL SCHEDULED PUSH NOTIFICATION ---
    const eventID = JSON.stringify(props.eventID)                                       // Converting to string
    await Notifications.cancelScheduledNotificationAsync(eventID)                       // Canceling the scheduled push notification
};