{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import CategoryCircle from '../shared/categoryCircle';
import CategorySquare from '../shared/categorySquare';
import CleanDescription from '../shared/cleanDescription';
import { getEndTime, Month } from '../shared/sharedComponents';
import { useEffect, useState } from 'react';
import Card, { CardSmaller } from '../shared/card';
import { StatusBar } from 'expo-status-bar';
import EventTime from '../shared/eventTime';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { ES } from '../styles/eventStyles';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';


{/* ========================= APP START ========================= */}

export default function SpecificEventScreen( { navigation }) {

  const [usersData,setUsersData]=useState({})

  const getData=()=>{
    fetch('https://api.login.no/events/'+(navigation.getParam('eventID')))
    .then(response => response.json())
    .then(data=>setUsersData(data))
  }
  useEffect(() => {
    getData();
    },[])
  //Check if image exists

  const settingsPage = () => {
    navigation.navigate('SettingScreen');
  }
  const eventPage = () => {
    navigation.navigate('EventScreen');
  }
  const homePage = () => {
    navigation.navigate('HomeScreen');
  }
  const profilePage = () => {
    navigation.navigate('ProfileScreen');
  }
  const goBack = () => {
    navigation.goBack()
  }

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
            <Text/>

            <View style={ES.specificEventView1}>
              <Image style={ES.specificEventImage} source={require('../assets/tekkom.png')} />
            </View>

            <Text/>
          
            <CardSmaller>
              <View style={ES.specificEventInfoView}>
                  <Card>
                    {CategorySquare(navigation.getParam('category'))} 
                    <Text style={ES.dayText}>
                        {navigation.getParam('startt')[8]}
                        {navigation.getParam('startt')[9]}
                    </Text>

                    <Text style={ES.monthText}>
                    {Month(navigation.getParam('startt')[5] + navigation.getParam('startt')[6])}
                    </Text>
                  </Card>
                  <Card>
                    <Text>{EventTime(navigation.getParam('startt'))}</Text>
                  </Card>
              </View>
            </CardSmaller>

            <Text/>
            <Card>
              <View style={ES.specificEventInfoView}>
                <Text style={T.specificEventInfo}>Starter: </Text>
                <Text style={T.specificEventInfo}>
                  {navigation.getParam('startt')[11]}
                  {navigation.getParam('startt')[12]}:
                  {navigation.getParam('startt')[14]}
                  {navigation.getParam('startt')[15]}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
              <Text style={T.specificEventInfo}>Slutter: </Text>
                {getEndTime(usersData.endt)}
                
              
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.specificEventInfo}>Lokasjon: </Text>
                <Text style={T.specificEventInfo}>
                  {navigation.getParam('roomno')}, {navigation.getParam('campus')}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.specificEventInfo}>Kategori: </Text>
                {CategoryCircle(navigation.getParam('category'))}
                <Text style={T.specificEventInfo}>
                  {navigation.getParam('category')}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.specificEventInfo}>Arrangør: </Text>
                <Text style={T.specificEventInfo}>
                  {navigation.getParam('organizer')}
                </Text>
              </View>
           </Card>

            <Text/>
            <Card>
              <View><Text/>
                <Text style={T.centered20}>{navigation.getParam('eventname')}</Text>
              </View>
              {CleanDescription(usersData.description)}
            </Card><Text/><Text/><Text/><Text/><Text/><Text/><Text/><Text/>
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
        <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/business.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};