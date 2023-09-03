import { View, Text } from "react-native"
import FetchColor from "../../styles/fetchTheme"
import { T } from "../../styles/text"

export default function errorMessage(argument, theme, lang) {

    const text = {
        "wifi": lang ? "Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer." : "Check your wifi connection and try again. Contact TEKKOM if the issue persists.",
        "nomatch": lang ? "Ingen treff" : "No matching events"
    }

    const styledError = (
        <View style={{alignSelf: 'center', maxWidth: '80%'}}>
              <View style={{height : '58%'}}/>
              <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>{text[argument]}</Text>
        </View>
    )
    
    return styledError
}