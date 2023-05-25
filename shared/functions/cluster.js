import FetchColor from '../../styles/fetchTheme';
import { ES } from '../../styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

/**
 * Card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Cluster (props) {
    const { theme } = useSelector( (state) => state.theme )
    const noColor = props.noColor

    return(
        <View style={{...ES.cluster, backgroundColor: !noColor ? FetchColor(theme, 'DARKER') : null}}>
            <View style={props.space ? {...ES.clusterContent, marginVertical: props.space} : ES.clusterContent}>
                { props.children }
            </View>
        </View>
    );
};