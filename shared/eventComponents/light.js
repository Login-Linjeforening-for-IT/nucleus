import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchColor from '../../styles/fetchTheme';
import Svg, { Circle } from 'react-native-svg';
import { ES } from '../../styles/eventStyles';
import { useSelector } from 'react-redux';
import { View } from 'react-native';


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