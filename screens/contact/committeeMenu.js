import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import React, { useState } from 'react';
import Card, { Space, AllComitees, Line } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function CommitteeMenuScreen({ navigation }) {

  const eventPage   = () => { navigation.navigate('EventScreen')       }
  const homePage    = () => { navigation.navigate('HomeScreen')        }
  const listingPage = () => { navigation.navigate('ListingScreen')     }
  const profilePage = () => { navigation.navigate('ProfileScreen')     }
  const goBack      = () => { navigation.navigate('ContactMenuScreen') }

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>     Komité</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={GS.content}>
    <ScrollView>
      <View>
        <Card>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:kontakt@login.no')}>
              <View>
              <View style={GS.row}>
              <Text>{Line(60,5)}</Text>
              <View>
              <Text style={T.boldWithLine}>Trykk på flyet for henvendelser angående app, nettside, eller som ikke skal til en konkret komite.</Text>
              </View>
            </View>
            {Space(10)}
                <Image style={GS.image200} source={require('../../assets/plane-orange.png')} />
              </View>
            </TouchableOpacity>
          <AllComitees/>
        </Card>
        {Space(10)}
      </View>
    </ScrollView>
  </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenu}>
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