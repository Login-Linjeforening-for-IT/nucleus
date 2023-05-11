import { View, Image } from 'react-native';
import { AS } from '../../styles/adStyles';
import React from 'react';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdBanner(props) {
    const bannerURL  = props.image

    return(
        <View>
            <Image style={AS.adBanner} source={{uri: bannerURL ? bannerURL:'https://cdn.login.no/img/ads/adbanner.png'}}/>
        </View>
    );
};