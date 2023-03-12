import React from 'react';
import { SS } from '../../styles/settingStyles';
import { useSelector, useDispatch } from 'react-redux';
import { changeLang } from '../../redux/lang';
import { 
    View, 
    Text, 
    TouchableOpacity,
} from 'react-native';
import FetchColor from '../../styles/fetchTheme';
import topic from '../notificationComponents/topic';

/**
 * Function for choosing the language
 * @returns View representing a switch which controls the language of the application
 */
export default function Language() {    //Choose the language
    const { lang  } = useSelector((state) => state.lang  )
    const { theme } = useSelector((state) => state.theme )
    const dispatch = useDispatch()

    topic("langChange", lang);  // Sets up notifications to follow language

    return(
        <View>
            <TouchableOpacity onPress={() =>  dispatch(changeLang()) }>
                <Text style={{...SS.langSwitch, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'EN' : 'NO'}</Text>
            </TouchableOpacity>
        </View>
    )
}