import { Image, View, Text, TouchableOpacity } from 'react-native';
import { PS } from 'login/styles/profileStyles';
import { CS } from 'login/styles/clusterStyles';
import FetchColor from 'login/styles/fetchTheme';
import { T } from 'login/styles/text';

/**
 * Function for drawing a very small square of the category of the event
 * 
 * @param {string} category    Category of the event, Format: 'CATEGORY'
 * @returns                     Small circle of the categories color
 */
export default function SmallProfile(navigation, theme, lang, profile, login) {  // SVG showing the color of the category
    return(
        <TouchableOpacity onPress={() => login ? navigation.navigate("ProfileScreen") : navigation.navigate("LoginScreen")}>
            <View style={PS.profileBackground}>
                <View style={PS.smallProfileLeftTriplet}>
                    <View style={PS.smallProfileImageView}>
                    <Image 
                            style={PS.smallProfileImage} 
                            source={profile.image ? 
                                 {uri: profile.image}
                                : 
                                    theme == 0 || theme == 2 || theme == 3 ? 
                                        require('login/assets/icons/loginperson-white.png') 
                                        : 
                                        require('login/assets/icons/loginperson-black.png')} 
                        />
                    </View>
                </View>
                <View style={PS.smallProfileMiddleTriplet}>
                    {typeof profile.id == "number" ? 
                        <>
                            <Text style={{...T.text20, color: FetchColor(theme, 'TEXTCOLOR')}}>{profile.name}</Text>
                            <Text style={{...T.text15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? "Vis profil" : "Show profile"}</Text>
                        </>
                    :
                        <Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>Login</Text>
                    }
                </View>
                <View style={PS.smallProfileRightTriplet}>
                    <Image style={CS.arrowImage} source={require('login/assets/icons/dropdownBase.png')}/>
                </View>
            </View>
        </TouchableOpacity>
        );
};