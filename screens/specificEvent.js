{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import TopMenu from '../shared/topmenu';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function SpecificEventScreen( { navigation }) {

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
const topMenuPage = () => {
  navigation.navigate('TopMenuScreen');
}
const goBack = () => {
  navigation.goBack()
}


  return(
    <View style={MS.top}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={MS.top}>
<TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => topMenuPage()}>
          <Image style={MS.tMenuR} source={require('../assets/telegram777.png')} />
        </TouchableOpacity>
      </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <View>
            <Text style={GS.centeredText}>Event nummer:</Text>
            <Text style={GS.centeredText}>{navigation.getParam('eventID')}</Text>
        </View>
          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu-orange.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/settings777.png')} />
        </TouchableOpacity>
      </View>     
    </View>
    
  )
};