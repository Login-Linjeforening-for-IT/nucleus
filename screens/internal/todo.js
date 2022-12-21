import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import React, { useState } from 'react';
import Card from '../../shared/sharedComponents';
import { T } from '../../styles/text';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  FlatList
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function TodoScreen({ navigation }) {
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
function homePage()    { navigation.navigate('HomeScreen')     }
function listingPage() { navigation.navigate('ListingScreen')  }
function profilePage() { navigation.navigate('ProfileScreen')  }
function goBack()      { navigation.navigate('InternalScreen') }

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>    Gjøremål</Text>
    
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
          <FlatList showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
              <Card>
                <Text style={T.text15}>{item.id}. {item.todo}</Text>
              </Card>
          </View>
          )}
          />
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