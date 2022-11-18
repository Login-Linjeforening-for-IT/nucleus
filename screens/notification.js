{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import TopMenu from '../shared/topmenu';
import { useEffect, useState } from 'react';
import { Notification } from '../shared/sharedComponents';
import Card from '../shared/card';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';

{/* ========================= APP START ========================= */}

  export default function NotificationScreen( { navigation }) {

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
const goBack = () => {//hoppe over til mail 
  navigation.goBack()
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
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => changeLang()}>
        {data.lang ?
          <Text style={MS.tMenu2R3}>EN</Text>
        : 
        <Text style={MS.tMenu2R3}>NO</Text>
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeTheme()}>
        {data.theme ?
          <Image style={MS.tMenu2R2} source={require('../assets/sun777.png')} />
        : 
          <Image style={MS.tMenu2R2} source={require('../assets/moon777.png')} />
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => lightSwitch()}>
        <Image style={MS.tMenu2R} source={require('../assets/loginperson777.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={T.centered}>Varslinger</Text>
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Viktig informasjon</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Events</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Bedpres</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Påminnelser</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>
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
          <Image style={MS.bMenu1} source={require('../assets/menu-orange.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};