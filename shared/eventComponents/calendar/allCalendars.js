import * as Calendar from 'expo-calendar';

/**
 * Function for logging all calendars of the device
 * 
 * Made by Expo
 */
export default async function allCalendars() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
  
    if (status === 'granted') {
      try {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars }); 
      } catch (error) {console.log(error)}
    };
};