import FetchColor from '../styles/fetchTheme';                              // Function to fetch theme color
import { MS } from '../styles/menuStyles';                                  // Menu styles
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';                                       // Blur effect
import {                                                                    // React native components
  View,                                                                     // View component
  Image,                                                                    // Image component
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Platform,                                                                 // Operating system
  Text
} from 'react-native';                                                      // React native

/**
 * Top Menu on every page
 * @param {*} props
 * @returns 
 */
export default function TopMenu({ navigation, title, screen, back }) {
    const { theme }  = useSelector( (state) => state.theme )
    const goBack = () => { navigation.navigate(back)}
    const eventPage = () => { navigation.navigate('EventScreen') }
    
    return(
        <>
            {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
            <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
                {back ? 
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image style={MS.goBack} source={require('../assets/icons/goback777.png')} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={MS.logoBackground} onPress={() => screen != 'event' && eventPage()}>
                        <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
                    </TouchableOpacity>
                }
                {
                    title.length > 40 ? <Text style={{...MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{title}</Text>
                    : <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{title}</Text>
                }
            </View>
        </>
    )
}