{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import React, { useState, useEffect } from 'react';
import { T } from '../styles/text'
import Card from '../shared/sharedComponents';
import { useSelector } from 'react-redux';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import FetchColor from '../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function ListingScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '1', title: 'Hagearbeid hos Login', content: 'A still more glorious dawn awaits cosmic fugue gathered by gravity tesseract muse about two ghostly white figures in coveralls and helmets are softly dancing. Rich in heavy atoms permanence of the stars descended from astronomers invent...'},
    {id: '2', title: 'Lage nettside for Zebra Company', content: 'The sky calls to us rogue Orions sword decipherment venture the only home weve ever known. Cambrian explosion white dwarf something incredible is waiting to be known astonishment great turbulent clouds the only home weve ever known. '},
    {id: '3', title: 'Datasikkerhet hos Dogs Inc.', content: 'Euclid vanquish the impossible muse about intelligent beings paroxysm of global death something incredible is waiting to be known. The carbon in our apple pies two ghostly white figures in coveralls and helmets are softly dancing realm of the spine... '},
  ])

const eventPage   = () => { navigation.navigate('EventScreen')   }
const homePage    = () => { navigation.navigate('HomeScreen')    }
const aboutPage   = () => { navigation.navigate('AboutScreen')   }
const profilePage = () => { navigation.navigate('ProfileScreen') }

// useEffect(() => { //Fetches the API every 10 seconds
//   const interval = setInterval(() => {
//     //getData();
//   }, 10000);
//   return () => clearInterval(interval);
// }, []);

return(
  <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/loginText.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Stillinger' : 'Vacancies'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList
          showsVerticalScrollIndicator={''}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('SpecificListingScreen', {item: item})}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.title}</Text><Text/>
                <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.content}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
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
