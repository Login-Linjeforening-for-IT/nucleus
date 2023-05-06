import FetchColor from '../../styles/fetchTheme';
import { ES } from '../../styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

/**
 * Smaller cluster function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the cluster
 * @returns             Cluster with the props inside
 */
export default function ClusterSmaller (props) {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...ES.clusterSmaller, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View>
                { props.children }
            </View>
        </View>
    );
};