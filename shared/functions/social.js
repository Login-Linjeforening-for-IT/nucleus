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

    return(
        <View>
            <Image style={GS.socialBigImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/logo/loginBig-white.png') : require('../../assets/logo/loginBig-black.png')} />
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://discord.com/invite/login-ntnu')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/discord-white.png') : require('../../assets/social/discord-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/login_linjeforening/')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/instagram-white.png') : require('../../assets/social/instagram-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/LogNTNU')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/facebook-white.png') : require('../../assets/social/facebook-black.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/linjeforeningen-login/about')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/linkedin-white.png') : require('../../assets/social/linkedin-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://git.logntnu.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/gitlab-white.png') : require('../../assets/social/gitlab-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://redmine.login.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/social/wiki-white.png') : require('../../assets/social/wiki-black.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
        </View>
    )
}