{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import TopMenu from '../shared/topmenu';
import Card from '../shared/card';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useState } from 'react';

{/* ========================= APP START ========================= */}

  export default function InternalScren( { navigation }) {

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
const goBack = () => {
  navigation.goBack()
}

const [name, setName] = useState('username')
const [pass, setPass] = useState('password')

  return(
    <View style={MS.top}>
      <StatusBar style="light" />
      <View style={MS.top}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          
            <Text style={T.centered}>Internal</Text>
            <Text/><Text/><Text/><Text/><Text/><Text/><Text/><Text/><Text/><Text/>
            <Text style={T.centered}>Brukernavn</Text>
            <Text/>
            <Card>
              <View>
                <Text style={T.centered}>brukernavn</Text>
              </View>
            </Card>
            <Text/><Text/>
            <Text style={T.centered}>Passord</Text>
            <Text/>
            <Card>
            <View>
                <Text style={T.centered}>passord</Text>
              </View>
            </Card>
        </ScrollView>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
          <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/settings-orange.png')} />
        </TouchableOpacity>
      </View>     
    </View>
    
  )
};