import { TouchableOpacity, View, Text, Image, Linking, Alert } from "react-native"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"

type handleLinkProps = {
    mazemap_campus_id: number | null
    mazemap_poi_id: number | null
    locationName: string | undefined
    organizer: string
}

export default function Map() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event } = useSelector((state: ReduxState) => state.event)
    if(!event?.event?.location || event?.event?.location?.type != 'mazemap'){
        return <></>
    }

    const locationName = lang ? event?.event?.location?.name_no : event?.event?.location?.name_en
    const organizer = event?.organizations[0]?.shortname || event?.organizations[0]?.name_en

    return (
        <TouchableOpacity 
            style={{minWidth: 70}} 
            onPress={() => {
                if(!event.location) return
                handleLink({mazemap_campus_id: event?.location?.mazemap_campus_id, 
                            mazemap_poi_id: event?.location?.mazemap_poi_id, 
                            locationName, organizer})
        }}>
            <View style={ES.row}>
                <Text 
                    style={{...T.specificEventInfo, color: theme.textColor}}>
                        {" - "}
                    </Text>
                <Text style={{...T.mazemap, color: theme.orange}}>
                    {lang ? "Kart" : "Map"}
                </Text>
                <Image 
                    style={ES.mazemapIcon} 
                    source={require("@assets/icons/mazemap.png")}/>
            </View>
        </TouchableOpacity>
    )
}

function handleLink({mazemap_campus_id, mazemap_poi_id, locationName, organizer}: handleLinkProps) {
    if(!locationName && (mazemap_campus_id === null || mazemap_poi_id === null)){
        return
    }
    function open(url: string, errorTitle: string, errorBody: string) {
        Linking.openURL(url).catch(() => {Alert.alert(errorTitle, errorBody)})
    }

    
    if (locationName === "Orgkollektivet") {
        open("https://link.mazemap.com/tBlfH1oY", "Mazemap kunne ikke åpnes", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: wZDe8byp")
    }
    
    if (organizer === "HUSET") {
        open("https://link.mazemap.com/O1OdhRU4", "Mazemap kunne ikke åpnes.", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: MGfrIBrd")
    }
    open(`https://use.mazemap.com/#v=1&campusid=${mazemap_campus_id}&sharepoitype=poi&sharepoi=${mazemap_poi_id}`, "Mazemap kunne ikke åpnes", `Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: M${mazemap_campus_id},${mazemap_poi_id}`)
}