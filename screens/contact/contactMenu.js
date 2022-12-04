{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar'
import { MS } from '../../styles/menuStyles'
import React, { useState } from 'react';
import { GS } from '../../styles/globalStyles'
import { T } from '../../styles/text'
import Card, { Social, Space } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function ContactMenuScreen({ navigation }) {
  const [setting] = useState([
    {id: '1', nav: 'ReportScreen', title: 'Varsle'},
    {id: '2', nav: 'CommitteeMenuScreen', title: 'Komité'},
    {id: '3', nav: 'BusinessScreen', title: 'Bedrift'},
  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen')
}
const listingPage = () => {
  navigation.navigate('ListingScreen')
}
const goBack = () => {
  navigation.goBack()
}

return(
  <View>
  <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
  <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>     Kontakt</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
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
                <Card><Text style={T.centered20}>{item.title}</Text></Card>
              </TouchableOpacity>
            </View>
            )}
            />
        </View>
          {Space('25%')}
            <Social/>
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