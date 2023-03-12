import React from 'react';
import { T } from '../../styles/text'
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';

/**
 * Function for rendering the end time of an event
 * @param {string} input 
 * @returns View containing the endtime as a text
 */
export default function GetEndTime(input){

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if(input != null){
        const hour1     = (input)[11]    //Fetching endtime cipher 1 from api
        const hour2     = (input)[12]    //Fetching endtime cipher 2 from api
        const minute1   = (input)[14]    //Fetching endtime cipher 3 from api
        const minute2   = (input)[15]    //Fetching endtime cipher 4 from api
        return(<View><Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{hour1}{hour2}:{minute1}{minute2}</Text></View>)
    }else{
        return(<View><Text style={{...T.locationError, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Feil ved henting av sluttid.' : 'Error fetching endtime.'}</Text></View>)

    }
}