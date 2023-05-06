import React from 'react';
import { View, Image } from 'react-native';
import { AS } from '../../styles/adStyles';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdClusterImage(banner) {
    const bannerURL  = banner.image
    return(
        <View style={AS.adClusterImage}>
            <Image style={AS.adBannerSmall} source={bannerURL ? {uri: bannerURL}:require('../../assets/ads/defaultAdImage.png')}/>
        </View>
    );
};