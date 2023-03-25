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
export default function EventCardLocation(item, theme, lang) {
    let time = ' ' + item.startt[11]+item.startt[12]+':'+item.startt[14]+item.startt[15] + '. ';
    let r = item.roomno;
    let c = item.campus;
    let s = item.street;
    let loc;
    if (r && c && s) loc = r + ", " + c + ", " + s + '.';
    else if (r && c) loc = r + ", " + c + '.';
    else if (r && s) loc = r + ", " + s + '.';
    else if (c && s) loc = c + ", " + s + '.';
    else if (r) loc = r + '.';
    else if (c) loc = c + '.';
    else if (s) loc = s + '.';
    else loc = null;

    return(
        <View style={ES.view2}>
            <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                <Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                {time != ' : ' && time != ' 00:00. ' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{time != '00:00' ? time:null}</Text>:null}
                {loc ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{loc}</Text>:null} 
                {time == ' : ' || time == ' 00:00. ' && !loc || !loc ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}> {lang ? 'Mer info TBA!':'More info TBA!'}</Text>:null}
            </View>
        </View>
    )
}