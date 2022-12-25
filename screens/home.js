{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'                               // Status bar
import { MS } from '../styles/menuStyles'                                 // Menu styles
import { GS } from '../styles/globalStyles'                               // Global styles
import { T } from '../styles/text'                                        // Text styles
import React, { useState } from 'react';                                  // React
import Card, { Space } from '../shared/sharedComponents';                 // Various self made components
import AsyncStorage from '@react-native-async-storage/async-storage';     // AsyncStorage
import { HomeIcon } from '../shared/sharedComponents';                    // Home icon SVG (not used atm)
import { ES } from '../styles/eventStyles';                               // Eventstyles
import GreenLight, { MonthNO, MonthEN, Check, DynamicCircle } from '../shared/eventComponents/otherComponents'; // Event related self made components
import { useFocusEffect } from '@react-navigation/native';                // useFocusEffect (perform a task when the screen is visible)
import CategorySquare from '../shared/eventComponents/categorySquare';    // Categorysquare for events
import { useSelector } from 'react-redux';                                // Redux
import FetchColor from '../styles/fetchTheme';                            // Fetch theme color from Redux
import {      
  Text,                                                                   // Text component
  View,                                                                   // View component
  Image,                                                                  // Image component  
  TouchableOpacity,                                                       // TouchableOpacity (custom button)
  ScrollView,                                                             // Scrollable view
} from 'react-native';                                                    // React Native

export default function HomeScreen({ navigation }) {                      // Declares screen export "HomeScreen"

  const { lang  } = useSelector( (state) => state.lang  )                 // Language state
  const { login } = useSelector( (state) => state.login )                 // Loginstatus
  const { theme } = useSelector( (state) => state.theme )                 // Theme state
  
  const [setting] = useState([                                            // Temporary feed
    {id: '0', titleNO: 'Login var i Trondheim', titleEN: 'Login was in Trondheim', introduction: 'Representanter fra Login reiste til NTNU i Trondheim for å lære om hvordan universitetet drives. De besøkte ulike fakulteter, fikk en omvisning av campus og lærte om NTNUs forskning og samarbeid med næringslivet. De gleder seg til å ta med seg alt de har lært tilbake til sin egen linjeforening.', content: 'På NTNU ble representantene fra Login møtt av en dyktig omviser som viste dem rundt på campus. De fikk se ulike fakulteter og lære om hvordan NTNU drives. De fikk også høre om forskningen som blir gjort ved universitetet og hvordan NTNU samarbeider med næringslivet. \n\nRepresentantene fra Login var imponerte over alt de fikk se og høre og gleder seg til å ta med seg alt de har lært tilbake til sin egen linjeforening. Etter omvisningen fikk representantene fra Login muligheten til å stille spørsmål og lære mer om NTNUs virksomhet. De fikk høre om ulike studieprogrammer og hvordan NTNU jobber med å tilpasse seg de nyeste teknologiske fremskrittene. De fikk også høre om NTNUs samarbeid med næringslivet og hvordan de får mulighet til å jobbe med virkelige casestudier og prosjekter. \n\nRepresentantene fra Login var meget takknemlige for muligheten til å besøke NTNU og lære om hvordan universitetet drives. De følte at de hadde fått et unikt innblikk i hvordan NTNU jobber med å utdanne fremtidens ingeniører og ledere. De gleder seg til å ta med seg alt de har lært tilbake til sin egen linjeforening og håper at de kan bidra til å styrke samarbeidet mellom Login og NTNU i fremtiden.'},
    {id: '1', titleNO: 'Hans på DigSec hacket Dogs Inc!', titleEN: 'Hans from DigSec hacked Dogs Inc.', introduction: 'Med en rekke verktøy og teknikker i sin arsenal, var Hans i stand til å bryte seg inn i Dogs Inc. interne systemer og få tilgang til sensitive data. Les videre for å høre mer om den ambisiøse angrepsstrategien som ble brukt.', content: 'Hans hadde alltid vært interessert i dataveiledning, og da han begynte på DigSec-studiet ved universitetet visste han at han ville få muligheten til å lære om hacking og sikkerhet på et dyptgående nivå. Han hadde vært fast bestemt på å bli en profesjonell hacker siden han var liten, og nå var tiden endelig inne for å gjøre drømmen til virkelighet. \n\nEtter å ha fullført de første årene av studiet, hadde Hans lært en rekke verktøy og teknikker som han visste ville være nyttige for ham i fremtiden. Han var spesielt begeistret for å bruke sine ferdigheter til å hacke selskaper i et lukket nettverk, slik at han kunne øve på sine ferdigheter uten å skade noen. En dag ble Hans kontaktet av det internasjonale selskapet Dogs Inc. De ønsket å øke deres digitale sikkerhet, og ba om Hans sin hjelp til å avdekke sårbarheter. \n\nHans takket ja med en gang, og begynte umiddelbart å planlegge sin angrepsstrategi. Etter å ha gjort litt undersøkelser, fant Hans ut at Dogs Inc. hadde en rekke sårbare nettverk som han kunne utnytte. Han begynte med å skanne nettverket for å finne eventuelle sårbarheter, og etter hvert som han gikk gjennom dataene hans, begynte han å se muligheter for å få tilgang til selskapets interne systemer. Hans brukte deretter en rekke verktøy og teknikker for å bryte seg inn i systemene, og etter hvert som han gikk gjennom dem, ble han mer og mer imponert over hvor sårbare de var. Han klarte til slutt å få tilgang til selskapets sensitive data, og kunne dermed bevise at han hadde hacket selskapet. \n\nEtter å ha fullført oppdraget, kontaktet Hans selskapet, og viste frem de sårbarhetene han hadde funnet. Dogs Inc. var svært takknemlige for hjelpet, og Hans sine ferdigheter ble videreformidlet til ansettelsesavdelingen, som nå har gitt Hans jobbtilbud i selskapet.'},
    {id: '2', titleNO: 'Ida var på håndballkamp', titleEN: 'Ida was at a handball game', introduction: 'Ida hadde alltid vært en stor håndballfan, så da Login Linjeforeningen for IT ble invitert til å se en håndballkamp på Gjøvik stadion, var hun den første som meldte seg på.', content: 'På kampdagen møttes de andre medlemmene av linjeforeningen på parkeringsplassen ved stadion, og Ida kjente på den gode følelsen av å være en del av en gruppe. Sammen gikk de inn på stadion og fant sine plasser i tribunen. Kampen var intens og spennende, og Ida klappet og jublet sammen med resten av publikum. Hun kunne ikke tro at hun fikk muligheten til å se sitt favorittlag spille live. \n\nEtter hvert som tiden gikk, ble kampen mer og mer jevn, og det så ut som om det kunne gå begge veier. Men til slutt var det Idas favorittlag som stakk av med seieren, og hun jublet høyt sammen med de andre supporterene. Det var en fantastisk kveld, og Ida kunne ikke vente til neste håndballkamp. Hun visste at dette var bare begynnelsen på en ny lidenskap for håndball.'},
  ])

  const eventPage   = () => { navigation.navigate('EventScreen')   }      // Function to navigate to EventScreen
  const listingPage = () => { navigation.navigate('ListingScreen') }      // Function to navigate to Job advertisements
  const aboutPage   = () => { navigation.navigate('AboutScreen')   }      // Function to navigate to About Login screen
  const profilePage = () => { navigation.navigate('ProfileScreen') }      // Function to navigate to profile

  const reset = () => {                                                   // Function to remove firstcoming event
    (async() => {                                                         // Immediately invoked function expression (IIFE)
      await AsyncStorage.setItem("firstEvent", "")                        // Empties the AsyncStorage "firstEvent" key
      let clickedEvents = await AsyncStorage.getItem('clickedEvents')     // Gets the clickedEvents
      let parsed = JSON.parse(clickedEvents)                              // Parses clickedEvents from string to objects
      parsed = parsed.filter(element => element.eventID !== event.eventID)// Filters out the removed event
      await AsyncStorage.setItem('clickedEvents', JSON.stringify(parsed)) // Stores the new array (removed the event that was unclicked)
    })();
  }
  const [storedEvent, getEvent] = useState(null);                         // Defines storedEvent array to equal null

useFocusEffect(                                                           // Updates whenever the screen is visible on the screen
  React.useCallback(() => {
    (async () => {
      let foundEvent = await AsyncStorage.getItem("firstEvent");          // Fetches the firstcoming event from storage
      getEvent(foundEvent);                                               // Updates the array to include the firstcoming event
    })();
  }, [])
);

  const event = storedEvent ? JSON.parse(storedEvent) : null;             //  Parses the firstcoming event object
    /**
     * Statusbar changed statusbar to light style if dark theme and vice verca
     * Dynamiccircle created a small red circle in the top menu if the user is logged in
     */
    
    return(
      <View>
          <StatusBar style={theme == 0 || theme == 2 || theme == 3 ? 'light' : 'dark'} /> 
          {/* ========================= DISPLAY TOP MENU ========================= */}
          <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
          <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuIcon} source={require('../assets/loginText.png')} />
          </TouchableOpacity>

          {login ? DynamicCircle(10,10,'red',0,0,60,0):null}               

          <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Hjem' : 'Home'}</Text>

          <TouchableOpacity onPress={() => profilePage()}>
            <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
          </TouchableOpacity>
          </View>

          {/* ========================= DISPLAY CONTENT ========================= */}
          <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
            <ScrollView>
            {event != null ? (
                      <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', {item: event})}>
                        <Card style={ES.eventCard}>
                          <View style={ES.eventBack}>
                            <View>
                                {CategorySquare(event.category)}
                                <Text style={{...ES.eventCardDayText, color: FetchColor(theme, 'TEXTCOLOR')}}>{event.startt[8]}{event.startt[9]}</Text>
                                {lang ? MonthEN(event.startt[5] + event.startt[6], FetchColor(theme, 'TEXTCOLOR')) : MonthNO(event.startt[5] + event.startt[6], FetchColor(theme, 'TEXTCOLOR'))}
                            </View>
                              <View style={ES.view2}>
                              
                                <View style = {{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}><Text style={{...ES.title, color: FetchColor(theme, 'TEXTCOLOR')}}>{event.eventname}</Text></View>
                                <View style = {{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}><Text style={{...ES.loc, color: FetchColor(theme, 'TEXTCOLOR')}}>{event.startt[11]}{event.startt[12]}:{event.startt[14]}{event.startt[15]} {event.roomno}. {event.campus}</Text></View>
                              </View>
                              <View style={ES.view3}>
                                  <TouchableOpacity onPress={() => reset() + getEvent(null)}>
                                    <View style = {ES.greenLight}><GreenLight/></View>
                                    <View style = {ES.checkContent}><Check/></View>
                                  </TouchableOpacity>
                              </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    ):null}
              {
                setting.map((article, index) => {
                  return(
                    <View key={index}>
                      <TouchableOpacity onPress={() => navigation.navigate('SpecificArticleScreen', {item: article})}>
                        <Card>
                          <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? article.titleNO : article.titleEN}</Text>
                          {Space(10)}
                          <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>{article.introduction}</Text>
                        </Card>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>    

          {/* ========================= DISPLAY BOTTOM MENU ========================= */}
          <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
            <TouchableOpacity>
              <Image style={MS.bMenuIcon} source={require('../assets/house-orange.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eventPage()}>
              <Image style={MS.bMenuIcon} source={require('../assets/calendar777.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => listingPage()}>
              <Image style={MS.bMenuIcon} source={require('../assets/business.png')} />
            </TouchableOpacity>
            </View>     
          </View>      
  )
};