import Card from "@components/shared/card"
import ES from "@styles/eventStyles"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { GetEndTime } from "./time"
import Category from "./category"
import Map from "./map"
import T from "@styles/text"
import { useSelector } from "react-redux"

export default function BasicInfo() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    const textNO = {
        host: "Arrangør:   ",
        more: "Mer info"
    }

    const textEN = {
        host: "Organizer:   ",
        more: "More info"
    }

    const text = lang ? textNO : textEN
    
    return (
        <Card>
            <Start />
            <End />
            <Location />
            <Category />

            <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                    {text.host}
                </Text>
                <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                    {event.organization_name_en || event.organization_name_short}{("link_homepage" in event && 
                    event.link_homepage) || event.link_discord 
                    || event.link_facebook ? " - " : null}
                </Text>
                {event.link_discord && <TouchableOpacity
                    style={{minWidth: 70}} 
                    onPress={() => 
                        {Linking.openURL(`${event.link_discord}`)}}>
                        <View style={ES.row}>
                            <Text style={{...T.mazemap, color: theme.orange}}>
                                Discord
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
                {event.link_signup && !event.link_discord &&
                    <TouchableOpacity 
                        style={{minWidth: 70}} 
                        onPress={() => {
                            Linking.openURL(`${event.link_discord}`)
                        }}>
                            <View style={ES.row}>
                                <Text style={{...T.mazemap, color: theme.orange}}>
                                    Facebook
                                </Text>
                            </View>
                    </TouchableOpacity>
                }
                {("link_homepage" in event && event.link_homepage) && (event.link_discord || event.link_facebook) &&
                    <Text style={{...T.specificEventInfo, color: theme.textColor}}> - </Text>}
                {("link_homepage" in event) && event.link_homepage &&
                    <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${event.link_homepage}`)}}>
                        <View style={ES.row}>
                            <Text style={{...T.mazemap, color: theme.orange}}>
                                {text.more}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </Card>
    )
}

function Start() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const start = lang ? "Starter:      " : "Starts:         "

    return (
        <View style={ES.specificEventInfoView}>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                {start}
            </Text>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
            {event.time_start[11]}{event.time_start[12]}:
            {event.time_start[14]}{event.time_start[15]}
            </Text>
        </View>
    )
}

function End() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const end = lang ? "Slutter:       " : "Ends:           "

    return (
        <View style={ES.specificEventInfoView}>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                {end}
            </Text>
            {"time_end" in event && <GetEndTime time_end={event.time_end} />}
        </View>
    )
}

function Location() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const text = lang ? "Lokasjon:   " : "Location:     "

    return (
        <View style={{flexDirection: "row"}}>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                {text}
            </Text>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                TBA!
            </Text>
            <Map />
        </View>
    )
}