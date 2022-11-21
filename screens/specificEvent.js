{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SpecificEventScreen( { navigation }) {

  const settingsPage = () => {
    navigation.navigate('SettingScreen');
  }
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
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View>

            <Text style={T.red}>Event nummer:</Text>
            <Text style={T.centered}>{navigation.getParam('eventID')}</Text>

            <Text style={T.red}>Organisert av:</Text>
            <Text style={T.centered}>{navigation.getParam('organizer')}</Text>

            <Text style={T.red}>Event navn:</Text>
            <Text style={T.centered}>{navigation.getParam('eventname')}</Text>

            <Text style={T.red}>Dato</Text>
            <Text style={T.centered}>
              {navigation.getParam('startt')[8]}
              {navigation.getParam('startt')[9]}.
              {navigation.getParam('startt')[5]}
              {navigation.getParam('startt')[6]}.
              {navigation.getParam('startt')[2]}
              {navigation.getParam('startt')[3]}
            </Text>

            <Text style={T.red}>Tidspunkt</Text>
            <Text style={T.centered}>
              {navigation.getParam('startt')[11]}
              {navigation.getParam('startt')[12]}:
              {navigation.getParam('startt')[14]}
              {navigation.getParam('startt')[15]}
            </Text>

            <Text style={T.red}>Kategori</Text>
            <Text style={T.centered}>{navigation.getParam('category')}</Text>
            
            <Text style={T.red}>Sted</Text>
            <Text style={T.centered}>
            {navigation.getParam('roomno')}, {navigation.getParam('campus')}
            </Text>

            {/* MORE LOGIC NEEDED HERE */}
            
            {/* <Text style={T.red}>Beskrivelse</Text>
            <Text style={T.centered}>
            {navigation.getParam('roomno')}, {navigation.getParam('description')}
            </Text> */}
        </View>
          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
        <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.eventSelected} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};