import FetchColor from '../../styles/fetchTheme';
import LastFetch from '../functions/lastfetch';
import { AS } from '../../styles/adStyles';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import Space from '../functions/space';
import { T } from '../../styles/text';
import React from 'react';
/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export default function AdUpdateInfo(props) {
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