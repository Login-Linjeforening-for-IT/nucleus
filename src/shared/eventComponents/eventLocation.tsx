import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { ES } from "@styles/eventStyles"
import { T } from "@styles/text"
import React from "react"

type EventLocationProps = {
    room: string
    campus: string
    street: string
}

/**
 * Function for finding the eventlocation of an event
 * @param {string} room     Room where the event takes place
 * @param {string} campus   Campus where the event takes place
 * @returns                 View containing the event location as a text
 */
export default function EventLocation({room, campus, street}: 
EventLocationProps): JSX.Element {
    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )

    if (!room && !campus && !street) {
        return (
            <View style={ES.specificEventInfoView}>
                <Text style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                        {lang ? "Lokasjon:   " : "Location:     "}
                </Text>
                <Text 
                    style={{
                        ...T.specificEventInfo, 
                        color: FetchColor({theme, variable: "TEXTCOLOR"})
                    }}>
                        TBA!</Text>
            </View>
        )
    }

    if (room != null || campus != null || street != null) {
        return (
            <View style={ES.specificEventInfoView}>
                <Text style={{
                    ...T.specificEventInfo, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {lang ? "Lokasjon:   " : "Location:     "}</Text>
                <Text style={{
                    ...T.specificEventInfo, 
                    maxWidth: "70%", color: FetchColor({theme, variable: 
                    "TEXTCOLOR"})
                }}>
                        {room ? room + ", ":null}{campus}{street}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={ES.specificEventInfoView}>
                <Text style={T.red}>{lang 
                    ? "Feil ved henting av sted." 
                    : "Error fetching location"}
                </Text>
            </View>
        )
    }
}
