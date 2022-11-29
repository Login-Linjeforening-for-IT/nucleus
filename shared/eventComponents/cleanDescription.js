import React from 'react';
import { View, Text } from 'react-native';
import { T } from '../../styles/text'
import { A } from '@expo/html-elements'; //Doesnt work in the commented lines below

export default function CleanDescription(string) {
    if (string != null) {
        const removePtag = string.replaceAll('<p>', '')
        const hTag = removePtag.replaceAll('<h2>', '')
        const aTag = hTag.replaceAll('<a ', '<A ')
        const removeSlash = aTag.replaceAll('/', '')
        // const httpsTag = removeSlash.replaceAll('https', 'https://')
        // const aTag2 = removeSlash.replaceAll('<a>', '</A>')
        const addO = removeSlash.replaceAll('&oslash;', 'ø')
        const addA = addO.replaceAll('&aring;', 'å')
        const addLB = addA.replaceAll('</p>', '\n\n')
        const addSpace = addLB.replaceAll('&nbsp;', ' ')
        const removehT = addSpace.replaceAll('<h2>', '')
        const removePtag2 = removehT.replaceAll('<p>', '\n\n')
        return(<View><Text style={T.paragraph}>{removePtag2}</Text></View>)
    } else {
        return(<View><Text style={T.red}>Feil under cleanup av beskrivelse.</Text></View>)
    }
}
