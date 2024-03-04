import Card from "@components/shared/card"
import ES from "@styles/eventStyles"
import { Text, View } from "react-native"
import { GetEndTime } from "./time"
import Category from "./category"
import Map from "./map"
import T from "@styles/text"
import { useSelector } from "react-redux"
import { TextLink } from "@components/shared/link"
import InfoBlock from "@components/shared/infoBlock"
import Skeleton from "@components/shared/skelleton"

export default function BasicInfo() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    
    let text = {host: '', more: ''}, info = ''

    if(event.event){
        const textNO = { host: "Arrangør:   ", more: "Mer info"}
        const textEN = { host: "Organizer:   ", more: "More info"}
        text = lang ? textNO : textEN
        info = lang ? event.event.informational_no : event.event.informational_en
    }
    
    const host = findOrgName()
    
    function findOrgName() {
        if (!event?.organizations[0]) {
            return ""
        }
        switch (event.organizations[0].shortname) {
            case 'board': return lang ? 'Styret' : 'The Board'
            case 'tekkom': return 'TekKom'
            case 'bedkom': return 'BedKom'
            case 'satkom': return 'SATkom'
            case 'eventkom':
            case 'evntkom': return 'EvntKom'
            case 'ctfkom': return 'CTFkom'
            case 's2g': return 'S2G'
            case 'idi': return 'IDI'
            default: return event.organizations[0].shortname || lang 
                ? event.category.name_no || event.category.name_en 
                : event.category.name_en || event.category.name_no
        }
    }

    return (
        <Card>
            <Skeleton height={20} loading={true} callback={()=>(
                <Start />
            )}/>
            <Skeleton height={20} loading={true} callback={()=>(
            <End />
            )}/>
            <Skeleton height={20} loading={true} callback={()=>(
                <Location />
            )}/>
            <Skeleton height={20} loading={true} callback={()=>(
                <Category />
            )}/>
            <Skeleton height={20} loading={true} callback={()=>(
                <View style={ES.specificEventInfoView}>
                    <Text style={{ ...T.specificEventInfo, color: theme.textColor }}>{text.host}</Text>
                    <Text style={{ ...T.specificEventInfoContent, color: theme.textColor }}>
                        {host}
                        {event.event.link_stream && ' - '}
                        {event.event.link_stream && <TextLink style={{fontSize: 20, color: "#fd8738", top: 3}} text="Stream" url={event.event.link_stream} />}
                        {event.event.link_discord && ' - '}
                        {event.event.link_discord && <TextLink style={{fontSize: 20, color: "#fd8738", top: 3}} text="Discord" url={event.event.link_stream} />}
                        {event.event.link_facebook && ' - '}
                        {event.event.link_facebook && <TextLink style={{fontSize: 20, color: "#fd8738", top: 3}} text="Facebook" url={event.event.link_stream} />}
                        {event.organizations[0]?.link_homepage && ' - '}
                        {event.organizations[0]?.link_homepage && <TextLink style={{fontSize: 20, color: "#fd8738", top: 3}} text={text.more} url={event.event.link_stream} />}
                    </Text>
                </View>
            )}/>
            <Skeleton height={20} loading={true} callback={()=>(
                <>{info && <InfoBlock infoText={info} />}</>
            )}/>
        </Card>
    )
}

function Start() {
    const { event:{event} } = useSelector((state: ReduxState) => state.event)
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
    const { event:{event} } = useSelector((state: ReduxState) => state.event)
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
    const { event } = useSelector((state: ReduxState) => state.event)
    if (!event.location){
        return <></>
    }
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const text = lang ? "Lokasjon:   " : "Location:     "

    
    // Uses best available location
    const location = lang 
        ? event.location.name_no || event.location.name_en 
        : event.location.name_en || event.location.name_no

    return (
        <View style={{flexDirection: "row"}}>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                {text}
            </Text>
            <Text style={{...T.specificEventInfo, color: theme.textColor}}>
                {location || 'TBA!'}
            </Text>
            <Map />
        </View>
    )
}