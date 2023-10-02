import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React from "react"

type EventTimeProps = {
    startTime: string
    endTime: string
}

type GetEndTimeProps = {
    input: string
    theme: number
    lang: boolean
}

/**
 * Function for displaying the event status, how long till it starts, how long its been ongoing, or how long till it ends
 * @param {string} startTime
 * @param {string} endTime
 * @returns Event start time, as a text inside a view
 */
export default function EventTime({startTime, endTime}: EventTimeProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const string = stringEvent({startTime, endTime})

    return (
        <View>
            <Text style={{...T.text25, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                {string}
            </Text>
        </View>
    )
}

/**
 * Function for displaying the event status, how long till it starts, how long its been ongoing, or how long till it ends
 * @param {string} startTime
 * @param endTime
 * @returns Event start time, as a text inside a view
 */
export function stringEvent({startTime, endTime}: EventTimeProps): string { // startTime
    const { lang  } = useSelector((state: ReduxState) => state.lang)

    const year     = new Date().getFullYear()
    const month    = new Date().getMonth()
    const day      = new Date().getDate()
    const hour     = new Date().getHours()
    const minute   = new Date().getMinutes()

    if (startTime.length && endTime.length) {
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

        const textNO = [
            "Slutt",
            "Ferdig om " + endMinuteCalculated + "min",
            "Ferdig om " + endHourCalculated + "t " + endMinuteCalculated + "min",
            "Ferdig i morgen",
            "Ferdig om " + endDayCalculated + " dager",
            "Ferdig neste måned",
            "Ferdig om " + endMonthCalculated + " måneder",
            "Ferdig neste år",
            "Ferdig om " + endYearCalculated + " år",
            "Nå",
            "Pågått i " + ongoingMinuteCalculated + "min",
            " min til",
            "Pågått i " + nextHour + "min",
            " time siden",
            " timer siden",
            startMinutesCalculated + "min til",
            startHourCalculated + "t " + startMinuteMore + "min til",
            "I går",
            " dager siden",
            "Starter om " + startsNextDay + "t",
            "I morgen",
            `Starter om ${startDay-day} dager`,
            "I morgen",
            `${nextMonth} dager til`,
            "Neste måned",
            "I går",
            "Forrige måned",
            "måned siden",
            "måneder siden",
            " dager til",
            `${monthThisYear} måneder til`,
            "I fjor",
            "år siden",
            " dager til",
            "Neste måned",
            monthNextYear + " måneder til",
            "Neste år",
            "Starter om ",
            " år"
        ]

        const textEN = [
            "Ended",
            "Ends in " + endMinuteCalculated + "min",
            "Ends in " + endHourCalculated + "h " + endMinuteCalculated + "min",
            "Ends tomorrow",
            "Ends in " + endDayCalculated + " days",
            "Ends next month",
            "Ends in " + endMonthCalculated + " months",
            "Ends next year",
            "Ends in " + endYearCalculated + " years",
            "Now",
            "Started " + ongoingMinuteCalculated + " min ago",
            " min left",
            "Started " + nextHour + "min ago",
            " hour ago",
            " hours ago",
            "Starts in " + startMinutesCalculated + "min",
            "Starts in " + startHourCalculated + "h " + startMinutesAfterHourCalculated + "min",
            "Yesterday",
            " days ago",
            "Starts in " + startsNextDay + "h",
            "Tomorrow",
            `Starts in ${startDay-day} days`,
            "Tomorrow",
            `Starts in ${nextMonth} days`,
            "Next Month",
            "Yesterday",
            "Last month",
            "month ago",
            "months ago",
            " Starts in " + startDayNextMonth +  "days",
            ` Starts in ${monthThisYear} months`,
            "Last year",
            "years ago",
            "Starts in " + lessThanOneMonth + " days",
            "Next month",
            "Starts in " + monthNextYear + " months",
            "Next year",
            "Starts in ",
            " years"
        ]

        const text = lang ? textNO : textEN

        if (beyondTime(startTime) && !beyondTime(endTime)) {
            if (endYear === year) {
                if (endMonth === month) {
                    if (endDay === day) {
                        if (endHour === hour) {
                            if (endMinute === minute) {
                                return text[0]
                            } else {
                                return text[1]
                            }
                        } else {
                            return text[2]
                        }
                    } else {
                        if (endDayCalculated === 1) {
                            return text[3]
                        } else {
                            return text[4]
                        }
                    }
                } else {
                    if (endMonthCalculated === 1) {
                        return text[5]
                    } else {
                        return text[6]
                    }
                }
            } else {
                if (endYearCalculated === 1) {
                    return text[7]
                } else {
                    return text[8]
                }
            }
        }

        // Event is this year
        if (startYear === year) {
            // Event is this month
            if (startMonth === month) {
                // Event is today
                if (startDay === day) {
                    // Event is this hour
                    if (startHour === hour) {
                        // Event is now
                        if (startMinute === minute) {
                            return text[9]
                        // Event started x minutes ago
                        } else if (startMinute < minute) {
                            return text[10]
                        // Event starts in x minutes
                        } else {
                            return text[11]
                        }
                    // Event started less than 1 hour ago
                    } else if (startHour === hour-1) {
                        return text[12]
                    // Event started between 1 and 2 hours ago
                    } else if (startHour === hour-2) {
                        return text[13]
                    // Event was x hours ago
                    } else if (startHour < hour) {
                        return text[14]
                    // Event is the next hour
                    } else if (startHour === hour+1) {
                        return text[15]
                    // Event starts in x hours
                    } else {
                        return text[16]
                    }
                // Event was yesterday
                } else if (startDay === day-1) {
                    return text[17]
                // Event was x days ago
                } else if (startDay < day) {
                    return text[18]
                // Event is tomorrow
                } else if (startDay === day+1) {
                    // Event is in less than 24 hours
                    if (startHour <= hour) {
                        return text[19]
                    // Event is tomorrow but in more than 24 hours
                    } else {return text[20]}
                // Event is in x days
                } else {
                    return text[21]
                }
            // Event is next month
            } else if (startMonth === month+1) {
                if (day === lastDayOfMonth(month+1) && startDay === 1) {
                    return text[22]
                } else if (day > startDay) {
                    return text[23]
                } else {return text[24]}
            } else if (startMonth === month) { // Event was last month
                // If the event was the last day of the month and youre on the first day of the month
                if (day === 1 && startDay === lastDayOfMonth(month)) {
                    return text[25]
                // If the event was last month, but youre not on the first day of the month
                } else {return text[26]}
            // Event was 1 month ago
            } else if (startMonth < month && month-startMonth === 1) {
                return text[27]
            // Event was x months ago
            } else if (startMonth < month) {
                return text[28]
            // Event is next month
            } else if (startMonth === month+1) {
                return text[29]
            // Event is in x months
            } else {
                return text[30]
            }
        // Event was last year
        } else if (startYear === year-1) {
            return text[31]
        // Event was x years ago
        } else if (startYear < year) {
            return text[32]
        //Event is next year
        } else if (startYear === year+1) {
            // Event is in less than 12 months
            if (monthNextYear <= 12) {
                // Event is in January
                if (monthNextYear === 1) {
                    // Less than one month till event
                    if (lessThanOneMonth <= 31) {
                        return text[33]
                    // More than one month till event
                    } else {
                        return text[34]
                    }
                // Event is not in January
                } else {
                    return text[35]
                }
            // Event is in more than 12 months
            } else {
                return text[36]
            }
        // Event is in x years
        } else {
            return text[37]
        }
    }
    
    // Error occured
    return lang ? "Laster..." : "Loading..."
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
            if (leapYear(year)) return 29
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
        if (eventYear > year) return false
        if (eventMonth >= month) {
            if (eventMonth > month) return false
            if (eventDay >= day) {
                if (eventDay > day) return false
                if (eventHour >= hour) {
                    if (eventHour > hour) return false
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

    if (endYear/2 <= year) {
        if (endYear != year) { return true
        } else {
            if (endMonth/2 <= month) {
                if (endMonth != month) { return true
                } else {
                    if (endDay/2 <= day) {
                        if (endDay != day) { return true
                        } else {
                            if (endHour/2 <= hour) {
                                if (endHour != hour) { return true
                                } else {
                                    if (endMinute/2 <= minute) {
                                        if (endMinute != minute) { return true
                                        } else return false
                                    } else return false
                                }
                            } else return false
                        }
                    } else return false
                }
            } else return false
        }
    } else return false
}

/**
 * Function for rendering the end time of an event
 * @param {string} input
 * @returns View containing the endtime as a text
 */
export function GetEndTime({input, theme, lang}: GetEndTimeProps) {

    if (input != null) {
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
