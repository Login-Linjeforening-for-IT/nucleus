{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { ES } from '../styles/eventStyles';
import { T } from '../styles/text';
import Card, { Space } from '../shared/sharedComponents'
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import React from 'react';
import FetchColor from '../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SpecificArticleScreen( { route, navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )
  
  const { item } = route.params

  const listingPage = () => { navigation.navigate('ListingScreen') }
  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const homePage    = () => { navigation.navigate('HomeScreen')    }
  const profilePage = () => { navigation.navigate('ProfileScreen') }
  const goBack      = () => { navigation.goBack()                  }

  return(
    <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={{... MS.smallTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{item.title}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}>
        <View>
            <View style={GS.specificArticleView}>
            {Space(10)}
              <Image style={ES.specificEventImage} source={require('../assets/default.png')}/>
            </View>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text>
                <Text style={{...T.margin15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.content}</Text>
              </Card> 
          </View>

          {Space(20)}
          
        </ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
        <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenuIcon} source={require('../assets/house-orange.png')} />
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