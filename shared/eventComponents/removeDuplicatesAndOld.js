/**
* Function for removing old events and duplicates
*
* - Category
* - Text
* - Category
*
* @param {array} APIevents Events from API
* @param {array} Events Events to filter
* @returns Filtered events
*/
export default function removeDuplicatesAndOld(APIevents, events) {

    // Removes old events and preserves newer version of all events
    let realEvents = APIevents.filter(APIevent => events.some(event => APIevent.eventID === event.eventID));
   
    // Removes duplicates
    let filteredEvents = realEvents.filter((event, index) => {
        return realEvents.findIndex(obj => obj.eventID === event.eventID) === index;
    });
 
    return filteredEvents;
 };
 