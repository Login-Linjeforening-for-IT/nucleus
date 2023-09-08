import { Alert, View, Text, TouchableOpacity, Linking } from "react-native"
import FetchColor from 'login/styles/fetchTheme'
import { ES } from 'login/styles/eventStyles'
import { T } from 'login/styles/text'

export default function Feedback({index, setting, feedback, theme, lang, toggleFeedback}) {
    if (index == setting.length-1 && !feedback.status) {
        return (
            <TouchableOpacity onPress={() => toggleFeedback()}>
                <View>
                    <Text 
                        style={{
                            ...T.contact, 
                            textDecorationLine: 'underline',
                            color: FetchColor(theme, 'OPPOSITETEXTCOLOR')
                        }}>
                        {lang ? 'Gi tilbakemelding' : 'Give feedback'}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (index == setting.length-1 && feedback.status) {
        return(
            <View style={{...ES.row, justifyContent: 'space-evenly'}}>
                <TouchableOpacity onPress={() => 
                    Linking.openURL('https://discordapp.com/users/376827396764073997')}>
                    <View style={{backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                        <Text style={{
                            ...T.contact, 
                            textDecorationLine: 'underline', 
                            color: FetchColor(theme, 'OPPOSITETEXTCOLOR')
                        }}>
                            Discord
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={async() => {
                    Linking.openURL('mailto:kontakt@login.no')
                        .catch(() => lang 
                        ? Alert.alert('Kunne ikke åpne mail!', 'Mail: kontakt@login.no')
                        : Alert.alert('Could not open mail!', 'Reach us at kontakt@login.no'))
                }}>
                    <View>
                        <Text 
                            style={{
                                ...T.contact, 
                                textDecorationLine: 'underline',
                                color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}
                        >
                            Mail
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}