import * as Notifications from 'expo-notifications';                                    // Local notifications
  
/**
 * Function for canceling scheduled using the id of the event
 * @param {event} props   Event object
 */
export default async function cancelScheduledNotification(props) {                              // --- CANCEL SCHEDULED PUSH NOTIFICATION ---
    const eventID = JSON.stringify(props.eventID)                                       // Converting to string
    await Notifications.cancelScheduledNotificationAsync(eventID)                       // Canceling the scheduled push notification
};