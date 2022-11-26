{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import { useState } from 'react';
import { T } from '../styles/text'
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SettingScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nav: 'EventScreen', title: 'Hagearbeid hos Login', content: 'A still more glorious dawn awaits cosmic fugue gathered by gravity tesseract muse about two ghostly white figures in coveralls and helmets are softly dancing. Rich in heavy atoms permanence of the stars descended from astronomers invent...'},
      {id: '2', nav: 'EventScreen', title: 'Lage nettside for zebracompany.com', content: 'The sky calls to us rogue Orions sword decipherment venture the only home weve ever known. Cambrian explosion white dwarf something incredible is waiting to be known astonishment great turbulent clouds the only home weve ever known. '},
      {id: '3', nav: 'EventScreen', title: 'Datasikkerhet hos dogs.zoo', content: 'Euclid vanquish the impossible muse about intelligent beings paroxysm of global death something incredible is waiting to be known. The carbon in our apple pies two ghostly white figures in coveralls and helmets are softly dancing realm of the spine... '},
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

return(
  <View>
  <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>Stillinger</Text>

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
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('SpecificJobScreen', item)}>
              <Card>
                <Text style={T.centered20}>{item.title}</Text><Text/>
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
        <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={MS.bMenuIcon} source={require('../assets/business-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
