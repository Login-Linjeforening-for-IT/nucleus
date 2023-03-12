import React from 'react';
import { T } from '../../styles/text'
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import FetchColor from '../../styles/fetchTheme';

/**
 * Function for displaying the copyright info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Copyright view
 */
export default function Copyright() {   //Copyright info

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
            <Text style={{...T.copyright, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372' : 'Copyright © 2022 Login - Linjeforeningen for IT, NO 811 940 372'}</Text>
        </View>
    )
}