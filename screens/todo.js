import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { CS } from '../styles/contactStyles';
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
      {id: '1', todo: 'Create mini logos'},
      {id: '2', todo: 'Logos for each comitee'},
      {id: '3', todo: 'Make top menu background invisible'},
      {id: '4', todo: 'Build content drafts for each site (copy from web)'},
      {id: '5', todo: 'Fix line breaking event text'},
      {id: '6', todo: 'Implement push notifications'},
      {id: '7', todo: 'Build all the pages in settings'},
      {id: '8', todo: 'Page to find our other social media'},
      {id: '9', todo: 'Fit to all screen sizes'},
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
    <View style={MS.top}>
      <StatusBar style="light" />
      <View style={MS.top}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback777.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={SS.specificSettingContent}>
          <FlatList showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View style={CS.contactCard}>
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