import AdInfo, { AdBanner, AdTitle, AdDescription, AdUpdateInfo, AdMedia } from '../shared/ad';
import Cluster from '../shared/functions/cluster';
import BottomMenu from '../shared/bottomMenu';
import Space from '../shared/functions/space';
import FetchColor from '../styles/fetchTheme';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { useSelector } from 'react-redux';
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

export default function SpecificAdScreen( { route, navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { theme } = useSelector( (state) => state.theme )
  const { item } = route.params
  //Check if image exists

//   const adPage = () => { navigation.navigate('AdScreen') }
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

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? item.title_no : item.title_no}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
<BottomMenu navigation={navigation} screen="sas" />
    </View>
    
  )
};