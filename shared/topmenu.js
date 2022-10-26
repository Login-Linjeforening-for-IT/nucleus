import { StatusBar } from 'expo-status-bar';
import { MS } from '../styles/menuStyles';
import { 
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function TopMenu( { navigation }) {

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
      <View style={MS.top}>
      <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => topMenuPage()}>
          <Image style={MS.tMenuR} source={require('../assets/telegram-orange.png')} />
        </TouchableOpacity>
      </View>
    </View>
    
  )
};