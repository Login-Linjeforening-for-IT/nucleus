import * as Device from 'expo-device';                                                  // Device user is using
import * as Notifications from 'expo-notifications';                                    // Local notifications
import { Platform } from 'react-native';                                         // React native

/**
 * Made by Expo - 
 * Function for getting push notification permission from the user
 * @returns Push notification token
 */
export default async function registerForPushNotificationsAsync() {
  let token;

    if (Platform.OS === 'android') { 
        await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }

    // Must be a physical device
    if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            token = (await Notifications.getExpoPushTokenAsync({
                projectId: "952a1914-0c53-43e7-b64e-8daab0b3a435"
            })).data;
    }

  return token;
};