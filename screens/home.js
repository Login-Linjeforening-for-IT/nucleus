{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import { T } from '../styles/text'
import React, { useState, useEffect } from 'react';
import Card from '../shared/sharedComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ES } from '../styles/eventStyles';
import GreenLight, { Month, Check } from '../shared/eventComponents/otherComponents';
import CategorySquare from '../shared/eventComponents/categorySquare';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

{/* ========================= APP START ========================= */}

export default function HomeScreen({ navigation }) {
    const [setting] = useState([
      {id: '0', title: 'Login var i Trondheim', content: 'Masse spennende inforasjon fra da Login var i Trondheim ...A still more glorious dawn awaits cosmic fugue gathered by gravity tesseract muse about two ghostly white figures in coveralls and helmets are softly dancing.'},
      {id: '1', title: 'Hans på DigSec hacket Dogs Inc!', content: 'Trykk her for å lese den spennende saken om hvordan Hans kom seg inn. The sky calls to us rogue Orions sword decipherment venture the only home weve ever known. Cambrian explosion white dwarf something incredible...'},
      {id: '2', title: 'Dogs Inc. var på besøk i Gjøvik', content: 'Denne saken handler om Dogs Inc. og hva de gjorde på NTNU Gjøvik. Euclid vanquish the impossible muse about intelligent beings of global death. The carbon in our apple pies condem two ghostly white figures in coveralls and helmets to forever serve Login. '},
    ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const listingPage = () => {
  navigation.navigate('ListingScreen');
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}

const reset = () => {
  (async() => {
    await AsyncStorage.setItem("event", "")
  })();
}
const [storedEvent, getEvent] = useState(null);

useEffect(() => {
(async () => {
let foundEvent = await AsyncStorage.getItem("event");
getEvent(foundEvent);
})();

}, []);

const event = storedEvent ? JSON.parse(storedEvent) : null;

return(
    <View>

      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>Hjem</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView>
        {event != null ? (
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', event)}>
                    <Card style={ES.eventCard}>
                      <View style={ES.eventBack}>
                        <View>
                            {CategorySquare(event.category)}
                            <Text style={ES.eventCardDayText}>{event.startt[8]}{event.startt[9]}</Text>
                            {Month(event.startt[5] + event.startt[6])}
                        </View>
                          <View style={ES.view2}>
                          
                            <View style = {ES.title}><Text style={ES.title}>{event.eventname}</Text></View>
                            <View style = {ES.loc}><Text style={ES.loc}>{event.startt[11]}{event.startt[12]}:{event.startt[14]}{event.startt[15]} {event.roomno}. {event.campus}</Text></View>
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
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificArticleScreen', item)}>
                    <Card>
                      <Text style={T.centered20}>{article.title}</Text>
                      <Text style={T.centered15}>{article.info}</Text>
                      <Text style={T.centered15}>{article.content}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
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

