import { MS } from '../styles/menuStyles';
import { 
  View, 
  Image, 
  TouchableOpacity
} from 'react-native';


{/* ========================= APP START ========================= */}

export default function TopMenu( { navigation }) {

  const lightSwitch = () => {
    //navigation.navigate('TopMenuScreen')
  }
  const goBack = () => {
    navigation.goBack()
  }
  return(
    <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => lightSwitch()}>
          <Image style={MS.tMenuR} source={require('../assets/plane777.png')} />
        </TouchableOpacity>
      </View>
  )
};