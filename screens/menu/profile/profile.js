{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import DynamicCircle from '../../../shared/eventComponents/dynamicCircle';
import Svg, { LinearGradient, Rect, Stop } from 'react-native-svg';
import ProfileInfo from '../../../shared/profile/profileInfo';
import Profile from '../../../shared/profile/profile';
import Space from '../../../shared/functions/space';
import FetchColor from '../../../styles/fetchTheme';
import { PS } from '../../../styles/profileStyles';
import { GS } from '../../../styles/globalStyles';
import { MS } from '../../../styles/menuStyles';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import {useState} from 'react';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import BottomMenu from '../../../shared/bottomMenu';

{/* ========================= APP START ========================= */}

export default function ProfileScreen( { navigation }) {
    const { lang  } = useSelector( (state) => state.lang  )
    const { login } = useSelector( (state) => state.login )
    const { theme } = useSelector( (state) => state.theme )
    const { id, ban, joinedevents, name, allergies, preferences, mail, schoolyear, degree, image } = useSelector( (state) => state.profile )
    const profile = { id: 0, ban, joinedevents: 40, name, allergies, preferences, mail, schoolyear, degree, image }
    const profileInfo = { degree, schoolyear, mail, preferences, allergies }

    const eventPage = () => { navigation.navigate('EventScreen') }
    const menuPage = () => { navigation.navigate('MenuScreen') }
    // const adPage = () => { navigation.navigate('AdScreen') }

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (event) => {
        setScrollPosition(-event.nativeEvent.contentOffset.y);
      };

  return(
    <View>
    {/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <View style={{backgroundColor: FetchColor(theme, "ORANGE"), top: 0, left: 0, right: 0, height: scrollPosition, position: 'absolute'}}/>
            <ScrollView scrollEventThrottle={40} onScroll={handleScroll} showsVerticalScrollIndicator={false}>
                <Svg style={PS.profileGradientBackground}>
                    <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2={theme == 1 ? 0.55 : 0.55}>
                        <Stop offset="40%" stopColor={FetchColor(theme, "ORANGE")} />
                        <Stop offset={theme == 1 ? "86%" : "100%"} stopColor={FetchColor(theme, "DARKER")} />
                    </LinearGradient>
                    <Rect x="0" y={theme == 1 ? 65 : 0} width="100%" height="100%" fill="url(#gradient)" />
                </Svg>
                {Space(Dimensions.get('window').height/8)}
                {Profile(navigation, theme, lang, profile, login, scrollPosition)}
                {Space(40)}
                {ProfileInfo(theme, lang, profileInfo)}
                {Space(Dimensions.get('window').height/3)}
            </ScrollView>
        </View>   

    {/* ========================= DISPLAY TOP MENU ========================= */}
        <View style={MS.topMenu}>
            <TouchableOpacity onPress={() => menuPage()}>
            <Image style={MS.goBack} source={require('../../../assets/icons/goback111.png')} />
            </TouchableOpacity>

            <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

            <Text style={{... MS.screenTitle, color: "#111"}}>{lang ? 'Profil' : 'Profile'}</Text>
        </View>
    {/* ========================= DISPLAY BOTTOM MENU ========================= */}

    <BottomMenu navigation={navigation} screen="menu" />
    </View>
  )
};
