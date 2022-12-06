import React, {useEffect, useState } from 'react';
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
        <Text style={T.centeredBold25}>Kontakt</Text>
        <Text style={T.centered15}>Login - Linjeforeningen for IT</Text>
        <Text style={T.centered15}>Teknologivegen 22</Text>
        <Text style={T.centered15}>Bygg A, rom 155</Text>
        <Text style={T.centered15}>2815 GJØVIK</Text>
        <Text/>
        <Text style={T.orangeCentered15} onPress={() => Linking.openURL('mailto:kontakt@login.no')}>kontakt@login.no</Text>
        <Text/>
        <Text/>
        <Text style={T.red}>map goes here</Text>
        <Text/>{Space(15)}
    </View> 
    )
}

export function Notification(index) {    //Notification button
    const [isEnabled, setState] = useState(false);

    const toggleSwitch = async() => {
        if (isEnabled == true) {
            await AsyncStorage.setItem('notification'+index, "0")
            .then(setState(!isEnabled))
        }else{
            await AsyncStorage.setItem('notification'+index, "1")
            .then(setState(!isEnabled))
        }
    }
    
    const fetchState = async() => {
        let foundState = await AsyncStorage.getItem('notification'+index);
        if(foundState === "1"){setState(true)}else{setState(false)}
    }

    useEffect(() => {
        fetchState();
    })

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

    const [data, setData] = useState({
        lang: 0
    }) 

    const changeLang = async() => {
        if (data.lang == 1) {
            await AsyncStorage.setItem('lang', "0")
            .then(
                setData({
                    ...data,
                    lang: !data.lang
                  })
            )
        } else {
            await AsyncStorage.setItem('lang', "1")
            .then(
                setData({
                    ...data,
                    lang: !data.lang
                  })
            )
        }
        
      }
    
    const fetchState = async() => {
        let foundState = await AsyncStorage.getItem('lang');
        if(foundState === "1"){
            setData({
                ...data,
                lang: 1
              });
        }else{
            setData({
                ...data,
                lang: 0
              });
        }
    }

    useEffect(() => {
        fetchState();
    },[])
      
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

export function AllComitees() {
    return(
        <View>
          <Image style={GS.personImage} source={require('../assets/leder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Anders Eiken</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/199580276823818240')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Eiken#6059</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/nestleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Nestleder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Mads Halland</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/193774211242655746')}>
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}¬.¬#6719</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/sekreter.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Sekretær</Text>
          {Space(5)}
          <Text style={T.leaderName}>Celina Brynildsen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/745317481190785126')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Celina#6955</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>EventKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sofie Hagen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877183922021216256')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}sofiee#9763</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/prleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>PR leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Kristina Kataki</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877108421772582962')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Kataki#7254</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>TekKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Simon Edna</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/298525088914079745')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Sim#3909</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/ctfkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>CTF leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Eskil Refsgaard</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/522483274933731331')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}refsgaard#9067</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/satkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>SatKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sebastian Hestsveen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/119120560931340290')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}stubbe#8694</Text>
          </TouchableOpacity>
          {Space(20)}
        </View>
    )
}