import FetchColor from '../../styles/fetchTheme';
import { AS } from '../../styles/adStyles';
import { useSelector } from 'react-redux';
import Space from '../functions/space';
import { T } from '../../styles/text';
import React from 'react';
import { 
    TouchableOpacity,
    Linking,
    Image,
    View,
    Text
} from 'react-native';

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export default function AdMedia(props) {
    const { theme } = useSelector( (state) => state.theme )
    const { lang } = useSelector( (state) => state.lang )

    const ad = props.props;
    const facebook = ad.link_facebook
    const homepage = ad.link_homepage
    const linkedin = ad.link_linkedin
    const instagram = ad.link_instagram
    const discord = ad.link_discord
    const link = ad.application_url

    return(
        <View>
            <View style={AS.socialView}>
                {discord ? 
                    <View style={AS.socialPartView}>
                        <TouchableOpacity onPress={() => Linking.openURL(discord)}>
                            <Image style={AS.socialMediaImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/discord-white.png') : require('../../assets/social/discord-black.png')} />
                        </TouchableOpacity>
                    </View>
                :null}

                {instagram ? 
                    <View style={AS.socialPartView}>
                        <TouchableOpacity onPress={() => Linking.openURL(instagram)}>
                            <Image style={AS.socialMediaImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/instagram-white.png') : require('../../assets/social/instagram-black.png')} />
                        </TouchableOpacity>
                    </View>
                :null}

                {homepage ? 
                    <View style={AS.socialPartView}>
                        <TouchableOpacity onPress={() => Linking.openURL(homepage)}>
                            <Image style={AS.socialMediaImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/web-white.png') : require('../../assets/social/web-black.png')} />
                        </TouchableOpacity>
                    </View>
                :null}

                {facebook ? 
                    <View style={AS.socialPartView}>
                        <TouchableOpacity onPress={() => Linking.openURL(facebook)}>
                            <Image style={AS.socialMediaImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/facebook-white.png') : require('../../assets/social/facebook-black.png')} />
                        </TouchableOpacity>
                    </View>
                :null}

                {linkedin ? 
                    <View style={AS.socialPartView}>
                        <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
                            <Image style={AS.socialMediaImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/linkedin-white.png') : require('../../assets/social/linkedin-black.png')} />
                        </TouchableOpacity>
                    </View>
                :null}
            </View>
            {Space(10)}
            <View style={AS.socialView}>
                {
                    link ?
                    <TouchableOpacity onPress={() => Linking.openURL(link)}>
                    <View style={{...AS.adButton, backgroundColor: FetchColor(theme, 'ORANGE')}}>
                    <Text style={{...AS.adButtonText, color: FetchColor(theme, 'TEXTCOLOR')}}>
                        {lang ? "Søk nå":"Apply"}
                    </Text>
                    </View>
                </TouchableOpacity>:null
                }
            </View>
            {Space(10)}
        </View>
    )
}