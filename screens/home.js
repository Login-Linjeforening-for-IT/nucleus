{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import { T } from '../styles/text'
import { useState } from 'react';
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function HomeScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nav: 'EventScreen', title: 'Event', content: 'Førstkommende påmeldte event skal ta denne plassen. Er man ikke påmeldt på noen events forsvinner denne boksen.'},
      {id: '2', nav: 'EventScreen', title: 'Login var i Trondheim', content: 'Masse spennende inforasjon fra da Login var i Trondheim ...A still more glorious dawn awaits cosmic fugue gathered by gravity tesseract muse about two ghostly white figures in coveralls and helmets are softly dancing.'},
      {id: '3', nav: 'EventScreen', title: 'Hans på DigSec hacket Telenor!', content: 'Trykk her for å lese den spennende saken om hvordan Hans kom seg inn. The sky calls to us rogue Orions sword decipherment venture the only home weve ever known. Cambrian explosion white dwarf something incredible...'},
      {id: '4', nav: 'EventScreen', title: 'Dogs Inc. var på besøk i Gjøvik', content: 'Denne saken handler om Dogs Inc. og hva de gjorde på NTNU Gjøvik. Euclid vanquish the impossible muse about intelligent beings of global death. The carbon in our apple pies condem two ghostly white figures in coveralls and helmets to forever serve Login. '},
    ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}
const settingsPage = () => {
  navigation.navigate('SettingScreen');
}

return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>Hjem</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
          <FlatList
          showsVerticalScrollIndicator={''}
          numColumns={1}
          keyExtractor={(setting) => setting.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={T.centered20}>{item.title}</Text>
                <Text style={T.centered15}>{item.info}</Text>
                <Text style={T.centered15}>{item.content}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/house-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/business.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};

