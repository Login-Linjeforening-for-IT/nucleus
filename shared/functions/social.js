import { GS } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import Space from './space';
import React from 'react';
import { 
    TouchableOpacity,
    Linking,
    Image,
    View,
} from 'react-native';

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export default function Social() {
    const { theme } = useSelector( (state) => state.theme )
    const isDark = theme == 0 || theme == 2 || theme == 3 ? true : false

    const media = {
        discord: {
            link: "https://discord.com/invite/login-ntnu",
            logo: isDark ? require("../../assets/social/discord-white.png") : require("../../assets/social/discord-black.png")
        },
        instagram: {
            link: "https://www.instagram.com/login_linjeforening/",
            logo: isDark ? require('../../assets/social/instagram-white.png') : require('../../assets/social/instagram-black.png')
        },
        facebook: {
            link: 'https://facebook.com/LogNTNU',
            logo: isDark ? require('../../assets/social/facebook-white.png') : require('../../assets/social/facebook-black.png')
        },
        linkedin: {
            link: 'https://linkedin.com/company/linjeforeningen-login/about',
            logo: isDark ? require('../../assets/social/linkedin-white.png') : require('../../assets/social/linkedin-black.png')
        },
        gitlab: {
            link: 'https://git.logntnu.no',
            logo: isDark ? require('../../assets/social/gitlab-white.png') : require('../../assets/social/gitlab-black.png')
        },
        wiki: {
            link: 'https://wiki.login.no',
            logo: isDark ? require('../../assets/social/wiki-white.png') : require('../../assets/social/wiki-black.png')
        }
    }
    
    return (
        Object.entries(media).map(([link], index) => {
            return index % 3 == 0 && (
                <View key={link} style={GS.socialView}>
                    <MediaLogo key={link} link={link} logo={media[Object.keys(media)[index]].logo} />
                    <MediaLogo key={media[Object.keys(media)[index + 1]].link} link={media[Object.keys(media)[index + 1]].link} logo={media[Object.keys(media)[index + 1]].logo} />
                    <MediaLogo key={media[Object.keys(media)[index + 2]].link} link={media[Object.keys(media)[index + 2]].link} logo={media[Object.keys(media)[index + 2]].logo} />
                </View>
            )
        })
    )

}

function MediaLogo({link, logo}) {
    return (
        <View style={GS.socialPartView}>
            <TouchableOpacity onPress={() => Linking.openURL(link)}>
                <Image style={GS.medium} source={logo} />
            </TouchableOpacity>
        </View>
    );
}