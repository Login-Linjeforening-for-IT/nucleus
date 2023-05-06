
  // NOTE: THIS FILE IS CURRENTLY NOT USED IN PRODUCTION

{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import DynamicCircle from '../shared/eventComponents/dynamicCircle';
import Space from '../shared/functions/space';
import FetchColor from '../styles/fetchTheme';
import { GS } from '../styles/globalStyles';
import Card from '../shared/functions/card';
import { ES } from '../styles/eventStyles';
import { MS } from '../styles/menuStyles';
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { T } from '../styles/text';
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

export default function SpecificAdScreen( { route, navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )
  const { oldUI } = useSelector( (state) => state.misc  )               //  Old User Interface
  const { item } = route.params
  //Check if image exists

  const adPage = () => { navigation.navigate('AdScreen') }
  const eventPage = () => { navigation.navigate(!oldUI ? 'EventScreen':'OldEventScreen') }
  const menuPage = () => { navigation.navigate(!oldUI ? 'MenuScreen':'OldMenuScreen') }
  const goBack = () => { navigation.navigate('AdScreen') }

  return(
    <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/8)}
        <View>
            <View style={ES.specificEventView1}>
              {/* <Image style={ES.specificEventImage} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/mnemonic.png') : require('../assets/mnemonic-black.png')} /> */}
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
          {Space(Dimensions.get('window').height/3)}
        </ScrollView>
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/calendar777.png') : require('../assets/menu/calendar-black.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={MS.bMenuIconTO} onPress={() => adPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/menu/business-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu/menu.png') : require('../assets/menu/menu-black.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};