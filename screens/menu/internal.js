{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import DynamicCircle from '../../shared/eventComponents/dynamicCircle';
import FetchColor from '../../styles/fetchTheme';
import Space from '../../shared/functions/space';
import Card from '../../shared/functions/card';
import { GS } from '../../styles/globalStyles';                                     // Global styles
import { MS } from '../../styles/menuStyles';                                       // Menu styles
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { T } from '../../styles/text';                                              // Text styles
import { BlurView } from 'expo-blur';                                               // Blur effect
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import topic from '../../shared/notificationComponents/topic';


{/* ========================= APP START ========================= */}

export default function InternalScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '0', nav: 'TodoScreen', arg: 1, titleEN: 'Todo'},
    {id: '1', nav: 'MakeNotificationScreen', arg: 0, titleEN: 'Send notification'},
  ])

  const eventPage   = () => { navigation.navigate('EventScreen'  ) }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const menuPage    = () => { navigation.navigate('MenuScreen'   ) }              // Function to navigate to menu

  /**
   * <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </Card>
            </TouchableOpacity>
   */
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
            <View>{index == 0 ? Space(Dimensions.get('window').height/8): null}
            <TouchableOpacity onPress={() => topic("maintenance", index == 1 ? true:undefined)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{"Maintenance " + item.arg}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          {Space(Dimensions.get('window').height/3)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'For bedrifter' : 'For companies'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
      <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
      <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={MS.bMenuIconTO} onPress={() => listingPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};