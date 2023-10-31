import { fetchEventDetails } from "@/utils/fetch"
import { setCalendarID } from "@redux/misc"
import { Platform } from "react-native"
import { AnyAction, Dispatch } from "redux"
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
} from "expo-calendar"

type handleDownloadProps = {
    clickedEvents: EventProps[]
    calendarID: string
    dispatch: Dispatch<AnyAction>
    lang: boolean
}

type updateCalendarProps = {
    events: EventProps[]
    calendarID: string
    lang: boolean
}

type eventsToCalendarFormatProps = {
    events: EventProps[]
    calendarID: string
    lang: boolean
}

type executeDownloadProps = {
    clickedEvents: EventProps[]
    calendarID: string
    dispatch: Dispatch<AnyAction>
    lang: boolean
}

/**
 * Handles press of download button, changes color of the button
 * and downloads if more than 3 seconds since last download
 *
 * @see executeDownload Executes the download if permitted
 */
export default async function handleDownload({clickedEvents, calendarID, 
dispatch, lang}: handleDownloadProps) {
    await executeDownload({clickedEvents, calendarID, dispatch, lang})
}

/**
 * Adds the passed events to the default calendar of the phone
 * @param events Events to add to calendar 
 * @param calendarID ID of the calendar to add the events to 
 */
export async function updateCalendar({events, calendarID, lang}: updateCalendarProps) {
    const { status } = await requestCalendarPermissionsAsync()

    if (status !== "granted") return

    const calendarEvents = await getEventsAsync(
        [calendarID],
        // Start date = 24 hours ago
        new Date(Date.now() - 86400000),
        // End date = 1 year from now
        new Date(Date.now() + 31536000000)
    )

    const formattedEvents = await eventsToCalendarFormat({events, calendarID, lang})

    for (const event of formattedEvents) {
        // Find the matching event in the formatted events array
        const matchingEvent = calendarEvents.find(e => e.title === event.title)
        const newObj = {
            title: event.title,
            notes: event.notes,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
        }

        // Update the event in the calendar
        if (matchingEvent) {
            await updateEventAsync(matchingEvent.id, newObj)
        } else {
            await createEventAsync(calendarID, event)
        }
    }
}

/**
 * Function for checking if a given calendar still exists
 *
 * @returns boolean
 */
async function calendarExists(calendarID: string) {
    const { status } = await requestCalendarPermissionsAsync()

    if (status !== "granted") return
    
    try {
        const calendars = await getCalendarsAsync(EntityTypes.EVENT)
        return calendars.find(calendar => calendar.id === calendarID)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Creates a calendar in the default calendar app of the device
 *
 * @param {array} events Events to include in the calendar
 */
async function createCalendar(events: EventProps[], lang: boolean) {
    const { status } = await requestCalendarPermissionsAsync()

    if (status !== "granted") return

    try {
        const defaultCalendarSource = Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Login", id: "", type: ""}

        if (!defaultCalendarSource) {
            throw new Error("Default calendar source is undefined")
        }

        const calendarID = await createCalendarAsync({
            title: "Login",
            color: "#fd8738",
            entityType: EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: "internalCalendarName",
            ownerAccount: "personal",
            accessLevel: CalendarAccessLevel.OWNER,
        })
        await updateCalendar({events, calendarID, lang})

        return calendarID
    } catch (error) {
        console.log(error)
    }
}

/**
 * Function for formatting events to native calendar format
 *
 * @param {array} events      Events to format
 * @returns                   Native calendar objects
 */
async function eventsToCalendarFormat({events, calendarID, lang}: 
eventsToCalendarFormatProps) {
    let formattedEvents = []
    
    for (const event of events) {
        const APIevent = await fetchEventDetails(event)
        let location = lang ? event.location_name_no : event.location_name_en
        const title = lang ? APIevent.name_no : APIevent.name_en
        const notes = lang ? APIevent.description_no : APIevent.description_en

        if (!location.length) location = `https://login.no/events/${event.id}`
        
        const time_start = new Date(APIevent.time_start)
        const time_end = new Date(APIevent.time_end)
        const obj = {
            calendarId: calendarID,
            allDay: false,
            id: `${APIevent.id}`,
            title,
            notes,
            location,
            startDate: time_start,
            endDate: time_end,
            timeZone: "Europe/Oslo",
            status: "CONFIRMED",
            availability: "BUSY",
            alarms: [
                { relativeOffset: -30 }
            ]
        }
        formattedEvents.push(obj)
    }

        return formattedEvents
  }

/**
 * Function for fetching the default calendar source of the device
 *
 * @returns Default source
 */
async function getDefaultCalendarSource() {
    const { status } = await requestCalendarPermissionsAsync()

    if (status !== "granted") return

    try {
        const defaultCalendar = await getDefaultCalendarAsync()
        return defaultCalendar.source
    } catch (error) {
        console.log(error)
    }
}

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
async function executeDownload({clickedEvents, calendarID, dispatch, lang}: executeDownloadProps) {
    if (typeof await calendarExists(calendarID) != "undefined") {
        await updateCalendar({events: clickedEvents, calendarID, lang})
    } else {
        dispatch(setCalendarID(await createCalendar(clickedEvents, lang)))
    }
}
