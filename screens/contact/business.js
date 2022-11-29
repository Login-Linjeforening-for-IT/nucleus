{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { T } from '../../styles/text';
import { MS } from '../../styles/menuStyles';
import Card, { Kontakt } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function BusinessScreen( { navigation }) {

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
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>     Bedrift</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <Text style={T.centered20}>Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift.</Text>
            <Text/><Text/>
            
            <View>
              <Text style={T.centered25}>Bedpres</Text>
              <Text style={T.paragraph}>Login sin PR komite arrangerer bedriftspresentasjoner hvor bedriften din får mulighet til å presentere til studentene hva dere jobber med, hvilke tjenester dere tilbyr, hvordan dere jobber osv. På denne måten blir studentene bevisst på hva dere tilbyr, og ikke minst arbeidsmiljøet deres. Vi tilbyr tilrettelegging for matservering (Pizza) under presentasjonen, men det er mest vanlig å rusle ned til en restaurant i byen for bespisning og mingling mellom studenter og bedriftsrepresentanter.</Text>
              <Text/>
            </View>

            <View>
              <Text style={T.centered25}>Cyberdagene</Text>
              <Text style={T.paragraph}>Cyberdagene er vår karrieredag! Den arrangeres en gang per semester, og er en super arena for å rekruttere og promotere seg selv mot studentene våre. Her blir det mulighet til å ta en prat med studenter, markedsføre dere, og ikke minst annonsere sommerjobber til ivrige studenter! Bedriften får en stand og bestemmer selv hva dere ønsker å gjennomføre under selve karrieredagen. Her tilrettelegger vi også for speed intervjuer dersom det er ønskelig. På kvelden blir det lagt opp for mingling med studenter på Huset med en pils og noe mat.</Text>
              <Text/>
            </View>

            <View>
              <Text style={T.centered25}>Workshop / Fagpres</Text>
              <Text style={T.paragraph}>Login arrangerer også workshops og fagpresentasjoner. Workshops går ut på at bedriften får litt tid hvor de kan presentere seg selv, etterfulgt av at studenter jobber med diverse prosjekter de har samtidig som bedriftsrepresentanter mingler og gir tips til studenter. Med en fagpresentasjon vil bedriften igjen kunne kort presentere seg selv før det blir holdt en faglig fokusert presentasjon av bedriften. Her kan det være formidling av teknologier eller prinsipp som deres bedrift jobber med.</Text>
              <Text/>
            </View>
            
            <View>
              <Text style={T.centered25}>Utlysning / Profilering</Text>
              <Text style={T.paragraph}>PR komiteen tilbyr også deling av stillingsutlysninger, jobbannonser, og annen type profilering på våre aktive sosiale kanaler (Discord, Instagram, Facebook, Login.no). Dersom bedriften har arrangert en bedpres, workshop/fagpres eller CTF med oss det gjeldene semesteret vil profilering være inkludert (uten ekstra kostnad).</Text>
            </View>

            <Kontakt/>
            </Card>
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
            <Image style={MS.bMenuIcon} source={require('../../assets/business-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};