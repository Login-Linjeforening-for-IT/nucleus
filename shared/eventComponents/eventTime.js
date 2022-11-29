import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'

export default function EventTime(startTime) {

    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDate()
    var hour = new Date().getHours()
    var minute = new Date().getMinutes()
    var second = new Date().getSeconds()

    if(startTime != null){
        const eventYear1 = (startTime)[0]    //Fetching year cipher 1 from api
        const eventYear2 = (startTime)[1]    //Fetching year cipher 2 from api
        const eventYear3 = (startTime)[2]    //Fetching year cipher 3 from api
        const eventYear4 = (startTime)[3]    //Fetching year cipher 4 from api
        const eventYear = eventYear1 + eventYear2 + eventYear3 + eventYear4  //Concatenating year

        const eventMonth1 = (startTime)[5]   //Fetching month cipher 1 from api
        const eventMonth2 = (startTime)[6]   //Fetching month cipher 1 from api
        const eventMonth = eventMonth1 + eventMonth2     //Concatenating month

        const eventDay1 = (startTime)[8]     //Fetching day cipher 1 from api
        const eventDay2 = (startTime)[9]     //Fetching day cipher 1 from api
        const eventDay = eventDay1 + eventDay2   //Concatenating day

        const eventHour1 = (startTime)[11]   //Fetching hour cipher 1 from api
        const eventHour2 = (startTime)[12]   //Fetching hour cipher 2 from api
        const eventHour = eventHour1 + eventHour2    //Concatenating hour

        const eventMinute1 = (startTime)[14]     //Fetching minute cipher 1 from api
        const eventMinute2 = (startTime)[15]     //Fetching minute cipher 2 from api
        const eventMinute = eventMinute1 + eventMinute2  //Concatenating minute

        if(eventYear == year) { //Event is this year
            if (eventMonth == month+1) { //Event is this month
                if (eventDay == day) { //Event is today
                    if (eventHour == hour) { //Eventet is this hour
                        if (eventMinute == minute) { //Event is now
                            return(<View><Text style={T.centered25}>Nå</Text></View>)
                        }else if(eventMinute < minute){ //Event started x minutes ago
                            return(<View><Text style={T.centered25}>Pågått i {minute-eventMinute} min</Text></View>)
                        }else{  //Event starts in x minutes
                            return(<View><Text style={T.centered25}>Starter om {eventMinute-minute} min</Text></View>)
                        }
                    }else if(eventHour == hour-1){ //Event started less than 1 hour ago
                        return(<View><Text style={T.centered25}>Startet for {59-eventMinute-minute} min siden</Text></View>)
                    }else if(eventHour == hour-2){ //Event started between 1 and 2 hours ago
                        return(<View><Text style={T.centered25}>{hour-eventHour-1} time siden</Text></View>)
                    }else if(eventHour < hour){ //Event was x hours ago
                        return(<View><Text style={T.centered25}>{hour-eventHour-1} timer siden</Text></View>)
                    }else if(eventHour == hour+1){ //Event is the next hour
                        return(<View><Text style={T.centered25}>1t {59-eventMinute-minute} min</Text></View>)
                    }else{ //Event starts in x hours
                        return(<View><Text style={T.centered25}>{eventHour-hour-1}t {59-eventMinute-minute} min</Text></View>)
                    }
                }else if(eventDay == day-1){ //Event was yesterday
                    return(<View><Text style={T.centered25}>I går</Text></View>)
                }else if(eventDay < day){ //Event was x days ago
                    return(<View><Text style={T.centered25}>{day-eventDay} dager siden</Text></View>)
                }else if(eventDay == day+1){ //Event is tomorrow
                    if (eventHour <= hour) { //Event is in less than 24 hours
                        return(<View><Text style={T.centered25}>{24-hour+eventHour}t til</Text></View>)
                    }else{ //Event is tomorrow but in more than 24 hours
                        return(<View><Text style={T.centered25}>I morgen</Text></View>)
                    }
                }else{ //Event is in x days
                    return(<View><Text style={T.centered25}>{eventDay-day} dager til</Text></View>)
                }
            }else if(eventMonth == month+2){ //Event is next month
                if (day == lastDayOfMonth(month+1) && eventDay == 1) {
                    return(<View><Text style={T.centered25}>I morgen</Text></View>)
                } else if (day > eventDay || day == eventDay) {
                    return(<View><Text style={T.centered25}>{lastDayOfMonth(month+1)-day} dager til</Text></View>)
                }else {
                    return(<View><Text style={T.centered25}>Neste måned</Text></View>)
                }
            }else if(eventMonth == month){ //Event was last month ago
                if (day == 1 && eventDay == lastDayOfMonth(month+1)) { //If the event was the last day of the month and youre on the first day of the month
                    return(<View><Text style={T.centered25}>I går</Text></View>)
                }else{ //If the event was last month, but youre not on the first day of the month
                    return(<View><Text style={T.centered25}>Forrige måned</Text></View>)
                }
            }else if(eventMonth < month+1){ //Event was x months ago
                return(<View><Text style={T.centered25}>{month+1-eventMonth} måneder siden</Text></View>)
            }else if(eventMonth == month-1){ //Event is next month
                return(<View><Text style={T.centered25}>{lastDayOfMonth(month)-day} dager til</Text></View>)
            }else{ //Event is in x months
                return(<View><Text style={T.centered25}>{eventMonth-month-1} måneder til</Text></View>)
            }
        }else if(eventYear == year-1){ //Event was last year
            return(<View><Text style={T.centered25}>I fjor</Text></View>)
        }else if(eventYear < year){ //Event was x years ago
            return(<View><Text style={T.centered25}>{year-eventYear} år siden</Text></View>)
        }else if(eventYear == year+1){ //Event is next year
            if (eventMonth == 1) { //Event is in january of next year
                if (eventDay == 1 && eventMonth == 1 && day == lastDayOfMonth(month+1)) { //Event is 1st of january and current date is last of December the previous year
                    return(<View><Text style={T.centered25}>I morgen</Text></View>)
                }else if(month != 11){ //You are not on the last month of the year
                    return(<View><Text style={T.centered25}>Neste år</Text></View>)
                }else if(eventDay != lastDayOfMonth(12)){ //You are not on the last day of the year
                    return(<View><Text style={T.centered25}>Neste år</Text></View>)
                }else{ //Event is in january, but not 1st of january
                    return(<View><Text style={T.centered25}>{lastDayOfMonth(month-1)-eventDay} dager til</Text></View>)
                }
            }else{ //Event is not in january
                return(<View><Text style={T.centered25}>Neste år</Text></View>)
            }
        }else{  //Event is in x years
            return(<View><Text style={T.centered25}>{eventYear-year} år til</Text></View>)
        }
    }else{
        return(<View><Text style={T.red}>Feil</Text></View>)
    }
}

export function leapYear(year){
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export function lastDayOfMonth(month) { //Checks for leap year
    var year = new Date().getFullYear()
    if (leapYear(year) == true) { //If leap year
        switch (month) {
            case 2:     return 29;
            case 4:     return 30;
            case 6:     return 30;
            case 9:     return 30;
            case 11:    return 30;
            default:    return 31;
        }
    }else{ //If not a leap year
        switch (month) {
            case 2:     return 28;
            case 4:     return 30;
            case 6:     return 30;
            case 9:     return 30;
            case 11:    return 30;
            default:    return 31;
        }
    }
}