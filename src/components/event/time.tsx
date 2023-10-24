import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React, { useState } from "react"

type EventTimeProps = {
    startTime: string
    endTime: string
}

type GetEndTimeProps = {
    input: string
    theme: number
}

/**
 * Displays the event time on the SES
 * @param startTime Start time of the event
 * @param endTime End time of the event
 * @returns Event start time as a React component
 */
export default function EventTime({startTime, endTime}: EventTimeProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [string, setString] = useState(displayedEventTime(startTime, endTime))

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
 * @param {string} input
 * @returns View containing the endtime as a text
 */
export function GetEndTime({input, theme}: GetEndTimeProps) {
    let endTime = "..."

    if (input) {
        endTime = `${input[11]}${input[12]}:${input[14]}${input[15]}`
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
 * @param startTime Starttime of the event
 * @param endTime End time of the event
 * @returns The event time that should be displayed
 */
function displayedEventTime(startTime: string, endTime: string) {

    const { lang } = useSelector((state: ReduxState) => state.lang)
    const textEN = ["Starts in", "Tomorrow", "Next", "Ends in", "Ends tomorrow", "Ended", "Yesterday", "Last", " ago", "month", "days", "h", "min", "s"]
    const textNO = ["Starter om", "I morgen", "Neste", "Slutter om", "Slutter i morgen", "Sluttet for", "I går", "Sist", " siden", "måned", "dager", "t", "min", "s"]
    const text = lang ? textNO : textEN
    let lookup

    if (new Date(endTime) < new Date()) {
        lookup = { 
            time: (new Date().getTime() - new Date(endTime).getTime()) / 60000, 
            type: text[5],
            day: text[6],
            month: text[7],
            end: text[8]
        }
    } else if (new Date(startTime) < new Date() && (new Date(endTime) > new Date())) {
        lookup = { 
            time: (new Date(endTime).getTime() - new Date().getTime()) / 60000, 
            type: text[3],
            day: text[4],
            month: text[2],
            end: '' 
        }
    } else {
        lookup = { 
            time: (new Date(startTime).getTime() - new Date().getTime()) / 60000, 
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
