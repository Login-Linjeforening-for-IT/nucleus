/**
 * Collection of custom components
 * 
 * Content in order:
 * - Card               - Custom view used on every screen of the application, every square with rounded corners is a card.
 * - CardSmaller        - Smaller custom view used by every screen of the application.
 * - Kontakt            - View containing the contact information for Login - Linjeforeningen for IT.
 * - Notification       - Notification switch used in settings.
 * - Language           - Language switch used in settings.
 * - Button             - Orange button.
 * - NotifyButton       - Button used on reportscreen, currently waiting for backend infrastructure.
 * - CheckBox           - Check box used by eventfilter.
 * - CheckedBox         - Box displaying that the box has been checked in the eventfilter.
 * - Line               - Line with height and width properties for easy customization.
 * - Space              - Empty view with height as variable for creating space between content. Used wherever there is space.
 * - Social             - View displaying all of Logins other social media.
 * - CompareDates       - Function for comparing two dates, true if firstdate is newer
 * - AllComitees        - View containing all comittees 
 * - HomeIcon           - Home icon svg, currently not in use. (bad design)
 * - ThemeSwitch        - Theme switch in settings
 */

import React from 'react';
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
    Linking,
    Alert
} from 'react-native';
import { GS } from '../styles/globalStyles';
import FetchColor from '../styles/fetchTheme';
import { topic } from './notificationManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationDelay } from './eventComponents/notificationDelay';

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
        <Text style={{...T.orangeCentered15, color: FetchColor(theme, 'ORANGE')}} onPress={async() => {Linking.openURL('mailto:kontakt@login.no').catch(() => lang ? Alert.alert('Kunne ikke åpne mail!', 'Mail: kontakt@login.no'):Alert.alert('Could not open mail!', 'Reach us at kontakt@login.no'))}}>kontakt@login.no</Text>
        <Text/>{Space(12)}
    </View> 
    )
}

/**
 * Function for displaying a notification switch
 * @param {string} category      Category the switch should control
 * @param {boolean} langChange    True if on the notification settings panel
 * @returns                 Notification switch as view
 */
export function Notification ({category}) {    //Notification button
    const notification = useSelector( (state) => state.notification ) // Fetches notification state
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )
    const dispatch = useDispatch()

    topic(category, lang, notification[category]);

    return(
        <View>
            <Switch
                trackColor={{ true: FetchColor(theme, 'TRACKCOLOR') }}
                thumbColor={notification[category] ? FetchColor(theme, 'SWITCHOFFSTATE') : FetchColor(theme, 'SWITCHONSTATE')}
                ios_backgroundColor={FetchColor(theme, 'TRACKBACKGROUNDCOLOR')}
                onValueChange={() => dispatch(changeNotificationState(category))}
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

    topic("langChange", lang);  // Sets up notifications to follow language

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
            <Image style={GS.socialBigImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginBig-white.png') : require('../assets/logo/loginBig-black.png')} />
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://discord.com/invite/login-ntnu')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/discord-white.png') : require('../assets/social/discord-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/login_linjeforening/')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/instagram-white.png') : require('../assets/social/instagram-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/LogNTNU')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/facebook-white.png') : require('../assets/social/facebook-black.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            {Space(10)}
            <View style={GS.socialView}>
                <View style={GS.socialPartView}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/linjeforeningen-login/about')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/linkedin-white.png') : require('../assets/social/linkedin-black.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://git.logntnu.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/gitlab-white.png') : require('../assets/social/gitlab-black.png')} />
                    </TouchableOpacity>
                </View>

                <View style={GS.socialPartView}>
                <TouchableOpacity onPress={() => Linking.openURL('https://redmine.login.no')}>
                        <Image style={GS.medium} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/social/redmine-white.png') : require('../assets/social/redmine-black.png')} />
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
          <Image style={GS.personImage} source={require('../assets/photos/leder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Leder' : 'Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Anders Eiken</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/199580276823818240')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}Eiken#6059</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/photos/nestleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Nestleder' : 'Deputy chairman'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Mads Halland</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/193774211242655746')}>
          <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}¬.¬#6719</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/photos/sekreter.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'Sekretær' : 'Secretary'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Celina Brynildsen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/745317481190785126')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}Celina#6955</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/committee/eventkom/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'EventKom leder' : 'EventKom Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Sofie Hagen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877183922021216256')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}sofiee#9763</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/committee/prkom/prleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'PR leder' : 'PR leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Kristina Kataki</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877108421772582962')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}Kataki#7254</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/committee/tekkom/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'TekKom leder' : 'TekKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Simon Edna</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/298525088914079745')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}Sim#3909</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/committee/ctfkom/ctfkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'CTF leder' : 'CTF leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Eskil Refsgaard</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/522483274933731331')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}refsgaard#9067</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/committee/satkom/satkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'SatKom leder' : 'SatKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Sebastian Hestsveen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/119120560931340290')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../assets/social/discord-colored.png')} />}stubbe#8694</Text>
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
            <TouchableOpacity onPress={() => theme > 2 ? dispatch(resetTheme()) : dispatch(changeTheme())}>
            {theme == 0 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/sun.png')} />: null}        
            {theme == 1 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/abyss.png')} />: null}
            {theme == 2 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/sunset.png')} />: null}
            {/* {theme == 3 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/christmas.png')} />: null} */}
            {/* {theme == 4 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/easter.png')} />: null} */}
            {theme == 3 ? <Image style={SS.lightSwitchImage} source={require('../assets/themes/moon.png')} />: null}
            </TouchableOpacity>
        </View>
    )
}

export function EventCardLocation(item, theme, lang) {
    let time = ' ' + item.startt[11]+item.startt[12]+':'+item.startt[14]+item.startt[15] + '. ';
    let location = item.campus + '. ' + item.roomno + '.';

    return(
        <View style={ES.view2}>
            <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>
                <Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                {time != ' : ' && time != ' 00:00. ' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{time != '00:00' ? time:null}</Text>:null}
                {location != '. .' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{location}</Text>:null} 
                {time == ' : ' || time == ' 00:00. ' && location == '. .' ? <Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}> {lang ? 'Mer info TBA!':'More info TBA!'}</Text>:null}
            </View>
        </View>
    )
}

/**
 * Function for checking when the API was last fetched successfully.
 * @returns String
 */
export async function LastFetch() {                                            //  --- RETURNS WHEN EVENTS WERE FETCHED FROM STORAGE ---
    var time = await AsyncStorage.getItem('lastFetch');

    if(time){
      var year   = parseInt((time)[0] + (time)[1] + (time)[2] + (time)[3])//  year
      var month  = parseInt((time)[5] + (time)[6])                        //  month
      var day    = parseInt((time)[8] + (time)[9])                        //  day
      var hour   = parseInt((time)[11] + (time)[12])                      //  hour
      var minute = parseInt((time)[14] + (time)[15])                      //  minute
      
      if(month < 10) month = '0' + month                                  // Checking and fixing missing 0
      if(day < 10) day = '0' + day                                        // Checking and fixing missing 0
      if(hour < 10) hour = '0' + hour                                     // Checking and fixing missing 0
      if(minute < 10) minute = '0' + minute                               // Checking and fixing missing 0

      const CleanedTime = hour + ':' + minute + ', ' + day + '/' + month + ', ' + year;

      return CleanedTime;
    } 
  }

  export function Countdown(props) {
    const [timer, setTimer] = useState(NotificationDelay(props));
    useEffect(() => {
      const interval = setInterval(() => {                                          
        setTimer(NotificationDelay(props));
      }, 1000);
      return () => clearInterval(interval);
    }, [timer]);
    var days = Math.floor(timer/86400) == 0 ? '':Math.floor(timer/86400) + 'd '
    var hour = 1 + Math.floor((timer%86400)/3600) == 0 ? '':1 + Math.floor((timer%86400)/3600) + 't '
    var minutes = Math.floor(((timer%86400)%3600)/60) == 0 ? '':Math.floor(((timer%86400)%3600)/60) + 'm '
    var seconds = ((timer%86400)%3600)%60 == 0 ? '':((timer%86400)%3600)%60 + 's '
    var countdown = days + hour + minutes + seconds
    return countdown;
  }