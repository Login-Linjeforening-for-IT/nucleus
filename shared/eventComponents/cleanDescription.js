import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'
import { A } from '@expo/html-elements'; //Doesnt work in the commented lines below
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';

/**
 * Removes HTML formatting from a string, for example unicodes etc
 * @param {string} string   String to cleanup
 * @returns                 Clean string
 */
export default function CleanDescription(string) {
    
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if (string != null) {  // Using replace instead of replaceAll because old android devices dont support replaceAll
        const removePtag = string.replace(/<p>/g, '')
        const hTag = removePtag.replace(/<h2>/g, '')
        const aTag = hTag.replace(/<a /g, '<A ')
        const removeSlash = aTag.replace(/\//g, '')
        // const httpsTag = removeSlash.replace(/https/g, 'https://')
        // const aTag2 = removeSlash.replace(/<a>/, '</A>')
        const addO = removeSlash.replace(/&oslash;/g, 'ø');
        const addA = addO.replace(/&aring;/g, 'å');
        const addLB = addA.replace(/<\/p>/g, '\n\n');
        const addSpace = addLB.replace(/&nbsp;/g, ' ');
        const removehT = addSpace.replace(/<h2>/g, '');
        const removePtag2 = removehT.replace(/<p>/g, '\n\n');
        const removeHTMLreferences = removePtag2.replace(/&#\d+;/g, '.');
        const removeExcessSpace = removeHTMLreferences.replace(/\s+\./g, '!');
        const removeSpace = removeExcessSpace.trimEnd()
        return(<View><Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{removeSpace}</Text></View>)
    } else {
        return(<View><Text style={T.red}>{lang ? 'Feil ved henting av beskrivelse' : 'Error fetching description'}</Text></View>)
    }
}
