import * as Calendar from 'expo-calendar';

/**
 * Function for fetching the default calendar source of the device
 * 
 * @returns Default source
 */
export default async function getDefaultCalendarSource() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status === 'granted') {
    try {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      return defaultCalendar.source; 
    } catch (e) {console.log(e)}
  };
};