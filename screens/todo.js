import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { useState } from 'react';
import Card from '../shared/card';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

{/* ========================= APP START ========================= */}

export default function TodoScreen({ navigation }) {
    const [setting] = useState([
      {id: '0', todo: 'Fix logo placement'},
      {id: '1', todo: 'Add safe area view'},
      {id: '2', todo: 'Render everything based on screen size so no buttons are unclickable'},
      {id: '3', todo: 'Create mini logos'},
      {id: '4', todo: 'Logos for each comitee'},
      {id: '5', todo: 'Make top menu background invisible'},
      {id: '6', todo: 'Build content drafts for each site (copy from web)'},
      {id: '7', todo: 'Fix line breaking event text'},
      {id: '8', todo: 'Implement push notifications'},
      {id: '9', todo: 'Build all the pages in settings'},
      {id: '10', todo: 'Page to find our other social media'},
      {id: '11', todo: 'Fit to all screen sizes'},
  ])
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const goBack = () => {
  navigation.goBack()
}
  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
      <View style={MS.topMenu}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.creditContent}>
          <FlatList showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
              <Card>
                <Text style={T.h6}>{item.id}. {item.todo}</Text>
              </Card>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity>
          <Image style={MS.settingsSelected} source={require('../assets/settings-orange.png')} />
        
      </View>     
    </View>
    
  )
};