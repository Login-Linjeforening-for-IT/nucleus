const api = "http://10.212.174.46/api/"
const testapi = "http://10.212.174.46/api/"

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
export async function fetchEventDetails(id: number): 
Promise<DetailedEvent> {
    // Fetches events
    // const response = await fetch(`${api}events/${event.id}`)

    // Test API
    const response = await fetch(`${testapi}events/${id}`)
    const eventDetails = await response.json()

    let mazemap = null
    let location_no = null
    let location_en = null
    let location_url = null
    let rule_no = null
    let rule_en = null
    let rule_details_no = null
    let rule_details_en = null

    if (eventDetails.location) {
        mazemap = eventDetails.location.name_no ? eventDetails.location.name_no : null
        location_no = eventDetails.location.name_no ? eventDetails.location.name_no : null
        location_en = eventDetails.location.name_en ? eventDetails.location.name_en : null
        location_url = eventDetails.location.url ? eventDetails.location.url : null
    }

    if (eventDetails.rule) {
        rule_no = eventDetails.rule.name_no ? eventDetails.rule.name_no : null
        rule_en = eventDetails.rule.name_en ? eventDetails.rule.name_en : null
        rule_details_no = eventDetails.rule.name_no ? eventDetails.rule.name_no : null
        rule_details_en = eventDetails.rule.name_en ? eventDetails.rule.name_en : null
    }

    const details = {
        audiences: eventDetails.audiences,
        color: eventDetails.category.color,
        category_id: eventDetails.category.id,
        category_name_no: eventDetails.category.name_no,
        category_name_en: eventDetails.category.name_en,
        mazemap, location_no, location_en, location_url,
        organization_name_short: eventDetails.organizations[0].shortname,
        organization_name_en: eventDetails.organizations[0].name_en,
        organization_logo: eventDetails.organizations[0].logo,
        link_homepage: eventDetails.organizations[0].link_homepage,
        rule_no, rule_en, rule_details_no, rule_details_en
    }

    return {...eventDetails.event, ...details}
}

/**
 * Function for returning a forms, tikkio or nettskjema link from a string
 *
 * @param {string} string String containing forms, tikkio or nettskjema link
 * @returns Link as string
 */
export function FetchJoinLink(string: string): string | null {
    if (string != undefined) {
        const formStart = string.lastIndexOf("https://forms")
        const formEnd = string.lastIndexOf("</a>")

        const tikkioStart = string.lastIndexOf("https://tikkio")
        const tikkioEnd = string.lastIndexOf("</a>")

        const netStart = string.lastIndexOf("https://nettskjema.no")
        const netEnd = string.lastIndexOf("</a>")

        const formLink = string.slice(formStart, formEnd)
        const tikkioLink = string.slice(tikkioStart, tikkioEnd)
        const netLink = string.slice(netStart, netEnd)

        if (formLink)    return formLink.trim()
        if (tikkioLink)  return tikkioLink.trim()
        if (netLink)     return netLink.trim()
    }

    return null
}

/**
 * Fetches data from API, formats the response, sets the cache, updates the 
 * events on the screen, catches any errors and fetches localstorage, and 
 * handles errors.
 */
export async function fetchEvents(): Promise<EventProps[]> {
    try {
        // Fetches events
        // const response = await fetch(`${api}events`)

        // Test API
        const response = await fetch(`${testapi}events`)

        // Dev
        // const response = await fetch("https://tekkom:rottejakt45@api.login.no:8443/events")

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
export async function fetchAds(): Promise<AdProps[]> {
    try {
        // Prod
        // const response = await fetch("https://api.login.no/ads")

        // Dev
        const response = await fetch("http://10.212.174.46/api/jobs/")

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
 * @param {object} ad    Ad to fetch details for
 *
 * @returns                 All details for passed event
 */
export async function fetchAdDetails(ad: AdProps): Promise<DetailedAd> {

    // Prod
    // const response = await fetch(`https://api.login.no/ads/${ad.id}`)
    
    // Dev
    const response = await fetch(`http://10.212.174.46/api/jobs/${ad.id}`)
    const adDetails = await response.json()

    return {...ad, ...adDetails.job, ...adDetails.organization}
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
