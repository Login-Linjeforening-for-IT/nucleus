{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { ES } from '../styles/eventStyles';
import Card, { Space } from '../shared/sharedComponents';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../styles/fetchTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SpecificListingScreen( { route, navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const { item } = route.params
  //Check if image exists

  const listingPage = () => { navigation.navigate('ListingScreen') }
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const menuPage    = () => { navigation.navigate('MenuScreen')    }              // Function to navigate to menu
  const goBack      = () => { navigation.navigate('ListingScreen') }

  return(
    <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/7.5)}
        <View>
            <View style={ES.specificEventView1}>
              <Image style={ES.specificEventImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/mnemonic.png') : require('../assets/mnemonic-black.png')} />
            </View>

            {Space(5)}

            <Card>
              <View>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </View>
            </Card>

            <View>


              <Card>
                <Text style={{...T.margin15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.content}</Text>
              </Card>
            </View>
          </View>

          {Space(20)}
          {Space(Dimensions.get('window').height/10)}
        </ScrollView>
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/calendar777.png') : require('../assets/calendar-black.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/business-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu.png') : require('../assets/menu-black.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};