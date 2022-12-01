import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'

export default function EventTime(startTime) {

    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var day = new Date().getDate()
    var hour = new Date().getHours()
    var minute = new Date().getMinutes()
    //var second = new Date().getSeconds() MAKE COUNTDOWN FUNCTION BASED ON HOURS AND MINUTES

    if(startTime != null){
        const eventYear = (startTime)[0] + (startTime)[1] + (startTime)[2] + (startTime)[3]  //Concatenating year
        const eventMonth = (startTime)[5] + (startTime)[6]      //Concatenating month
        const eventDay = (startTime)[8] + (startTime)[9]        //Concatenating day
        const eventHour = (startTime)[11] + (startTime)[12]     //Concatenating hour
        const eventMinute = (startTime)[14] + (startTime)[15]   //Concatenating minute

        if(eventYear == year) {                                 //Event is this year
            if (eventMonth == month+1) {                        //Event is this month
                if (eventDay == day) {                          //Event is today
                    if (eventHour == hour) {                    //Eventet is this hour
                        if (eventMinute == minute) {            //Event is now
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
                        return(<View><Text style={T.centered25}>{eventHour-hour-1}t {60-eventMinute-minute+eventMinute*2} min</Text></View>)
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
            if(12+eventMonth*2-eventMonth-month+1 <= 12){ //Event is in less than 12 months
                if(12+eventMonth*2-eventMonth-month+1 == 1){    //Event is in January
                    if (31+eventDay*2-eventDay-day <= 31) { //Less than one month till event
                        return(<View><Text style={T.centered25}>{31+eventDay*2-eventDay-day} dager</Text></View>)
                    } else {    //More than one month till event
                        return(<View><Text style={T.centered25}>Om 1 måned</Text></View>)
                    }
                }else{   //Event is not in January
                    return(<View><Text style={T.centered25}>Om {12-month+1} måneder</Text></View>)
                }
            }else{  //Event is in more than 12 months
                return(<View><Text style={T.centered25}>Neste år</Text></View>)
            }
        }else{  //Event is in x years
            return(<View><Text style={T.centered25}>{eventYear-year} år til</Text></View>)
        }
    }else{  //Error occured
        return(<View><Text style={T.red}>Feil ved henting av tid.</Text></View>)
    }
}

export function leapYear(year){ //Bool for leapyear
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export function lastDayOfMonth(month) { //Checks for leap year
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