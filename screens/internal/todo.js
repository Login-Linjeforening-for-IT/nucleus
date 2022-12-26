import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import React, { useState } from 'react';
import Card, {Space} from '../../shared/sharedComponents';
import { T } from '../../styles/text';
import { useSelector } from 'react-redux';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import FetchColor from '../../styles/fetchTheme';
import { BlurView } from 'expo-blur';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function TodoScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '1', todo: 'Implement mazemap - seems every library is deprecated'},
    {id: '2', todo: 'Implement mail sending service'},
    {id: '3', todo: 'Bug: missing photo SES'},
    {id: '4', todo: 'Push notifications need to be revisited'},
    {id: '5', todo: 'Local notification event reminders'},
    {id: '6', todo: 'Swipable navigation'},
  ])
{/* ========================= DISPLAY APP START ========================= */}
function eventPage()   { navigation.navigate('EventScreen')    }
function listingPage() { navigation.navigate('ListingScreen')  }
function menuPage()    { navigation.navigate('MenuScreen')     }              // Function to navigate to menu
function goBack()      { navigation.navigate('InternalScreen') }

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item, index}) => (
            <View>{index == 0 ? Space(Dimensions.get('window').height/7.5): null}
              <Card>
                <Text style={{...T.text15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.id}. {item.todo}</Text>
              </Card>
          </View>
          )}
          />
          {Space(Dimensions.get('window').height/10)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Gjøremål' : 'Todo'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
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