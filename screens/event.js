{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../shared/card';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { ES } from '../styles/eventStyles';
import { Month } from '../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function EventScreen({ navigation }) {
{/* ========================= DISPLAY APP START ========================= */}
const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const topMenuPage = () => {
  navigation.navigate('TopMenuScreen');
}

const [usersData,setUsersData]=useState([])

const getData=()=>{
  fetch('https://api.login.no/events')
  .then(response=>response.json())
  .then(data=>setUsersData(data));
}


useEffect(() => {
getData();
},[])

  return(
    <View style={MS.top}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
      <View style={MS.top}>
      <TouchableOpacity onPress={() => aboutPage()}>
          <Image style={MS.tMenuL} source={require('../assets/login-text.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => topMenuPage()}>
          <Image style={MS.tMenuR} source={require('../assets/telegram777.png')} />
        </TouchableOpacity>
      </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
          <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.eventID}
          data={usersData}
          renderItem={({item}) => (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', item)}>
                    <Card>
                    <View style={ES.eventthing}>
                      <View style = {ES.day}>
                        <Text style={ES.dayText}>{item.startt[8]}{item.startt[9]}</Text>
                        <Text style={ES.monthText}>{item.startt[5]}{item.startt[6]}</Text>
                        </View>
                      <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                      <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                      <View><Text style={ES.image}>{item.IMAGENOTRENDERED}</Text></View>
                    </View>
                      
                    </Card>
                  </TouchableOpacity>
                </View>
          )}
          />
          
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
          <Image style={MS.bMenu2selected} source={require('../assets/menu-orange.png')} />
        <TouchableOpacity onPress={() => settingsPage()}>
          <Image style={MS.bMenu1} source={require('../assets/settings777.png')} />
        </TouchableOpacity>
      </View>     
    </View>
    
  )
};