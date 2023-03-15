import CornerSquare from '../eventComponents/cornerSquare';                 // Cornersquare
import FetchColor from '../../styles/fetchTheme';                           // Function to fetch theme color
import { GS } from '../../styles/globalStyles';                             // Global styles
import personInfo from './personInfo';                                      // All info about board members
import { T } from '../../styles/text';                                      // Text styles
import random from './random';                                              // Random number
import Space from './space';                                                // Space
import React from 'react';                                                  // React imports
import {                                                                    // React native components
  Text,                                                                     // Text component
  View,                                                                     // View component
  Image,                                                                    // Image component
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Linking                                                                   // Opens URLs
} from 'react-native';                                                      // React native

/**
 * **Person object**
 * 
 * Includes:
 * - Title
 * - Name
 * - Discord tag
 * - Discord link
 * - CDN image link
 * 
 * @param {string} person 
 * @returns Full object packed in a view component
 */
export default function person(person, lang, theme) {

    let obj = personInfo(person, lang);
    let corner = random(0,4);

    return(
        <View>
            <Image style={{...GS.personImage}} source={{uri: obj.img}} />
            {Space(10)}
            <View style={{position: 'absolute', alignSelf: 'center'}}>{CornerSquare(theme, corner)}</View>
            <Text style={T.leaderTitle}>{obj.title}</Text>
            {Space(5)}
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{obj.name}</Text>
            {Space(5)}
            <TouchableOpacity onPress={() => Linking.openURL(obj.dclink)}>
                <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}{obj.tag}</Text>
            </TouchableOpacity>
            {Space(25)}
        </View>
    )
}