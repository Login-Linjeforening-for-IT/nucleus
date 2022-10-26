import { StatusBar } from 'expo-status-bar';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { CS } from '../styles/contactStyles';
import { useState } from 'react';
import { T } from '../styles/text';
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

{/* ========================= APP START ========================= */}

export default function MakeNotificationScreen({ navigation }) {
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const goBack = () => {
    navigation.goBack()
}

  return(
    <View style={MS.top}>
      <StatusBar style="light" />
      <View style={MS.top}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback999.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={SS.content}>
              <View style={SS.bugImage}>
              <Image style={CS.image} source={require('../assets/login-text.png')} />
              </View>
              <Text style={T.centered}>Varsle</Text>
              <Text></Text>
              
              <Text style={T.centered}>notification title</Text>
              <Text style={T.centered}>notification content</Text>
              <Text style={T.centered}>push / schedule</Text>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity>
          <Image style={MS.settingsSelected} source={require('../assets/settings-orange.png')} />
        
      </View>     
    </View>
    
  )
};