import React, {useState } from 'react';
import Svg, {Rect} from 'react-native-svg';
import { SS } from '../styles/settingStyles';
import { ES } from '../styles/eventStyles';
const GLOBAL = require('../styles/themes/dark')
import { T } from '../styles/text'
import { 
    View, 
    Text, 
    Switch, 
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GS } from '../styles/globalStyles';

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

export function CheckBox() {
    return(
        <View style={ES.checkBox}>
            <Svg width={24} height={24} stroke={GLOBAL.DARK.ORANGE} strokeWidth={1}>
                <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}

export function CheckedBox() {
    return(
        <View style={ES.checkBox}>
            <Svg width="24" height="24" fill={GLOBAL.DARK.ORANGE} stroke={GLOBAL.DARK.ORANGE} strokeWidth={1}>
            <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}

export function Line(height, width) {
    return(
        <View style={ES.checkBox}>
            <Svg width={width} height={height} fill={GLOBAL.DARK.ORANGE}>
            <Rect x='1' y='1' width={width} height={height}/>
            </Svg>
        </View>
    );
}

export function Space(height) {
    return(
        <View style={ES.checkBox}>
            <Svg width={1} height={height}>
            <Rect x='1' y='1' width={1} height={height}/>
            </Svg>
        </View>
    );
}

export function Social() {
    return(
        <View>
            <Image style={GS.socialBigImage} source={require('../assets/loginBig-white.png')} />
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://discord.com/invite/login-ntnu')}>
                        <Image style={GS.medium} source={require('../assets/discord-white.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/login_linjeforening/')}>
                        <Image style={GS.medium} source={require('../assets/instagram-white.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/LogNTNU')}>
                        <Image style={GS.medium} source={require('../assets/facebook-white.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/linjeforeningen-login/about')}>
                        <Image style={GS.medium} source={require('../assets/linkedin-white.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://git.logntnu.no')}>
                        <Image style={GS.medium} source={require('../assets/gitlab-white.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://redmine.login.no')}>
                        <Image style={GS.medium} source={require('../assets/redmine-white.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
        </View>
    )
}

export function CompareDates(firstDate, secondDate) { // True if firstdate is newer than seconddate
    if(firstDate != null && secondDate != null){                                                    //Concatenating start:
        const firstYear   = (firstDate)[0] + (firstDate)[1] + (firstDate)[2] + (firstDate)[3]       //  year
        const firstMonth  = (firstDate)[5] + (firstDate)[6]                                         //  month
        const firstDay    = (firstDate)[8] + (firstDate)[9]                                         //  day
        const firstHour   = (firstDate)[11] + (firstDate)[12]                                       //  hour
        const firstMinute = (firstDate)[14] + (firstDate)[15]                                       //  minute
                                                                                                    //Concatenating end:
        const secondYear     = (secondDate)[0]  + (secondDate)[1] + (secondDate)[2] + (secondDate)[3]  //  year
        const secondMonth    = (secondDate)[5]  + (secondDate)[6]                                      //  month
        const secondDay      = (secondDate)[8]  + (secondDate)[9]                                      //  day
        const secondHour     = (secondDate)[11] + (secondDate)[12]                                     //  hour
        const secondMinute   = (secondDate)[14] + (secondDate)[15]                                     //  minute
        
        if (firstYear >= secondYear) {
            if(firstYear > secondYear) return false
            if (firstMonth >= secondMonth) {
                if(firstMonth > secondMonth) return false
                if (firstDay >= secondDay) {
                    if(firstDay > secondDay) return false
                    if (firstHour >= secondHour) {
                        if(firstHour > secondHour) return false
                        if (firstMinute >= secondMinute) { return false} 
                        else {return true}
                    } else {return true}
                } else {return true}
            } else {return true}
        } else {return true}
        
    }else if (firstDate != null) { //True if no seconddate exists
        return true
    }else{
        return -1
    }
}