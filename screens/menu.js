{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import React, { useState } from 'react';
import Card, {Space} from '../shared/sharedComponents';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../styles/fetchTheme';
import { BlurView } from 'expo-blur';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform
} from 'react-native';
import { T } from '../styles/text';

{/* ========================= APP START ========================= */}

export default function MenuScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
      {id: '1', nav: 'SettingScreen',       titleNO: 'Innstillinger',   titleEN: 'Settings'       },
      {id: '2', nav: 'ReportScreen',        titleNO: 'Varsle',          titleEN: 'Report'         },
      {id: '3', nav: 'CommitteeMenuScreen', titleNO: 'Komité',          titleEN: 'Committee'      },
      {id: '4', nav: 'AboutScreen',         titleNO: 'Om oss',          titleEN: 'About Login'    },
      {id: '5', nav: 'BusinessScreen',      titleNO: 'For bedrifter',   titleEN: 'For companies'  },
      {id: '6', nav: 'LoginScreen',         titleNO: 'Innsida (verv)',  titleEN: 'Intranet (verv)'},
  ])
  
  const goBack      = () => { navigation.navigate('EventScreen')   }
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const listingPage = () => { navigation.navigate('ListingScreen') }

return(
  <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList
          
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item, index}) => (
            <View>
              {index == 0 ? Space(Dimensions.get('window').height/7.5): null}
            <TouchableOpacity onPress={() => item.id == 6 && login? navigation.navigate('InternalScreen', item) : navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => Linking.openURL('mailto:kontakt@login.no')}>
              <View style={{backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
                <Text style={{...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Funnet en bug?' : 'Found a bug?'}</Text>
                <Image style={GS.smallImage} source={require('../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
            {Space(Dimensions.get('window').height/10)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/loginText.png') : require('../assets/loginText-black.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Meny' : 'Menu'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/calendar777.png') : require('../assets/calendar-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/business.png') : require('../assets/business-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
              <Image style={MS.bMenuIcon} source={require('../assets/menu-orange.png')} />
        </TouchableOpacity>
      </View>     
    </View>
  )
};
