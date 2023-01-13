{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import Card, { Notification, Language, Space, ThemeSwitch } from '../../shared/sharedComponents';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text';
import FetchColor from '../../styles/fetchTheme';
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

          {Space(5)}
          <Text style={{...T.centeredOppositeColor, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varslinger' : 'Notifications'}</Text>              
          

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Viktig informasjon' : 'Important info'}</Text>
              </View>
              <View style={GS.view2}><Notification category='IMPORTANT'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Påminnelser': 'Reminders'}</Text>
              </View>
              <View style={GS.view2}><Notification category='REMINDERS'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Arrangementer ' : 'Events'}</Text>
                <Text style={{...GS.notificationText, alignSelf: 'center', fontSize: 10, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gjelder kun påminnelser atm ' : 'Currently only affects reminders '}</Text>
                </View>
                
              </View>
              <View style={GS.view2}><Notification category='EVENTS'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Bedpres ': 'Company Presentations'}</Text>
                <Text style={{...GS.notificationText, alignSelf: 'center', fontSize: 10, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gjelder kun påminnelser atm ' : 'reminders '}</Text>
                </View>
              </View>
              <View style={GS.view2}><Notification category='BEDPRES'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>TekKom </Text>
                <Text style={{...GS.notificationText, alignSelf: 'center', fontSize: 10, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gjelder kun påminnelser atm ' : 'Currently only affects reminders '}</Text>
              </View>
              </View>
              <View style={GS.view2}><Notification category='TEKKOM'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>CTF </Text>
                <Text style={{...GS.notificationText, alignSelf: 'center', fontSize: 10, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gjelder kun påminnelser atm ' : 'Currently only affects reminders '}</Text>
              </View>
              </View>
              <View style={GS.view2}><Notification category='CTF'/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Sosialt ':'Social '}</Text>
                <Text style={{...GS.notificationText, alignSelf: 'center', fontSize: 10, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gjelder kun påminnelser atm ' : 'Currently only affects reminders '}</Text>
                </View>
              </View>
              <View style={GS.view2}><Notification category='SOCIAL'/></View>
            </View>
          </Card>
            
          {Space((Dimensions.get('window').height/10)+10)}
        </ScrollView>
      </View>   

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innstillinger' : 'Settings'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/calendar777.png') : require('../../assets/calendar-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/business.png') : require('../../assets/business-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={require('../../assets/menu-orange.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};