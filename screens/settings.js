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
    <View style={MS.backGround}>
      <StatusBar style="light" />

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.contentWhenNoTop}>
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
            <Text style={SS.copyright}>Opphavsrett © 2022 Login - Linjeforeningen for IT, NO 811 940 372</Text>
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
        <Image style={MS.settingsSelected} source={require('../assets/nsetting-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
