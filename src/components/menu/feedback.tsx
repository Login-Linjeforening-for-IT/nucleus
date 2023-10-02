import { Alert, View, Text, TouchableOpacity, Linking } from "react-native"
import FetchColor from "@styles/fetchTheme"
import ES from "@styles/eventStyles"
import T from "@styles/text"
import React from "react"

type FeedbackProps = {
    index: number
    setting: SettingProps[]
    feedback: boolean
    theme: number
    lang: boolean
    toggleFeedback: () => void
}

export default function Feedback({index, setting, feedback, theme, lang, 
toggleFeedback}: FeedbackProps) {
    if (index === setting.length-1 && !feedback) {
        return (
            <TouchableOpacity onPress={() => toggleFeedback()}>
                <View>
                    <Text
                        style={{
                            ...T.contact,
                            textDecorationLine: "underline",
                            color: FetchColor({theme, variable: 
                                "OPPOSITETEXTCOLOR"})
                        }}>
                        {lang ? "Gi tilbakemelding" : "Give feedback"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (index === setting.length-1 && feedback) {
        return (
            <View style={{...ES.row, justifyContent: "space-evenly"}}>
                <TouchableOpacity onPress={() =>
                    Linking.openURL(
                        "https://discordapp.com/users/376827396764073997")}>
                    <View style={{backgroundColor: FetchColor({theme, 
                        variable: "BACKGROUND"})}}>
                        <Text style={{
                            ...T.contact,
                            textDecorationLine: "underline",
                            color: FetchColor({theme, variable: 
                                "OPPOSITETEXTCOLOR"})
                        }}>
                            Discord
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={async() => {
                    Linking.openURL("mailto:kontakt@login.no")
                        .catch(() => lang
                        ? Alert.alert("Kunne ikke åpne mail!", 
                            "Mail: kontakt@login.no")
                        : Alert.alert("Could not open mail!", 
                            "Reach us at kontakt@login.no"))
                }}>
                    <View>
                        <Text
                            style={{
                                ...T.contact,
                                textDecorationLine: "underline",
                                color: FetchColor({theme, 
                                    variable: "OPPOSITETEXTCOLOR"})}}
                        >
                            Mail
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}