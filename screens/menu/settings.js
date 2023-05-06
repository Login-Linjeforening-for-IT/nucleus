{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
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
import BellChange from '../../shared/legacy/oldUI';
import Cluster from '../../shared/functions/cluster';
import Reminders from '../../shared/functions/reminders';

{/* ========================= APP START ========================= */}

export default function SettingScreen( { navigation }) {

  const { theme } = useSelector( (state) => state.theme ) 
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { oldUI }    = useSelector( (state) => state.misc )                   //  Old User Interface

  const eventPage   = () => { navigation.navigate(!oldUI ? 'EventScreen':'OldEventScreen') }
  const menuPage   = () => { navigation.navigate(!oldUI ? 'MenuScreen':'OldMenuScreen') }
  const adPage = () => { navigation.navigate('AdScreen') }

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/8.1)}
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={{...GS.view, textAlign: 'flex-end'}}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Tema' : 'Theme' }</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Endrer appens fargetema.' : 'Changes the color theme of the app.' }</Text>
              </View>
              <View style={GS.view2}><ThemeSwitch/></View>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Språk' : 'Language'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Endrer språk.' : 'Changes language.' }</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Gammel UI' : 'Old UI'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Gammelt brukergrensesnitt.' : 'Old User Interface.' }</Text>
              </View>
              <View style={GS.view2}><BellChange/></View>
            </View>
          </Cluster>

          {Space(10)}
          <Text style={{...T.text30, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varslinger' : 'Notifications'}</Text>              
          {Space(10)}

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Viktig informasjon' : 'Important info'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Motta varsel om viktig informasjon, som tid for årsmøte etc.' : 'Recieve notifications about important information, such as annual meetings.'}</Text>
              </View>
              <View style={GS.view2}><Notification category='IMPORTANT'/></View>
            </View>
          </Cluster>

          {Space(10)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Nye arrangementer' : 'New events'}</Text>              
          {Space(10)}
          
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Bedpres': 'Company Presentations'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut ny bedriftpresentasjon.' : 'Notification every time a company presentation is posted.' }</Text>
              </View>
              <Notification category='BEDPRES'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>TekKom</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut ny TekKom samling.' : 'Notification every time a TekKom gathering is posted.' }</Text>
             </View>
              <Notification category='TEKKOM'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>CTF</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut en CTF.' : 'Notification every time a CTF is posted.' }</Text>
              </View>
              <Notification category='CTF'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Sosialt': 'Social'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut et nytt EvntKom arrangement.' : 'Notification every time a EvntKom event is posted.' }</Text>
              </View>
              <Notification category='SOCIAL'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Karrieredag':'Career day'}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut en ny karrieredag.' : 'Notification every time a career day is posted.' }</Text>
              </View>
              <Notification category='KARRIEREDAG'/>
            </View>
          </Cluster>
          
          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>Fadderuka</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut et fadderuka arrangement.' : 'Notification every time a fadderuka event is posted.' }</Text>
              </View>
              <Notification category='FADDERUKA'/>
            </View>
          </Cluster>


          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>Login</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut et arrangement angående foreningens drift.' : 'Notification every time a event is posted regarding the operation of Login.' }</Text>
              </View>
              <Notification category='LOGIN'/>
            </View>
          </Cluster>

          <Cluster>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={{...GS.notificationText, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? "Annet":"Other"}</Text>
                <Text style={{...GS.notificationTip, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Varsel hver gang det legges ut et ukategorisert arrangement.' : 'Notification every time a uncategorized event is posted.' }</Text>
              </View>
              <Notification category='ANNET'/>
            </View>
            {Space(5)}
          </Cluster>

          {Space(10)}
          <Text style={{...T.text25, left: 15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? 'Påminnelser' : 'Reminders'}</Text>              
          {Space(10)}
          <Reminders/>
            
          {Space((Dimensions.get('window').height/3))}
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
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => adPage()}>
        <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
          <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
        </TouchableOpacity>      
      </View>     
    </View>
    
  )
};