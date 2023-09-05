import updateCalendar, { createCalendar, calendarExists } from 'login/shared/eventComponents/calendar';

/**
 * Handles press of download button, changes color of the button 
 * and downloads if more than 3 seconds since last download
 * 
 * @see executeDownload Executes the download if permitted
 */
export default async function handleDownload(setDownloadState, downloadState, clickedEvents, calendarID) {
    const currentTime = new Date().toISOString()

    if(downloadState == null) {
        setDownloadState(currentTime);
        await executeDownload(clickedEvents, calendarID);
    } else {
        if(timeSinceDownload() >= 1000) await executeDownload(clickedEvents, calendarID);
        setDownloadState(currentTime);
    }
}

/**
 * Checks how long its been since the events were last downloaded and returns the time in seconds.
 * 
 * @returns int, seconds
 */
export function timeSinceDownload(downloadState) {
    const now = new Date()
    const before = new Date(downloadState);
    return now-before;
}

/**
 * Executes the download itself, updates existing calendar or creates a new calendar if no calendar exists.
 * 
 * @param clickedEvents Array of events the user has joined
 * @param calendarID    ID of the calendar if one does already exist
 * 
 * @see calendarExists  Checks if the calendar storage is defined and if it still exists on the device
 * @see setCalendarID   Stores the ID of a new calendar in localstorage
 * @see updateCalendar  Updates the events for a calendar that is found 
 * @see createCalendar  Creates a new calendar if no calendar is to be found
 */
async function executeDownload(setCalendarID, clickedEvents, calendarID) {
    if (typeof await calendarExists(calendarID) != "undefined") await updateCalendar(clickedEvents, calendarID)
    else dispatch(setCalendarID(await createCalendar(clickedEvents)));
}