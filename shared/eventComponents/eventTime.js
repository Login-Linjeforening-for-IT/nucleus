import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'

export default function EventTime(startTime, endTime) {
            //MAKE COUNTDOWN FUNCTION BASED ON HOURS AND MINUTES
    var year     = new Date().getFullYear()
    var month    = 1 + new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()
    var second   = new Date().getSeconds() 

    if(startTime != null && endTime != null){                                                   //Concatenating start:
        const startYear   = (startTime)[0] + (startTime)[1] + (startTime)[2] + (startTime)[3]   //  year
        const startMonth  = (startTime)[5] + (startTime)[6]                                     //  month
        const startDay    = (startTime)[8] + (startTime)[9]                                     //  day
        const startHour   = (startTime)[11] + (startTime)[12]                                   //  hour
        const startMinute = (startTime)[14] + (startTime)[15]                                   //  minute
                                                                                                //Concatenating end:
        const endYear     = (endTime)[0]  + (endTime)[1] + (endTime)[2] + (endTime)[3]          //  year
        const endMonth    = (endTime)[5]  + (endTime)[6]                                        //  month
        const endDay      = (endTime)[8]  + (endTime)[9]                                        //  day
        const endHour     = (endTime)[11] + (endTime)[12]                                       //  hour
        const endMinute   = (endTime)[14] + (endTime)[15]                                       //  minute
        
        if(beyondTime(startTime) && !beyondTime(endTime)){
            if (endYear == year) {
                if (endMonth == month) {
                    if (endDay == day) {
                        if (endHour == hour) {
                            if (endMinute == minute) {
                                return(<View><Text style={T.centered25}>Slutt</Text></View>)
                            } else {
                                return(<View><Text style={T.centered25}>Ferdig om {endMinute-minute} min</Text></View>)
                            }
                        } else {
                                return(<View><Text style={T.centered25}>Ferdig om {endHour-hour}t {endMinute-minute} min</Text></View>)
                        }
                    } else {
                        if (endDay-day == 1) {
                            return(<View><Text style={T.centered25}>Ferdig i morgen</Text></View>)
                        } else {
                            return(<View><Text style={T.centered25}>Ferdig om {endDay-day} dager</Text></View>)
                        }                    
                    }
                } else {
                    console.log(11)
                    if (endMonth-month == 1) {
                        return(<View><Text style={T.centered25}>Ferdig neste måned</Text></View>)
                    } else {
                        return(<View><Text style={T.centered25}>Ferdig om {endMonth-month} måneder</Text></View>)
                    }
                }
            } else {
                if (endYear-year == 1) {
                    return(<View><Text style={T.centered25}>Ferdig neste år</Text></View>)
                } else {
                    return(<View><Text style={T.centered25}>Ferdig om {endYear-year} år</Text></View>)
                }
            }
        }

        if(startYear == year) {                                 //Event is this year
            if (startMonth == month) {                          //Event is this month
                if (startDay == day) {                          //Event is today
                    if (startHour == hour) {                    //Eventet is this hour
                        if (startMinute == minute) {            //Event is now
                            return(<View><Text style={T.centered25}>Nå</Text></View>)
                        }else if(startMinute < minute){ //Event started x minutes ago
                            return(<View><Text style={T.centered25}>Pågått i {minute-startMinute} min</Text></View>)
                        }else{  //Event starts in x minutes
                            return(<View><Text style={T.centered25}>{startMinute-minute} min til</Text></View>)
                        }
                    }else if(startHour == hour-1){ //Event started less than 1 hour ago
                        return(<View><Text style={T.centered25}>Pågått i {59-startMinute-minute} min</Text></View>)
                    }else if(startHour == hour-2){ //Event started between 1 and 2 hours ago
                        return(<View><Text style={T.centered25}>{hour-startHour-1} time siden</Text></View>)
                    }else if(startHour < hour){ //Event was x hours ago
                        return(<View><Text style={T.centered25}>{hour-startHour-1} timer siden</Text></View>)
                    }else if(startHour == hour+1){ //Event is the next hour
                        return(<View><Text style={T.centered25}>1t {59-startMinute-minute} min til</Text></View>)
                    }else{ //Event starts in x hours
                        return(<View><Text style={T.centered25}>{startHour-hour-1}t {60-startMinute-minute+startMinute*2} min til</Text></View>)
                    }
                }else if(startDay == day-1){ //Event was yesterday
                    return(<View><Text style={T.centered25}>I går</Text></View>)
                }else if(startDay < day){ //Event was x days ago
                    return(<View><Text style={T.centered25}>{day-startDay} dager siden</Text></View>)
                }else if(startDay == day+1){ //Event is tomorrow
                    if (startHour <= hour) { //Event is in less than 24 hours
                        return(<View><Text style={T.centered25}>{24-hour+startHour}t til</Text></View>)
                    }else{ //Event is tomorrow but in more than 24 hours
                        return(<View><Text style={T.centered25}>I morgen</Text></View>)
                    }
                }else{ //Event is in x days
                    return(<View><Text style={T.centered25}>{startDay-day} dager til</Text></View>)
                }
            }else if(startMonth == month+1){ //Event is next month
                if (day == lastDayOfMonth(month+1) && startDay == 1) {
                    return(<View><Text style={T.centered25}>I morgen</Text></View>)
                } else if (day > startDay || day == startDay) {
                    return(<View><Text style={T.centered25}>{lastDayOfMonth(month+1)-day} dager til</Text></View>)
                }else {
                    return(<View><Text style={T.centered25}>Neste måned</Text></View>)
                }
            }else if(startMonth == month){ //Event was last month
                if (day == 1 && startDay == lastDayOfMonth(month)) { //If the event was the last day of the month and youre on the first day of the month
                    return(<View><Text style={T.centered25}>I går</Text></View>)
                }else{ //If the event was last month, but youre not on the first day of the month
                    return(<View><Text style={T.centered25}>Forrige måned</Text></View>)
                }
            }else if(startMonth < month){ //Event was x months ago
                return(<View><Text style={T.centered25}>{month-startMonth} måneder siden</Text></View>)
            }else if(startMonth == month+1){ //Event is next month
                return(<View><Text style={T.centered25}>{lastDayOfMonth(month)-day} dager til</Text></View>)
            }else{ //Event is in x months
                return(<View><Text style={T.centered25}>{startMonth-month} måneder til</Text></View>)
            }
        }else if(startYear == year-1){ //Event was last year
            return(<View><Text style={T.centered25}>I fjor</Text></View>)
        }else if(startYear < year){ //Event was x years ago
            return(<View><Text style={T.centered25}>{year-startYear} år siden</Text></View>)
        }else if(startYear == year+1){ //Event is next year
            if(12+startMonth*2-startMonth-month <= 12){ //Event is in less than 12 months
                if(12+startMonth*2-startMonth-month == 1){    //Event is in January
                    if (31+startDay*2-startDay-day <= 31) { //Less than one month till event
                        return(<View><Text style={T.centered25}>{31+startDay*2-startDay-day} dager til</Text></View>)
                    } else {    //More than one month till event
                        return(<View><Text style={T.centered25}>1 måned</Text></View>)
                    }
                }else{   //Event is not in January
                    return(<View><Text style={T.centered25}>{12+startMonth*2-startMonth-month} måneder til</Text></View>)
                }
            }else{  //Event is in more than 12 months
                return(<View><Text style={T.centered25}>Neste år</Text></View>)
            }
        }else{  //Event is in x years
            return(<View><Text style={T.centered25}>{startYear-year} år</Text></View>)
        }
    }else{  //Error occured
        return(<View><Text style={T.red}>Feil ved henting av tid.</Text></View>)
    }
}

export function leapYear(year){ //Bool for leapyear
    console.log(78)
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}

export function lastDayOfMonth(month) { //Checks for leap year
    console.log(79)
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

export function beyondTime(eventTime) {
    var year     = new Date().getFullYear()
    var month    = 1 + new Date().getMonth()
    var day      = new Date().getDate()
    var hour     = new Date().getHours()
    var minute   = new Date().getMinutes()
    var second   = new Date().getSeconds() 

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

export function endsSoon(endTime) { //Bool for if we are more than half way through the event
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