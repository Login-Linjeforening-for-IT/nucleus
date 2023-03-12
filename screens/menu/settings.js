{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import topicSwitchList from '../../shared/notificationComponents/topicSwitchList';
import DynamicCircle from '../../shared/eventComponents/dynamicCircle';
import Notification from '../../shared/functions/notification';
import ThemeSwitch from '../../shared/functions/themeSwitch';
import Language from '../../shared/functions/language';
import Space from '../../shared/functions/space';
import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import Card from '../../shared/functions/card';
import { MS } from '../../styles/menuStyles';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text';
import { BlurView } from 'expo-blur';
import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SettingScreen( { navigation }) {

  const { theme } = useSelector( (state) => state.theme ) 
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )

  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const menuPage    = () => { navigation.navigate('MenuScreen')    }              // Function to navigate to menu

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/9)}
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}> {lang ? 'Tema' : 'Theme' }</Text>
              </View>
              <View style={GS.view2}><ThemeSwitch/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Språk' : 'Language'}</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Card>

          {Space(15)}
          <Text style={{...T.text30, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varslinger' : 'Notifications'}</Text>              

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Viktig informasjon' : 'Important info'}</Text>
              </View>
              <View style={GS.view2}><Notification category='IMPORTANT'/></View>
            </View>
          </Card>

          {Space(10)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Nye arrangementer' : 'New events'}</Text>              

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Bedpres': 'Company Presentations'}</Text>
              </View>
              <Notification category='BEDPRES'/>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>TekKom</Text>
              </View>
              <Notification category='TEKKOM'/>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>CTF</Text>
              </View>
              <Notification category='CTF'/>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Sosialt': 'Social'}</Text>
              </View>
              <Notification category='SOCIAL'/>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Karrieredag':'Career day'}</Text>
              </View>
              <Notification category='KARRIEREDAG'/>
            </View>
          </Card>
          
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>Fadderuka</Text>
              </View>
              <Notification category='FADDERUKA'/>
            </View>
          </Card>


          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>Login</Text>
              </View>
              <Notification category='LOGIN'/>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Annet":"Other"}</Text>
              </View>
              <Notification category='ANNET'/>
            </View>
          </Card>

          {Space(15)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Påminnelser' : 'Reminders'}</Text>              

          {topicSwitchList("tekkom", "TekKom")}
          {topicSwitchList("ctf", "CTF")}
          {lang ? topicSwitchList("social", "Sosialt", 1):topicSwitchList("social", "Social", 1)}
          {lang ? topicSwitchList("karrieredag", "Karrieredag", 1):topicSwitchList("karrieredag", "Career day", 1)}
          {topicSwitchList("fadderuka", "Fadderuka", 1)}
          {topicSwitchList("bedpres", "Bedpres", 1)}
          {topicSwitchList("login", "Login", 1)}
          {lang ? topicSwitchList("annet", "Annet", 1):topicSwitchList("annet", "Other", 1)} 
            
          {Space((Dimensions.get('window').height/3)+10)}
        </ScrollView>
      </View>   

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innstillinger' : 'Settings'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};