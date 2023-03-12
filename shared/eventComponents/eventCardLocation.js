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
    let location = item.campus + '. ' + item.roomno + '.';

    return(
        <View style={ES.view2}>
            <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                <Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                {time != ' : ' && time != ' 00:00. ' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{time != '00:00' ? time:null}</Text>:null}
                {location != '. .' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{location}</Text>:null} 
                {time == ' : ' || time == ' 00:00. ' && location == '. .' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}> {lang ? 'Mer info TBA!':'More info TBA!'}</Text>:null}
            </View>
        </View>
    )
}