{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { ES } from '../styles/eventStyles';
import { CategoryLight } from '../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  FlatList
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

  console.log(usersData)
  console.log(usersData['description'])



  const settingsPage = () => {
    navigation.navigate('SettingScreen');
  }
  const eventPage = () => {
    navigation.navigate('EventScreen');
  }
  const homePage = () => {
    navigation.navigate('HomeScreen');
  }
  const ProfilePage = () => {
    navigation.navigate('ProfileScreen')
  }
  const goBack = () => {
    navigation.goBack()
  }

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={ES.specificEventParentView}>
            <View style={ES.specificEventView1}>
              <Image style={ES.specificEventImage} source={require('../assets/tekkom.png')} />
            </View>

            <Text/>

            <View style={ES.specificEventView2}>
            <View style={ES.specificEventInfoView}>
                <View>
                  <Text style={ES.dayText}>
                        {navigation.getParam('startt')[8]}
                        {navigation.getParam('startt')[9]}
                  </Text>

                  <Text style={ES.dayText}>
                    {navigation.getParam('startt')[5]}
                    {navigation.getParam('startt')[6]}
                  </Text>
                </View>
              <Text style={T.red}>   Hvor lenge til eventet logikk</Text>
            </View>
            </View>

            <Text/>

            <View style={ES.specificEventView3}>
              <View style={ES.specificEventInfoView}>
                <Text style={T.centered20}>Starter: </Text>
                <Text style={T.centered20}>
                  {navigation.getParam('startt')[11]}
                  {navigation.getParam('startt')[12]}:
                  {navigation.getParam('startt')[14]}
                  {navigation.getParam('startt')[15]}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
              <Text style={T.centered20}>Slutter: </Text>
                <Text style={T.red}>
                  {usersData.endt}
                </Text>
                
                
              
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.centered20}>Lokasjon: </Text>
                <Text style={T.centered20}>
                  {navigation.getParam('roomno')}, {navigation.getParam('campus')}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.centered20}>Kategori: </Text>
                {CategoryLight(navigation.getParam('category'))}
                <Text style={T.centered20}>
                  {navigation.getParam('category')}
                </Text>
              </View>

              <Text/>

              <View style={ES.specificEventInfoView}>
                <Text style={T.centered20}>Arrangør: </Text>
                <Text style={T.centered20}>
                  {navigation.getParam('organizer')}
                </Text>
              </View>
            </View>

            <Text/>

            <View style={ES.specificEventView4}>
              <View>
                <Text style={T.centered20}>{navigation.getParam('eventname')}</Text>
              </View>

              <Text/>

              <View>
                <Text style={T.centered20}>Beskrivelse: </Text>
                <Text style={T.centered15}>
                    {usersData.description}
                </Text>
              </View>
            </View>
          </View>

          <Text/><Text/><Text/><Text/>
          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
        <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.eventSelected} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};