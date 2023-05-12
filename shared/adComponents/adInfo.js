import FetchColor from '../../styles/fetchTheme';
import { AS } from '../../styles/adStyles';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';
import LastFetch from '../functions/lastfetch';

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