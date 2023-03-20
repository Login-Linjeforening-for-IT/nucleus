import getDefaultCalendarSource from './getDefaultCalendarSource';
import updateCalendar from './updateCalendar';
import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

/**
 * Creates a calendar in the default calendar app of the device
 * 
 * @param {array} events Events to include in the calendar
 */
export default async function createCalendar(events) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status === 'granted') {
    try {
      const defaultCalendarSource =
      Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Login' };
    const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Login',
        color: '#fd8738',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
        events: null
    });
    await updateCalendar(events,newCalendarID);
    console.log(`Login calendar: ${newCalendarID}`);
    return newCalendarID;
    } catch (e) {console.log(e)}
  };
};