import { Image, View, Text, TouchableOpacity } from 'react-native';
import ChangeProfileCard from './changeProfileCard';
import FetchColor from '../../styles/fetchTheme';
import { PS } from '../../styles/profileStyles';
import React, { useState } from 'react';
import Space from '../functions/space';
import { T } from '../../styles/text';

/**
 * Function for drawing a very small square of the category of the event
 * 
 * @param {string} category    Category of the event, Format: 'CATEGORY'
 * @returns                     Small circle of the categories color
 */
export default function Profile(navigation, theme, lang, profile, login, scrollPosition) {  //SVG showing the color of the category
    const [show, setShow] = useState(false)
    
    let y

    switch(profile.schoolyear) {
        case "1" : y = lang ? "1. år"  : "1st. year" ; break;
        case "2" : y = lang ? "2. år"  : "2nd. year" ; break;
        case "3" : y = lang ? "3. år"  : "3rd. year" ; break;
        case "4" : y = lang ? "4. år"  : "4th. year" ; break;
        case "5" : y = lang ? "5. år"  : "5th. year" ; break;
        case "6" : y = lang ? "6. år"  : "6th. year" ; break;
        case "7" : y = lang ? "7. år"  : "7th. year" ; break;
        case "8" : y = lang ? "8. år"  : "8th. year" ; break;
        case "9" : y = lang ? "9. år"  : "9th. year" ; break;
        case "10": y = lang ? "10. år" : "10th. year"; break;
    }

    const year = y + ' '

    const handlePress = () => {
        setShow(true)
    }

    return(
        <>
            <TouchableOpacity onPress={() => handlePress()}>
                <View style={PS.profileBackground}>
                    <View style={PS.leftTwin}>
                        <View style={PS.smallProfileImageView}>
                            {!show && 
                            <Image 
                                style={PS.midProfileImage} 
                                source={profile.image ? 
                                    {uri: profile.image}
                                : 
                                    theme == 0 || theme == 2 || theme == 3 ? 
                                        require('../../assets/icons/loginperson-white.png') 
                                        : 
                                        require('../../assets/icons/loginperson-black.png')} 
                            />
                            }
                        </View>
                    </View>
                    <View style={PS.rightTwin}>
                        {!show &&
                        <>
                            <Text style={{...T.text20, color: FetchColor(theme, 'TEXTCOLOR')}}>{profile.name}</Text>
                            {Space(5)}
                            <Text style={{...T.text15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{year + profile.degree}</Text>
                            {Space(5)}
                            <Text style={{...T.text15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>ID: {profile.id} · {profile.joinedevents} {lang ? "Arrangementer":"Events"}</Text>
                        </>
                        }
                    </View>
                </View>
            </TouchableOpacity>

            {show && 
                <ChangeProfileCard 
                    theme={theme} 
                    lang={lang} 
                    hide={() => {console.log("hidden"); setShow(false)}} 
                    trigger={true}
                />
            }
        </>
        );
};