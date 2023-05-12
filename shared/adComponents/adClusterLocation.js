import { View, Text, Dimensions, Platform } from 'react-native';
import FetchColor from '../../styles/fetchTheme';
import { AS } from '../../styles/adStyles';
import React from 'react';

/**
 * Visual representation of the location on the Ad Cluster
 * 
 * @param {*} item  Event
 * @param {*} theme Theme of the app
 * @param {*} lang  User language
 * @returns 
 */
export default function AdClusterLocation(item, theme, lang) {

    // let time = ' ' + item.startt[11]+item.startt[12]+':'+item.startt[14]+item.startt[15] + '. ';
    // if(item.startt[11]+item.startt[12]+item.startt[14]+item.startt[15] == '0000') time = '  '
    // let room = item.roomno;
    // let campus = item.campus;
    // let street = item.street;
    // let location;
    // if (room && campus && street) location = room + ", " + campus + ", " + street + '.';
    // else if (room && campus) location = room + ", " + campus + '.';
    // else if (room && street) location = room + ", " + street + '.';
    // else if (campus && street) location = campus + ", " + street + '.';
    // else if (room) location = room + '.';
    // else if (campus) location = campus + '.';
    // else if (street) location = street + '.';
    // else location = lang ? 'Mer info TBA!':'More info TBA!';
    const tempName = item.title_no
    const tempType = "Fulltid"
    const tempLoc = "Gjøvik, Oslo, Stavanger, Bergen, Trondheim, Login Loungen"
    let name = tempName;
    let info = tempType + ', ' + tempLoc;
    let halfWidth = Platform.OS == 'ios' ? Dimensions.get('window').width / 9 : Dimensions.get('window').width / 8.7805
    if (tempName.length > halfWidth / 1.7 && (tempType + tempLoc).length > (halfWidth*1.25)) {
        name = tempName.length > halfWidth / 1.1 ? tempName.substring(0, halfWidth / 1.1) + "..." : tempName
        info = info.substring(0, halfWidth / 1.3) + "..."
    } else if (tempName.length > halfWidth) {
        name = tempName.substring(0, halfWidth) + "..."
    } else if (info.length > (Platform.OS == 'ios' ? halfWidth*1.45 : halfWidth*1.5)) {
        info = info.substring(0, Platform.OS == 'ios' ? halfWidth*1.45 : halfWidth*1.5) + "..."
    }
    // const info = (time + location
    return(
        <View style={AS.locationView}>
            <View style = {{...AS.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                {/* <Text style={{...AS.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname.trim()}</Text> */}
                <Text style={{...AS.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                {/* <Text style={{...AS.loc, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{info.trim()}</Text> */}
                <Text style={{...AS.loc, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{info}</Text>
            </View>
        </View>
    )
}