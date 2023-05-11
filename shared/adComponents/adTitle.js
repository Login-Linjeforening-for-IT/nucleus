import { View, Image, Text } from 'react-native';
import FetchColor from '../../styles/fetchTheme';
import { AS } from '../../styles/adStyles';
import { useSelector } from 'react-redux';
import React from 'react';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdTitle(props) {
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