import CategorySquare, { CategoryCircle } from 'login/shared/eventComponents/category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventLocation from 'login/shared/eventComponents/eventLocation';
import { FetchJoinLink } from 'login/shared/eventComponents/fetch';
import Space, { Month } from 'login/shared/components/utils';
import { CardSmaller } from 'login/shared/functions/card';
import { GetEndTime } from 'login/shared/functions/time';
import React, { useEffect, useState } from 'react';
import RenderHTML from 'react-native-render-html';
import EventTime from 'login/shared/functions/time';
import FetchColor from 'login/styles/fetchTheme';
import Card from 'login/shared/functions/card';
import { GS } from 'login/styles/globalStyles';
import { ES } from 'login/styles/eventStyles';
import { SvgUri } from 'react-native-svg';
import { useSelector } from 'react-redux';
import TopMenu from 'login/shared/topMenu';
import { T } from 'login/styles/text';
import { 
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  Image,
  View,
  Text, 
} from 'react-native';

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

    useEffect(() => { getData() },[item])

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
        :(item.image).includes('.png')?<Image style={ES.specificEventImage}  source={{uri: `https://cdn.login.no/img/events/${item.image}`}}/>:null}
        {(item.image == 'none' || !item.image) && item.category == 'TEKKOM'  && <Image style={ES.specificEventImage} source={require(`login/assets/committee/tekkom/tekkom.png`)} />}
        {(item.image == 'none' || !item.image) && item.category == 'CTF'     && <Image style={ES.specificEventImage} source={require(`login/assets/committee/ctfkom/ctf.png`)} />}
        {(item.image == 'none' || !item.image) && item.category == 'SOCIAL'  && <Image style={ES.specificEventImage} source={require(`login/assets/categories/sosialt.png`)} />}
        {(item.image == 'none' || !item.image) && item.category == 'LOGIN'   && <Image style={ES.specificEventImage} source={require(`login/assets/categories/login.png`)} />}
        {(item.image == 'none' || !item.image) && item.category == 'ANNET'   && <Image style={ES.specificEventImage} source={require(`login/assets/categories/annet.png`)} />}
        {(item.image == 'none' || !item.image) && item.category == 'BEDPRES' && <Image style={ES.specificEventImage} source={require(`login/assets/categories/bedpresBig.png`)} />}

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
                        <Image style={ES.mazemapIcon} source={require('login/assets/icons/mazemap.png')}/> 
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
       
        <TopMenu navigation={navigation} title={item.eventname} back={"EventScreen"} />
    </View>
  )
};