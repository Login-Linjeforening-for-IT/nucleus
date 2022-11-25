import { MS } from '../styles/menuStyles';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';

export default function TopMenu({navigation}) {
    const aboutPage = () => {
      navigation.navigate('AboutScreen');
    }
    const profilePage = () => {
      navigation.navigate('ProfileScreen');
    }
  return(
    <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/login-text.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>Events</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>
  )
};