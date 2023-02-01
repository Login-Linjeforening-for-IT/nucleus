{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../../styles/menuStyles'
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
import React, { useState } from 'react';
import Card, {Space} from '../../shared/sharedComponents';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';
import { BlurView } from 'expo-blur';
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

export default function InternalScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '0', nav: 'TodoScreen', titleNO: 'Gjøremål', titleEN: 'Todo'},
    {id: '1', nav: 'MakeNotificationScreen', titleNO: 'Send Varsling', titleEN: 'Send notification'},
  ])

  const eventPage   = () => { navigation.navigate('EventScreen'  ) }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const menuPage    = () => { navigation.navigate('MenuScreen'   ) }              // Function to navigate to menu

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
            <View>{index == 0 ? Space(Dimensions.get('window').height/9): null}
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          {Space(Dimensions.get('window').height/10)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
          <TouchableOpacity onPress={() => menuPage()}>
            <Image style={MS.tMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/logo/loginText.png') : require('../../assets/logo/loginText-black.png')} />
          </TouchableOpacity>

          <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

          <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innsida' : 'Intranet'}</Text>
        </View>
        
{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => listingPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => menuPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
