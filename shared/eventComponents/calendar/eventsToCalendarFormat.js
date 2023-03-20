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
      let APIevent = await fetchEventDetails(event);
  
      console.log(APIevent.startt)
      let room = APIevent.roomno ? APIevent.roomno + ', ':'';
      let campus = APIevent.campus ? APIevent.campus + ', ':'';
      let street = APIevent.street ? APIevent.street:'';
      let loc = room + campus + street;

      let startDate = new Date(APIevent.startt);
      let endDate = new Date(APIevent.endt);

      obj = {
        calendarId: calendarID,
        allDay: false,
        recurrenceRule: null,
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