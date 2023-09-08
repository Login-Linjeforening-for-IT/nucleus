import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Function for checking when the API was last fetched successfully.
 * @returns String
 */
export default async function LastFetch(param) {                          //  --- RETURNS WHEN EVENTS WERE FETCHED FROM STORAGE ---
    var time = param ? param : await AsyncStorage.getItem('lastFetch');

    if(time){
      var year   = parseInt((time)[0] + (time)[1] + (time)[2] + (time)[3])//  year
      var month  = parseInt((time)[5] + (time)[6])                        //  month
      var day    = parseInt((time)[8] + (time)[9])                        //  day
      var hour   = parseInt((time)[11] + (time)[12])                      //  hour
      var minute = parseInt((time)[14] + (time)[15])                      //  minute
      
      if(month < 10) month = '0' + month                                  // Checking and fixing missing 0
      if(day < 10) day = '0' + day                                        // Checking and fixing missing 0
      if(hour < 10) hour = '0' + hour                                     // Checking and fixing missing 0
      if(minute < 10) minute = '0' + minute                               // Checking and fixing missing 0

      const CleanedTime = hour + ':' + minute + ', ' + day + '/' + month + ', ' + year;

      return CleanedTime;
    } 
}

/**
 * Fetches the specific event page for additional details
 * 
 * @param {object} event    Event to fetch details for
 * 
 * @returns                 All details for passed event
 */
export async function fetchEventDetails(event) {
    const response = await fetch(`https://api.login.no/events/${event.eventID}`);
    const eventDetails = await response.json();
    return{...event, ...eventDetails};
}

/**
 * Function for returning a forms, tikkio or nettskjema link from a string
 * 
 * @param {string} string String containing forms, tikkio or nettskjema link
 * @returns Link as string
 */
export function FetchJoinLink(string) {
    if (string != undefined) {
        let formStart = string.lastIndexOf('https://forms');
        let formEnd = string.lastIndexOf("</a>");

        let tikkioStart = string.lastIndexOf('https://tikkio');
        let tikkioEnd = string.lastIndexOf('</a>');

        let netStart = string.lastIndexOf('https://nettskjema.no');
        let netEnd = string.lastIndexOf('</a>')

        var formLink = string.slice(formStart, formEnd);
        var tikkioLink = string.slice(tikkioStart, tikkioEnd);
        var netLink = string.slice(netStart, netEnd);
      
        if(formLink)    return formLink.trim();
        if(tikkioLink)  return tikkioLink.trim();
        if(netLink)     return netLink.trim();

        return null;
    } else return null
}

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
export function removeDuplicatesAndOld(APIevents, events) {

    // Removes old events and preserves newer version of all events
    let realEvents = APIevents.filter(APIevent => events.some(event => APIevent.eventID === event.eventID));
   
    // Removes duplicates
    let filteredEvents = realEvents.filter((event, index) => {
        return realEvents.findIndex(obj => obj.eventID === event.eventID) === index;
    });
 
    return filteredEvents;
};

export async function fetchState(setClickedEvents) {                                         //  --- FETCHES CLICKED EVENTS ---
    let foundState = await AsyncStorage.getItem('clickedEvents');         // Fetches the cache
    if (foundState != null) {                                             // If cache exists
        let parsed = JSON.parse(foundState)                                 // Parses from string to objects
        setClickedEvents(parsed)                                            // Function to update the clickedEvents array
    } 
}

/**
 * Fetches localstorage for desired value, updates state and rendered array
 * 
 * @param {*} setRenderedArray  The rendered array to be updated
 * @param {*} setState          The state to be updated
 * @param {*} value             The value to find in localstorage
 */
export async function fetchStored(setRenderedArray, setState, value) {                                  //  --- FETCHING STORED EVENTS IF NO WIFI ---
    const stored = value == "ads" ? "cachedsAd" : "cachedEvents"
    let tempArray = await AsyncStorage.getItem(stored)            //  Fetches cache
    if (tempArray != null){                                                // If cache exists
        let parsed = JSON.parse(tempArray);                                 // Parses from string to objects
        setRenderedArray([...parsed]);                                      // Updates the renderedarray to equal cache
        setState([...parsed]);                                             // Updates the events array to equal cache
    }
}

/**
     * Fetches data from API, formats the response, sets the cache, updates the events on the screen,
     * catches any errors and fetches localstorage, and handles errors. 
     */
export async function getData(setEvents, setRenderedArray, setLastSave, events) {                                              //  --- FETCHING DATA FROM API ---
    try {
        fetch('https://api.login.no/events')                                // PRODUCTION
        //fetch('https://tekkom:rottejakt45@api.login.no:8443/events')      // TESTING
        .then(response=>response.json())                                    // Formatting the response
        .then(data=>setEvents(data))                                        // Setting the response
        .then(setRenderedArray([...events]))                                // Updates the renderedarray to equal cache
        .then(async() => setLastSave(await LastFetch()));                   // Updates last fetch displayed on the screen
        if(events.length > 0) await AsyncStorage.setItem('cachedEvents', JSON.stringify(events))  // Setting the cache
    } catch (e) {                                                         // Catches any errors (missing wifi)
        (async() => {                                                       // Immediately invoked function expression (IIFE)
            try {     
            let cache = await AsyncStorage.getItem('cachedEvents')          // Tries to fetch event cache
            if(cache) cache = JSON.parse(cache); setEvents([...cache])      // If cached events was found save them in event array
            } catch (e) {console.warn('Failed to fetch cache: ' + e)}         // If cache was not found tell the user cache wasnt found (custom notification needs to go here)
        })
    }
}