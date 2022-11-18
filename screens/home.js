{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}

import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { useState } from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function HomeScreen({ navigation, events }) {

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

const [data, setData] = useState({
  theme: 0,
  lang: 0
}) 

const changeTheme = () => {
  setData({
    ...data,
    theme: !data.theme
  });
}

const changeLang = () => {
  setData({
    ...data,
    lang: !data.lang
  });
}

return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => changeLang()}>
        {data.lang ?
          <Text style={MS.tMenuR3}>EN</Text>
        : 
        <Text style={MS.tMenuR3}>NO</Text>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme()}>
        {data.theme ?
          <Image style={MS.tMenuR2} source={require('../assets/sun777.png')} />
        : 
          <Image style={MS.tMenuR2} source={require('../assets/moon777.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => lightSwitch()}>
        <Image style={MS.tMenuR} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}

      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={T.centered}>Homescreen</Text>
            <Text/><Text/><Text/>
            <Text style={T.centered}>Login har fått app!!!</Text>
            <Text/><Text/><Text/>
            <Text style={T.red}>Events man er påmeldt på</Text>
            <View>
            {/* {this.state.events.map((item) => { */}
            </View>
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

