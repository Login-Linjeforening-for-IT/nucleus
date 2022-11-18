{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
import { SS } from '../styles/settingStyles'
import { GS } from '../styles/globalStyles'
import { useState } from 'react';
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
      {id: '1', nav: 'NotificationScreen', title: 'Varslinger'},
      {id: '2', nav: 'BusinessScreen', title: 'Bedrifter'},
      {id: '3', nav: 'ContactScreen', title: 'Kontakt'},
      {id: '4', nav: 'LoginScreen', title: 'Innsida'},

  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
      <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => lightSwitch()}>
          <Image style={MS.tMenuR} source={require('../assets/loginperson777.png')} />
        </TouchableOpacity>
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
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card style={SS.creditCard}>
                <Text style={SS.text}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
              <View style={SS.bug}>
              <Text style={SS.text}>Funnet en bug?</Text>
              <Image style={SS.bugImage} source={require('../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuWhenNoTop}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={MS.settingsSelected} source={require('../assets/menu-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
