{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import React, { useState } from 'react';
import { T } from '../styles/text'
import Card, {Space} from '../shared/sharedComponents';
import { useSelector } from 'react-redux';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import FetchColor from '../styles/fetchTheme';
import { BlurView } from 'expo-blur';
import { SvgUri } from 'react-native-svg';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function ListingScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

const eventPage   = () => { navigation.navigate('EventScreen')   }
const menuPage    = () => { navigation.navigate('MenuScreen')    }              // Function to navigate to menu

return(
  <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <View style={{...T.centeredBold20, flex: 1, justifyContent: 'center'}}>{lang ? <Text style={{...T.centeredBold20, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>Jobbannonser kommer snart! Bli med i tekkom hvis du ønsker å hjelpe til😉</Text>:<Text style={{...T.centeredBold20, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>Job listings are coming soon! Join TekKom if you would like to help!😉</Text>}
          {Space(80)}
          <SvgUri
            style={{alignSelf: 'center'}}
            width={(Dimensions.get('window').width)/1.2}
            height={Dimensions.get('window').width/3}
            uri={`https://cdn.login.no/img/events/mnemonic.svg`}
          />
          {theme !== 1 ? <Text style={{...T.centeredBold20, top:-40, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Hovedsamarbeidsparner':'Main partner'}</Text>
          :<Text style={{...T.centeredBold20, top:-40, color: FetchColor(theme, 'BACKGROUND')}}>{lang ? 'Hovedsamarbeidsparner':'Main partner'}</Text>
          }
          </View>
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/logo/loginText.png') : require('../assets/logo/loginText-black.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Stillinger' : 'Vacancies'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={MS.bMenuIcon} source={require('../assets/menu/business-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
