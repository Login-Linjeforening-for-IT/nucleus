import FetchColor from '../../styles/fetchTheme';
import { ES } from '../../styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

/**
 * Smaller card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function CardSmaller (props) {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...ES.cardSmaller, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View>
                { props.children }
            </View>
        </View>
    );
};