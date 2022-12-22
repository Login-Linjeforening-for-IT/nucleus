{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { T } from '../../styles/text';
import { MS } from '../../styles/menuStyles';
import Card, { Kontakt, Space, Line } from '../../shared/sharedComponents';
import { DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { useSelector } from 'react-redux';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function BusinessScreen( { navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  
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
    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}
    <Text style={MS.screenTitle}>{lang ? 'Bedrift' : 'Company'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card>
            <Text style={T.bold40}>{lang ? 'For bedrifter' : 'For companies'}</Text>{Space(5)}

            {Space(10)}

            <View style={GS.row}>
              <Text>{Line(60,5)}</Text>
              <View>
              <Text style={T.boldWithLine}>{lang ? 'Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift.': 'Is your company looking for sharp IT students? Check out everything we have to offer your company.'}</Text>
              </View>
            </View>
            {Space(10)}
            
            <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={require('../../assets/bedpres-white.png')} />
                <Text style={T.bold28}>{lang ? 'Bedpres' : 'Company presentation'}</Text>
              </View>
              <Text style={T.paragraph}>{lang ? 'Login sin PR komite arrangerer bedriftspresentasjoner hvor bedriften din får mulighet til å presentere til studentene hva dere jobber med, hvilke tjenester dere tilbyr, hvordan dere jobber osv. På denne måten blir studentene bevisst på hva dere tilbyr, og ikke minst arbeidsmiljøet deres. Vi tilbyr tilrettelegging for matservering (Pizza) under presentasjonen, men det er mest vanlig å rusle ned til en restaurant i byen for bespisning og mingling mellom studenter og bedriftsrepresentanter.': "Login's PR committee organizes company presentations where your company gets the opportunity to present to the students what you work on, what services you offer, how you work, etc. With this the students become aware of what you offer, and your working environment. We offer arrangements for food service (pizza) during the presentation, but it is most common to stroll down to a restaurant in town for dining and mingling between students and company representatives."}</Text>
              {Space(25)}
            </View>

            <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={require('../../assets/pr-white.png')} />
                <Text style={T.bold28}>{lang ? 'Cyberdagene' : 'Cyberdays'}</Text>
              </View>
              <Text style={T.paragraph}>{lang ? 'Cyberdagene er vår karrieredag! Den arrangeres en gang per semester, og er en super arena for å rekruttere og promotere seg selv mot studentene våre. Her blir det mulighet til å ta en prat med studenter, markedsføre dere, og ikke minst annonsere sommerjobber til ivrige studenter! Bedriften får en stand og bestemmer selv hva dere ønsker å gjennomføre under selve karrieredagen. Her tilrettelegger vi også for speed intervjuer dersom det er ønskelig. På kvelden blir det lagt opp for mingling med studenter på Huset med en pils og noe mat.' : 'The cyber days are our career day! It is organized once per semester and is a great arena for recruiting and promoting yourself to our students. Here you will have the opportunity to have a chat with students, market yourself, and not least advertise summer jobs to eager students! The company gets a stand and decides for itself what you want to carry out during the career day itself. Here we also arrange for speed interviews if desired. In the evening, arrangements are made for mingling with students at Huset with a beer and some food.'}</Text>
              {Space(25)}
            </View>

            <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={require('../../assets/ctfkom-white.png')} />
                <Text style={T.bold28}>CTF</Text>
              </View>
              <Text style={T.paragraph}>{lang ? "Capture the Flag er en perfekt arena for å både bli kjent med, og å utvikle studentene sine info-sec ferdigheter. Her kan dere som bedrift utfordre studentene våre til å løse oppgaver sammen! Vi oppfordrer til at dere har en egenlaget CTF som studentene kan leke seg med. Etter selve CTF'en er det vanlig å ta med alle deltagerne ned til en restaurant for bespising og mingling med bedriftsrepresentantene." : "Capture the Flag is a perfect arena for both getting to know and developing the students' info-sec skills. Here you as a company can challenge our students to solve tasks together! We encourage you to have a self-made CTF that the students can play with. After the CTF itself, it is customary to take all the participants down to a restaurant for dining and mingling with the company representatives."}</Text>
              {Space(25)}
            </View>

            <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={require('../../assets/ctfkom-white.png')} />
                <Text style={T.bold28}>{lang ? 'Workshop & Fagpres' : 'Workshop & Subject Presentation'}</Text>
              </View>
              <Text style={T.paragraph}>{lang ? 'Login arrangerer også workshops og fagpresentasjoner. Workshops går ut på at bedriften får litt tid hvor de kan presentere seg selv, etterfulgt av at studenter jobber med diverse prosjekter de har samtidig som bedriftsrepresentanter mingler og gir tips til studenter. Med en fagpresentasjon vil bedriften igjen kunne kort presentere seg selv før det blir holdt en faglig fokusert presentasjon av bedriften. Her kan det være formidling av teknologier eller prinsipp som deres bedrift jobber med.' : 'Login also organizes workshops and subject presentations. Workshops involve the company getting some time where they can present themselves, followed by students working on various projects they have at the same time as company representatives mingle and give tips to students. With a professional presentation, the company will again be able to briefly introduce itself before a professionally focused presentation of the company is held. Here it can be the dissemination of technologies or principles that your company works with.'}</Text>
              {Space(25)}
            </View>
            
            <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={require('../../assets/ctfkom-white.png')} />
                <Text style={T.bold28}>{lang ? 'Utlysning & Profilering' : 'Ads & Profiling'}</Text>
              </View>
              <Text style={T.paragraph}>{lang ? 'PR komiteen tilbyr også deling av stillingsutlysninger, jobbannonser, og annen type profilering på våre aktive sosiale kanaler (Discord, Instagram, Facebook, Login.no). Dersom bedriften har arrangert en bedpres, workshop/fagpres eller CTF med oss det gjeldene semesteret vil profilering være inkludert (uten ekstra kostnad).' : 'The PR committee also offers the sharing of job advertisements, job advertisements and other types of profiling on our active social channels (Discord, Instagram, Facebook, Login.no). If the company has arranged a bedpres, workshop/fagpres or CTF with us in the current semester, profiling will be included (at no extra cost).'}</Text>
            </View>

            {Space(10)}

            <Kontakt/>

          </Card>
            
          {Space(10)}

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