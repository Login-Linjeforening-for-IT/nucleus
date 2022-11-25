import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { SS } from '../../styles/settingStyles';
import { T } from '../../styles/text';
import { useState } from 'react';
import Card from '../../shared/card';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

{/* ========================= APP START ========================= */}

export default function ContactPRScreen({ navigation }) {
    const [setting] = useState([
      {id: '1', nav: '', nick: '', sur: '', mail: '', phone: ''},
      {id: '2', nav: '', nick: '', sur: '', mail: '', phone: ''},
      {id: '3', nav: '', nick: '', sur: '', mail: '', phone: ''},
      {id: '4', nav: '', nick: '', sur: '', mail: '', phone: ''},
      {id: '5', nav: '', nick: '', sur: '', mail: '', phone: ''},
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
const profilePage = () => {
  navigation.navigate('ProfileScreen');
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

    <Text style={MS.screenTitle}>      PRkom</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
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
              <Card style={SS.creditCard}>
              <Text style={SS.creditText}>{item.nick} {item.sur}</Text>
                <Text style={SS.creditText}>{item.mail}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ContactScreen')}>
              <View style={SS.bug}>
                <Image style={SS.bugImage} source={require('../../assets/login-text.png')} />
              </View>
            </TouchableOpacity>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingPage()}>
        <Image style={MS.bMenu1} source={require('../../assets/menu-orange.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};