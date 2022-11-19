{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { T } from '../../styles/text';
import { MS } from '../../styles/menuStyles';
import { Kontakt } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function BusinessScreen( { navigation }) {

{/* ========================= DISPLAY APP START ========================= */}

const settingsPage = () => {
  navigation.navigate('SettingScreen');
}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const ProfilePage = () => {
  navigation.navigate('ProfileScreen')
}
const goBack = () => {
  navigation.goBack()
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={T.centered}>For bedrifter</Text>
            <Text style={T.h5}>Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift.</Text>
            <Text/><Text/>
            

            <Text style={T.centered}>Bedpres</Text>
            <Text style={T.paragraph}>Login sin PR komite arrangerer bedriftspresentasjoner hvor bedriften din får mulighet til å presentere til studentene hva dere jobber med, hvilke tjenester dere tilbyr, hvordan dere jobber osv. På denne måten blir studentene bevisst på hva dere tilbyr, og ikke minst arbeidsmiljøet deres. Vi tilbyr tilrettelegging for matservering (Pizza) under presentasjonen, men det er mest vanlig å rusle ned til en restaurant i byen for bespisning og mingling mellom studenter og bedriftsrepresentanter.</Text>
            <Text/>
            <Text style={T.centered}>Cyberdagene</Text>
            <Text style={T.paragraph}>Cyberdagene er vår karrieredag! Den arrangeres en gang per semester, og er en super arena for å rekruttere og promotere seg selv mot studentene våre. Her blir det mulighet til å ta en prat med studenter, markedsføre dere, og ikke minst annonsere sommerjobber til ivrige studenter! Bedriften får en stand og bestemmer selv hva dere ønsker å gjennomføre under selve karrieredagen. Her tilrettelegger vi også for speed intervjuer dersom det er ønskelig. På kvelden blir det lagt opp for mingling med studenter på Huset med en pils og noe mat.</Text>
            <Text/>
            <Text style={T.centered}>Workshop / Fagpres</Text>
            <Text style={T.paragraph}>Login arrangerer også workshops og fagpresentasjoner. Workshops går ut på at bedriften får litt tid hvor de kan presentere seg selv, etterfulgt av at studenter jobber med diverse prosjekter de har samtidig som bedriftsrepresentanter mingler og gir tips til studenter. Med en fagpresentasjon vil bedriften igjen kunne kort presentere seg selv før det blir holdt en faglig fokusert presentasjon av bedriften. Her kan det være formidling av teknologier eller prinsipp som deres bedrift jobber med.</Text>
            <Text/>
            <Text style={T.centered}>Utlysning / Profilering</Text>
            <Text style={T.paragraph}>PR komiteen tilbyr også deling av stillingsutlysninger, jobbannonser, og annen type profilering på våre aktive sosiale kanaler (Discord, Instagram, Facebook, Login.no). Dersom bedriften har arrangert en bedpres, workshop/fagpres eller CTF med oss det gjeldene semesteret vil profilering være inkludert (uten ekstra kostnad).</Text>
            <Kontakt/>
            </ScrollView>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenu3} source={require('../../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenu2} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../../assets/menu-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};