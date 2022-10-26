{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function HomeScreen({ navigation }) {

{/* ========================= DISPLAY APP START ========================= */}
const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const topMenuPage = () => {
  navigation.navigate('TopMenuScreen');
}
  return(
    <View style={MS.top}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={MS.top}>
      <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => topMenuPage()}>
          <Image style={MS.tMenuR} source={require('../assets/telegram777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={GS.centeredText}>Homescreen</Text>
            <Text/><Text/><Text/>
            <Text style={GS.centeredText}>Login har fått app!!!</Text>
            <Text/><Text/><Text/>
            <Text style={GS.red}>Events man er påmeldt på</Text>

          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity >
        <Image style={MS.homeSelected} source={require('../assets/home-orange.png')} />
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/settings777.png')} />
        </TouchableOpacity>
      </View>     
    </View>
    
  )
};

