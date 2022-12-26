{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import CategoryCircle from '../shared/eventComponents/categoryCircle';
import CategorySquare from '../shared/eventComponents/categorySquare';
import CleanDescription from '../shared/eventComponents/cleanDescription';
import { GetEndTime, MonthNO, MonthEN, EventLocation, DynamicCircle } from '../shared/eventComponents/otherComponents';
import React, { useEffect, useState } from 'react';
import Card, { CardSmaller, Space } from '../shared/sharedComponents';
import EventTime from '../shared/eventComponents/eventTime';
import { useSelector } from 'react-redux';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { ES } from '../styles/eventStyles';
import FetchColor from '../styles/fetchTheme';
import { BlurView } from 'expo-blur';
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

export default function SpecificEventScreen({ route, navigation}) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )
  const { item } = route.params
  const [usersData,setUsersData]=useState({})

  const getData=()=>{
    fetch('https://api.login.no/events/' + item.eventID)
    // fetch('https://tekkom:rottejakt45@api.login.no:8443') //TESTING
    .then(response => response.json())
    .then(data=>setUsersData(data))
  }
  useEffect(() => {
    getData();
    },[])

  const listingPage = () => { navigation.navigate('ListingScreen') }
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const menuPage    = () => { navigation.navigate('MenuScreen')    }              // Function to navigate to menu
  const goBack      = () => { navigation.navigate('EventScreen')   }

  //Logs correctly
  // console.log('https://cdn.login.no/img/events/' + usersData.image)

  return(
    <View>

{/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space((Dimensions.get('window').height/7.5)+5)}

            <View style={ES.specificEventView1}>
              {/* Doesnt work */}
              <Image style={ES.specificEventImage} source={require('../assets/default.png')}/>
              {/* <Image style={ES.specificEventImage} source={{uri: 'https://cdn.login.no/img/events/' + usersData.image}} /> */}
            </View>

            {Space(5)}
          
            <CardSmaller>
              <View style={ES.specificEventInfoView}>
                  <Card>
                    {CategorySquare(item.category)} 
                    <Text style={{...ES.eventCardDayText, color: FetchColor(theme, 'TEXTCOLOR')}}>
                        {item.startt[8]}
                        {item.startt[9]}
                    </Text>

                    <Text style={{...ES.monthText, color: FetchColor(theme, 'TEXTCOLOR')}}>
                    {lang ? MonthNO(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR')) : MonthEN(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR'))}
                    </Text>
                  </Card>
                    <Text>{EventTime(item.startt, usersData.endt)}</Text>
              </View>
            </CardSmaller>

            {Space(5)}
            <Card>
              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Starter:\t\t' : 'Starts:\t\t'}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {item.startt[11]}
                  {item.startt[12]}:
                  {item.startt[14]}
                  {item.startt[15]}
                </Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
              <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Slutter:\t\t' : 'Ends:\t\t\t'}</Text>
                {GetEndTime(usersData.endt)}
                
              </View>

              {Space(5)}

              {EventLocation(usersData.roomno, usersData.campus)}

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Kategori:\t\t' : 'Category:\t'}</Text>
                {CategoryCircle(item.category)}
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {item.category}
                </Text>
              </View>

              {Space(5)}

              <View style={ES.specificEventInfoView}>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Arrangør:\t\t' : 'Organizer:\t'}</Text>
                <Text style={{...T.specificEventInfo, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {item.organizer}
                </Text>
              </View>
           </Card>

           {Space(5)}
            <Card>
              <View>{Space(5)}
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text>
              </View>
              {Space(5)}
              {CleanDescription(usersData.description)}
            </Card>
            {Space(5)}
            {Space(Dimensions.get('window').height/10)}
        </ScrollView>
      </View>   
       
       {/* ========================= DISPLAY TOP MENU ========================= */}
       {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

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