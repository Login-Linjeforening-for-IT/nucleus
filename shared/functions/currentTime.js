/**
 * Returns the current time as a string
 * 
 * @returns Timestamp
 */
export default function currentTime () {
   
    let year     = new Date().getFullYear()                                                                 // Current year
    let month    = 1 + new Date().getMonth()                                                                // Current month
    let day      = new Date().getDate()                                                                     // Current day
    let hour     = new Date().getHours()                                                                    // Current hour
    let minute   = new Date().getMinutes()                                                                  // Current minute
    let second   = new Date().getSeconds()

    if(month < 10) month = '0' + month                                                                      // Checking and fixing missing 0
    if(day < 10) day = '0' + day                                                                            // Checking and fixing missing 0
    if(hour < 10) hour = '0' + hour                                                                         // Checking and fixing missing 0
    if(minute < 10) minute = '0' + minute                                                                   // Checking and fixing missing 0
    if(second < 10) second = '0' + second                                                                   // Checking and fixing missing 0

    let currentTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z'       // Current full date
    return currentTime;                                                                                     // Returning current time
} 