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

    if (string != null) {  // Using replace instead of replaceAll because some android devices dont support replaceAll
        const removeTags = string.replace(/<p>|<h2>|<a |<\/h2>/g, '')
        const Fristcleanup = removeTags.replace(' (frist', 'sfrist:')
        const FristClosingCleanup = Fristcleanup.replace(/\):/g, '.')
        const RegistrationCleanup = FristClosingCleanup.replace(' (due', ' due:')
        const LinkCleanup = RegistrationCleanup.replace(/href=".*?">.*?<\/a>/g, '')
        const addO = LinkCleanup.replace(/&oslash;/g, 'ø');
        const addA = addO.replace(/&aring;/g, 'å');
        const addLB = addA.replace(/<\/p>/g, '\n\n');
        const addSpace = addLB.replace(/&nbsp;/g, ' ');
        const removehT = addSpace.replace(/<h2>/g, '');
        const removePtag2 = removehT.replace(/<p>/g, '\n\n');
        const removeHTMLreferences = removePtag2.replace(/&#\d+;/g, '.');
        const removeExcessSpace = removeHTMLreferences.replace(/\s+\./g, '!');
        const removeSpace = removeExcessSpace.trimEnd()
        console.log(removeSpace)
        return(<View><Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{removeSpace}</Text></View>)
    } else {
        return(<View><Text style={T.red}>{lang ? 'Feil ved henting av beskrivelse' : 'Error fetching description'}</Text></View>)
    }
}

export function FetchJoinLink(string) {
    if(string != undefined) {
        let linkStart = string.lastIndexOf('https://forms')
        let linkEnd = string.lastIndexOf("</a>");
        let link = string.slice(linkStart, linkEnd)
        return link
    }else return null
}

//let linkStart = sstring.indexOf('https://forms')
//let linkEnd = sstring.indexOf("&lt;a&gt;");
//let link = sstring.slice(2, 20)
//console.log(link)
//console.log(string.match(/https?:\/\/(?:www)?\.forms[^ ,.]+/gm))