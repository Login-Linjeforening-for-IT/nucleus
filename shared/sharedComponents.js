import React, {useState } from 'react';
import { SS } from '../styles/settingStyles';
import { ES } from '../styles/eventStyles';
const GLOBAL = require('../styles/themes/dark')
import { T } from '../styles/text'
import { 
    View, 
    Text, 
    Switch, 
    TouchableOpacity,
} from 'react-native';

export default function Card(props) {
    return(
        <View style={ES.card}>
            <View style={ES.cardContent}>
                { props.children }
            </View>
        </View>
    );
};

export function CardSmaller(props) {
    return(
        <View style={ES.cardSmaller}>
            <View>
                { props.children }
            </View>
        </View>
    );
};

export function Copyright() {   //Copyright info
    return(
        <View>
            <Text style={T.copyright}>Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372</Text>
        </View>
    )
}
export function Kontakt() { //Contact info
    return(
    <View>
        <Text/>
        <Text style={T.centered25}>Kontakt</Text>
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

export function Notification() {    //Notification enabled/disabled color
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <View>
          <Switch
            trackColor={{ true: GLOBAL.DARK.TRACKCOLOR }}
            thumbColor={isEnabled ? GLOBAL.DARK.SWITCHOFFSTATE : GLOBAL.DARK.SWITCHONSTATE}
            ios_backgroundColor={GLOBAL.DARK.TRACKBACKGROUNDCOLOR}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    )
}

export function Language() {    //Choose the language
    const changeLang = () => {
        setData({
          ...data,
          lang: !data.lang
        });
      }
      
    const [data, setData] = useState({
        lang: 0
    }) 
      
    return(
        <View>
          <TouchableOpacity onPress={() => changeLang()}>
        {data.lang ?
            <Text style={SS.langSwitch}>EN</Text>
        : 
            <Text style={SS.langSwitch}>NO</Text>
        }
      </TouchableOpacity>
        </View>
    )
}

export function Button(props) { //Button, Login colored
    return(
        <View style={SS.button}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}

export function NotifyButton(props) {   //Button, red
    return(
        <View style={SS.notifyButton}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}