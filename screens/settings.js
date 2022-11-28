{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { Notification, Language } from '../shared/sharedComponents';
import Theme from '../styles/themes/theme';
import Card from '../shared/card';
import { T } from '../styles/text';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SettingScreen( { navigation }) {


const listingPage = () => {
  navigation.navigate('ListingScreen');
}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const profilePage = () => {
  navigation.navigate('ProfileScreen');
}
const goBack = () => {//hoppe over til mail 
  navigation.goBack()
}

  return(
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>  Innstillinger</Text>

    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Lysbryter</Text>
              </View>
              <View style={GS.view2}><Theme/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Språk</Text>
              </View>
              <View style={GS.langView}><Language/></View>
            </View>
          </Card>

          <Text style={T.centeredOppositeColor}>Varslinger</Text><Text/>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Viktig informasjon</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Events</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Bedpres</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>

          <Card>
            <View style={GS.notificationBack}>
              <View style={GS.view}>
                <Text style={GS.notificationText}>Påminnelser</Text>
              </View>
              <View style={GS.view2}><Notification/></View>
            </View>
          </Card>
        </ScrollView>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
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
    </View>
    
  )
};