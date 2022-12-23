{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../../styles/menuStyles'
import React, { useState } from 'react';
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
import Card, { Social, Space } from '../../shared/sharedComponents';
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

export default function ContactMenuScreen({ navigation }) {
  
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '1', nav: 'ReportScreen',        titleNO: 'Varsle', titleEN: 'Report'},
    {id: '2', nav: 'CommitteeMenuScreen', titleNO: 'Komité', titleEN: 'Committee'}, 
    {id: '3', nav: 'BusinessScreen',      titleNO: 'Bedrift', titleEN: 'Company'},
  ])

const eventPage   = () => { navigation.navigate('EventScreen')   }
const listingPage = () => { navigation.navigate('ListingScreen') }
const homePage    = () => { navigation.navigate('HomeScreen')    }
const profilePage = () => { navigation.navigate('ProfileScreen') }
const goBack      = () => { navigation.navigate('ProfileScreen') }

return(
  <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}
    
    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Kontakt' : 'Contact'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <View>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={''}
            numColumns={1}
            keyExtractor={(item) => item.id}
            data={setting}
            renderItem={({item}) => (
              <View>
              <TouchableOpacity onPress={() => navigation.navigate(item.nav, item)}>
                <Card><Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text></Card>
              </TouchableOpacity>
            </View>
            )}
            />
        </View>
        <View><Text>{Space(150)}</Text></View>
        <Social/>
      
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