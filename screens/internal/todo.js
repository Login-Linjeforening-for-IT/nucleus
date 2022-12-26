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
  Dimensions
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function TodoScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '1', todo: 'Implement mazemap - seems every library is deprecated'},
    {id: '2', todo: 'Implement mail sending service'},
    {id: '3', todo: 'Center title position'},
    {id: '4', todo: 'Bug: event storage'},
    {id: '5', todo: 'Bug: missing photo SES'},
    {id: '6', todo: 'Bug: SES eventtext'},
    {id: '7', todo: 'Theme'},
    {id: '8', todo: 'Language'},
    {id: '9', todo: 'Push notifications need to be revisited'},
    {id: '10', todo: 'Local notification event reminders'},
  ])
{/* ========================= DISPLAY APP START ========================= */}
function eventPage()   { navigation.navigate('EventScreen')    }
function listingPage() { navigation.navigate('ListingScreen')  }
function menuPage()    { navigation.navigate('MenuScreen')     }              // Function to navigate to menu
function goBack()      { navigation.navigate('InternalScreen') }

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
          <FlatList showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
              <Card>
                <Text style={{...T.text15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.id}. {item.todo}</Text>
              </Card>
          </View>
          )}
          />
          {Space(Dimensions.get('window').height/10)}
      </View>    

{/* ========================= DISPLAY TOP MENU ========================= */}
<BlurView style={MS.topMenu} intensity={30}/>
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Gjøremål' : 'Todo'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
<BlurView style={MS.bMenu} intensity={25}/>
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => menuPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/menu.png')} />
          </TouchableOpacity>
      </View>   
    </View>
    
  )
};