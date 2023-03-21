import fetchEventDetails from '../fetchEventDetails';

/**
 * Function for formatting events to native calendar format
 * 
 * @param {array} events      Events to format
 * @param {string} calendarID ID of the calendar
 * @returns                   Native calendar objects
 */
export default async function eventsToCalendarFormat(events, calendarID) {
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