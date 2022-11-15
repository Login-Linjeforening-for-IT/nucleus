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
  TouchableOpacity,
  SafeAreaView
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
const lightSwitch = () => {
  //navigation.navigate('lightSwitch');
}
  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={MS.topMenu}>
      <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => lightSwitch()}>
          <Image style={MS.tMenuR} source={require('../assets/plane777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}

      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={T.centered}>Homescreen</Text>
            <Text/><Text/><Text/>
            <Text style={T.centered}>Login har fått app!!!</Text>
            <Text/><Text/><Text/>
            <Text style={T.red}>Events man er påmeldt på</Text>

          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity>
        <Image style={MS.homeSelected} source={require('../assets/house-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};

