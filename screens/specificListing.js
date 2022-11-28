{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { ES } from '../styles/eventStyles';
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function SpecificListingScreen( { navigation }) {

  //Check if image exists

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
  const goBack = () => {
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

    <Text style={MS.screenTitle}>      Annonse</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={GS.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
            <View style={ES.specificEventView1}>
              <Image style={ES.specificEventImage} source={require('../assets/mnemonic.png')} />
            </View>

            <Text/>

            <Card>
              <View>
                <Text style={T.centered20}>{navigation.getParam('title')}</Text>
              </View>
            </Card>

            <View>
              <View>
                <Text style={T.centered20}>{navigation.getParam('eventname')}</Text>
              </View>

              <Text/>

              <Card>
                <Text style={T.centered20}>Stillingsbeskrivelse: </Text>
                <Text style={T.margin15}>
                Bacon ipsum dolor amet beef ribs kevin pastrami shank, t-bone flank ribeye porchetta swine pancetta. Shankle short ribs tail, shoulder fatback pastrami leberkas pig pork chop pork belly kielbasa short loin. Meatball jowl fatback corned beef. Pork belly swine leberkas pork tri-tip jowl.
                </Text>
              </Card>
            </View>
          </View>

          <Text/><Text/><Text/><Text/>
          
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
            <Image style={MS.bMenuIcon} source={require('../assets/business-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};