{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../../styles/menuStyles'
import { SS } from '../../styles/settingStyles'
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
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

export default function ContactMenuScreen({ navigation }) {
  const [setting] = useState([
    {id: '1', nav: 'ReportScreen', title: 'Varsle'},
    {id: '2', nav: 'CommitteeMenuScreen', title: 'Komité'},
    {id: '3', nav: 'BusinessScreen', title: 'Bedrift'},
    {id: '4', nav: 'SocialMediaScreen', title: 'Sosiale Media'},
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
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
               <Text style={T.credit}>Kontakt Login</Text>

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
                <Image style={SS.bugImage} source={require('../../assets/login-text.png')} />
              </View>
            </TouchableOpacity>
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
        <Image style={MS.settingsSelected} source={require('../../assets/menu-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};