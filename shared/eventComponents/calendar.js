import { setCalendarID } from 'login/redux/misc'
import { fetchEventDetails } from './fetch';
import { Platform } from 'react-native';
import { 
    requestCalendarPermissionsAsync, 
    getDefaultCalendarAsync,
    createCalendarAsync, 
    CalendarAccessLevel,
    getCalendarsAsync, 
    updateEventAsync, 
    createEventAsync,
    getEventsAsync, 
    EntityTypes, 
} from 'expo-calendar';

/**
 * Handles press of download button, changes color of the button 
 * and downloads if more than 3 seconds since last download
 * 
 * @see executeDownload Executes the download if permitted
 */
export default async function handleDownload(setDownloadState, downloadState, clickedEvents, calendarID, dispatch) {
    const currentTime = new Date().toISOString()

    if (downloadState == null) {
        setDownloadState(currentTime);
        await executeDownload(clickedEvents, calendarID, dispatch);
    } else {
        if (timeSinceDownload() >= 1000) await executeDownload(clickedEvents, calendarID, dispatch);
        setDownloadState(currentTime);
    }
}

export async function updateCalendar(events, calendarID) {
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
            const matchingEvent = calendarEvents.find(e => e.title === event.title);
            const newObj = {
                title: event.title,
                notes: event.notes,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
            }
    
            // Update the event in the calendar
            if (matchingEvent) await updateEventAsync(matchingEvent.id, newObj);
            else await createEventAsync(calendarID, event); 
        }
    }
}

/**
 * Checks how long its been since the events were last downloaded and returns the time in seconds.
 * 
 * @returns int, seconds
 */
export function timeSinceDownload(downloadState) {
    const now = new Date()
    const before = new Date(downloadState);
    return now - before;
}

/**
 * Function for checking if a given calendar still exists
 *
 * @returns boolean
 */
async function calendarExists(calendarID) {
    const { status } = await requestCalendarPermissionsAsync();

    if (status === 'granted') {
        try {
            const calendars = await getCalendarsAsync(EntityTypes.EVENT);
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
async function createCalendar(events) {
    const { status } = await requestCalendarPermissionsAsync();
    
    if (status === 'granted') {
        try {
            const defaultCalendarSource =
            Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Login' };
            const newCalendarID = await createCalendarAsync({
                title: 'Login',
                color: '#fd8738',
                entityType: EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: CalendarAccessLevel.OWNER,
                events: null
            });
            await updateCalendar(events, newCalendarID);

            return newCalendarID;
        } catch (e) {console.log(e)}
    };
};

/**
 * Function for formatting events to native calendar format
 * 
 * @param {array} events      Events to format
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
    const { status } = await requestCalendarPermissionsAsync();
    
    if (status === 'granted') {
        try {
            const defaultCalendar = await getDefaultCalendarAsync();
            return defaultCalendar.source; 
        } catch (e) {console.log(e)}
    };
};

/**
 * Executes the download itself, updates existing calendar or creates a new calendar if no calendar exists.
 * 
 * @param clickedEvents Array of events the user has joined
 * 
 * @see calendarExists  Checks if the calendar storage is defined and if it still exists on the device
 * @see setCalendarID   Stores the ID of a new calendar in localstorage
 * @see updateCalendar  Updates the events for a calendar that is found 
 * @see createCalendar  Creates a new calendar if no calendar is to be found
 */
async function executeDownload(clickedEvents, calendarID, dispatch) {
    if (typeof await calendarExists() != "undefined") await updateCalendar(clickedEvents, calendarID)
    else dispatch(setCalendarID(await createCalendar(clickedEvents)));
}