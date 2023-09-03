import CategorySquare, { CategoryCircle } from '../shared/eventComponents/category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchJoinLink from '../shared/eventComponents/fetchJoinLink';
import EventLocation from '../shared/eventComponents/eventLocation';
import EventTime from '../shared/functions/time';
import { CardSmaller } from '../shared/functions/card';
import Month from '../shared/eventComponents/month';
import { GetEndTime } from '../shared/functions/time';
import React, { useEffect, useState } from 'react';
import RenderHTML from 'react-native-render-html';
import Space from '../shared/functions/space';
import FetchColor from '../styles/fetchTheme';
import Card from '../shared/functions/card';
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
import BottomMenu from '../shared/bottomMenu';

{/* ========================= APP START ========================= */}

export default function SpecificEventScreen({ route, navigation}) {

  const { lang  } = useSelector( (state) => state.lang  )
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

//   const adPage = () => { navigation.navigate('AdScreen') }
  const eventPage   = () => { navigation.navigate('EventScreen')}
  const menuPage   = () => { navigation.navigate('MenuScreen')}
  const goBack      = () => { navigation.navigate('EventScreen')}

  async function updateStorage() {
    let storedClickedEvents = JSON.parse(await AsyncStorage.getItem('clickedEvents'))
    if(storedClickedEvents){
      storedClickedEvents.push(item)
      await AsyncStorage.setItem('clickedEvents', JSON.stringify(storedClickedEvents))
    }else{
      await AsyncStorage.setItem('clickedEvents', JSON.stringify([item]))
    }
  }

  function handleLink(mazeref, street, organizer) {
    if (mazeref) {
        Linking.openURL(`https://use.mazemap.com/#v=1&campusid=55&sharepoitype=poi&sharepoi=${mazeref}`).catch(() => {
            Alert.alert('Mazemap kunne ikke åpnes', `Send en mail til kontakt@login.no dersom problemet vedvarer. Feilkode: M${mazeref}`)
        })
        return;
    };
    if(street == 'Orgkollektivet') {
      Linking.openURL('https://link.mazemap.com/tBlfH1oY').catch(() =>{
          Alert.alert('Mazemap kunne ikke åpnes', 'Send en mail til kontakt@login.no dersom problemet vedvarer. Feilkode: wZDe8byp');
      }); 
    }

    if(organizer == 'HUSET') {
      Linking.openURL('https://link.mazemap.com/O1OdhRU4').catch(() => {
        Alert.alert('Mazemap kunne ikke åpnes.', 'Send en mail til kontakt@login.no dersom problemet vedvarer. Feilkode: MGfrIBrd')
      });
    }
}
  
  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>

        {Space((Dimensions.get('window').height/8)+5)}

        {(item.image).includes('.svg') ? 
          <SvgUri
            style={{alignSelf: 'center'}}
            width={(Dimensions.get('window').width)/1.2}
            height={Dimensions.get('window').width/3}
            uri={`https://cdn.login.no/img/events/${item.image}`}
          />
        :(item.image).includes('.png')?<Image style={ES.specificEventImage} source={{uri: `https://cdn.login.no/img/events/${item.image}`}}/>:null}
        {(item.image == 'none' || !item.image) && item.category == 'TEKKOM'  ? <Image style={ES.specificEventImage} source={require(`../assets/committee/tekkom/tekkom.png`    )} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'CTF'     ? <Image style={ES.specificEventImage} source={require(`../assets/committee/ctfkom/ctf.png`       )} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'SOCIAL'  ? <Image style={ES.specificEventImage} source={require(`../assets/categories/sosialt.png`   )} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'LOGIN'   ? <Image style={ES.specificEventImage} source={require(`../assets/categories/login.png`     )} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'ANNET'   ? <Image style={ES.specificEventImage} source={require(`../assets/categories/annet.png`     )} />:null}
        {(item.image == 'none' || !item.image) && item.category == 'BEDPRES' ? <Image style={ES.specificEventImage} source={require(`../assets/categories/bedpresBig.png`)} />:null}

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
                    {Month(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR'), lang)}
                    </Text>
                    </View>
                  </Card>
                    <Text>{EventTime(item.startt, usersData.endt)}</Text>
                  </View>
            </CardSmaller>

            {Space(5)}
            <Card>
              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter:      ' : 'Starts:         '}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]}
                </Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
              <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Slutter:       ' : 'Ends:           '}</Text>
                {GetEndTime(usersData.endt)}
                
              </View>

              {Space(5)}

              <View style={{flexDirection: 'row'}}>

              {EventLocation(usersData.roomno, usersData.campus, usersData.street, usersData.mazeref)}
              {usersData.mazeref || (usersData.street == 'Orgkollektivet' || usersData.organizer == 'HUSET') ? 
                <TouchableOpacity style={{minWidth: 70}} onPress={() => {handleLink(usersData.mazeref, usersData.street, usersData.organizer)}}>
                    <View style={ES.row}>
                        <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{' - '}</Text>
                        <Text style={{...T.mazemap, color: FetchColor(theme, 'ORANGE')}}>{lang ? 'Kart' : 'Map'}</Text>
                        <Image style={ES.mazemapIcon} source={require('../assets/icons/mazemap.png')}/> 
                    </View>
                </TouchableOpacity>
                :null}
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Kategori:      ' : 'Category:      '}</Text>
                {CategoryCircle(item.category)}
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.category}</Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Arrangør:   ' : 'Organizer:   '}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.organizer}{usersData.organizerlink || usersData.discordlink || usersData.fblink ? ' - ':null}</Text>
                {usersData.discordlink ? 
                  <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${item.discordlink}`)}}>
                        <View style={ES.row}>
                            <Text style={{...T.mazemap, color: FetchColor(theme, 'ORANGE')}}>Discord</Text>
                        </View>
                    </TouchableOpacity>
                :null}
                {usersData.fblink && !usersData.discordlink ? 
                  <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${usersData.discordlink}`)}}>
                        <View style={ES.row}>
                            <Text style={{...T.mazemap, color: FetchColor(theme, 'ORANGE')}}>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                :null}
                {usersData.organizerlink && (usersData.discordlink || usersData.fblink) ?
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{' - '}</Text>:null}
                {usersData.organizerlink ? 
                  <TouchableOpacity style={{minWidth: 70}} onPress={() => {Linking.openURL(`${usersData.organizerlink}`)}}>
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
              {usersData.description ? 
                <RenderHTML 
                  baseStyle={{
                    maxWidth: '100%',
                    color: FetchColor(theme, 'TEXTCOLOR'),
                  }}
                  contentWidth={300} 
                  source={{html: usersData.description}} 
                />
                : null
              }
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
            {Space(Dimensions.get('window').height/3)}
        </ScrollView>
      </View>   
       
       {/* ========================= DISPLAY TOP MENU ========================= */}
       {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <Text style={{... MS.smallMultilineTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.eventname}</Text>
  </View>
  <BottomMenu navigation={navigation} screen="ses" />
    </View>
  )
};