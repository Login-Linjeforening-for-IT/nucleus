import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
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

export default function CommitteeMenuScreen({ navigation }) {
    const [setting] = useState([
        {id: '1', nav: 'ContactStyretScreen', title: 'Styret'},
        {id: '2', nav: 'ContactEventKomScreen', title: 'EventKom'},
        {id: '3', nav: 'ContactTekKomScreen', title: 'TekKom'},
        {id: '4', nav: 'ContactPRScreen', title: 'PR'},
        {id: '5', nav: 'ContactCTFkomScreen', title: 'CTFkom'},
        {id: '6', nav: 'ContactSATkomScreen', title: 'SATkom'},
      ])

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
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}> Velg Komité</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
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
                <Image style={GS.smallImage} source={require('../../assets/login-text.png')} />
              </View>
            </TouchableOpacity>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/menu-orange.png')} />
      </TouchableOpacity>
    </View>     
  </View>
    
  )
};