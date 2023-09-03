import messaging from '@react-native-firebase/messaging';

/**
 * Asks the user for permission to send push notifications
 */
export async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) console.log('Permission status:', authorizationStatus);
}