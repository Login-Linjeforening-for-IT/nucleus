{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import TopMenu from '../shared/topmenu';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function NotificationScreen( { navigation }) {

{/* ========================= DISPLAY APP START ========================= */}

const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const goBack = () => {//hoppe over til mail 
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
<View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          
            <Text style={T.centered}>Varslinger</Text>
          
        </ScrollView>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
        <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
          <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/nsetting-orange.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};