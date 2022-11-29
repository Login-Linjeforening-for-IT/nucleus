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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const theme = async() => {
        const hei = await AsyncStorage.getItem("theme")
        switch (hei) {
            case 1:     console.log("her funka det", hei); return 1;
            case 2:     console.log("her funka det", hei); return 2;
            case 3:     console.log("her funka det", hei); return 3;
            default:    console.log("her funka det", hei); return 0;
        }
    }
    console.log('theme er', theme())
    let num = 0
    switch (num) {
        case 1:
            return(
                <View>
                  <Switch
                    trackColor={{ true: GLOBAL.LIGHT.TRACKCOLOR }}
                    thumbColor={isEnabled ? GLOBAL.LIGHT.SWITCHOFFSTATE : GLOBAL.LIGHT.SWITCHONSTATE}
                    ios_backgroundColor={GLOBAL.LIGHT.TRACKBACKGROUNDCOLOR}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
            )
        case 2: 
            return(
                <View>
                <Switch
                    trackColor={{ true: GLOBAL.CHRISTMAS.TRACKCOLOR }}
                    thumbColor={isEnabled ? GLOBAL.CHRISTMAS.SWITCHOFFSTATE : GLOBAL.CHRISTMAS.SWITCHONSTATE}
                    ios_backgroundColor={GLOBAL.CHRISTMAS.TRACKBACKGROUNDCOLOR}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
            )
        case 3: 
        return(
            <View>
            <Switch
                trackColor={{ true: GLOBAL.EASTER.TRACKCOLOR }}
                thumbColor={isEnabled ? GLOBAL.EASTER.SWITCHOFFSTATE : GLOBAL.EASTER.SWITCHONSTATE}
                ios_backgroundColor={GLOBAL.EASTER.TRACKBACKGROUNDCOLOR}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            </View>
        )
        default:
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