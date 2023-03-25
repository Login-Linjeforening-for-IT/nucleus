import React from 'react';
import { ES } from '../../styles/eventStyles';
import { T } from '../../styles/text'
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';

/**
 * Function for finding the eventlocation of an event
 * @param {string} room     Room where the event takes place
 * @param {string} campus   Campus where the event takes place
 * @returns                 View containing the event location as a text
 */
export default function EventLocation(room, campus, street) {
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if(!room && !campus && !street) {
        return(
            <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Lokasjon:   ' : 'Location:     '}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>TBA!</Text>
            </View>
        )
    }

    if(room != null || campus != null || street != null) {
        return(
            <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Lokasjon:   ' : 'Location:     '}</Text>
                <Text style={{...T.specificEventInfo, maxWidth: '80%', color: FetchColor(theme, 'TEXTCOLOR')}}>{room ? room + ', ':null}{campus}{street}</Text>
            </View>
        )
    }else{
        <View style={ES.specificEventInfoView}>
            <Text style={T.red}>{lang ? 'Feil ved henting av sted.' : 'Error fetching location'}</Text>
        </View>
    }
}