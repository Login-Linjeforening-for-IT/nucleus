import React, {useEffect, useState } from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import { SS } from '../styles/settingStyles';
import { ES } from '../styles/eventStyles';
import { T } from '../styles/text'
import { useSelector, useDispatch } from 'react-redux';
import { changeLang } from '../redux/lang';
import { changeTheme, resetTheme } from '../redux/theme';
import { changeNotificationState } from '../redux/notifications';
import { 
    View, 
    Text, 
    Switch, 
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import { GS } from '../styles/globalStyles';
import FetchColor from '../styles/fetchTheme';

/**
 * Card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Card (props) {
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...ES.card, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View style={ES.cardContent}>
                { props.children }
            </View>
        </View>
    );
};

/**
 * Smaller card function for styling a div, displays a view containing curved corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export function CardSmaller (props) {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...ES.cardSmaller, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View>
                { props.children }
            </View>
        </View>
    );
};

/**
 * Function for displaying the copyright info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Copyright view
 */
export function Copyright() {   //Copyright info

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
            <Text style={{...T.copyright, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372' : 'Copyright © 2022 Login - Linjeforeningen for IT, NO 811 940 372'}</Text>
        </View>
    )
}

/**
 * Function for displaying the contact info of Login - Linjeforeningen for IT as a text inside a view
 * @returns Contact info
 */
export function Kontakt() { //Contact info

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    return(
    <View>
        <Text/>
        <Text style={{...T.centeredBold25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Kontakt' : 'Contact'}</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>Login - Linjeforeningen for IT</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>Teknologivegen 22</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Bygg A, rom 155': 'Building A, room 155'}</Text>
        <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>2815 GJØVIK</Text>
        <Text/>
        <Text style={{...T.orangeCentered15, color: FetchColor(theme, 'ORANGE')}} onPress={() => Linking.openURL('mailto:kontakt@login.no')}>kontakt@login.no</Text>
        <Text/>{Space(12)}
    </View> 
    )
}

/**
 * Function for displaying a notification switch
 * @param {*} category      Category the switch should control
 * @returns                 Notification switch as view
 */
export function Notification ({category, active}) {    //Notification button

    const notification = useSelector( (state) => state.notification ) // Fetches notification state
    const { theme } = useSelector( (state) => state.theme )
    const dispatch = useDispatch()
    
    return(
        <View>
            <Switch
                trackColor={{ true: FetchColor(theme, 'TRACKCOLOR') }}
                thumbColor={notification[category] ? FetchColor(theme, 'SWITCHOFFSTATE') : FetchColor(theme, 'SWITCHONSTATE')}
                ios_backgroundColor={FetchColor(theme, 'TRACKBACKGROUNDCOLOR')}
                onValueChange={() => active === false ? null:dispatch(changeNotificationState(category))}
                value={notification[category]}
            />
        </View>
    )
}

/**
 * Function for choosing the language
 * @returns View representing a switch which controls the language of the application
 */
export function Language() {    //Choose the language
    const { lang  } = useSelector((state) => state.lang  )
    const { theme } = useSelector((state) => state.theme )
    const dispatch = useDispatch()
      
    return(
        <View>
            <TouchableOpacity onPress={() =>  dispatch(changeLang()) }>
                <Text style={{...SS.langSwitch, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'EN' : 'NO'}</Text>
            </TouchableOpacity>
        </View>
    )
}

/**
 * Returns a Login colored button
 * @param {*} props 
 * @returns Button with the content displayed inside
 */
export function Button (props) { //Button, Login colored

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={{...SS.button, backgroundColor: FetchColor(theme, 'ORANGE')}}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}

/**
 * Returns a red colored button
 * @param {*} props 
 * @returns Button with the content displayed inside
 */
export function NotifyButton (props) {   //Button, red
    return(
        <View style={SS.notifyButton}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}

/**
 * Function for displaying a small check box, should be used together with CheckedBox
 * @see CheckBox
 * @returns View containg a checkable box
 */
export function CheckBox() {

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={ES.checkBox}>
            <Svg width={24} height={24} stroke={FetchColor(theme, 'ORANGE')} strokeWidth={1}>
                <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}

/**
 * Function for displaying a small checked box, should be used together with CheckBox
 * @see CheckBox
 * @returns View containing a checked box
 */
export function CheckedBox() {
    
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View style={ES.checkedBox}>
            <Svg width="24" height="24" fill={FetchColor(theme, 'ORANGE')} stroke={FetchColor(theme, 'ORANGE')} strokeWidth={1}>
            <Rect x='1' y='1' width={22} height={22} ry={7.5}/>
            </Svg>
        </View>
    );
}

/**
 * Function for drawing a dynamic line, can be adjusted as you wish using the height and width
 * @param {*} height    Height of the line
 * @param {*} width     Width of the line
 * @returns             View of the given size based on theme
 */
export function Line (height, width) {

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
            <Svg width={width} height={height} fill={FetchColor(theme, 'ORANGE')}>
            <Rect x='1' y='1' width={width} height={height}/>
            </Svg>
        </View>
    );
}

/**
 * Function for creating an empty view, for adding spaces between objects such as views paragraphs etc
 * @param {*} height    How big the space should be
 * @returns             Empty view of the given height
 */
export function Space (height) {
    return(
        <View style={{height: height}}/>
    );
}

/**
 * Function for displaying all of the social media you can reaxch Login on
 * @returns Social media icons
 */
export function Social() {

    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
            <Image style={GS.socialBigImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/loginBig-white.png') : require('../assets/loginBig-black.png')} />
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://discord.com/invite/login-ntnu')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/login_linjeforening/')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/instagram-white.png') : require('../assets/instagram-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/LogNTNU')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/facebook-white.png') : require('../assets/facebook-black.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/linjeforeningen-login/about')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/linkedin-white.png') : require('../assets/linkedin-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://git.logntnu.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/gitlab-white.png') : require('../assets/gitlab-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://redmine.login.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/redmine-white.png') : require('../assets/redmine-black.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
        </View>
    )
}

/**
 * Function for comparing dates, true if the first is newer than the second
 * @param {*} firstDate     First date to compare
 * @param {*} secondDate    Second date to compare
 * @returns                 Boolean, true if first is newer, otherwise false
 */
export function CompareDates (firstDate, secondDate) { // True if firstdate is newer than seconddate
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

/**
 * Function for displaying all comitees 
 * @returns View containing all comittees
 */
export function AllComitees() {
    
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    return(
        <View>
          <Image style={GS.personImage} source={require('../assets/leder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Leder' : 'Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Anders Eiken</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/199580276823818240')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}Eiken#6059</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/nestleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Nestleder' : 'Deputy chairman'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Mads Halland</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/193774211242655746')}>
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}¬.¬#6719</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/sekreter.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Sekretær' : 'Secretary'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Celina Brynildsen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/745317481190785126')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}Celina#6955</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'EventKom leder' : 'EventKom Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Sofie Hagen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877183922021216256')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}sofiee#9763</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/prleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'PR leder' : 'PR leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Kristina Kataki</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877108421772582962')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}Kataki#7254</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'TekKom leder' : 'TekKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Simon Edna</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/298525088914079745')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}Sim#3909</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/ctfkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'CTF leder' : 'CTF leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Eskil Refsgaard</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/522483274933731331')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}refsgaard#9067</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/satkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'SatKom leder' : 'SatKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Sebastian Hestsveen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/119120560931340290')}>
            <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>{<Image style={GS.tiny} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/discord-white.png') : require('../assets/discord-black.png')} />}stubbe#8694</Text>
          </TouchableOpacity>
          {Space(20)}
        </View>
    )
}

/**
 * WIP - NOT USED
 * 
 * Function for displaying the home icon as a svg instead of png (to save space)
 * @returns View containg home icon svg
 */
export function HomeIcon() {
    return(
        <View>
           <Svg height="125" width="100" viewBox="0 0 24 24">
                <Path d="M3 10v15h6v-9h6v9h6v-15L12,3z" stroke={'red'}/>
            </Svg>
        </View>
    )
}

/**
 * Function that provides a switch for controlling the theme of the application
 * @returns View containing switch 
 */
export function ThemeSwitch() {

    const { theme } = useSelector((state) => state.theme)
    const dispatch = useDispatch()

      return (
        <View>
            <TouchableOpacity onPress={() => theme > 3 ? dispatch(resetTheme()) : dispatch(changeTheme())}>
            {theme == 0 ? <Image style={SS.lightSwitchImage} source={require('../assets/sun.png')} />: null}        
            {theme == 1 ? <Image style={SS.lightSwitchImage} source={require('../assets/abyss.png')} />: null}
            {theme == 2 ? <Image style={SS.lightSwitchImage} source={require('../assets/sunset.png')} />: null}
            {theme == 3 ? <Image style={SS.lightSwitchImage} source={require('../assets/christmas.png')} />: null}
            {/* {theme == 4 ? <Image style={SS.lightSwitchImage} source={require('../assets/easter.png')} />: null} */}
            {theme == 4 ? <Image style={SS.lightSwitchImage} source={require('../assets/moon.png')} />: null}
            </TouchableOpacity>
        </View>
    )
}
