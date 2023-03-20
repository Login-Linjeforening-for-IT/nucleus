import * as Calendar from 'expo-calendar';

/**
 * Function for checking if a given calendar still exists
 * 
 * @param {string} calendarID ID of the calendar to check if exists
 * @returns boolean
 */
export default async function calendarExists(calendarID) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status === 'granted') {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const matchingCalendar = calendars.find(calendar => calendar.id === calendarID);
      return matchingCalendar; 
    } catch (e) {console.log(e)}
  };
  };