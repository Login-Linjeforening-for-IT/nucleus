import Svg, { Circle, Path } from 'react-native-svg';
import React from 'react';
import { ES } from '../../styles/eventStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { T } from '../../styles/text'
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';

/**
 * NOTE: SHOULD BE COMBINDED WITH GRAYLIGHT AND REDLIGHT INTO LIGHT AND TAKE COLOR AS PARAMETER
 * Function for drawing a green light 
 * @returns Green Light svg
 */
export default function GreenLight() {  //Green colored light svg
    return(
        <View style={ES.size}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100" >
            <Circle cx="50" cy="50" r="50" stroke="green" strokeWidth=".5" fill="green" />
            </Svg>
        </View>
    );
};

/**
 * NOTE: SHOULD BE COMBINDED WITH REDLIGHT AND GREENLIGHT 
 * Function for drawing a gray light
 * @returns Gray Light svg
 */
export function GrayLight() {   //Background colored light svg
    const { theme } = useSelector( (state) => state.theme )

    let actualTheme = AsyncStorage.getItem('event')
    switch (actualTheme) {
        case 1:     actualTheme = 1; break;
        case 2:     actualTheme = 2; break;
        case 3:     actualTheme = 3; break;
        default:    actualTheme = 0; break;
    }

    if(actualTheme == 0 && !actualTheme) {
        return(
            <View style={ES.size}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={FetchColor(theme, 'BACKGROUND')} />
                </Svg>
            </View>
        );
    }else if(actualTheme == 1) {
        return(
            <View style={ES.size}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={FetchColor(theme, 'BACKGROUND')} />
                </Svg>
            </View>
            );
    }else if(actualTheme == 2) {
        return(
            <View style={ES.size}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={FetchColor(theme, 'BACKGROUND')} />
                </Svg>
            </View>
            );
    }else if(actualTheme == 3) {
        return(
            <View style={ES.size}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={FetchColor(theme, 'BACKGROUND')} />
                </Svg>
            </View>
            );
    }else{
        return(
            <View style={ES.size}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100" >
                <Circle cx="50" cy="50" r="50" fill={FetchColor(theme, 'BACKGROUND')} />
                </Svg>
            </View>
        );
    }
    
};

/**
 * Function for rendering the end time of an event
 * @param {string} input 
 * @returns View containing the endtime as a text
 */
export function GetEndTime(input){

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if(input != null){
        const hour1     = (input)[11]    //Fetching endtime cipher 1 from api
        const hour2     = (input)[12]    //Fetching endtime cipher 2 from api
        const minute1   = (input)[14]    //Fetching endtime cipher 3 from api
        const minute2   = (input)[15]    //Fetching endtime cipher 4 from api
        return(<View><Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{hour1}{hour2}:{minute1}{minute2}</Text></View>)
    }else{
        return(<View><Text style={{...T.locationError, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Feil ved henting av sluttid.' : 'Error fetching endtime.'}</Text></View>)

    }
}

/**
 * Function for finding the eventlocation of an event
 * @param {string} room     Room where the event takes place
 * @param {string} campus   Campus where the event takes place
 * @returns                 View containing the event location as a text
 */
export function EventLocation(room, campus) {

    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )

    if(room != null && campus != null) {
        if (room.length == 0 && campus.length == 0 ) {
            return(
            <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Lokasjon:\t\t' : 'Location:\t\t'}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>TBA!</Text>
            </View>)
        } else {
            return(
                <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Lokasjon:\t\t' : 'Location:\t\t'}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {room},{campus}
                </Text>
              </View>
            )
        }
    }else{
        <View style={ES.specificEventInfoView}>
            <Text style={T.red}>{lang ? 'Feil ved henting av sted.' : 'Error fetching location'}</Text>
        </View>
    }
}

/**
 * WIP - SHOULD RETURN THE IMAGE FOR THE GIVEN EVENT
 * @param {*} condition 
 * @returns 
 */
export function EventImage(condition) {  //Doesnt work
    if(!condition) {
        return(
            <View>
                <Image style={ES.specificEventImage} source={require('../../assets/default.png')} />
            </View>
        )
    }
}
  
/**
 * NOTE: SHOULD BE COMINDED WITH MonthEN
 * Function for displaying the month an event takes place
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color of the text based on theme
 * @returns                 Text containing the month in norwegian
 */
export function MonthNO(month, color) {
    const monthsNO = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
    return <Text style={{...ES.monthText, color: color}}>{monthsNO[month - 1]}</Text>;
}

/**
 * NOTE: SHOULD BE COMBINDED WITH MonthNO
 * @param {string} month    Month of the event
 * @param {hex} color       Hex color for the text based on theme
 * @returns 
 */
export function MonthEN(month, color) {
    const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];  
    return <Text style={{...ES.monthText, color: color}}>{monthsEN[month - 1]}</Text>;
}

/**
 * NOTE: SHOULD BE COMBINDED WITH GREENLIGHT AND GRAYLIGHT
 * Function for drawing a red colored light svg
 * @returns Red colored light svg
 */
export function RedLight() {    //Red colored light svg
    return(
    <View style={ES.size}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill="red" />
        </Svg>
    </View>
    );
};

/**
 * Function for drawing a very customizable circle where you can choose size color and placement as you wish
 * @param {number} height   Height of the circle
 * @param {number} width    Width of the cirle
 * @param {hex} color       Color of the circle
 * @param {number} left     Distance from the left
 * @param {number} right    Distance from the right
 * @param {number} top      Distance from top
 * @param {number} bottom   Distance from bottom
 * @returns                 Circle with the properties given
 */
export function DynamicCircle(height, width, color, left, right, top, bottom) {    // Dynamic easy to style circle
    return(
    <View style={{left: left, right: right, top: top, bottom: bottom, height: height, width: width}}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="50" fill={color} />
        </Svg>
    </View>
    );
};

/**
 * Function for drawing a check svg icon
 * @returns Svg
 */
export function Check() {   //Checkmark svg
    const { theme } = useSelector( (state) => state.theme )

    return(
    <View style={ES.size}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={FetchColor(theme, 'DARKER')}>
            <Path d="M13.788 25.588c.04.032.064.076.106.106.06.04.128.048.192.076.076.036.15.07.23.092.078.02.154.03.234.036.114.012.224.012.336-.004.046-.008.09-.02.136-.032.138-.034.266-.088.392-.164.022-.014.04-.03.062-.044.082-.056.17-.098.24-.174.05-.054.072-.124.112-.184.002-.002.006-.004.006-.006L27.752 6.188a1.4 1.4 0 1 0-2.344-1.532L14.4 22.298l-6.088-5.922a1.398 1.398 0 1 0-1.9 2.054l7.324 7.126c.014.014.034.018.052.032z"/>
        </Svg>
    </View>
    );
};  

/**
 * Function for drawing a smaller icon (can be combinded into a dynamic check icon)
 * @returns Small svg
 */
export function SmallCheck() {   //Checkmark svg
    const { theme } = useSelector( (state) => state.theme )

    return(
    <View style={ES.checkedIconCheckMark}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 28 26" fill={FetchColor(theme, 'DARKER')}>
            <Path d="M13.788 25.588c.04.032.064.076.106.106.06.04.128.048.192.076.076.036.15.07.23.092.078.02.154.03.234.036.114.012.224.012.336-.004.046-.008.09-.02.136-.032.138-.034.266-.088.392-.164.022-.014.04-.03.062-.044.082-.056.17-.098.24-.174.05-.054.072-.124.112-.184.002-.002.006-.004.006-.006L27.752 6.188a1.4 1.4 0 1 0-2.344-1.532L14.4 22.298l-6.088-5.922a1.398 1.398 0 1 0-1.9 2.054l7.324 7.126c.014.014.034.018.052.032z"/>
        </Svg>
    </View>
    );
}; 

/**
 * Function for checking the state of a given event
 * @param {boolean} condition true / false
 * @returns circle, green circle if condition is true, otherwise gray circle
 */
export function CheckState(condition) { //Choose the state green/gray
    if (condition == true) {
        return(
            <View style = {ES.greenLight}><GreenLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        ) 
    } else {
        return(
            <View style = {ES.GrayLight}><GrayLight/></View>,
            <View style = {ES.checkContent}><Check/></View>
        )
    }
}

/**
 * Function for fetching a emoji to include in a string.
 * @param {object} props Event object
 * @returns Emoji as string
 */
export function fetchEmoji(props) {
    switch (props.category) {
      case 'TEKKOM':        return '🍕'
      case 'KARRIEREDAG':   return '👩‍🎓'
      case 'CTF':           return '🧑‍💻'
      case 'FADDERUKA':     return '🍹'
      case 'SOCIAL':        return '🥳'
      case 'BEDPRES':       return '👩‍💼'
      case 'LOGIN':         return '🚨'
      default:              return '💻'
    }
}