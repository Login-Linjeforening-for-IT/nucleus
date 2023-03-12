import FetchColor from '../../styles/fetchTheme';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text'
import Space from './space';
import React from 'react';
import { 
    View, 
    Text, 
    Linking,
    Alert
} from 'react-native';

/**
 * Function for displaying the contact info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Contact info
 */
export default function Kontakt() { //Contact info

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    return(
    <View>
        <Text/>
        <Text style={{...T.centeredBold25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Kontakt' : 'Contact'}</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>Login - Linjeforeningen for IT</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>Teknologivegen 22</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Bygg A, rom 155': 'Building A, room 155'}</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>2815 GJØVIK</Text>
        <Text/>
        <Text style={{...T.orangeCentered15, color: FetchColor(theme, 'ORANGE')}} onPress={async() => {Linking.openURL('mailto:kontakt@login.no').catch(() => lang ? Alert.alert('Kunne ikke åpne mail!', 'Mail: kontakt@login.no'):Alert.alert('Could not open mail!', 'Reach us at kontakt@login.no'))}}>kontakt@login.no</Text>
        <Text/>{Space(12)}
    </View> 
    )
}