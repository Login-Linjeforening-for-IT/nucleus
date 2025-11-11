import config from "@/constants"

/**
 * Function for checking when the API was last fetched successfully.
 *
 * @returns String
 */
export default function LastFetch(param?: string) {
    const utc = param ? param : new Date().toISOString()
    const time = new Date(utc)

    // Checking and fixing missing 0
    const day = time.getDate().toString().padStart(2, '0')
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const year = time.getFullYear()

    const hour = time.getHours().toString().padStart(2, '0')
    const minute = time.getMinutes().toString().padStart(2, '0')

    return `${hour}:${minute}, ${day}/${month}, ${year}`
}

/**
 * Fetches the specific event page for additional details
 *
 * @param {number} id Event id fetch details for
 *
 * @returns All details for passed event
 */
export async function fetchEventDetails(id: number):
    Promise<GetEventProps> {
    // Fetches events
    const response = await fetch(`${config.api}/events/${id}`)

    // Test API
    // const response = await fetch(`${testapi}events/${id}`)
    const eventDetails: GetEventProps = await response.json()

    return eventDetails
}

/**
 * Fetches data from API, formats the response, sets the cache, updates the 
 * events on the screen, catches any errors and fetches localstorage, and 
 * handles errors.
 */
export async function fetchEvents(): Promise<GetEventProps[]> {
    try {
        // Fetches events
        const response = await fetch(`${config.api}/events`)

        // Checks if response is ok, otherwise throws error
        if (!response.ok) {
            throw new Error('Failed to fetch events from API')
        }

        return response.json()

        // Catches and logs errors. Errors are handled by Redux.
    } catch (error) {
        console.log(error)
        return []
    }
}

/**
 * Fetches data from API, formats the response, sets the cache, updates the 
 * events on the screen, catches any errors and fetches localstorage, and 
 * handles errors.
 */
export async function fetchAds(): Promise<GetJobProps[]> {
    try {
        // Fetches ads
        const response = await fetch(`${config.api}/jobs/`)

        // Checks if response is ok, otherwise throws error
        if (!response.ok) {
            throw new Error('Failed to fetch ads from API')
        }

        return response.json()

        // Catches and logs errors. Errors are handled by Redux.
    } catch (error) {
        console.log(error)
        return []
    }
}

/**
 * Fetches the specific ad page for additional details
 *
 * @param {object} adID Ad to fetch details for
 *
 * @returns All details for passed event
 */
export async function fetchAdDetails(adID: number): Promise<GetJobProps> {

    // Prod
    const response = await fetch(`${config.api}/jobs/${adID}`)

    // Dev
    // const response = await fetch(`${testapi}jobs/${ad.id}`)
    const adDetails = await response.json()

    return adDetails
}

/**
 * Checks how long its been since a date object
 *
 * @returns number, seconds
 */
export function timeSince(downloadState: Date): number {
    const now = new Date()
    const before = new Date(downloadState)
    return now.valueOf() - before.valueOf()
}
