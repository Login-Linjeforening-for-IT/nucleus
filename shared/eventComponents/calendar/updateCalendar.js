import eventsToCalendarFormat from './eventsToCalendarFormat';
import * as Calendar from 'expo-calendar';

export default async function updateCalendar(events, calendarID) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  
  if (status === 'granted') {
    const calendarEvents = await Calendar.getEventsAsync(
      [calendarID],
      new Date(Date.now() - 86400000),      // Start date = 24 hours ago
      new Date(Date.now() + 31536000000)    // End date = 1 year from now
    );

    const formattedEvents = await eventsToCalendarFormat(events, calendarID);

    for (const event of formattedEvents) {
      // Find the matching event in the formatted events array
      const matchingEvent = calendarEvents.find(e => e.eventID === event.eventID);
      // Update the event in the calendar
      if (matchingEvent) {
        try {
          await Calendar.updateEventAsync(event.eventID, matchingEvent);
        } catch (e) {console.log(`Error updating event: ${e}`)}
      } else{
        console.log(event, calendarID, calendarEvents);
        try {
          await Calendar.createEventAsync(calendarID, event); 
        } catch (e) {console.log(e)}
      }
    }
  }
  }