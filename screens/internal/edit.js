{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../../styles/menuStyles'
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
import { Internal } from '../../styles/internalStyles'
import { useState } from 'react';
import Card from '../../shared/card';


import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function EditScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nav: 'EventScreen', title: 'Events'},
      {id: '2', nav: 'HomeScreen', title: 'HomeScreen'},
      {id: '3', nav: 'AboutScreen', title: 'AboutScreen'},
      {id: '4', nav: 'SettingScreen', title: 'SettingScreen'},
      {id: '5', nav: 'InternalScreen', title: 'InternalScreen'},
      {id: '6', nav: 'BusinessScreen', title: 'BusinessScreen'},
      {id: '7', nav: 'NotificationScreen', title: 'NotificationScreen'},
      {id: '8', nav: 'ContactScreeen', title: 'ContactScreeen'},
      {id: '9', nav: 'TodoScreen', title: 'Gjøremål'},
      {id: '10', nav: 'MakeNotificationScreen', title: 'MakeNotificationScreen'},
      {id: '11', nav: 'LoginScreen', title: 'LoginScreen'},
  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const ProfilePage = () => {
  navigation.navigate('ProfileScreen')
}
const goBack = () => {
  navigation.goBack()
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
      <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>     Change</Text>

        <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../../assets/loginperson-orange.png')} />
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
              <Card style={Internal.creditCard}>
                <Text style={Internal.text}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuWhenNoTop}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={MS.settingsSelected} source={require('../../assets/menu777.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
