import { requestCalendarPermissionsAsync, getEventsAsync, updateEventAsync, createEventAsync } from 'expo-calendar'; 
import eventsToCalendarFormat from './eventsToCalendarFormat';

export default async function updateCalendar(events, calendarID) {
  const { status } = await requestCalendarPermissionsAsync();
  
  if (status === 'granted') {
    const calendarEvents = await getEventsAsync(
      [calendarID],
      new Date(Date.now() - 86400000),      // Start date = 24 hours ago
      new Date(Date.now() + 31536000000)    // End date = 1 year from now
    );

    const formattedEvents = await eventsToCalendarFormat(events, calendarID);

    for (const event of formattedEvents) {
      // Find the matching event in the formatted events array
      const matchingEvent = calendarEvents.find(e => e.id === event.id);

      // Update the event in the calendar
      if (matchingEvent) {
        try {
          await updateEventAsync(event.id, matchingEvent);
        } catch (e) {console.log(`Error updating event: ${e}`)}
      } else {
        try { 
          await createEventAsync(calendarID, event); 
        } catch (e) {console.log(e)}
      }
    }
  }
  }