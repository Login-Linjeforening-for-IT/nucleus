import GreenLight, { GrayLight, Check, Month } from '../shared/eventComponents/otherComponents';
import CategorySquare from '../shared/eventComponents/categorySquare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventFilter from '../shared/eventComponents/filter';
import Card, { CompareDates, Space } from '../shared/sharedComponents';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { ES } from '../styles/eventStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function EventScreen({ navigation }) {
  //Declaring screens you can navigate to from this screen
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

  //  Search bar items
  const [search, toggleSearch] = useState({ //  Stores the search bars visiblity
    status: 0
  }) 

  const toggleSearchBar = () => { //Toggle if the search option should be visible
    toggleSearch({
      ...search,
      status: !search.status
    });
  }
  const [filter, updateFilter] = useState([]) // Not used at this time, to define what to search for

  const [events, setEvents] = useState([]) // Stores events gathered from api
  const [clickedEvents, setClickedEvents] = useState([]) // Stores clicked events

  const getData=()=>{ //  Fetches data from API
    fetch('https://api.login.no/events') //PRODUCTION
    // fetch('https://tekkom:rottejakt45@api.login.no:8443/events') //TESTING
    .then(response=>response.json())
    .then(data=>setEvents(data))
  }

  const fetchState = async() => { //Fetches the state of every object
    let foundState = await AsyncStorage.getItem('clickedEvents');
    if (foundState != null) {
      let parsed = JSON.parse(foundState)
      setClickedEvents(parsed)
    } 
}
  
  if (clickedEvents.length > 0) { // Checks if there are any stored events
    (async() => {
      let storedID = 0;

      for (let i = 0; i < clickedEvents.length; i++) { // Finds the firstcoming event
        if (CompareDates((clickedEvents)[i].startt, (clickedEvents)[storedID].startt) == true) {
          storedID = i
        }
      } //  Stores the firstcoming event
      await AsyncStorage.setItem("clickedEvents", JSON.stringify(clickedEvents))
      await AsyncStorage.setItem("firstEvent", JSON.stringify((clickedEvents)[storedID]))
    })();
  }else{
    (async() => { //Sets it to "" if there are no clicked events
      await AsyncStorage.setItem("firstEvent", "")
    })();
  }
 
  useEffect(() => { //  Renders instantly when the screen is loaded
    fetchState();
    getData();
  },[])

return(
      <View>
        <StatusBar style="light" /> 
  {/* ========================= DISPLAY TOP MENU ========================= */}
    <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => aboutPage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
      </TouchableOpacity>

      <Text style={MS.screenTitle}> Events</Text>
      
        <TouchableOpacity onPress={() => toggleSearchBar()}>
          {search.status ? 
            <Image style={MS.searchIcon} source={require('../assets/filter-orange.png')} />
          :
            <Image style={MS.searchIcon} source={require('../assets/filter.png')} />
        }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => profilePage()}>
          <Image style={MS.tMenuIconWithExtra} source={require('../assets/loginperson.png')} />
        </TouchableOpacity>
    </View>

  {/* ========================= DISPLAY CONTENT ========================= */}
        <View style={GS.content}>
          {search.status ? <EventFilter/>:null}
          {events.length ? 
            <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => item.eventID}
            data={events}
            renderItem={({item}) => (
              <View>
                {clickedEvents.some(event => event.eventID === item.eventID) ? (
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', item)}>
                    <Card style={ES.eventCard}>
                      <View style={ES.eventBack}>
                        <View>
                            {CategorySquare(item.category)}
                            <Text style={ES.eventCardDayText}>{item.startt[8]}{item.startt[9]}</Text>
                            {Month(item.startt[5] + item.startt[6])}
                        </View>
                          <View style={ES.view2}>
                          
                            <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                            <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                          </View>
                          <View style={ES.view3}>
                              <TouchableOpacity onPress={() => setClickedEvents(clickedEvents.filter((x) => x.eventID !== item.eventID))}>
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
                        {Month(item.startt[5] + item.startt[6])}
                      </View>
                      <View style={ES.view2}>
                        <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                        <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                      </View>
                      <View style={ES.view3}>
                          <TouchableOpacity onPress={() => setClickedEvents([...clickedEvents, item])}>
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
            
            : 
            <View>
              {Space(275)}
              <Text style={T.centeredOppositeColor}>Ingen events</Text>
            </View>
          }
          
            
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