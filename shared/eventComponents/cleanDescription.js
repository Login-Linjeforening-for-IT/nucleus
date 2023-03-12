import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'
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
        const removeTags = string.replace(/<p>|<h2>|<a |<\/h2>|<abbr title="|&zwj;♂|<h2>|/g, '')
        const Fristcleanup = removeTags.replace(' (frist', 'sfrist:')
        const FristClosingCleanup = Fristcleanup.replace(/\):/g, '.')
        const RegistrationCleanup = FristClosingCleanup.replace(/ \(due/g, ' due:')
        const LinkCleanup = RegistrationCleanup.replace(/href=".*?">.*?<\/a>/g, '')
        const removeInfo = LinkCleanup.replace(/(Mer informasjon.*?her:)|(More information.*?here:)/g, '')
        const makeList = removeInfo.replace(/<ul> <li>/g, ' - ')
        const makeNewLine = makeList.replace(/<\/li> <li>/g, '\n - ')
        const endList = makeNewLine.replace(/<\/li> <\/ul>/g, '\n\n')
        const fixEndAbbreviation = endList.replace(/">/g, ' (')
        const fixClosingAbbreviation = fixEndAbbreviation.replace(/<\/abbr>/g, ')')
        const addAE = fixClosingAbbreviation.replace(/&AElig;/, 'Æ');
        const addae = addAE.replace(/&aelig;/g, 'æ');
        const addO = addae.replace(/&Oslash;/g, 'Ø');
        const addo = addO.replace(/&oslash;/g, 'ø');
        const addA = addo.replace(/&Aring;/g, 'Å');
        const adda = addA.replace(/&aring;/g, 'å');

        // issue 15 - Currently removes all styling instead of preserving it
        const removeStyling = adda.replace(/<strong style="color: #f0802a; \(/g,'');
        const removeClosingStyling = removeStyling.replace(/<\/strong>/g,'');
        // issue 15 - Currently removes all styling instead of preserving it

        const addLB = removeClosingStyling.replace(/<\/p>|<p>/g, '\n\n');
        const addEnglishLB = addLB.replace(/English/g, 'English\n');
        const addSpace = addEnglishLB.replace(/&nbsp;/g, ' ');
        const removeHTMLreferences = addSpace.replace(/&#\d+;/g, '.');
        const removeLaquo = removeHTMLreferences.replace(/&laquo;|&raquo;/g, '"');
        const removeExcessSpace = removeLaquo.replace(/\s+\./g, '!');
        const missingExpiretime = removeExcessSpace.replace(/(^|\n)(?=.*Påmelding)(?!.*frist).*(\n|$)|  /g, '');
        const removeLeadingSpace = missingExpiretime.replace(/^[ \t]+|[ \t]+$/gm, '')
        const removeSpace = removeLeadingSpace.trimEnd();

        // issue 15 - Currently removes all styling instead of preserving it
        // if(styleStart && styleEnd) return(<View><Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}></Text></View>)
        return(<View><Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{removeSpace}</Text></View>)
        // issue 15 - Currently removes all styling instead of preserving it

    } else return(<View><Text style={T.red}>{lang ? 'Feil ved henting av beskrivelse' : 'Error fetching description'}</Text></View>)
}

export function FetchJoinLink(string) {
    if(string != undefined) {
        let formStart = string.lastIndexOf('https://forms');
        let formEnd = string.lastIndexOf("</a>");

        let tikkioStart = string.lastIndexOf('https://tikkio');
        let tikkioEnd = string.lastIndexOf('</a>');

        let netStart = string.lastIndexOf('https://nettskjema.no');
        let netEnd = string.lastIndexOf('</a>')

        var formLink = string.slice(formStart, formEnd);
        var tikkioLink = string.slice(tikkioStart, tikkioEnd);
        var netLink = string.slice(netStart, netEnd);
      
        if(formLink)    return formLink.trim();
        if(tikkioLink)  return tikkioLink.trim();
        if(netLink)     return netLink.trim();

        return null;
    }else return null
}