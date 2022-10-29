{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import TopMenu from '../shared/topmenu';
import Card from '../shared/card';
import { T } from '../styles/text';
import { SS } from '../styles/settingStyles';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  TextInput
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
          
            <Text style={T.centered}>Internal</Text>
            <Text/><Text/>
            <Text style={T.centered}>Login</Text>
            <Text/><Text/>

              <View>
                <TextInput 
                style={GS.inputText}
                placeholder='username'
                placeholderTextColor={'#555'}
                textAlign='center'
                onChangeText={(val) => setName(val)}
                />
              </View>
            <Text/><Text style={T.centered15}>{name}</Text><Text/>
            <View>
                <TextInput 
                style={GS.inputText}
                placeholder='password'
                placeholderTextColor={'#555'}
                textAlign='center'
                onChangeText={(val) => setPass(val)}
                />
                <Text/>
                <Text style={T.centered15}>{pass}</Text>
              </View>
              

              <View style={SS.makeNotificationImage}>
                  <Image style={GS.creditImage} source={require('../assets/login-text.png')} />
                </View>
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