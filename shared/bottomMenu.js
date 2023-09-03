import FetchColor from '../styles/fetchTheme';                              // Function to fetch theme color
import { MS } from '../styles/menuStyles';                                  // Menu styles
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';                                       // Blur effect
import {                                                                    // React native components
  View,                                                                     // View component
  Image,                                                                    // Image component
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Platform,                                                                 // Operating system
} from 'react-native';                                                      // React native

/**
 * Bottom Menu on every page
 * @param {*} props 
 * @returns 
 */
export default function BottomMenu({ navigation, screen, back }) {
    const { theme }    = useSelector( (state) => state.theme )              //  Theme state
    const isDark = theme == 0 || theme == 2 || theme == 3 ? true : false

    const eventScreen = () => { navigation.navigate('EventScreen') }
    const menuScreen = () => { navigation.navigate('MenuScreen') }
    const adScreen = () => { navigation.navigate('AdScreen') }

    const logo = {
        event: {
            logo: isDark ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png'),
            current: require('../assets/menu/menu-orange.png')
        },
        menu: {
            logo: isDark ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png'),
            current: require('../assets/menu/menu-orange.png')
        },
        ad: {
            logo: isDark ? require('../assets/menu/business.png') : require('../assets/menu/business-black.png'),
            current: require('../assets/menu/business-orange.png')
        }
    }
    
    return(
        <>
            {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
            <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
                <TouchableOpacity style={MS.bMenuIconTO} onPress={() => screen != "event" && eventScreen()}>
                <Image style={MS.bMenuIcon} source={screen == "event" || screen == "ses" ? logo.event.current : logo.event.logo} />
                </TouchableOpacity>
                <TouchableOpacity style={MS.bMenuIconTO} onPress={() => screen != "ad" && adScreen()}>
                <Image style={MS.bMenuIcon} source={screen == "ad" || screen == "sas" ? logo.ad.current : logo.ad.logo} />
                </TouchableOpacity>
                <TouchableOpacity style={MS.bMenuIconTO} onPress={() => screen != "menu" || back && menuScreen()}>
                <Image style={MS.bMenuIcon} source={screen == "menu" ? logo.menu.current : logo.menu.logo} />
                </TouchableOpacity>
            </View> 
        </>
    )
}