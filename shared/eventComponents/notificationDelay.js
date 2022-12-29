/**
 * Function for fetching the delay in seconds between the current time and when the notification should be sent
 * @param {event} props Event object
 * @returns seconds
 */
export function NotificationDelay (props) {
    var year     = new Date().getFullYear()                                                                 // Current year
    var month    = 1 + new Date().getMonth()                                                                // Current month
    var day      = new Date().getDate()                                                                     // Current day
    var hour     = new Date().getHours()                                                                    // Current hour
    var minute   = new Date().getMinutes()                                                                  // Current minute
    
    if(month < 10) month = '0' + month                                                                      // Checking and fixing missing 0
    if(day < 10) day = '0' + day                                                                            // Checking and fixing missing 0
    if(hour < 10) hour = '0' + hour                                                                         // Checking and fixing missing 0
    if(minute < 10) minute = '0' + minute                                                                   // Checking and fixing missing 0

    var currentTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00Z'                   // Current full date

    var testTime = 2022 + '-' + 12 + '-' + 29 + 'T' + '03' + ':' + '43' + ':00Z'
    const dt1 = new Date(currentTime);                                                                      // Converting from string to date
    const dt2 = new Date(props.startt);                                                                     // Converting from string to date
    const dt3 = new Date(testTime);                                                                         // Converting from string to date

    const seconds = (dt3.getTime() - dt1.getTime()) / 1000;                                                 // Subtracting and dividing from milliseconds to seconds
    console.log(seconds)
    if(seconds > 3602) return seconds-3600;                                                                 // Checks if its more than 1 hour till the event
    else if (seconds < 2) return 2;                                                                         // Returns 2 to instasend if date is passed
    else return seconds                                                                                     // Otherwise returns seconds
  } 