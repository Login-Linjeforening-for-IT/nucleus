
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
import Cluster from '../shared/functions/cluster';
import AdBanner from '../shared/adComponents/adBanner';
import AdTitle from '../shared/adComponents/adTitle';
import AdInfo from '../shared/adComponents/adInfo';
import AdDescription from '../shared/adComponents/adDescription';
import AdUpdateInfo from '../shared/adComponents/adUpdateInfo';
import AdMedia from '../shared/adComponents/adMedia';

{/* ========================= APP START ========================= */}

export default function SpecificAdScreen( { route, navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )
  const { item } = route.params
  //Check if image exists

  const adPage = () => { navigation.navigate('AdScreen') }
  const eventPage = () => { navigation.navigate('EventScreen') }
  const menuPage = () => { navigation.navigate('EventScreen') }
  const goBack = () => { navigation.navigate('AdScreen') }

  return(
    <View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
    <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/8.1)}
        <Cluster>
            {item.banner_image ? <AdBanner props={item.banner_image}/>:null}
            {Space(10)}
            <AdTitle props={item}/>
            {Space(10)}
            <AdInfo props={item}/>
            {Space(10)}
            <AdDescription props={item}/>
            {Space(10)}
            <AdMedia props={item}/>
            <AdUpdateInfo props={item}/>
            {Space(10)}
        </Cluster>
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

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? item.title_no : item.title_no}</Text>
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