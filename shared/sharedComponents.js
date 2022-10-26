import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, SvgUri } from 'react-native-svg';
import { GS } from '../styles/globalStyles';
import { T } from '../styles/text'

export default function GreenLight() {
    return(
    <View style={styles.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" stroke="#90ee90" strokeWidth=".5" fill="#90ee90" />
        </Svg>
    </View>
    );
};

export function EksempelSVG() {
    return(
    <View style={styles.container}>
    <SvgUri
    width="100%"
    height="100%"
    uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
    />
    </View>
    )
}

export function Kontakt() {
    return(
    <View>
        <Text/>
        <Text style={T.centeredText}>Kontakt</Text>
        <Text style={T.centeredText15}>Login - Linjeforeningen for IT</Text>
        <Text style={T.centeredText15}>Teknologivegen 22</Text>
        <Text style={T.centeredText15}>Bygg A, rom 155</Text>
        <Text style={T.centeredText15}>2815 GJØVIK</Text>
        <Text/>
        <Text style={T.centeredText15}>kontakt@logntnu.no</Text>
        <Text/>
        <Text/>
        <Text style={T.red}>map goes here</Text>
        <Text/><Text/><Text/><Text/>
    </View> 
    )
    
}

const styles = StyleSheet.create({
    size: {
        height: 20,
        width: 20

    },
    container: {
        height: 50,
        width: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export function Month(month){
    switch(month) {
        case 1: return(<View><Text>'Jan'</Text></View>);
        case 2: return('Feb');
        case 3: return('Mar');
        case 4: return('Apr');
        case 5: return('Mai');
        case 6: return('Jun');
        case 7: return('Jul');
        case 8: return('Aug');
        case 9: return('Sep');
        case 10: return('Oct');
        case 11: return('Nov');
        case 12: return('Des');
    }
}