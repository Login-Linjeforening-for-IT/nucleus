import { fetchEventDetails } from 'login/shared/eventComponents/fetch';
import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';

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
            const matchingEvent = calendarEvents.find(e => e.title === event.title);
            const newObj = {
                title: event.title,
                notes: event.notes,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
            }
    
            // Update the event in the calendar
            if (matchingEvent) await Calendar.updateEventAsync(matchingEvent.id, newObj);
            else await Calendar.createEventAsync(calendarID, event); 
        }
    }
}

/**
 * Function for checking if a given calendar still exists
 * 
 * @param {string} calendarID ID of the calendar to check if exists
 * @returns boolean
 */
export async function calendarExists(calendarID) {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    
    if (status === 'granted') {
        try {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            const matchingCalendar = calendars.find(calendar => calendar.id === calendarID);
            return matchingCalendar; 
        } catch (e) {console.log(e)}
    };
};

/**
 * Creates a calendar in the default calendar app of the device
 * 
 * @param {array} events Events to include in the calendar
 */
export async function createCalendar(events) {
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

/**
 * Function for formatting events to native calendar format
 * 
 * @param {array} events      Events to format
 * @param {string} calendarID ID of the calendar
 * @returns                   Native calendar objects
 */
async function eventsToCalendarFormat(events, calendarID) {
    let formattedEvents = [];
  
    for (const event of events) {
        const APIevent = await fetchEventDetails(event);
    
        const room = APIevent.roomno ? APIevent.roomno + ', ':'';
        const campus = APIevent.campus ? APIevent.campus + ', ':'';
        const street = APIevent.street ? APIevent.street:'';
        const loc = room + campus + street;

        const startDate = new Date(APIevent.startt);
        const endDate = new Date(APIevent.endt);

        const obj = {
            calendarId: calendarID,
            allDay: false,
            id: APIevent.eventID,
            title: APIevent.eventname,
            notes: APIevent.description,
            location: loc,
            startDate: startDate,
            endDate: endDate,
            timeZone: "Europe/Oslo",
            status: "CONFIRMED",
            availability: "BUSY",
            alarms: [
            { relativeOffset: -30 }
            ]
        };
        formattedEvents.push(obj);
        }
    
        return formattedEvents;
  };

/**
 * Function for fetching the default calendar source of the device
 * 
 * @returns Default source
 */
async function getDefaultCalendarSource() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    
    if (status === 'granted') {
        try {
            const defaultCalendar = await Calendar.getDefaultCalendarAsync();
            return defaultCalendar.source; 
        } catch (e) {console.log(e)}
    };
};