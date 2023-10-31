import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React, { useEffect, useState } from "react"

type EventTimeProps = {
    time_start: string
    time_end: string
}

type GetEndTimeProps = {
    time_end: string
}

/**
 * Displays the event time on the SES
 * @param time_start Start time of the event
 * @param time_end End time of the event
 * @returns Event start time as a React component
 */
export default function EventTime({time_start, time_end}: EventTimeProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [string, setString] = useState(displayedEventTime(time_start, time_end))

    useEffect(() => {
        setString(displayedEventTime(time_start, time_end))
    }, [displayedEventTime(time_start, time_end)])

    return (
        <View>
            <Text style={{...T.text20, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                {string}
            </Text>
        </View>
    )
}

/**
 * Function for rendering the end time of an event
 * @param {string} time_end
 * @returns View containing the endtime as a text
 */
export function GetEndTime({time_end}: GetEndTimeProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    let endTime = "..."

    if (time_end) {
        endTime = `${time_end[11]}${time_end[12]}:${time_end[14]}${time_end[15]}`
    }

    return (
        <View>
            <Text style={{
                ...T.specificEventInfo,
                color: FetchColor({theme, variable: "TEXTCOLOR"})
            }}>
                {endTime}
            </Text>
        </View>
    )
}

/**
 * Displays the event time; How long till it starts, how long its been ongoing, or how long since it ended
 * @param time_start Start time of the event
 * @param time_end End time of the event
 * @returns The event time that should be displayed
 */
function displayedEventTime(time_start: string, time_end: string) {

    const { lang } = useSelector((state: ReduxState) => state.lang)
    const textEN = ["Starts in", "Tomorrow", "Next", "Ends in", "Ends tomorrow", "Ended", "Yesterday", "Last", " ago", "month", "days", "h", "min", "s"]
    const textNO = ["Starter om", "I morgen", "Neste", "Slutter om", "Slutter i morgen", "Sluttet for", "I går", "Sist", " siden", "måned", "dager", "t", "min", "s"]
    const text = lang ? textNO : textEN
    let lookup

    if (new Date(time_end) < new Date()) {
        lookup = { 
            time: (new Date().getTime() - new Date(time_end).getTime()) / 60000, 
            type: text[5],
            day: text[6],
            month: text[7],
            end: text[8]
        }
    } else if (new Date(time_start) < new Date() && (new Date(time_end) > new Date())) {
        lookup = { 
            time: (new Date(time_end).getTime() - new Date().getTime()) / 60000, 
            type: text[3],
            day: text[4],
            month: text[2],
            end: '' 
        }
    } else {
        lookup = { 
            time: (new Date(time_start).getTime() - new Date().getTime()) / 60000, 
            type: text[0],
            day: text[1],
            month: text[2],
            end: ''
        }
    }

    const initial = lookup.time
    const months = Math.floor(initial * 2.2816E-5)
    const days = Math.floor(initial / 1440)
    const hours = Math.floor((initial % 1440) / 60)
    const minutes = Math.floor(initial % 60)
    const seconds = Math.floor((initial * 60) % 60)

    function pluralize(word: string, count: number) {
        if (!count) return ''
    
        const textNO = [word[word.length - 1] === 'e' ? 'r' : "er", " og", "t", "min"]
        const textEN = ['s', " and", "hour", "minute"]
        const text = lang ? textNO : textEN
        const suffix = word.includes(text[2]) ? ',' : word.includes(text[3]) ? text[1] : ''
    
        const maybePluralWord = `${word}${count > 1 ? text[0] : ''}`
        return ` ${count} ${maybePluralWord}${suffix}`
    }

    if (months > 1) return `${lookup.type}${pluralize(text[9], months)}`
    if (months) return `${lookup.month} ${text[9]}`
    if (days > 1) return `${lookup.type} ${days} ${text[10]}`
    if (days) return lookup.day
    
    return `${lookup.type} ${hours}${text[11]} ${minutes}${text[12]} ${seconds}${text[13]}${lookup.end}`
}
