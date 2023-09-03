import FetchColor from '../../styles/fetchTheme';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text'

/**
 * Function for displaying the event status, how long till it starts, how long its been ongoing, or how long till it ends
 * @param {string} startTime 
 * @param {string} endTime 
 * @returns Event start time, as a text inside a view
 */
export default function EventTime(startTime, endTime) { // startTime
    
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    var year     = new Date().getFullYear()
    var month    = new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()

    if(startTime != null && endTime != null){                                               //Concatenating start:
        const startYear   = parseInt((startTime)[0] + (startTime)[1] + (startTime)[2] + (startTime)[3])   //  year
        const startMonth  = parseInt((startTime)[5] + (startTime)[6])-1                                   //  month
        const startDay    = parseInt((startTime)[8] + (startTime)[9])                                     //  day
        const startHour   = parseInt((startTime)[11] + (startTime)[12])                                   //  hour
        const startMinute = parseInt((startTime)[14] + (startTime)[15])                                   //  minute
                                                                                                //Concatenating end:
        const endYear     = parseInt((endTime)[0]  + (endTime)[1] + (endTime)[2] + (endTime)[3])          //  year
        const endMonth    = parseInt((endTime)[5]  + (endTime)[6])-1                                      //  month
        const endDay      = parseInt((endTime)[8]  + (endTime)[9])                                        //  day
        const endHour     = parseInt((endTime)[11] + (endTime)[12])                                       //  hour
        const endMinute   = parseInt((endTime)[14] + (endTime)[15])                                       //  minute

        const startMinutesCalculated = 59-startMinute-minute                                       //  Amount of minutes remaining if less than one hour
        const startMinuteMore = 59-minute                                                       //  Minutes remaining till event if more than one hour
        const nextHour = 59-startMinutesCalculated 
        const nextMonth = (lastDayOfMonth(month+1)-day)+startDay                                  //  Days left if event is next month
        const startHourCalculated = startHour-hour-1                                            //  Amount of hours remaining if the event is the same day
        const startMinutesAfterHourCalculated = 59-startMinutesCalculated                       //  Amount of minutes remaining after hours have been subtracted
        const startsNextDay = 24-(hour-startHour)
        const startDayNextMonth = lastDayOfMonth(month)-day                                     //  Startday if event is in more than 1 month
        const lessThanOneMonth = 31+startDay*2-startDay-day                                     //  Startday if event is in less than 1 month

        const monthThisYear = startMonth-month                                                  //  Startmonth if event is this year
        const monthNextYear = 12+monthThisYear                                                  //  Startmonth if event is next year
        const ongoingMinuteCalculated = minute-startMinute                                      //  How many minutes the event has gone on for

        const endMinuteCalculated = endMinute-minute                                            //  Minutes left
        const endHourCalculated   = endHour-hour                                                //  Hours left
        const endDayCalculated    = endDay-day                                                  //  Days left
        const endMonthCalculated  = endMonth-month                                              //  Months left
        const endYearCalculated   = endYear-year                                                //  Years left
        
        if(beyondTime(startTime) && !beyondTime(endTime)){
            if (endYear == year) {
                if (endMonth == month) {
                    if (endDay == day) {
                        if (endHour == hour) {
                            if (endMinute == minute) {
                                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Slutt' : 'Ended'}</Text></View>)
                            } else {
                                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig om ' + endMinuteCalculated + 'min' : 'Ends in ' + endMinuteCalculated + 'min'}</Text></View>)
                            }
                        } else {
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig om ' + endHourCalculated + 't ' + endMinuteCalculated + 'min' : 'Ends in ' + endHourCalculated + 'h ' + endMinuteCalculated + 'min'}</Text></View>)
                        }
                    } else {
                        if (endDayCalculated == 1) {
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig i morgen' : 'Ends tomorrow'}</Text></View>)
                        } else {
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig om ' + endDayCalculated + ' dager' : 'Ends in ' + endDayCalculated + ' days'}</Text></View>)
                        }                    
                    }
                } else {
                    if (endMonthCalculated == 1) {
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig neste måned' : 'Ends next month'}</Text></View>)
                    } else {
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig om ' + endMonthCalculated + ' måneder' : 'Ends in ' + endMonthCalculated + ' months'}</Text></View>)
                    }
                }
            } else {
                if (endYearCalculated == 1) {
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig neste år' : 'Ends next year'}</Text></View>)
                } else {
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Ferdig om ' + endYearCalculated + ' år' : 'Ends in ' + endYearCalculated + ' years'}</Text></View>)
                }
            }
        }

        if(startYear == year) {                                 //Event is this year
            if (startMonth == month) {                          //Event is this month
                if (startDay == day) {                          //Event is today
                    if (startHour == hour) {                    //Event is this hour
                        if (startMinute == minute) {            //Event is now
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Nå' : 'Now'}</Text></View>)
                        }else if(startMinute < minute){ //Event started x minutes ago
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Pågått i ' + ongoingMinuteCalculated + 'min' : 'Started ' + ongoingMinuteCalculated + ' min ago'}</Text></View>)
                        }else{  //Event starts in x minutes
                            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{startMinutesCalculated} {lang ? ' min til' : ' min left'}</Text></View>)
                        }
                    }else if(startHour == hour-1){ //Event started less than 1 hour ago
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Pågått i ' + nextHour + 'min': 'Started ' + nextHour + 'min ago'}</Text></View>)
                    }else if(startHour == hour-2){ //Event started between 1 and 2 hours ago
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{hour-startHour-1} {lang ? ' time siden' : ' hour ago'}</Text></View>)
                    }else if(startHour < hour){ //Event was x hours ago
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{hour-startHour-1} {lang ? ' timer siden' : ' hours ago'}</Text></View>)
                    }else if(startHour == hour+1){ //Event is the next hour
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? startMinutesCalculated + 'min til' : 'Starts in ' + startMinutesCalculated + 'min'}</Text></View>)
                    }else{ //Event starts in x hours
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? startHourCalculated + 't ' + startMinuteMore + 'min til' : 'Starts in ' + startHourCalculated + 'h ' + startMinutesAfterHourCalculated + 'min'}</Text></View>)
                    }
                }else if(startDay == day-1){ //Event was yesterday
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'I går' : 'Yesterday'}</Text></View>)
                }else if(startDay < day){ //Event was x days ago
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{day-startDay} {lang ? ' dager siden' : ' days ago'}</Text></View>)
                }else if(startDay == day+1){ //Event is tomorrow
                    if (startHour <= hour) { //Event is in less than 24 hours
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter om ' + startsNextDay + 't' : 'Starts in ' + startsNextDay + 'h'}</Text></View>)
                    }else{ //Event is tomorrow but in more than 24 hours
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'I morgen' : 'Tomorrow'}</Text></View>)
                    }
                }else{ //Event is in x days
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter om': 'Starts in'} {startDay-day} {lang ? 'dager' : 'days'}</Text></View>)
                }
            }else if(startMonth == month+1){ //Event is next month
                if (day == lastDayOfMonth(month+1) && startDay == 1) {
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'I morgen' : 'Tomorrow'}</Text></View>)
                } else if (day > startDay) {
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? nextMonth + ' dager til' : 'Starts in ' + nextMonth + ' days'}</Text></View>)
                }else {
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Neste måned' : 'Next Month'}</Text></View>)
                }
            }else if(startMonth == month){ //Event was last month
                if (day == 1 && startDay == lastDayOfMonth(month)) { //If the event was the last day of the month and youre on the first day of the month
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'I går': 'Yesterday'}</Text></View>)
                }else{ //If the event was last month, but youre not on the first day of the month
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Forrige måned' : 'Last month'}</Text></View>)
                }
            }else if(startMonth < month && month-startMonth == 1){ //Event was 1 month ago
                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{month-startMonth} {lang ? 'måned siden' : 'month ago'}</Text></View>)
            }else if(startMonth < month){ //Event was x months ago
                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{month-startMonth} {lang ? 'måneder siden' : 'months ago'}</Text></View>)
            }else if(startMonth == month+1){ //Event is next month
                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? startDayNextMonth + ' dager til' : ' Starts in ' + startDayNextMonth +  'days'}</Text></View>)
            }else{ //Event is in x months
                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? monthThisYear + ' måneder til' : ' Starts in ' + monthThisYear + ' months'}</Text></View>)
            }
        }else if(startYear == year-1){ //Event was last year
            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'I fjor' : 'Last year'}</Text></View>)
        }else if(startYear < year){ //Event was x years ago
            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{year-startYear} {lang ? 'år siden' : 'years ago'}</Text></View>)
        }else if(startYear == year+1){ //Event is next year
            if(monthNextYear <= 12){ //Event is in less than 12 months
                if(monthNextYear == 1){    //Event is in January
                    if (lessThanOneMonth <= 31) { //Less than one month till event
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? lessThanOneMonth + ' dager til' : 'Starts in ' + lessThanOneMonth + ' days'}</Text></View>)
                    } else {    //More than one month till event
                        return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Neste måned' : 'Next month'}</Text></View>)
                    }
                }else{   //Event is not in January
                    return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? monthNextYear + ' måneder til' : 'Starts in ' + monthNextYear + ' months'}</Text></View>)
                }
            }else{  //Event is in more than 12 months
                return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Neste år' : 'Next year'}</Text></View>)
            }
        }else{  //Event is in x years
            return(<View><Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter om ' : 'Starts in '} {startYear-year} {lang ? ' år' : ' years'}</Text></View>)
        }
    }else{  //Error occured
        return(<View><Text style={T.red}>{lang ? 'Feil ved henting av tid' : 'Error fetching time'}</Text></View>)
    }
}

/**
 * Function for checking if the given year is a leap year (skuddår)
 * @param {number} year 
 * @returns boolean, true if yes, false if no
 */
function leapYear(year){         //Bool for leapyear
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

/**
 *  Function for checking how many days are in a month
 * @param {number} month The month in question
 * @returns The number of days in the given month
 */
function lastDayOfMonth(month) { //Returns amount of days in the given month, also checks for leap year
    var year = new Date().getFullYear()
    switch (month) {
        case 2:     
            if(leapYear(year)){return 29} //29 days in february if true
            else{return 28}
        case 4:     return 30;
        case 6:     return 30;
        case 9:     return 30;
        case 11:    return 30;
        default:    return 31;
    }
}

/**
 * Function for checking if an event has passed, checks if current time is beyond eventTime
 * @param {string} eventTime 
 * @returns Boolean, true if passed, otherwise false
 */
function beyondTime(eventTime) { // True if the given time has passed
    var year     = new Date().getFullYear()
    var month    = 1 + new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()

    const eventYear     = (eventTime)[0]  + (eventTime)[1] + (eventTime)[2] + (eventTime)[3]      //  year
    const eventMonth    = (eventTime)[5]  + (eventTime)[6]                                        //  month
    const eventDay      = (eventTime)[8]  + (eventTime)[9]                                        //  day
    const eventHour     = (eventTime)[11] + (eventTime)[12]                                       //  hour
    const eventMinute   = (eventTime)[14] + (eventTime)[15]                                       //  minute
    
    if (eventYear >= year) {
        if(eventYear > year) return false
        if (eventMonth >= month) {
            if(eventMonth > month) return false
            if (eventDay >= day) {
                if(eventDay > day) return false
                if (eventHour >= hour) {
                    if(eventHour > hour) return false
                    if (eventMinute >= minute) { return false} 
                    else {return true}
                } else {return true}
            } else {return true}
        } else {return true}
    } else {return true}
}

/**
 * Function for checking if the event ends soon
 * @param {string} endTime Endtime of the event
 * @returns                Boolean 
 */
export function endsSoon(endTime) {     //Bool for if we are more than half way through the event
    var year     = new Date().getFullYear()
    var month    = 1 + new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()

    const endYear     = (endTime)[0]  + (endTime)[1] + (endTime)[2] + (endTime)[3]  //  year
    const endMonth    = (endTime)[5]  + (endTime)[6]                                //  month
    const endDay      = (endTime)[8]  + (endTime)[9]                                //  day
    const endHour     = (endTime)[11] + (endTime)[12]                               //  hour
    const endMinute   = (endTime)[14] + (endTime)[15]                               //  minute
    
    if(endYear/2 <= year){
        if(endYear != year){ return true
        }else{
            if(endMonth/2 <= month){
                if(endMonth != month){ return true
                }else{
                    if(endDay/2 <= day){
                        if(endDay != day){ return true
                        }else{
                            if(endHour/2 <= hour){
                                if(endHour != hour){ return true
                                }else{
                                    if(endMinute/2 <= minute){
                                        if(endMinute != minute){ return true
                                        }else{return false}
                                    }else{return false}}
                            }else{return false}}
                    }else{return false}}
            }else{return false}}
    }else{return false}
}

/**
 * Function for rendering the end time of an event
 * @param {string} input 
 * @returns View containing the endtime as a text
 */
export function GetEndTime(input){

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if(input != null){
        const hour1     = (input)[11]    //Fetching endtime cipher 1 from api
        const hour2     = (input)[12]    //Fetching endtime cipher 2 from api
        const minute1   = (input)[14]    //Fetching endtime cipher 3 from api
        const minute2   = (input)[15]    //Fetching endtime cipher 4 from api
        return(<View><Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{hour1}{hour2}:{minute1}{minute2}</Text></View>)
    }else{
        return(<View><Text style={{...T.locationError, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Feil ved henting av sluttid.' : 'Error fetching endtime.'}</Text></View>)

    }
}