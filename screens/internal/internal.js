{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../../styles/menuStyles'
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
import React, { useState } from 'react';
import Card from '../../shared/sharedComponents';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import FetchColor from '../../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function InternalScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '0', nav: 'TodoScreen', titleNO: 'Gjøremål', titleEN: 'Todo'},
    {id: '1', nav: 'MakeNotificationScreen', titleNO: 'Send Varsling', titleEN: 'Send notification'},
  ])

  const eventPage   = () => { navigation.navigate('EventScreen'  ) }
  const homePage    = () => { navigation.navigate('HomeScreen'   ) }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const ProfilePage = () => { navigation.navigate('ProfileScreen') }
  const aboutPage   = () => { navigation.navigate('AboutScreen'  ) }

  return(
    <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
          <TouchableOpacity onPress={() => aboutPage()}>
            <Image style={MS.tMenuIcon} source={require('../../assets/loginText.png')} />
          </TouchableOpacity>

          {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

          <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innsida' : 'Intranet'}</Text>
          
            <TouchableOpacity onPress={() => ProfilePage()}>
              <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
            </TouchableOpacity>
        </View>

{/* ========================= DISPLAY CONTENT ========================= */}
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList
          showsVerticalScrollIndicator={''}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => listingPage()}>
        <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
