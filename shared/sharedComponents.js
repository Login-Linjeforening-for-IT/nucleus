import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
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
        <Text style={T.centered}>Kontakt</Text>
        <Text style={T.centered15}>Login - Linjeforeningen for IT</Text>
        <Text style={T.centered15}>Teknologivegen 22</Text>
        <Text style={T.centered15}>Bygg A, rom 155</Text>
        <Text style={T.centered15}>2815 GJØVIK</Text>
        <Text/>
        <Text style={T.centered15}>kontakt@logntnu.no</Text>
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
    <View>
        <Switch
            month={{
                    1: 'Jan',
                    2: 'Feb',
                    3: 'Mar',
                    4: 'Apr',
                    5: 'May',
                    6: 'Jun',
                    7: 'Jul',
                    8: 'Aug',
                    9: 'Sep',
                    10: 'Oct',
                    11: 'Nov',
                    11: 'Des',
                }
            }
        />
    </View>
    
}