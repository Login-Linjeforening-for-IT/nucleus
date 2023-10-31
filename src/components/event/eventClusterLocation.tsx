import FetchColor from "@styles/fetchTheme"
import { View, Text } from "react-native"
import ES from "@styles/eventStyles"
import React from "react"
import { useSelector } from "react-redux"

type EventClusterLocationProps = {
    item: EventProps
}

/**
 * Visual representation of the location on the Event Card
 *
 * @param item Event
 * @param theme Theme of the app
 * @param lang User language
 * @returns
 */
export default function EventClusterLocation({item}: 
EventClusterLocationProps): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    let time = " " + item.time_start[11] + item.time_start[12] + ":" + 
    item.time_start[14] + item.time_start[15] + ". "
    if (item.time_start[11] + item.time_start[12] + item.time_start[14] + 
        item.time_start[15] === "0000") time = "  "
    const location_no = item.location_name_no ? item.location_name_no : "Mer info TBA!"
    const location_en = item.location_name_en ? item.location_name_en : "More info TBA!"
    const location = (lang ? location_no : location_en).trim()
    const info = (time + lang ? location_no : location_en).trim()

    return (
        <View style={ES.view2}>
            <View style = {{...ES.title}}>
                <Text style={{
                    ...ES.title, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {location}
                </Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={{
                    ...ES.loc,
                    color: FetchColor({theme, variable: "OPPOSITETEXTCOLOR"})
                }}>
                    {info}
                </Text>
            </View>
        </View>
    )
}
