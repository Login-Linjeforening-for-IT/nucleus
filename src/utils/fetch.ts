import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Function for checking when the API was last fetched successfully.
 *
 * @returns String
 */
export default function LastFetch(param?: string) {
    const utc = param ? param : new Date().toISOString()
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
    return {...event, ...eventDetails}
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
 * Fetches data from API, formats the response, sets the cache, updates the 
 * events on the screen, catches any errors and fetches localstorage, and 
 * handles errors.
 */
export async function getData(): Promise<EventProps[]> {
    try {
        // PRODUCTION
        const response = await fetch("https://api.login.no/events")
        // TESTING
        // const response = await fetch("https://tekkom:rottejakt45@api.login.no:8443/events")

        // Checks if response is ok, otherwise throws error
        if (!response.ok) {
            throw new Error('Failed to fetch events from API')
        }

        return response.json()
        // Catches any errors (missing wifi)
    } catch (e) {
        // Immediately invoked function expression (IIFE)
        const cache: string | null = await AsyncStorage.getItem("cachedEvents");

        if (cache) {
            const events: EventProps[] = JSON.parse(cache)
            return events
        }

        return []
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
