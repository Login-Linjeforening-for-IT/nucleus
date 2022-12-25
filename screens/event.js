import GreenLight, { GrayLight, Check, MonthNO, MonthEN, DynamicCircle, SmallCheck } from '../shared/eventComponents/otherComponents';  // Components used to display event
import Card, { CompareDates, CheckBox, CheckedBox } from '../shared/sharedComponents';  // Components used to display event
import CategorySquare from '../shared/eventComponents/categorySquare';    // Left side square on eventcard
import AsyncStorage from '@react-native-async-storage/async-storage';     // Localstorage
import React, { useEffect, useState, useRef } from 'react';               // React imports
import { GS } from '../styles/globalStyles';                              // Global styles
import { ES } from '../styles/eventStyles';                               // Event styles
import { MS } from '../styles/menuStyles';                                // Menu styles
import { T } from '../styles/text';                                       // Text styles
import { useSelector } from 'react-redux';                                // Redux
import FetchColor from '../styles/fetchTheme';                            // Function to fetch theme color
import {                                                                  // React native components
  Text,                                                                   // Text component
  View,                                                                   // View component
  Image,                                                                  // Image component
  FlatList,                                                               // Flatlist component   (basic list)
  TextInput,                                                              // Text input component (allows the user to type)
  TouchableOpacity,                                                       // TouchableOpacity     (custom button)
} from 'react-native';                                                    // React native
import { useFocusEffect } from '@react-navigation/native';                // useFocusEffect       (do something when the screen is displayed)

export default function EventScreen({ navigation }) {                     // Exports the screen

  const { lang  } = useSelector( (state) => state.lang  )                 // Language state
  const { login } = useSelector( (state) => state.login )                 // Loginstatus
  const { theme } = useSelector( (state) => state.theme )                 // Theme state

                                                                          // Screens you can navigate to from this screen
  const listingPage = () => { navigation.navigate('ListingScreen') }      // Job screen
  const homePage    = () => { navigation.navigate('HomeScreen')    }      // Home screen
  const aboutPage   = () => { navigation.navigate('AboutScreen')   }      // About screen
  const profilePage = () => { navigation.navigate('ProfileScreen') }      // Profile screen

  const getData=()=>{                                                     //  --- FETCHING DATA FROM API ---
    try {
      fetch('https://api.login.no/events')                                // PRODUCTION
      //fetch('https://tekkom:rottejakt45@api.login.no:8443/events')      // TESTING
      .then(response=>response.json())                                    // Formatting the response
      .then(data=>setEvents(data))                                        // Setting the response
    } catch (e) {                                                         // Catches any errors (usually missing wifi)
      (async() => {                                                       // Immediately invoked function expression (IIFE)
        try {                                                         
          let cache = await AsyncStorage.getItem('cachedEvents')          // Tries to fetch event cache
          console.warn('cache' + cache)                                   // Warn (this needs to be tested more)
          if(cache) cache = JSON.parse(cache); setEvents([...cache])      // If cached events was found save them in event array
        } catch (e) {console.warn('Failed to fetch cache: ' + e)}         // If cache was not found tell the user cache wasnt found
      })

      if (events) {if(events.length > 0) renderArray();}else{console.warn('didnt find cache')}  // Error message if cache wasnt found
    
    }
  }
  
  const storeCache = async() => {                                         // --- SAVING EVENTS IN LOCALSTORAGE ---
    if(events.length > 0){                                          
      await AsyncStorage.setItem('cachedEvents', JSON.stringify(events))  // Function to set cache
    }
  }
  const [search, toggleSearch] = useState({status: 0})                    //  Search bar visibility boolean
  const toggleSearchBar = () => {                                         //  Toggle search bar visiblity
    toggleSearch({
      ...search,
      status: !search.status
    });
  }
                                                                          //  --- ARRAY DECLARATION ---
  const [events, setEvents] = useState([]);                               //  Events from api
  const [renderedArray, setRenderedArray] = useState([]);                 //  Events currently displayed
  const [clickedEvents, setClickedEvents] = useState([]);                 //  Clicked events
  const [clickedCategory, setClickedCategory] = useState([]);             //  Clicked categories
  const [relevantCategories, setRelevantCategories] = useState([]);       //  Relevant categories to filter
  const [category] = useState([                                           //  All categories to filter
    {id: '2', category: 'TEKKOM'}, 
    {id: '3', category: 'SOCIAL'},
    {id: '4', category: 'CTF'},
    {id: '5', category: 'KARRIEREDAG'}, 
    {id: '6', category: 'FADDERUKA'},
    {id: '7', category: 'BEDPRES'},
    {id: '8', category: 'LOGIN'},
  ]);

  const [filter, setFilter] = useState({input: null});                    //  Filter text input declaration
  const textInputRef = useRef(null);                                      //  Clears text input
  const filterInput = (val) => {                                          //  --- UPDATES FILTER TEXT INPUT ---
      setFilter({                                                         // Function to set filter
      ...filter,                                                          // Spread operator to spread filter
      input: val,                                                         // Change input to 'val'
      });
  }

  const filterBoth = () => {                                              //  --- FILTERS CATEGORIES AND TEXT ---
    const clickedFound = clickedCategory.find(item => item.category === 'PÅMELDT'); // Checks if PÅMELDT is clicked                                     
    if(clickedFound) {                                                    // If PÅMELDT is clicked
      if(clickedCategory.length > 1){                                     // If at least one category is clicked filters based on category
        let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
        let concatenatedArray = [];                                       // Temporary array
        clickedEvents.forEach(event => {                                  // Goes through every clickedEvent
          let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID); // Checks for duplicates
          if (!duplicateExists) { concatenatedArray.push(event) }         // If no duplicate pushes to temporary array
        });
        concatenatedArray = categoryFiltered.concat(concatenatedArray);   // Concatinates clickedEvents and filtered events
        const filtered = concatenatedArray.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
        setRenderedArray([...filtered]);                                  // Updates renderedArray
      }else{                                                              // If only PÅMELDT is clicked
        let filtered = clickedEvents.filter(event => clickedCategory.some(category => event.category === event.category));  // Filters clickedEvents
        filtered = filtered.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));            // Filters text
        setRenderedArray([...filtered]);                                    // Updates the renderedarray
      }
    }else{                                                                  // If PÅMELDT is not clicked filter events normally
      let filtered = events.filter(event => clickedCategory.some(category => category.category === event.category));        // Filters categories
      filtered = filtered.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));              // Filters text
      setRenderedArray([...filtered]);                                      // Updates the renderedArray
    }
  }
  
  const filterText = () => {                                              //  --- FILTERS TEXT ---
    let textFiltered = events.filter(event => event.eventname.toLowerCase().includes(filter.input.toLowerCase()));
    setRenderedArray([...textFiltered]);                                  // Converts to lowercase, filters and updates
  }

  const filterCategories = () => {                                        //  --- FILTERS CATEGORIES ---
    const clickedFound = clickedCategory.find(object => object.category === 'PÅMELDT'); // True or false if user is enrolled to some events 
    if (clickedFound) {                                                   // If the user is enrolled to events
      if(clickedCategory.length > 1){                                     // If the user has clicked at least 1 category
        let categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category));
        let concatenatedArray = [];                                       // Declares temporary array
        clickedEvents.forEach(event => {                                  // Goes through every clicked event
          let duplicateExists = categoryFiltered.some(catEvent => catEvent.eventID === event.eventID);  // Checks for duplicates
          if (!duplicateExists) { concatenatedArray.push(event) }         // Removes duplicates
        });
        concatenatedArray = categoryFiltered.concat(concatenatedArray);   // Combines categoryFiltered and concatenatedArray
        setRenderedArray([...concatenatedArray])                          // Updates renderedEvents to equal categories filtered
      }else{                                                              // If only PÅMELDT is clicked only render the events in the clickedEvents array
        const categoryFiltered = clickedEvents.filter(event => clickedCategory.some(category => event.category === event.category)); 
        setRenderedArray([...categoryFiltered])                           // if there are no enrolled events filters and updates rendered array
      }
    }else{                                                                // If the PÅMELDT category is not active
      const categoryFiltered = events.filter(event => clickedCategory.some(category => category.category === event.category)); 
      setRenderedArray([...categoryFiltered])                             // Filter categories normally and update the renderedArray
    }
  }
  
  const Filter = () => {                                                  //  --- PARENT FILTER FUNCTION ---
    if (filter.input != null) {                                           // If filter.input is not null
      if (clickedCategory.length > 0){                                    // If the user has clicked something
        if(filter.input.length > 0){  filterBoth()}                       // Filter both text and categories if the text is longer than 0
        else{setRenderedArray([...events])}                               // Update the displayed events if the text is not longer than 0
      }else{
        filterText()                                                      // If no categories are clicked only filter text
      }
    } else if (clickedCategory.length > 0) {filterCategories()}           // if the filter is null but categories are clicked only filter categories
    else{setRenderedArray([...events])}                                   // If both are null or 0 update the displayed events
  }
  
  const fetchRelevantCategories = () => {                                 //  --- FETCHES RELEVANT CATEGORIES TO FILTER ---
    if(clickedEvents.length > 0) {                                        // Adding enrolled option (PÅMELDT) filter option if > 0 enrolled events
      const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
      relevantCategories.unshift({id: '1', category: 'PÅMELDT'})          // Filters then adds PÅMELDT since no event has this attribute
      setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }else{                                                                // Sets filter options if there are no enrolled events
      const relevantCategories = category.filter(category => events.some(events => events.category === category.category)); 
      setRelevantCategories([...relevantCategories])                      // Updates categories available to filter
    }
  }

  const fetchState = async() => {                                         //  --- FETCHES CLICKED EVENTS ---
    let foundState = await AsyncStorage.getItem('clickedEvents');         // Fetches the cache
    if (foundState != null) {                                             // If cache exists
      let parsed = JSON.parse(foundState)                                 // Parses from string to objects
      setClickedEvents(parsed)                                            // Function to update the clickedEvents array
    } 
  }

  const fetchStoredEvents = async() => {                                  //  --- FETCHING STORED EVENTS IF NO WIFI ---
    let tempArray = await AsyncStorage.getItem('cachedEvents')            //  Fetches cache
    if(tempArray != null){                                                // If cache existts
      let parsed = JSON.parse(tempArray);                                 // Parses from string to objects
      setRenderedArray([...parsed]);                                      // Updates the renderedarray to equal cache
      setEvents([...parsed]);                                             // Updates the events array to equal cache
    }
  }

  useFocusEffect(                                                         //  --- FETCHES CLICKED EVENTS WHEN SCREEN IS VISIBLE ---
  React.useCallback(() => {                                               // Callback to avoid too many rerenders
    fetchState()                                                          // Function to fetch clicked events
  }, [])
);

  if (clickedEvents.length > 0) {                                         //  --- STORING FIRSTCOMING CLICKED EVENT ---
    (async() => {                                                         // IIFE
      let storedID = 0;                                                   // Variable that takes the ID of the stored event

      for (let i = 0; i < clickedEvents.length; i++) {                    // Finds the firstcoming event 
        if (CompareDates((clickedEvents)[i].startt, (clickedEvents)[storedID].startt) == true) {
          storedID = i                                                    // If the events comes before the next updates the storedID
        }
      }                                                                   // Stores the firstcoming event
      await AsyncStorage.setItem("clickedEvents", JSON.stringify(clickedEvents))            // Stores clicked events
      await AsyncStorage.setItem("firstEvent", JSON.stringify((clickedEvents)[storedID]))   // Stores firstcoming clicked events
    })();
  }else{
    (async() => { //Sets it to "" if there are no clicked events
      await AsyncStorage.setItem("firstEvent", "")
      await AsyncStorage.setItem("clickedEvents", "")
    })();
  }

  function renderArray() {                                                //  --- FETCHING EVENTS TO RENDER ---
    if (renderedArray.length == 0 ) {                                     // If there are any events to render
      if(search.status == 0){                                             // If the filter is not open
        if (events.length > 0) {                                          // If there are events in the events array
          setRenderedArray([...events])                                   // Sets the renderedArray to equal the events array
        } else {                                                          // If there are no events in the rendered array
          fetchStoredEvents();                                            //  Fetches cache if no wifi
        }
      }
    }
  }

  useEffect(() => {                                                       //  --- LOADING FILTERED DATA WHEN FILTER CHANGES ---
    if (filter.input != null || clickedCategory.length > 0) {             // If the filter is not null or there are categories clicked
      if(filter.input != null && clickedCategory.length == 0)  {          // If the filter is not null but no categories are clicked
        if (filter.input.length == 0) {                                   // If the length of the filter search text is equal 0
          filterInput(null);                                              // Resets filter input
          setClickedCategory([]);                                         // Resets clicked categories
          setRenderedArray([...events])                                   // Resets renderedArray to equal events
        }
        Filter();                                                         // Run filter function if the filter search text is not empty
      }else{
        if(filter.input != null && clickedCategory.length > 0){           // If the filter is not null and there are categories clicked
          if(filter.input.length > 0) {filterBoth();}                     // If the filter text is not empty calls filterBoth function
          else{filterCategories()}                                        // filterCategories if filter text is empty but categories are clicked
        }
        else{filterCategories()}}                                         // If the filter input is null only filter categories
    }else{
      if(filter.input != null && clickedCategory.length == 0 ) {          // If the filter is not null but no categories are clicked
        if(filter.input.length == 0) {                                    // If the filter length is 0
          setRenderedArray([...events]);                                  // Resets renderedArray
          filterInput(null);                                              // Resets filter input
          setClickedCategory([]);                                         // Resets clicked categories
        }
      }else{
        setRenderedArray([...events]);                                    // If the filter text is null reset renderedArray to equal events
      }
    }

  }, [filter, clickedCategory]);                                          //  Listens to changes in these arrays

  useEffect(() => {                                                       //  --- LOADING INITIAL DATA ---
    getData();                                                            //  Fetches API
    fetchState();                                                         //  Fetches clickedEvents
    fetchRelevantCategories();                                            //  Fetches categories available to filter
  },[])                                                                   //  Renders when the screen is loaded

  useEffect(() => {                                                       //  --- UPDATES FILTER ON EVENT CHANGE ---
    fetchRelevantCategories();                                            //  Updates relevant categories to filter
  }, [events.length, clickedEvents.length]);                              //  Listens for changes in these arrays

  useEffect(() => {                                                       //  --- FETCHES API AND UPDATES CACHE EVERY 10 SECONDS ---
    const interval = setInterval(() => {                                  // Interval to perform task
      getData();                                                          // Fetch API
      storeCache();                                                       // Update cache
    }, 10000);                                                            // Run every 10 seconds
    return () => clearInterval(interval)                                  // Clear interval when unmounted
  }, []);

  renderArray();                                                          //  --- WHICH EVENTS TO DISPLAY ---
  return(                                                                 //  --- DISPLAYS THE EVENTSCREEN ---
    <View> 
      {/* ========================= DISPLAY TOP MENU ========================= */}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
        <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuIcon} source={require('../assets/loginText.png')} />
        </TouchableOpacity>
        {login ? DynamicCircle(10,10,'red',0,0,60,0):null}
        {search.status == 0 && renderedArray.length == 0 ?
          lang ?
            <Text style={{... MS.smallTitle, left: '-25%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Arrangementer</Text>
          : 
            <Text style={{... MS.screenTitle, left: '-25%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Events</Text>
        :
          lang ?
            <Text style={{... MS.smallTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Arrangementer</Text>
          : 
            <Text style={{... MS.screenTitle, left: '-5%', color: FetchColor(theme, 'TITLETEXTCOLOR')}}>Events</Text>
        }
        
        {renderedArray != null ? 
          renderedArray.length > 0 || clickedCategory.length > 0 || filter.input != null ? 
          <TouchableOpacity onPress={() => toggleSearchBar()}>
            {search.status ? 
              <Image style={MS.searchIcon} source={require('../assets/filter-orange.png')} />
            :
              <Image style={MS.searchIcon} source={require('../assets/filter.png')} />
            }
          </TouchableOpacity>
        :null:null}

          <TouchableOpacity onPress={() => profilePage()}>
            <Image style={MS.tMenuIconWithExtra} source={require('../assets/loginperson.png')} />
          </TouchableOpacity>
      </View>

      {/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        {/* ----- RENDERS FILTER ----- */}
        {search.status ? 
          <View>
              <View style={ES.absoluteView}>
                  <TextInput 
                      ref={textInputRef}
                      style={{...ES.filterText, backgroundColor: FetchColor(theme, 'DARKER')}}
                      maxLength={40}
                      placeholder='Søk..'
                      placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                      textAlign='center'
                      onChangeText={(val) => filterInput(val)}
                  />
                  <TouchableOpacity onPress={() => filterInput(null) + setRenderedArray([...events]) + setClickedCategory([]) + textInputRef.current.clear()}>
                      <Image style={ES.filterResetIcon} source={require('../assets/reset.png')} />
                  </TouchableOpacity>
              </View>
              
              <View style={{...ES.filterView, backgroundColor: FetchColor(theme, 'DARKER')}}>
                  <FlatList
                          scrollEnabled={false}
                          showsVerticalScrollIndicator={false}
                          numColumns={3}
                          keyExtractor={(item) => item.id}
                          data={relevantCategories}
                          renderItem={({item}) => (
                              <View style={ES.categoryView}>
                                  {clickedCategory.includes(item) ?
                                      <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                                        <View>
                                        <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
                                          <View><CheckedBox/></View>
                                          <View><SmallCheck/></View>
                                        </View>
                                      </TouchableOpacity>
                                  :
                                      <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                          <Text style={{...T.filterCategoryText, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.category}</Text>
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
              data={renderedArray}
              renderItem={({item}) => (
                <View> 
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', {item: item})}>
                      <Card style={ES.eventCard}>
                        <View style={ES.eventBack}>
                          <View>
                              {CategorySquare(item.category)}
                              <Text style={{...ES.eventCardDayText, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.startt[8]}{item.startt[9]}</Text>
                              {lang ? MonthNO(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR')) : MonthEN(item.startt[5] + item.startt[6], FetchColor(theme, 'TEXTCOLOR'))}
                          </View>
                            <View style={ES.view2}>
                              <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}><Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.eventname}</Text></View>
                              <View style = {{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}><Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                            </View>
                            <View style={ES.view3}>
                              {clickedEvents.some(event => event.eventID === item.eventID) ? 
                                <TouchableOpacity onPress={() => setClickedEvents(clickedEvents.filter((x) => x.eventID !== item.eventID))}>
                                  <View style = {ES.greenLight}><GreenLight/></View>
                                  <View style = {ES.checkContent}><Check/></View>
                                </TouchableOpacity>
                              :
                                <TouchableOpacity onPress={() => setClickedEvents([...clickedEvents, item])}>
                                  <View style = {ES.greenLight}><GrayLight/></View>
                                  <View style = {ES.checkContent}><Check/></View>
                                </TouchableOpacity>
                              }
                            </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                </View>
              )}
            />
          : 
          events.length == 0 ?
            <View style={{alignSelf: 'center', maxWidth: '80%'}}>
              <View style={{height : '58%'}}/>
              <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer.</Text>
            </View>
          :
            <View>
              <View style={{height : '50%'}}/>
              <Text style={{...T.centeredOppositeColor, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>Ingen treff</Text>
            </View>
        : 
          <View style={{alignSelf: 'center', maxWidth: '80%'}}>
            <View style={{height : '58%'}}/>
            <Text style={{...T.centeredBold20, color: FetchColor(theme, 'TEXTCOLOR')}}>Sjekk nettverkstilkoblingen din og prøv igjen. Kontakt TEKKOM dersom problemet vedvarer.</Text>
          </View>
        }
      </View>    

      {/* ========================= DISPLAY BOTTOM MENU ========================= */}
        <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
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