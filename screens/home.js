{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../styles/menuStyles'
import { SS } from '../styles/settingStyles'
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
      {id: '1', nav: 'EventScreen', title: 'Arbeid pågår', content: 'Viktig informasjon / random innlegg', info: ' Feed:'},
    ])
    const [abc] = useState({id: '1', nav: 'Arbeid pågår', title: 'Events man har meldt seg på', content: 'Events man har meldt seg på', info: ' Neste event:'})
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
const ProfilePage = () => {
  navigation.navigate('ProfileScreen')
}
const settingsPage = () => {
  navigation.navigate('SettingScreen');
}

return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView>
          <Card>
            <Text style={T.red}>{abc.title}</Text>
            <Text style={SS.text}>{abc.info}</Text>
            <Text style={SS.text}>{abc.content}</Text>
          </Card>

          <FlatList
          showsVerticalScrollIndicator={''}
          numColumns={1}
          keyExtractor={(setting) => setting.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={T.red}>{item.title}</Text>
                <Text style={SS.text}>{item.info}</Text>
                <Text style={SS.text}>{item.content}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuWhenNoTop}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../assets/house-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.settingsSelected} source={require('../assets/menu777.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};

