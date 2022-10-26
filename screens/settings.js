{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { useState } from 'react';
import GreenLight from '../shared/sharedComponents';
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

{/* ========================= APP START ========================= */}

export default function SettingScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nav: 'InternalScreen', title: 'Internt'},
      {id: '2', nav: 'NotificationScreen', title: 'Varslinger'},
      {id: '3', nav: 'CreditScreen', title: 'Credit'},
      {id: '4', nav: 'BusinessScreen', title: 'Bedrifter'},
      {id: '5', nav: 'TodoScreen', title: 'Todo list'},
      {id: '6', nav: 'MakeNotificationScreen', title: 'Send Varsling'},
      {id: '7', nav: 'ContactScreen', title: 'Kontakt'},

  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}

  return(
    <View style={MS.top}>
      <StatusBar style="light" />

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={SS.content}>
          <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          scrollEnabled={'false'}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={SS.text}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
              <View style={SS.bug}>
              <Text style={SS.text}>Funnet en bug?</Text>
              <Image style={SS.bugImage} source={require('../assets/telegram-orange.png')} />
              </View>
            </TouchableOpacity>
            <Text style={SS.copyright}>Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372</Text>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity>
          <Image style={MS.settingsSelected} source={require('../assets/settings-orange.png')} />
        
      </View>     
    </View>
    
  )
};
