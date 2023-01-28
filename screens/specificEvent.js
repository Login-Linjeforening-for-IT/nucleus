{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { GetEndTime, MonthNO, MonthEN, EventLocation, DynamicCircle } from '../shared/eventComponents/otherComponents';
import CleanDescription, {FetchJoinLink} from '../shared/eventComponents/cleanDescription';
import { nSchedulePushNotification, eSchedulePushNotification } from './event';
import CategoryCircle from '../shared/eventComponents/categoryCircle';
import CategorySquare from '../shared/eventComponents/categorySquare';
import Card, { CardSmaller, Space } from '../shared/sharedComponents';
import EventTime from '../shared/eventComponents/eventTime';
import React, { useEffect, useState } from 'react';
import FetchColor from '../styles/fetchTheme';
import { GS } from '../styles/globalStyles';
import { ES } from '../styles/eventStyles';
import { useSelector } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import { MS } from '../styles/menuStyles';
import { BlurView } from 'expo-blur';
import { T } from '../styles/text';
import { 
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Linking,
  Image,
  View,
  Text, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


{/* ========================= APP START ========================= */}

export default function SpecificEventScreen({ route, navigation}) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )
  const [usersData,setUsersData]=useState({})
  const { item } = route.params
  const link = FetchJoinLink(usersData.description)


  const getData=()=>{
    fetch('https://api.login.no/events/' + item.eventID)
    // fetch('https://tekkom:rottejakt45@api.login.no:8443') //TESTING
    .then(response => response.json())
    .then(data=>setUsersData(data))
  }
  useEffect(() => {
    getData();
    },[item])

  const listingPage = () => { navigation.navigate('ListingScreen') }
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const menuPage    = () => { navigation.navigate('MenuScreen')    }
  const goBack      = () => { navigation.navigate('EventScreen')   }

  async function updateStorage() {
    let storedClickedEvents = JSON.parse(await AsyncStorage.getItem('clickedEvents'))
    if(storedClickedEvents){
      storedClickedEvents.push(item)
      lang ? nSchedulePushNotification(item):eSchedulePushNotification(item)
      await AsyncStorage.setItem('clickedEvents', JSON.stringify(storedClickedEvents))
    }else{
      lang ? nSchedulePushNotification(item):eSchedulePushNotification(item)
      await AsyncStorage.setItem('clickedEvents', JSON.stringify([item]))
    }
  }
  
  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>

        {Space((Dimensions.get('window').height/9)+5)}

        {(item.image).includes('.svg') ? 
          <SvgUri
            style={{alignSelf: 'center'}}
            width={(Dimensions.get('window').width)/1.2}
            height={Dimensions.get('window').width/3}
            uri={`https://cdn.login.no/img/events/${item.image}`}
          />
        :(item.image).includes('.png')?<Image style={ES.specificEventImage} source={{uri: `https://cdn.login.no/img/events/${item.image}`}}/>:null}
        {(item.image == 'none' || !item.image) && item.category == 'TEKKOM' ?<Image style={ES.specificEventImage} source={require(`../assets/tekkom.png`)} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'CTF' ?<Image style={ES.specificEventImage} source={require(`../assets/ctf.png`)} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'SOCIAL' ?<Image style={ES.specificEventImage} source={require(`../assets/sosialt.png`)} />:null}

            {/* item.image == 'none' ?
              item.category == 'TEKKOM' ?<Image style={ES.specificEventImage} source={require(`../assets/tekkom.png`)} />:null
              item.category == 'CTF' ?<Image style={ES.specificEventImage} source={require(`../assets/ctf.png`)} />:null
            : null} */}

            {Space(5)}
          
            <CardSmaller>
              <View style={ES.specificEventInfoView}>
                  <Card>
                    <View style={{left: -10}}>

                    {CategorySquare(item.category)} 
                    <Text style={{...ES.eventCardDayText, color: FetchColor(theme, 'TEXTCOLOR')}}>
                        {item.startt[8]}
                        {item.startt[9]}
                    </Text>

                    <Text style={{...ES.monthText, color: FetchColor(theme, 'TEXTCOLOR')}}>
                    {lang ? MonthNO(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR')) : MonthEN(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR'))}
                    </Text>
                    </View>
                  </Card>
                    <Text>{EventTime(item.startt, usersData.endt)}</Text>
                  </View>
            </CardSmaller>

            {Space(5)}
            <Card>
              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter:\t  ' : 'Starts:\t    '}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]}
                </Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
              <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Slutter:\t  ' : 'Ends:\t\t    '}</Text>
                {GetEndTime(usersData.endt)}
                
              </View>

              {Space(5)}

              {EventLocation(usersData.roomno, usersData.campus, usersData.street, usersData.mazeref)}

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Kategori:\t    ' : 'Category:\t'}</Text>
                {CategoryCircle(item.category)}
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.category}</Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Arrangør:\t  ' : 'Organizer:   '}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.organizer}{item.organizerlink ? ' - ': ''}</Text>
                {item.organizerlink ? 
                  <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${item.organizerlink}`)}}>
                        <View style={ES.row}>
                            <Text style={{...T.mazemap, color: FetchColor(theme, 'ORANGE')}}>{lang ? 'Mer info':'More info'}</Text>
                        </View>
                    </TouchableOpacity>
                :null}
              </View>
           </Card>

           {Space(5)}
            <Card>
              <View>{Space(5)}
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
              </View>
              {Space(5)}
              {CleanDescription(usersData.description)}
              {Space(10)}
              {
                link ?
                <TouchableOpacity onPress={() => {updateStorage() + Linking.openURL(link)}}>
                <View style={{...ES.eventButton, backgroundColor: FetchColor(theme, 'ORANGE')}}>
                  <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>
                    {lang ? "Meld meg på":"Join event"}
                  </Text>
                </View>
              </TouchableOpacity>:null
              }
            </Card>
            {Space(10)}
            {Space(Dimensions.get('window').height/10)}
        </ScrollView>
      </View>   
       
       {/* ========================= DISPLAY TOP MENU ========================= */}
       {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.eventname}</Text>
  </View>
{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/business.png') : require('../assets/business-black.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../assets/menu.png') : require('../assets/menu-black.png')} />
          </TouchableOpacity>
      </View>     
    </View>
  )
};