import FetchColor from '../../styles/fetchTheme';
import LastFetch from '../functions/lastfetch';
import { AS } from '../../styles/adStyles';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import Space from '../functions/space';
import { T } from '../../styles/text';
import { 
    TouchableOpacity,
    Dimensions,
    Platform,
    Linking,
    Image,
    View,
    Text
} from 'react-native';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdInfo(props) {
    const { lang } = useSelector((state) => state.lang)
    const { theme } = useSelector((state) => state.theme)
    const ad = props.props
    const loc = ad.city 
    const type = ad.job_type 
    const deadline = LastFetch(ad.application_deadline)._z

    return(
        <View style={AS.adInfoView}>
            <View style={AS.adInfoInsideView}>
                <Text style={{...AS.adInfoType, width: lang ? '35%' : '20%', color: FetchColor(theme, 'OPPOSITETEXTCOLOR'), }}>{lang ? "Sted: " : "Location: "}</Text>
                <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{loc}</Text>
            </View>
            <View style={AS.adInfoInsideView}>
                <Text style={{...AS.adInfoType, width: lang ? '35%' : '20%', color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? "Ansettelsesform: " : "Position: "}</Text>
                <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{type}</Text>
            </View>
            <View style={AS.adInfoInsideView}>
                <Text style={{...AS.adInfoType, width: lang ? '35%' : '20%', color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? "Frist: " : "Deadline: "}</Text>
                <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{deadline}</Text>
            </View>
        </View>
    );
};

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdBanner(props) {
    const bannerURL  = props.image

    return(
        <View>
            <Image style={AS.adBanner} source={{uri: bannerURL ? bannerURL:'https://cdn.login.no/img/ads/adbanner.png'}}/>
        </View>
    );
};

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdClusterImage(props) {
    const bannerURL  = props.image

    return(
        <View style={AS.adClusterImage}>
            <Image style={AS.adBannerSmall} source={{uri: bannerURL ? bannerURL:'https://cdn.login.no/img/ads/adcompany.png'}}/>
        </View>
    );
};

/**
 * Visual representation of the location on the Ad Cluster
 * 
 * @param {*} item  Event
 * @param {*} theme Theme of the app
 * @param {*} lang  User language
 * @returns 
 */
export function AdClusterLocation(item, theme, lang) {
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

    return(
        <View style={AS.locationView}>
            <View style = {{...AS.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                <Text style={{...AS.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{...AS.loc, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{info}</Text>
            </View>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdDescription(props) {
    const { lang } = useSelector((state) => state.lang)
    const { theme } = useSelector((state) => state.theme)
    const ad = props.props
    const shortDescription = lang ? ad.description_short_no : ad.description_short_en
    const skills = ad.skill
    const LongDescription = lang ? ad.description_long_no : ad.description_long_en
    
    return(
        <View style={AS.adInfoView}>
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>Kort fortalt</Text>
            <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{shortDescription}</Text>
            {Space(10)}
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Ferdigheter" : "Skills"}</Text>
            <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{skills}</Text>
            {Space(10)}
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>Om stillingen</Text>
            <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{LongDescription}</Text>
        </View>
    );
};

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function AdMedia(props) {
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

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdTitle(props) {
    const { lang } = useSelector((state) => state.lang)
    const { theme } = useSelector((state) => state.theme)
    const bannerURL  = props.image
    const title = (lang ? props.props.title_no : props.props.title_en) + " hos " + props.props.organization
    
    return(
        <View style={AS.adTitleView}>
            <Image style={AS.adBannerSmall} source={{uri: bannerURL ? bannerURL:'https://cdn.login.no/img/ads/adcompany.png'}}/>
            <Text style={{...AS.specificAdTitle, color: FetchColor(theme, 'TEXTCOLOR')}}>{title}</Text>
        </View>
    );
};

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function AdUpdateInfo(props) {
    const { lang } = useSelector((state) => state.lang)
    const { theme } = useSelector((state) => state.theme)
    const ad = props.props
    const updated = LastFetch(ad.updated_at)._z
    const created = LastFetch(ad.created_at)._z

    return(
        <View style={AS.adInfoView}>
            <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Oppdatert kl:':'Updated:'} {updated}.</Text>
            {Space(5)}
            <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Opprettet kl:':'Created:'} {created}.</Text>
        </View>
    );
};