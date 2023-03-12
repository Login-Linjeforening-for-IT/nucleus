import React from 'react';
import { SS } from '../../styles/settingStyles';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, resetTheme } from '../../redux/theme';
import { 
    View,  
    TouchableOpacity,
    Image,
} from 'react-native';

/**
 * Function that provides a switch for controlling the theme of the application
 * @returns View containing switch 
 */
export default function ThemeSwitch() {

    const { theme } = useSelector((state) => state.theme)
    const dispatch = useDispatch()

      return (
        <View>
            <TouchableOpacity onPress={() => theme > 2 ? dispatch(resetTheme()) : dispatch(changeTheme())}>
            {theme == 0 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/sun.png')} />: null}        
            {theme == 1 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/abyss.png')} />: null}
            {theme == 2 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/sunset.png')} />: null}
            {/* {theme == 3 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/christmas.png')} />: null} */}
            {/* {theme == 4 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/easter.png')} />: null} */}
            {theme == 3 ? <Image style={SS.lightSwitchImage} source={require('../../assets/themes/moon.png')} />: null}
            </TouchableOpacity>
        </View>
    )
}