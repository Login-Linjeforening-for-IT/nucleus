import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MS } from '../styles/menuStyles';

{/* ========================= APP START ========================= */}

export default function BottomMenu({ navigation }) {
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const listingPage = () => {
navigation.navigate('ListingScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
return(
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
  )
};