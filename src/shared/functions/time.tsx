import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { T } from "@styles/text"
import React from "react"

type EventTimeProps = {
    startTime: string
    endTime: string
}

type GetEndTimeProps = {
    input: string
    lang: boolean
    theme: number
}

/**
 * Function for displaying the event status, how long till it starts, how long its been ongoing, or how long till it ends
 * @param {string} startTime
 * @param {string} endTime
 * @returns Event start time, as a text inside a view
 */
export default function EventTime({startTime, endTime}: EventTimeProps): JSX.Element { // startTime

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const year     = new Date().getFullYear()
    const month    = new Date().getMonth()
    const day      = new Date().getDate()
    const hour     = new Date().getHours()
    const minute   = new Date().getMinutes()

    if(startTime.length && endTime.length){
        //Concatenating start
        const startYear   = parseInt((startTime)[0] + (startTime)[1] + (startTime)[2] + (startTime)[3])
        const startMonth  = parseInt((startTime)[5] + (startTime)[6])-1
        const startDay    = parseInt((startTime)[8] + (startTime)[9])
        const startHour   = parseInt((startTime)[11] + (startTime)[12])
        const startMinute = parseInt((startTime)[14] + (startTime)[15])

        // Concatenating end:
        const endYear     = parseInt((endTime)[0]  + (endTime)[1] + (endTime)[2] + (endTime)[3])
        const endMonth    = parseInt((endTime)[5]  + (endTime)[6])-1
        const endDay      = parseInt((endTime)[8]  + (endTime)[9])
        const endHour     = parseInt((endTime)[11] + (endTime)[12])
        const endMinute   = parseInt((endTime)[14] + (endTime)[15])

        // Amount of minutes remaining if less than one hour
        const startMinutesCalculated = 59-startMinute-minute

        // Minutes remaining till event if more than one hour
        const startMinuteMore = 59-minute
        const nextHour = 59-startMinutesCalculated

        // Days left if event is next month
        const nextMonth = (lastDayOfMonth(month+1)-day)+startDay

        // Amount of hours remaining if the event is the same day
        const startHourCalculated = startHour-hour-1

        // Amount of minutes remaining after hours have been subtracted
        const startMinutesAfterHourCalculated = 59-startMinutesCalculated
        const startsNextDay = 24-(hour-startHour)

        // Startday if event is in more than 1 month
        const startDayNextMonth = lastDayOfMonth(month)-day

        // Startday if event is in less than 1 month
        const lessThanOneMonth = 31+startDay*2-startDay-day

        // Startmonth if event is this year
        const monthThisYear = startMonth-month

        // Startmonth if event is next year
        const monthNextYear = 12+monthThisYear

        // How many minutes the event has gone on for
        const ongoingMinuteCalculated = minute-startMinute

        // Calculates time left
        const endMinuteCalculated = endMinute-minute
        const endHourCalculated   = endHour-hour
        const endDayCalculated    = endDay-day
        const endMonthCalculated  = endMonth-month
        const endYearCalculated   = endYear-year

        if(beyondTime(startTime) && !beyondTime(endTime)){
            if (endYear === year) {
                if (endMonth === month) {
                    if (endDay === day) {
                        if (endHour === hour) {
                            if (endMinute === minute) {
                                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Slutt" : "Ended"}</Text></View>)
                            } else {
                                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig om " + endMinuteCalculated + "min" : "Ends in " + endMinuteCalculated + "min"}</Text></View>)
                            }
                        } else {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig om " + endHourCalculated + "t " + endMinuteCalculated + "min" : "Ends in " + endHourCalculated + "h " + endMinuteCalculated + "min"}</Text></View>)
                        }
                    } else {
                        if (endDayCalculated === 1) {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig i morgen" : "Ends tomorrow"}</Text></View>)
                        } else {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig om " + endDayCalculated + " dager" : "Ends in " + endDayCalculated + " days"}</Text></View>)
                        }
                    }
                } else {
                    if (endMonthCalculated === 1) {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig neste måned" : "Ends next month"}</Text></View>)
                    } else {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig om " + endMonthCalculated + " måneder" : "Ends in " + endMonthCalculated + " months"}</Text></View>)
                    }
                }
            } else {
                if (endYearCalculated === 1) {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig neste år" : "Ends next year"}</Text></View>)
                } else {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Ferdig om " + endYearCalculated + " år" : "Ends in " + endYearCalculated + " years"}</Text></View>)
                }
            }
        }

        // Event is this year
        if(startYear === year) {
            // Event is this month
            if (startMonth === month) {
                // Event is today
                if (startDay === day) {
                    // Event is this hour
                    if (startHour === hour) {
                        // Event is now
                        if (startMinute === minute) {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Nå" : "Now"}</Text></View>)
                        // Event started x minutes ago
                        } else if (startMinute < minute) {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Pågått i " + ongoingMinuteCalculated + "min" : "Started " + ongoingMinuteCalculated + " min ago"}</Text></View>)
                        // Event starts in x minutes
                        } else {
                            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{startMinutesCalculated} {lang ? " min til" : " min left"}</Text></View>)
                        }
                    // Event started less than 1 hour ago
                    } else if (startHour === hour-1) {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Pågått i " + nextHour + "min": "Started " + nextHour + "min ago"}</Text></View>)
                    // Event started between 1 and 2 hours ago
                    } else if (startHour === hour-2) {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{hour-startHour-1} {lang ? " time siden" : " hour ago"}</Text></View>)
                    // Event was x hours ago
                    } else if (startHour < hour){
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{hour-startHour-1} {lang ? " timer siden" : " hours ago"}</Text></View>)
                    // Event is the next hour
                    } else if (startHour === hour+1){
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? startMinutesCalculated + "min til" : "Starts in " + startMinutesCalculated + "min"}</Text></View>)
                    // Event starts in x hours
                    } else {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? startHourCalculated + "t " + startMinuteMore + "min til" : "Starts in " + startHourCalculated + "h " + startMinutesAfterHourCalculated + "min"}</Text></View>)
                    }
                // Event was yesterday
                } else if (startDay === day-1) {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "I går" : "Yesterday"}</Text></View>)
                // Event was x days ago
                } else if (startDay < day){
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{day-startDay} {lang ? " dager siden" : " days ago"}</Text></View>)
                // Event is tomorrow
                } else if (startDay === day+1){
                    // Event is in less than 24 hours
                    if (startHour <= hour) {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Starter om " + startsNextDay + "t" : "Starts in " + startsNextDay + "h"}</Text></View>)
                    // Event is tomorrow but in more than 24 hours
                    } else {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "I morgen" : "Tomorrow"}</Text></View>)
                    }
                // Event is in x days
                }else{
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Starter om": "Starts in"} {startDay-day} {lang ? "dager" : "days"}</Text></View>)
                }
            // Event is next month
            } else if (startMonth === month+1) {
                if (day === lastDayOfMonth(month+1) && startDay === 1) {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "I morgen" : "Tomorrow"}</Text></View>)
                } else if (day > startDay) {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? nextMonth + " dager til" : "Starts in " + nextMonth + " days"}</Text></View>)
                }else {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Neste måned" : "Next Month"}</Text></View>)
                }
            } else if (startMonth === month) { //Event was last month
                // If the event was the last day of the month and youre on the first day of the month
                if (day === 1 && startDay === lastDayOfMonth(month)) {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "I går": "Yesterday"}</Text></View>)
                // If the event was last month, but youre not on the first day of the month
                } else {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Forrige måned" : "Last month"}</Text></View>)
                }
            // Event was 1 month ago
            } else if (startMonth < month && month-startMonth === 1){
                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{month-startMonth} {lang ? "måned siden" : "month ago"}</Text></View>)
            // Event was x months ago
            } else if (startMonth < month){
                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{month-startMonth} {lang ? "måneder siden" : "months ago"}</Text></View>)
            // Event is next month
            } else if (startMonth === month+1){
                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? startDayNextMonth + " dager til" : " Starts in " + startDayNextMonth +  "days"}</Text></View>)
            // Event is in x months
            } else {
                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? monthThisYear + " måneder til" : " Starts in " + monthThisYear + " months"}</Text></View>)
            }
        // Event was last year
        } else if (startYear === year-1){
            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "I fjor" : "Last year"}</Text></View>)
        // Event was x years ago
        } else if (startYear < year){
            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{year-startYear} {lang ? "år siden" : "years ago"}</Text></View>)
        //Event is next year
        } else if (startYear === year+1){
            // Event is in less than 12 months
            if(monthNextYear <= 12){
                // Event is in January
                if(monthNextYear === 1){
                    // Less than one month till event
                    if (lessThanOneMonth <= 31) {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? lessThanOneMonth + " dager til" : "Starts in " + lessThanOneMonth + " days"}</Text></View>)
                    // More than one month till event
                    } else {
                        return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Neste måned" : "Next month"}</Text></View>)
                    }
                // Event is not in January
                } else {
                    return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? monthNextYear + " måneder til" : "Starts in " + monthNextYear + " months"}</Text></View>)
                }
            // Event is in more than 12 months
            } else {
                return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Neste år" : "Next year"}</Text></View>)
            }
        // Event is in x years
        } else {
            return (<View><Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>{lang ? "Starter om " : "Starts in "} {startYear-year} {lang ? " år" : " years"}</Text></View>)
        }
    // Error occured
    } else {
        return (<View><Text style={T.red}>{lang ? "Laster..." : "Loading..."}</Text></View>)
    }
}

/**
 * Function for checking if the given year is a leap year (skuddår)
 * @param {number} year
 * @returns boolean, true if yes, false if no
 */
function leapYear(year: number): boolean {         //Bool for leapyear
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
}

/**
 *  Function for checking how many days are in a month
 * @param {number} month The month in question
 * @returns The number of days in the given month
 */
function lastDayOfMonth(month: number): number {
    var year = new Date().getFullYear()
    switch (month) {
        case 2: {
            // 29 days in february if leapyear
            if(leapYear(year)) return 29
            else return 28
        }
        case 4:     return 30
        case 6:     return 30
        case 9:     return 30
        case 11:    return 30
        default:    return 31
    }
}

/**
 * Function for checking if an event has passed, checks if current time is beyond eventTime
 * @param {string} eventTime
 * @returns Boolean, true if passed, otherwise false
 */
function beyondTime(eventTime: string): boolean { // True if the given time has passed
    var year     = new Date().getFullYear()
    var month    = 1 + new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()

    const eventYear     = parseInt((eventTime)[0]  + (eventTime)[1] + (eventTime)[2] + (eventTime)[3])
    const eventMonth    = parseInt((eventTime)[5]  + (eventTime)[6])
    const eventDay      = parseInt((eventTime)[8]  + (eventTime)[9])
    const eventHour     = parseInt((eventTime)[11] + (eventTime)[12])
    const eventMinute   = parseInt((eventTime)[14] + (eventTime)[15])

    if (eventYear >= year) {
        if(eventYear > year) return false
        if (eventMonth >= month) {
            if(eventMonth > month) return false
            if (eventDay >= day) {
                if(eventDay > day) return false
                if (eventHour >= hour) {
                    if(eventHour > hour) return false
                    if (eventMinute >= minute) return false
                    else return true
                } else return true
            } else return true
        } else return true
    } else return true
}

/**
 * Function for checking if the event ends soon, true if more than half way
 *
 * @param {string} endTime Endtime of the event
 * @returns                Boolean
 */
export function endsSoon(endTime: string): boolean {
    const year     = new Date().getFullYear()
    const month    = 1 + new Date().getMonth()
    const day      = new Date().getDate()
    const hour     = new Date().getHours()
    const minute   = new Date().getMinutes()
    const endYear     = parseInt((endTime)[0]  + (endTime)[1] + (endTime)[2] + (endTime)[3])
    const endMonth    = parseInt((endTime)[5]  + (endTime)[6])
    const endDay      = parseInt((endTime)[8]  + (endTime)[9])
    const endHour     = parseInt((endTime)[11] + (endTime)[12])
    const endMinute   = parseInt((endTime)[14] + (endTime)[15])

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
export function GetEndTime({input, lang, theme}: GetEndTimeProps){

    if (input != null){
        // Fetching endtime ciphers from api
        const hour1     = (input)[11]
        const hour2     = (input)[12]
        const minute1   = (input)[14]
        const minute2   = (input)[15]
        return (
            <View>
                <Text style={{
                    ...T.specificEventInfo,
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                        {hour1}{hour2}:{minute1}{minute2}
                </Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={{
                    ...T.locationError,
                    color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                        {lang
                            ? "Feil ved henting av sluttid."
                            : "Error fetching endtime."
                        }
                </Text>
            </View>
        )

    }
}