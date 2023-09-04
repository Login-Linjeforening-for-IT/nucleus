import FetchColor from '../../styles/fetchTheme';                              // Function to fetch theme color
import { MS } from '../../styles/menuStyles';                                  // Menu styles
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';                                       // Blur effect
import { getHeaderTitle } from '@react-navigation/elements';
import { Dimensions } from 'react-native';
import {                                                                    // React native components
  View,                                                                     // View component
  Image,                                                                    // Image component
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Platform,                                                                 // Operating system
  Text,
  StatusBar
} from 'react-native';                                                      // React native


export default function Header({navigation, route, options}){
    const { lang } = useSelector((state) => state.lang)
    const { theme }  = useSelector( (state) => state.theme )
    const goBack = () => { navigation.goBack()}
    const eventPage = () => { navigation.navigate('EventScreen') }
    const title = options.title ? options.title[lang] : route.name
    return (
        <>
            {Platform.OS === 'ios' ? <BlurView style={{height: Dimensions.get('window').height*9/100+StatusBar.currentHeight}} intensity={30}/> : <View style={{height: Dimensions.get('window').height*9/100+StatusBar.currentHeight, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
            {/* <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
                {options.back ? 
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={MS.logoBackground} onPress={() => screen != 'event' && eventPage()}>
                        <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/logo/loginText.png') : require('../../assets/logo/loginText-black.png')} />
                    </TouchableOpacity>
                }
                {
                    title.length > 40 ? <Text style={{...MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{title}</Text>
                    : <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{title}</Text>
                }
            </View> */}
        </>
    )
}