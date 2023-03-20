import CornerSquare from '../eventComponents/cornerSquare';                 // Cornersquare
import FetchColor from '../../styles/fetchTheme';                           // Function to fetch theme color
import { GS } from '../../styles/globalStyles';                             // Global styles
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
export default function styret(theme) {

    let corner = random(0,4);

    return(
        <View>
            <Image style={{...GS.aboutImage}} source={{uri: "https://cdn.login.no/img/styret2.jpg"}} />
            <View style={{position: 'absolute', alignSelf: 'center'}}>{CornerSquare(theme, corner, 1)}</View>
        </View>
    )
}