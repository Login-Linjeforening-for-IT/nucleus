import DynamicCircle from '../../shared/eventComponents/dynamicCircle';
import AllComitees from '../../shared/functions/allCommittees';
import Space from '../../shared/functions/space';
import FetchColor from '../../styles/fetchTheme';                                   // Function for fetching theme color
import { GS } from '../../styles/globalStyles';                                     // Global styles
import Card from '../../shared/functions/card';
import Line from '../../shared/functions/line';
import { MS } from '../../styles/menuStyles';                                       // Menu styles
import { useSelector } from 'react-redux';                                          // Redux
import { T } from '../../styles/text';                                              // Text styles
import { BlurView } from 'expo-blur';                                               // Blur effect
import React from 'react';                                                          // React
import { 
  Text,                                                                             // Text component
  View,                                                                             // View component
  Image,                                                                            // Image component
  TouchableOpacity,                                                                 // TouchableOpacity (custom button)
  ScrollView,                                                                       // Scrollable view 
  Linking,                                                                          // Function to link to websites etc.
  Dimensions,                                                                       // Screen size
  Platform
} from 'react-native';                                                              // React Native


{/* ========================= APP START ========================= */}

export default function LegacyBoardScreen({ navigation }) {                       // Declares the export Committeescreen

  const { lang  } = useSelector( (state) => state.lang  )                           // Language state
  const { login } = useSelector( (state) => state.login )                           // Loginstatus
  const { theme } = useSelector( (state) => state.theme )                           // Theme state
  const { oldUI }    = useSelector( (state) => state.misc )                   //  Old User Interface

  const eventPage   = () => { navigation.navigate(!oldUI ? 'EventScreen':'OldEventScreen') }
  const menuPage   = () => { navigation.navigate(!oldUI ? 'MenuScreen':'OldMenuScreen') }
  const adPage = () => { navigation.navigate('AdScreen') }            // Function to navigate to job advertisements

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {Space(Dimensions.get('window').height/8.1)}
        <Card>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:kontakt@login.no')}>
              <View>
              <View style={GS.row}>
              <Text>{Line(60,5)}</Text>
              <View>
              <Text style={{...T.boldWithLine, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Trykk på flyet for henvendelser angående app, nettside, eller som ikke skal til en konkret komite.' : 'Press the plane for inquiries regarding app, website, or not for a specific committee'}</Text>
              </View>
            </View>
            {Space(10)}
                <Image style={GS.image200} source={require('../../assets/icons/plane-orange.png')} />
              </View>
            </TouchableOpacity>
          {AllComitees(lang, theme)}
        </Card>
        {Space(10)}
      </View>
      {Space(Dimensions.get('window').height/3)}
    </ScrollView>
  </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
  <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>                    

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Styret' : 'The Board'}</Text>

  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
      <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={MS.bMenuIconTO} onPress={() => adPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};