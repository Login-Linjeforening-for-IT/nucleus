const api = "http://10.212.174.46/api/"
const testapi = "https://testapi.login.no/api/"

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
    let organization_logo = null
    let organization_name_short = null
    let link_homepage = null
    let organization_name_en = null
    let category_name_no = null
    let category_name_en = null

    if ('category' in eventDetails) {
        if ('name_no' in eventDetails.category) {
            category_name_no = eventDetails.category.name_no
        }
        if ('name_en' in eventDetails.category) {
            category_name_en = eventDetails.category.name_en
        }
    }

    if ('location' in eventDetails) {
        if ('name_no' in eventDetails.location) {
            location_no = eventDetails.location.name_no
        }
        if ('name_en' in eventDetails.location) {
            location_en = eventDetails.location.name_en
        }
        if ('mazemap_poi_id' in eventDetails.location) {
            mazemap = eventDetails.location.mazemap_poi_id
        }
        if ('url' in eventDetails.location) {
            location_url = eventDetails.location.url
        }
    }

    if ('rule' in eventDetails) {
        if ('name_no' in eventDetails.rule) {
            rule_no = eventDetails.rule.name_no
        }
        if ('name_en' in eventDetails.rule) {
            rule_en = eventDetails.rule.name_en
        }
        if ('description_no' in eventDetails.rule) {
            rule_details_no = eventDetails.rule.description_no
        }
        if ('description_en' in eventDetails.rule) {
            rule_details_en = eventDetails.rule.description_en
        }
    }

    if ('organizations' in eventDetails) {
        if (eventDetails.organizations.length) {
            if ('shortname' in eventDetails.organizations[0]) {
                organization_name_short = eventDetails.organizations[0].shortname 
            }
            if ('logo' in eventDetails.organizations[0]) {
                organization_logo = eventDetails.organizations[0].logo
            }
            if ('link_homepage' in eventDetails.organizations[0]) {
                link_homepage = eventDetails.organizations[0].link_homepage
            }
            if ('organization_name_en' in eventDetails.organizations[0]) {
                organization_name_en = eventDetails.organizations[0].name_en
            }
        }
    }

    const details = {
        audiences: eventDetails.audiences,
        category_id: eventDetails.category.id,
        category_name_no,
        category_name_en,
        mazemap, 
        location_no, 
        location_en, 
        location_url,
        rule_no,
        rule_en,
        rule_details_no,
        rule_details_en,
        organization_logo,
        organization_name_short,
        organization_name_en,
        link_homepage,
    }

    return {...eventDetails.event, ...details}
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
