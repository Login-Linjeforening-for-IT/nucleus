import { GS } from '../../styles/globalStyles';                                     // Global styles
import { MS } from '../../styles/menuStyles';                                       // Menu styles
import { T } from '../../styles/text';                                              // Text styles
import React from 'react';                                                          // React
import Card, { Space, AllComitees, Line } from '../../shared/sharedComponents';     // Various self made components
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';       // Various event components
import { useSelector } from 'react-redux';                                          // Redux
import FetchColor from '../../styles/fetchTheme';                                   // Function for fetching theme color
import { BlurView } from 'expo-blur';                                               // Blur effect
import { 
  Text,                                                                             // Text component
  View,                                                                             // View component
  Image,                                                                            // Image component
  TouchableOpacity,                                                                 // TouchableOpacity (custom button)
  ScrollView,                                                                       // Scrollable view 
  Linking,                                                                          // Function to link to websites etc.
  Dimensions                                                                        // Screen size
} from 'react-native';                                                              // React Native

{/* ========================= APP START ========================= */}

export default function CommitteeMenuScreen({ navigation }) {                       // Declares the export Committeescreen

  const { lang  } = useSelector( (state) => state.lang  )                           // Language state
  const { login } = useSelector( (state) => state.login )                           // Loginstatus
  const { theme } = useSelector( (state) => state.theme )                           // Theme state

  const eventPage   = () => { navigation.navigate('EventScreen')       }            // Function to navigate to eventscreen
  const listingPage = () => { navigation.navigate('ListingScreen')     }            // Function to navigate to job advertisements
  const menuPage    = () => { navigation.navigate('MenuScreen')        }            // Function to navigate to menu

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {Space(Dimensions.get('window').height/7.5)}
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
                <Image style={GS.image200} source={require('../../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
          <AllComitees/>
        </Card>
        {Space(10)}
      </View>
      {Space(Dimensions.get('window').height/10)}
    </ScrollView>
  </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
<BlurView style={MS.topMenu} intensity={30}/>
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
  <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>                    

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Komité' : 'Committee'}</Text>

  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
<BlurView style={MS.bMenu} intensity={30}/>
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/calendar777.png') : require('../../assets/calendar-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => listingPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/business.png') : require('../../assets/business-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => menuPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/menu-orange.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};