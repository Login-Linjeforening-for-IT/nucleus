{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
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
import { T } from '../styles/text';

{/* ========================= APP START ========================= */}

export default function ProfileScreen({ navigation }) {
    const [setting] = useState([
        {id: '1', nav: 'NotificationScreen', title: 'Innstillinger'},
        {id: '2', nav: 'ContactMenuScreen', title: 'Kontakt Login'},
        {id: '3', nav: 'LoginScreen', title: 'Innsida (verv)'},

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
const settingsPage = () => {
    navigation.navigate('SettingScreen')
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}
const goBack = () => {
    navigation.goBack()
  }

return(
  <View>
  <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>    Profil</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson-orange.png')} />
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
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={T.centered20}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
              <View>
              <Text style={T.centered20}>Funnet en bug?</Text>
              <Image style={GS.smallImage} source={require('../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
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
