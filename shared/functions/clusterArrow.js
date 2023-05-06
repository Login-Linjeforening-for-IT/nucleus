import React from 'react';
import { View, Image } from 'react-native';
import { CS } from '../../styles/clusterStyles';

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function ClusterArrow() {
    return(
        <View style={CS.arrowView}>
            <Image style={CS.arrowImage} source={require('../../assets/icons/goback777.png')}/>
        </View>
    );
};