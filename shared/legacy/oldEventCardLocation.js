import React from 'react';
import { ES } from '../../styles/eventStyles';
import { View, Text } from 'react-native';
import FetchColor from '../../styles/fetchTheme';

/**
 * Visual representation of the location on the Event Card
 * 
 * @param {*} item  Event
 * @param {*} theme Theme of the app
 * @param {*} lang  User language
 * @returns 
 */
export default function OldEventCardLocation(item, theme, lang) {
    let time = ' ' + item.startt[11]+item.startt[12]+':'+item.startt[14]+item.startt[15] + '. ';
    let room = item.roomno;
    let campus = item.campus;
    let street = item.street;
    let location;
    if (room && campus && street) location = room + ", " + campus + ", " + street + '.';
    else if (room && campus) location = room + ", " + campus + '.';
    else if (room && street) location = room + ", " + street + '.';
    else if (campus && street) location = campus + ", " + street + '.';
    else if (room) location = room + '.';
    else if (campus) location = campus + '.';
    else if (street) location = street + '.';
    else location = lang ? 'Mer info TBA!':'More info TBA!';

    return(
        <View style={ES.view2}>
            <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                <Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{...ES.oldLoc, color: FetchColor(theme, 'TEXTCOLOR')}}>{time + location}</Text>
            </View>
        </View>
    )
}