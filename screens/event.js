{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Card from '../shared/card';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { ES } from '../styles/eventStyles';
import GreenLight, { GrayLight, Check, Month } from '../shared/sharedComponents';
import CategorySquare from '../shared/categorySquare';

import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function EventScreen({ navigation }) {
const listingPage = () => {
navigation.navigate('ListingScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen', events);
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}

const [usersData,setUsersData]=useState([])

const getData=()=>{
  fetch('https://api.login.no/events')
  .then(response=>response.json())
  .then(data=>setUsersData(data));
}

useEffect(() => {
getData();
},[])

const [events, updateEvents] = useState([]) 

return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>Events</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
          <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.eventID}
          data={usersData}
          renderItem={({item}) => (
            <View>
              {events.includes(item) ? (
                <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', item)}>
                  <Card style={ES.eventCard}>
                    <View style={ES.eventBack}>
                      <View>
                          {CategorySquare(item.category)}
                          <Text style={ES.eventCardDayText}>{item.startt[8]}{item.startt[9]}</Text>
                          <Text style={ES.eventCardMonthText}>{Month(item.startt[5] + item.startt[6])}</Text>
                      </View>
                        <View style={ES.view2}>
                        
                          <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                          <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                        </View>
                        <View style={ES.view3}>
                            <TouchableOpacity onPress={() => updateEvents(events.filter((x) => x.eventID !== item.eventID))}>
                              <View style = {ES.greenLight}><GreenLight/></View>
                              <View style = {ES.checkContent}><Check/></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ):(
                <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', item)}>
                <Card style={ES.eventCard}>
                  <View style={ES.eventBack}>
                    <View>
                      {CategorySquare(item.category)}
                      <Text style={ES.eventCardDayText}>{item.startt[8]}{item.startt[9]}</Text>
                      <Text style={ES.eventCardMonthText}>{Month(item.startt[5] + item.startt[6])}</Text>
                    </View>
                    <View style={ES.view2}>
                      <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                      <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                    </View>
                    <View style={ES.view3}>
                        <TouchableOpacity onPress={() => updateEvents([...events, item])}>
                          <View style = {ES.greenLight}><GrayLight/></View>
                          <View style = {ES.checkContent}><Check/></View>
                        </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
              )
            }
            </View>
          )}
          />
          
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={MS.bMenuIcon} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/business.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};