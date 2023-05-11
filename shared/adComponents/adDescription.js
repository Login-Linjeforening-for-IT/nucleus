import FetchColor from '../../styles/fetchTheme';
import { AS } from '../../styles/adStyles';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Space from '../functions/space';
import React from 'react';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdDescription(props) {
    const { lang } = useSelector((state) => state.lang)
    const { theme } = useSelector((state) => state.theme)
    const ad = props.props
    const shortDescription = lang ? ad.description_short_no : ad.description_short_en
    const skills = ad.skill
    const LongDescription = lang ? ad.description_long_no : ad.description_long_en
    
    return(
        <View style={AS.adInfoView}>
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>Kort fortalt</Text>
            <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{shortDescription}</Text>
            {Space(10)}
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Ferdigheter" : "Skills"}</Text>
            <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{skills}</Text>
            {Space(10)}
            <Text style={{...AS.adInfoBold, color: FetchColor(theme, 'TEXTCOLOR')}}>Om stillingen</Text>
            <Text style={{...AS.adInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{LongDescription}</Text>
        </View>
    );
};