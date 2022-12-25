import { GS } from '../../styles/globalStyles';                                     // Global styles
import { MS } from '../../styles/menuStyles';                                       // Menu styles
import { T } from '../../styles/text';                                              // Text styles
import React from 'react';                                                          // React
import Card, { Space, AllComitees, Line } from '../../shared/sharedComponents';     // Various self made components
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';       // Various event components
import { useSelector } from 'react-redux';                                          // Redux
import FetchColor from '../../styles/fetchTheme';                                   // Function for fetching theme color
import { 
  Text,                                                                             // Text component
  View,                                                                             // View component
  Image,                                                                            // Image component
  TouchableOpacity,                                                                 // TouchableOpacity (custom button)
  ScrollView,                                                                       // Scrollable view 
  Linking                                                                           // Function to link to websites etc.
} from 'react-native';                                                              // React Native

{/* ========================= APP START ========================= */}

export default function CommitteeMenuScreen({ navigation }) {                       // Declares the export Committeescreen

  const { lang  } = useSelector( (state) => state.lang  )                           // Language state
  const { login } = useSelector( (state) => state.login )                           // Loginstatus
  const { theme } = useSelector( (state) => state.theme )                           // Theme state

  const eventPage   = () => { navigation.navigate('EventScreen')       }            // Function to navigate to eventscreen
  const homePage    = () => { navigation.navigate('HomeScreen')        }            // Function to navigate to the home page
  const listingPage = () => { navigation.navigate('ListingScreen')     }            // Function to navigate to job advertisements
  const profilePage = () => { navigation.navigate('ProfileScreen')     }            // Function to navigate to profile
  const goBack      = () => { navigation.navigate('ContactMenuScreen') }            // Function to go back to the previous screen

  return(
    <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}                              {/** Small red circle if the user is logged in */}

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Komité' : 'Committee'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
    <ScrollView>
      <View>
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
    </ScrollView>
  </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};