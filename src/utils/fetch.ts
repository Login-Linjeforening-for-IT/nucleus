import AsyncStorage from "@react-native-async-storage/async-storage"

type fetchStoredProps = {
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    setState: React.Dispatch<React.SetStateAction<EventProps[]>>
    value?: string
}

type getDataProps = {
    setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>
    setRenderedArray: React.Dispatch<React.SetStateAction<EventProps[]>>
    setLastSave: React.Dispatch<React.SetStateAction<string>>
    events: EventProps[]
}

/**
 * Function for checking when the API was last fetched successfully.
 *
 * @returns String
 */
export default async function LastFetch(param?: string) {
    const stored = await AsyncStorage.getItem("lastFetch")
    const utc: string = param ? param : stored ? stored : new Date().toISOString()
    const time = new Date(utc)

    // Checking and fixing missing 0
    let day = time.getDate().toString().padStart(2, '0')
    let month = (time.getMonth() + 1).toString().padStart(2, '0')
    let year = time.getFullYear()
    
    let hour = time.getHours().toString().padStart(2, '0')
    let minute = time.getMinutes().toString().padStart(2, '0')

    return `${hour}:${minute}, ${day}/${month}, ${year}`
}

/**
 * Fetches the specific event page for additional details
 *
 * @param {object} event    Event to fetch details for
 *
 * @returns                 All details for passed event
 */
export async function fetchEventDetails(event: EventProps): 
Promise<DetailedEventProps> {
    const response = await fetch(`https://api.login.no/events/${event.eventID}`)
    const eventDetails = await response.json()
    return{...event, ...eventDetails}
}

/**
 * Function for returning a forms, tikkio or nettskjema link from a string
 *
 * @param {string} string String containing forms, tikkio or nettskjema link
 * @returns Link as string
 */
export function FetchJoinLink(string: string): string | null {
    if (string != undefined) {
        let formStart = string.lastIndexOf("https://forms")
        let formEnd = string.lastIndexOf("</a>")

        let tikkioStart = string.lastIndexOf("https://tikkio")
        let tikkioEnd = string.lastIndexOf("</a>")

        let netStart = string.lastIndexOf("https://nettskjema.no")
        let netEnd = string.lastIndexOf("</a>")

        var formLink = string.slice(formStart, formEnd)
        var tikkioLink = string.slice(tikkioStart, tikkioEnd)
        var netLink = string.slice(netStart, netEnd)

        if (formLink)    return formLink.trim()
        if (tikkioLink)  return tikkioLink.trim()
        if (netLink)     return netLink.trim()
    }

    return null
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
export function removeDuplicatesAndOld(APIevents: EventProps[], events: 
EventProps[]): EventProps[] {

    // Removes old events and preserves newer version of all events
    let realEvents = APIevents.filter(APIevent => events.some(
        event => APIevent.eventID === event.eventID))

    // Removes duplicates
    let filteredEvents = realEvents.filter((event, index) => {
        return realEvents.findIndex(obj => obj.eventID === event.eventID) === index
    })

    return filteredEvents
}

/**
 * Fetches the cache if it exists, then parses from string to object and updates
 * the passed array
 */
export async function fetchClicked(): Promise<EventProps[]> {
    let foundState = await AsyncStorage.getItem("clickedEvents")

    if (foundState != null) {
        let parsed = JSON.parse(foundState)
        return parsed
    } else {
        return []
    }
}

/**
 * Fetches localstorage for desired value, updates state and rendered array
 * Used for fetching events and ads when thre is no internet connection.
 *
 * @param {*} setRenderedArray  The rendered array to be updated
 * @param {*} setState          The state to be updated
 * @param {*} value             The value to find in localstorage
 */
export async function fetchStored({setRenderedArray, setState, value}: 
fetchStoredProps): Promise<void> {
    const stored = value === "ads" ? "cachedsAd" : "cachedEvents"
    //  Fetches cache
    let tempArray = await AsyncStorage.getItem(stored)
    // If cache exists
    if (tempArray != null) {
        // Parses from string to objects
        let parsed = JSON.parse(tempArray)
        // Updates the renderedarray to equal cache
        setRenderedArray([...parsed])
        // Updates the events array to equal cache
        setState([...parsed])
    }
}

/**
 * Fetches data from API, formats the response, sets the cache, updates the 
 * events on the screen, catches any errors and fetches localstorage, and 
 * handles errors.
 */
export async function getData({setEvents, setRenderedArray, setLastSave, 
events}: getDataProps): Promise<void> {
    try {
        // PRODUCTION
        fetch("https://api.login.no/events")
        // TESTING
        //fetch("https://tekkom:rottejakt45@api.login.no:8443/events")
        // Formatting the response
        .then(response=>response.json())
        // Setting the response
        .then((data) => {
            setEvents(data)
            return data
        })
        // Updates the renderedarray to equal cache
        .then((events: EventProps[]) => setRenderedArray([...events]))
        // Updates last fetch displayed on the screen
        .then(async() => setLastSave(await LastFetch()))
        // Setting the cache
        if (events.length > 0) await AsyncStorage.setItem("cachedEvents", 
            JSON.stringify(events))
        // Catches any errors (missing wifi)
    } catch (e) {
        // Immediately invoked function expression (IIFE)
        (async() => {
            try {
                // Tries to fetch event cache
            const cache: string | null = await AsyncStorage.getItem("cachedEvents")
                if (cache) {
                    const events: EventProps[] = JSON.parse(cache)
                    // If cached events was found save them in event array
                    if (!events.length) setEvents([...events])
                }
                // If cache was not found tell the user cache wasnt found
                // (custom in app notification needs to go here)
            } catch (e) {console.warn("Failed to fetch cache: " + e)}
        })
    }
}

/**
 * Checks how long its been since a date object
 *
 * @returns number, seconds
 */
export function timeSince(downloadState: Date): number {
    const now = new Date()
    const before = downloadState
    return now.valueOf() - before.valueOf()
}
