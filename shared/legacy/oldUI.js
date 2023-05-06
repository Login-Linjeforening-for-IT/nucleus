import { useSelector, useDispatch } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';
import { setOldUI } from '../../redux/misc';
import React from 'react';
import { 
    View, 
    Switch, 
} from 'react-native';

/**
 * Function for displaying a notification switch
 * @param {string} category         Category the switch should control
 * @param {string} topicID          Topic the user should be subscribed to or unsubscribed from
 * @returns                         Notification switch as view
 */
export default function BellChange () {    //Notification button
    const { oldUI } = useSelector( (state) => state.misc )               //  Calendar ID
    const { theme } = useSelector( (state) => state.theme )
    const dispatch = useDispatch()
    
    return(
        <View>
            <Switch
                trackColor={{ true: FetchColor(theme, 'TRACKCOLOR') }}
                thumbColor={oldUI ? FetchColor(theme, 'SWITCHOFFSTATE') : FetchColor(theme, 'SWITCHONSTATE')}
                ios_backgroundColor={FetchColor(theme, 'TRACKBACKGROUNDCOLOR')}
                onValueChange={() => dispatch(setOldUI(!oldUI))}
                value={oldUI}
            />
        </View>
    )
}