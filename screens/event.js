{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Card from '../shared/card';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { ES } from '../styles/eventStyles';
import GreenLight, { GrayLight, Check, CheckState } from '../shared/sharedComponents';

import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}
global.eventState = false

  export default function EventScreen({ navigation }) {

  const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const aboutPage = () => {
  navigation.navigate('AboutScreen');
}
const lightSwitch = () => {
  //navigation.navigate('lightSwitch');
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

const [data, setData] = useState({
  events: [
    {}
  ],
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

const activeEvent = (item) => {
  setData({
    ...data

  })
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
          <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.eventID}
          data={usersData}
          renderItem={({item}) => (
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('SpecificEventScreen', item)}>
                    <Card style={ES.eventCard}>
                      <View style={ES.eventBack}>
                        <View style={ES.view}>
                          <Text style={ES.dayText}>{item.startt[8]}{item.startt[9]}</Text>
                          <Text style={ES.monthText}>{item.startt[5]}{item.startt[6]}</Text>
                        </View>
                        <View style={ES.view2}>
                          <View style = {ES.title}><Text style={ES.title}>{item.eventname}</Text></View>
                          <View style = {ES.loc}><Text style={ES.loc}>{item.startt[11]}{item.startt[12]}:{item.startt[14]}{item.startt[15]} {item.roomno}. {item.campus}</Text></View>
                          {/* <View><Text style={ES.image}>{item.IMAGENOTRENDERED}</Text></View> */}
                        </View>
                        <View style={ES.view3}>
                          <TouchableOpacity onPress={() => activeEvent(item)}>
                          <View style = {ES.greenLight}><GrayLight/></View>
                          <View style = {ES.checkContent}><Check/></View>
                          </TouchableOpacity>
                        </View>
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
            <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={MS.eventSelected} source={require('../assets/calendar-orange.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};