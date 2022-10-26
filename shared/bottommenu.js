import { StatusBar } from 'expo-status-bar';
import { MS } from '../styles/menu';
import { 
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function bottomMenu( { navigation }) {

{/* ========================= DISPLAY APP START ========================= */}
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
    <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home-orange.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu-orange.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/settings-orange.png')} />
        </TouchableOpacity>
      </View>   
    </View>
    
  )
};