import * as Device from 'expo-device';                                                  // Device user is using
import * as Notifications from 'expo-notifications';                                    // Local notifications
import { Platform, Alert } from 'react-native';                                                                  // React native

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
// import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8

/**
 * Made by Expo - 
 * Function for getting push notification permission from the user
 * @returns Push notification token
 */
export default async function registerForPushNotificationsAsync(lang) {                         // --- GETTING PUSH NOTIFICATION PERMISSION ---
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