import { TouchableOpacity, View, Text, Image, Linking, Alert } from "react-native"
import { useSelector } from "react-redux"
import ES from "@styles/eventStyles"
import T from "@styles/text"

type handleLinkProps = {
    mazeref: string
    location: string | null
    organizer: string
}

export default function Map() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { event } = useSelector((state: ReduxState) => state.event)
    const mazeref = "mazeref" in event ? event.mazeref : ""
    const location = lang ? event.location_no : event.location_en
    const organizer = event.organization_name_short || event.organization_name_en

    if (("mazeref" in event) && event.mazeref || (
        location === "Orgkollektivet" || location === "HUSET")) {
        return (
            <TouchableOpacity 
                style={{minWidth: 70}} 
                onPress={() => {handleLink({mazeref, location, organizer})
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
}

function handleLink({mazeref, location, organizer}: handleLinkProps) {
    function open(url: string, errorTitle: string, errorBody: string) {
        Linking.openURL(url).catch(() => {Alert.alert(errorTitle, errorBody)})
    }

    if (mazeref.length) {
        open(`https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=${mazeref}`, "Mazemap kunne ikke åpnes", `Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: M${mazeref}`)
    }

    if (location === "Orgkollektivet") {
        open("https://link.mazemap.com/tBlfH1oY", "Mazemap kunne ikke åpnes", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: wZDe8byp")
    }

    if (organizer === "HUSET") {
        open("https://link.mazemap.com/O1OdhRU4", "Mazemap kunne ikke åpnes.", "Send en mail til tekkom@login.no dersom problemet vedvarer. Feilkode: MGfrIBrd")
    }
}