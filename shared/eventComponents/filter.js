import GreenLight, { GrayLight, Check, Month } from '../shared/eventComponents/otherComponents';
import Card, { CompareDates, CheckBox, CheckedBox } from '../shared/sharedComponents';
import CategorySquare from '../shared/eventComponents/categorySquare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
const GLOBAL = require('../styles/themes/dark');
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
  TextInput,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function EventScreen({ navigation }) {
  //Declaring screens you can navigate to from this screen
  const listingPage = () => {navigation.navigate('ListingScreen')}
  const homePage = () => {navigation.navigate('HomeScreen')}
  const aboutPage = () => {navigation.navigate('AboutScreen')}
  const profilePage = () => {navigation.navigate('ProfileScreen')}

  const getData=()=>{ //  Fetches data from API
    fetch('https://api.login.no/events') //PRODUCTION
    // fetch('https://tekkom:rottejakt45@api.login.no:8443/events') //TESTING
    .then(response=>response.json())
    .then(data=>setEvents(data))
  }

  const [search, toggleSearch] = useState({status: 0})        // Search bar visibility boolean
  const toggleSearchBar = () => {                             // Toggle search bar visiblity
    toggleSearch({
      ...search,
      status: !search.status
    });
  }

  // --- ARRAY DECLARATION ---
  const [events, setEvents] = useState(null)                  // Stores events gathered from api
  const [renderedArray, setRenderedArray] = useState(null)
  const [filteredEvents, setFilteredEvents] = useState(null); // Stores filtered events
  const [clickedEvents, setClickedEvents] = useState([])      // Stores clicked events
  const [clickedCategory, setClickedCategory] = useState([]); // Stores clicked categories
  const [category] = useState([                               // All categories to filter
      {id: '1', category: 'TEKKOM'}, 
      {id: '2', category: 'SOCIAL'},
      {id: '3', category: 'CTF'},
      {id: '4', category: 'KARRIEREDAG'}, 
      {id: '5', category: 'FADDERUKA'},
      {id: '6', category: 'BEDPRES'},
      {id: '7', category: 'LOGIN'},
  ]);

  const [filter, setFilter] = useState({input: null});        // Filter text input declaration
  const textInputRef = useRef(null);                          // Reference to clear input
  const filterInput = (val) => {                              // Filter text input updating
      setFilter({ 
      ...filter,
      input: val,
      });
  }

  // --- FUNCTION DECLARATION ---
  const filterBoth = () => {  //  Both text and categories are filtered here - will be moved to another file
    let filtered = renderedArray.filter(event => clickedCategory.includes(event.category) && event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
      filtered.length > 0 ? console.log('true'):console.log('false')
      setFilteredEvents([...filtered])
    console.log('case 1')
    console.log('case 1: ' + filteredEvents)
  }

  const filterText = () => {  //  Only text is filtered - will be moved to another file
    let textFiltered = renderedArray.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
    textFiltered.length > 0 ? console.log('true'):console.log('false ' + filteredEvents.length)
    setFilteredEvents([...textFiltered])
    console.log('case 2')
    console.log('case 2: ' + filteredEvents)
  }

  const filterCategories = () => {  //  Only categories are filtered - will be moved to another file
    let categoryFiltered = renderedArray.filter(event => !clickedCategory.includes(event.category));
    setFilteredEvents([...categoryFiltered])
    console.log('case 3')
    console.log('case 3: ' + filteredEvents)
  }

  const Filter = () => {  // Function for deciding what to filter
    if (filter.input != null) {
      clickedCategory.length > 0 ? filterBoth() : filterText()
    } else {
      clickedCategory.length > 0 ? filterCategories() : setFilteredEvents([...renderedArray])
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
      await AsyncStorage.setItem("clickedEvents", "")
    })();
  }
 
  useEffect(() => { //  Renders instantly when the screen is loaded
    getData();
  },[])

  useEffect(() => { // Renders when the state of the filter changes
    if (filter.input > 0 || clickedCategory.length > 0) {
      Filter();
    }
  }, [filter, clickedCategory]); // Listens to changes in these arrays

  if (renderedArray == null) { 
    if (filteredEvents != null) { 
      setRenderedArray([...filteredEvents])
    } else if (events != null){ 
      (async() => {                   // Makes local copy
        await AsyncStorage.setItem('cachedArray', JSON.stringify(events))
      })
      setRenderedArray([...events])   //  Stores
    }else{
      (async() => {
        try {
          let tempArray = await AsyncStorage.getItem('cachedArray')
          tempArray != null ? tempArray = JSON.parse(tempArray):null  //Parses
          tempArray != null ? setRenderedArray([...tempArray]) :null  //Stored or left as null if not found
        } catch (e) {
          console.log(e) // User does not have wifi, and localstorage is unavailable
        }
      })
    }
  }

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
          {/* ----- RENDERS FILTER ----- */}
          {search.status ? 
            <View>
                <View style={ES.absoluteView}>
                    <TextInput 
                        ref={textInputRef}
                        style={ES.filterText}
                        maxLength={40}
                        placeholder='Søk..'
                        placeholderTextColor={GLOBAL.DARK.TITLETEXTCOLOR}
                        textAlign='center'
                        onChangeText={(val) => filterInput(val)}
                    />
                    <TouchableOpacity onPress={() => setClickedCategory([]) + textInputRef.current.clear()}>
                        <Image style={ES.filterResetIcon} source={require('../assets/reset.png')} />
                    </TouchableOpacity>
                </View>
                
                <View style={ES.filterView}>
                    <FlatList
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            keyExtractor={(item) => item.id}
                            data={category}
                            renderItem={({item}) => (
                                <View style={ES.categoryView}>
                                    {clickedCategory.includes(item) ?
                                        <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                                            <Text style={T.filterCategoryText}>{item.category}</Text>
                                            <CheckedBox/>
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                            <Text style={T.filterCategoryText}>{item.category}</Text>
                                            <CheckBox/>
                                        </TouchableOpacity>
                                    }
                                    
                                    
                                </View>
                            )}
                    /><Text/>
                </View>
            </View>
          :null}

          {/* ----- RENDERS EVENTS ----- */}
          {renderedArray != null ? 
            renderedArray.length > 0 ?
              <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={(item) => item.eventID}
              data={filteredEvents}
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
                  <View style={{height : '50%'}}/>
                  <Text style={T.centeredOppositeColor}>Ingen treff</Text>
                </View>
          : 
            <View style={{alignSelf: 'center', maxWidth: '80%'}}>
              <View style={{height : '58%'}}/>
              <Text style={T.centeredBold20}>Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer.</Text>
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