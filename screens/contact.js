import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { T } from '../styles/text';
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

export default function ContactScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nick: 'Eirik', sur: 'Hanasand', mail: 'eirimhan@stud.ntnu.no', phone: '95996971'},
      {id: '2', nick: '', sur: '', mail: '', phone: ''},
      {id: '3', nick: '', sur: '', mail: '', phone: ''},
      {id: '4', nick: '', sur: '', mail: '', phone: ''},
      {id: '5', nick: '', sur: '', mail: '', phone: ''},
  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const settingPage = () => {
  navigation.navigate('SettingScreen');
}
const goBack = () => {
    navigation.goBack()
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
      <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.creditContent}>
        <Text style={T.credit}>Kontakt</Text>
          <FlatList
          scrollEnabled={'false'}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
              <Card>
                <Text style={SS.creditText}>{item.nick} {item.sur}</Text>
                <Text style={SS.creditText}>{item.mail}</Text>

              </Card>
          </View>
          )}
          />
              <View>
              <Image style={GS.creditImage} source={require('../assets/login-text.png')} />
              </View>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingPage()}>
        <Image style={MS.bMenu1} source={require('../assets/menu-orange.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};