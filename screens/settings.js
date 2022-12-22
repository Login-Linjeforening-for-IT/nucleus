{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import Card, { Notification, Language, Space } from '../shared/sharedComponents';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import Theme from '../styles/themes/theme';
import { T } from '../styles/text';
import React from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SettingScreen( { navigation }) {

  const { theme } = useSelector( (state) => state.theme ) 
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )

  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const homePage    = () => { navigation.navigate('HomeScreen')    }
  const profilePage = () => { navigation.navigate('ProfileScreen') }
  const goBack      = () => { navigation.navigate('ProfileScreen') }

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={MS.screenTitle}>{lang ? 'Innstillinger' : 'Settings'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}> {lang ? 'Tema           ' + 'midlertidig: ' + theme : 'Theme           ' + 'temporary: ' + theme }</Text>
              </View>
              <View style={GS.view2}><Theme/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>{lang ? 'Språk' : 'Language'}</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Card>

          {Space(5)}
          <Text style={T.centeredOppositeColor}>{lang ? 'Varslinger' : 'Notifications'}</Text>              
          

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>{lang ? 'Viktig informasjon' : 'Important info'}</Text>
              </View>
              <View style={GS.view2}>{Notification(0)}</View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>{lang ? 'Påminnelser': 'Reminders'}</Text>
              </View>
              <View style={GS.view2}>{Notification(1)}</View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>{lang ? 'Arrangementer' : 'Events'}</Text>
              </View>
              <View style={GS.view2}>{Notification(2)}</View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>{lang ? 'Bedpres': 'Company Presentation'}</Text>
              </View>
              <View style={GS.view2}>{Notification(4)}</View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>TekKom</Text>
              </View>
              <View style={GS.view2}>{Notification(5)}</View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>CTF</Text>
              </View>
              <View style={GS.view2}>{Notification(6)}</View>
            </View>
          </Card>

        </ScrollView>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenu}>
        <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
          <Image style={MS.bMenuIcon} source={require('../assets/calendar777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => listingPage()}>
          <Image style={MS.bMenuIcon} source={require('../assets/business.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};