{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { useState } from 'react';
import { Notification, Theme, Language } from '../shared/sharedComponents';
import Card from '../shared/card';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function NotificationScreen( { navigation }) {


const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}
const goBack = () => {//hoppe over til mail 
  navigation.goBack()
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>  Innstillinger</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuL} source={require('../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Lysbryter</Text>
              </View>
              <View style={GS.view2}><Theme/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Språk</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Card>

          <Text style={T.centered}>Varslinger</Text><Text/>

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
          <Image style={MS.bMenu1} source={require('../assets/menu777.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};