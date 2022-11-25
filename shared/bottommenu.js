import { MS } from '../styles/menuStyles';
import { 
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';

{/* ========================= BOTTOM LEFT MENU ========================= */}

export function BottomMenuLeft( { navigation }) {

  const settingsPage = () => {
    navigation.navigate('SettingScreen')
  }
  const eventPage = () => {
    navigation.navigate('EventScreen')
  }
  const homePage = () => {
    navigation.navigate('HomeScreen')
  }
  
  return(
    <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../assets/house-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
      </TouchableOpacity>
    </View>       
  )
};

{/* ========================= BOTTOM MIDDLE MENU ========================= */}

export default function BottomMenu( { navigation }) {

  const settingsPage = () => {
    navigation.navigate('SettingScreen')
  }
  const eventPage = () => {
    navigation.navigate('EventScreen')
  }
  const homePage = () => {
    navigation.navigate('HomeScreen')
  }

  return(
    <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/calendar-orange.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/menu777.png')} />
      </TouchableOpacity>
    </View>       
  )
};

{/* ========================= BOTTOM RIGHT MENU ========================= */}

export function BottomMenuRight( { navigation }) {

  const settingsPage = () => {
    navigation.navigate('SettingScreen')
  }
  const eventPage = () => {
    navigation.navigate('EventScreen')
  }
  const homePage = () => {
    navigation.navigate('HomeScreen')
  }
  
  return(
    <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
      <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => settingsPage()}>
        <Image style={MS.bMenu1} source={require('../assets/menu-orange.png')} />
      </TouchableOpacity>
    </View>       
  )
};