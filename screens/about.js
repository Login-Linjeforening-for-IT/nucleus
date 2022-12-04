{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { T } from '../styles/text';
import { MS } from '../styles/menuStyles';
import Card, { Line, Space , Social } from '../shared/sharedComponents';
import { Copyright } from '../shared/sharedComponents';
import React, {useState} from 'react';
import Dropdown from '../shared/dropdown';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function AboutScreen( { navigation }) {

  const [info] = useState([
    {id: '0', title: 'Styret', quote: '', description: 'Øverste leddet i foreningen er styret. Under årsmøtet blir leder, nestleder og sekretær stemt frem, og disse sitter sammen med lederene fra de ulike komiteene i styret. Sammen er disse ansvarlige for å drive foreningen, styre økonomien og sørge for at alle utfører de oppgavene de skal.'},
    {id: '1', title: 'EventKom', quote: 'EventKom er Logins party-komité hvor målet er å bruke opp alle inntektene PR sørger for.', description: 'EventKom har ansvar for å stelle i stand sosiale arrangement på vegne av Login gjennom semesteret. Vi tilbyr sammenkomster der studenter kan møtes på tvers av studieprogram, år og klasser for å få et avbrekk fra studiehverdagen. Målet til EventKom er å bygge et sterkt fellesskap blant IT-studentene ved skolen, som du kan lene deg på når studiehverdagen tar på. Dersom du har forslag til aktiviteter, eller ønsker å være med i komiteen er det bare å kontakte oss på Discord. Forslag og tilbakemeldinger tas imot med glede, og vi håper å høre fra deg.'},
    {id: '2', title: 'TekKom', quote: 'TekKom påstår at de jobber med denne nettsiden men hovedsaklig spiser de pizza. Dette er komiteen for de som liker å lære tekniske ting som å progge og drifte høyteknologisk infrastruktur.', description: 'TekKom har ansvaret for infrastrukturen til Login. Våre oppgaver innebærer utvikling og vedlikehold av blant annet nettsidene og tjenestene foreningen avhenger av, i tillegg til andre sideprosjekter. Vi organiserer åpne arbeidskvelder med pizza hver uke der vi jobber med TekKom-prosjekter. Her stiller vi ingen forventninger annet enn at man er nysgjerrig og forøker å bidra med det man kan. Hvis du liker å kode, eller bare har et vilt prosjekt i tankene, så er dette komiteen for deg!'},
    {id: '3', title: 'PR', quote: 'PR er Logins gyldne ku og uten dem hadde ikke pengene strømmet inn og ingen av de andre komiteene kunne drevet med sprell!', description: 'PR er Logins ansikt utad og har ansvar for Logins offentlige mediakanaler. PR følger med på vårt ticketsystem og svarer bedriftskontakter. De jobber også for å gi studenter et innsyn og vei inn i næringslivet ved å arrangere bedpreser, workshops/fagpres og karrieredager, som også er Logins hovedinntektskilde! Videre er PR med på å representere Login på events og bistår også med rekruttering av nye medlemmer.'},
    {id: '4', title: 'CTFkom', quote: 'CTFkom er Logins hacker-komité. Deres viktigste oppdrag er å hacke seg inn på ING:α sin infrastruktur og lage sprell der!', description: 'CTFKom er komiteen som stiller i stand CTF arrangementer på campus. De arbeider for at alle IT- studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture The Flag konkurranser. Annenhver uke samles de på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra ulike studieprogram, år og klasser kan treffes og ha det gøy sammen. Utover dette er vi aktive på Discord, og sørger for at du alltid kan holde deg oppdatert på nye og interessante CTFer. I CTFkom er ingen spørsmål for dumme og dersom du sitter fast i en CTF, eller bare lurer på noe er det bare å sende en melding i kanalen på Discord.'},
    {id: '5', title: 'SATkom', quote: "SATkom er komiteen som vokter Login sin pengebinge, og sørger for at pengene både flyter inn og ut. Hvis du har økonomisk sans, eller bare vil bli Login's nye sugar daddy, så er dette komiteen for deg!", description: "SATkom står for Sytematiserte Automatiserte Transaksjoner, og de jobber med å forvalte midlene Login har tilgengelig. Deres oppgaver innebærer betaling av regninger, utsending av fakturaer og innkjøp til foreningen. De lager ukentlige regnskap, og passer på at komiteene ikke overskrider budsjettene for mye. Komiteen har også en 'Dungeon Master' som har i oppgave å passe på Loungen, og at alle medlemmene våre får nok koffein. Videre er komiteen involvert i budsjettering, diverse økonomiske saker og andre ablegøyer."}
  ])

  const eventPage = () => {
    navigation.navigate('EventScreen')
  }
  const homePage = () => {
    navigation.navigate('HomeScreen')
  }
  const profilePage = () => {
    navigation.navigate('ProfileScreen');
  }
  const listingPage = () => {
    navigation.navigate('ListingScreen')
  }
  const goBack = () => {
    navigation.goBack()
  }

  const [comittee, selectComittee] = useState({
    selected: 0
  }) 

  const selectedComittee = (val) => {
    selectComittee({
      ...comittee,
      selected: val,
    });
  }
{/* ========================= DISPLAY APP START ========================= */}

return(
  <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>    Om Login</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={T.bold40}>Hvem er vi?</Text>{Space(5)}
        <View style={GS.row}>
          <Text>{Line(60,5)}</Text>
          <View>
            <Text style={T.boldWithLine}>Login er linjeforeningen for IT ved NTNU i Gjøvik og alle som går de følgene studiene er automatisk medlemmer i foreningen.</Text>
          </View>
        </View>
        {Space(5)}
        <Dropdown/>
        {Space(10)}
        <Image style={GS.aboutImage} source={require('../assets/aboutimage.png')} />
        {Space(5)}
        <Text style={T.centeredBold25}>Av studenter, for studenter.</Text>
        {Space(5)}
        <Text style={T.boldParagraph}>Foreningen drives av frivillige studenter som arbeider for at du skal få mest mulig ut av studiene dine ved  NTNU.</Text>
        {Space(5)}
        <Text style={T.paragraph}>Vi arrangerer regelmessig sosiale arrangementer og bedriftspresentasjoner. Vi holder kontakt med aktuelle bedrifter og inviterer til blant annet cyberdagene én gang i semesteret slik at du som student skal bli kjent med mulighetene utdanningen din gir deg.</Text>
        {Space(5)}
        <Text style={T.paragraph}>Hver uke samler vi studenter til  TekKom- og  CTF-samlinger, der man kan lære seg nye ting eller komme med bidrag til foreningen. Her kan man møte andre studenter som deler gleden for å lære, og å sette kunnskapene man tilegner seg i praksis. Videre jobber EvntKom stadig med nye og spennende arrangementer som f.eks. filmkvelder og vinterball.</Text>
        {Space(5)}
        <Text style={T.centered25}>Styret og komiteene</Text>
        <Text style={T.boldParagraph}>Foreningen er satt sammen av et hovedstyret og en rekke komiteer.</Text>
        <View style={GS.parentComitteeView}>
          <View style={GS.comittee1}>
            <TouchableOpacity onPress={() => selectedComittee(0)}>
            {comittee.selected == 0 ? 
                <Image style={GS.image80} source={require('../assets/styret-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/styret555.png')} />
            }
            </TouchableOpacity>
          </View>
          <View style={GS.comittee2}>
            <TouchableOpacity onPress={() => selectedComittee(1)}>
            {comittee.selected == 1 ? 
                <Image style={GS.image80} source={require('../assets/eventkom-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/eventkom555.png')} />
            }
            </TouchableOpacity>
          </View>
          <View style={GS.comittee3}>
            <TouchableOpacity onPress={() => selectedComittee(2)}>
            {comittee.selected == 2 ? 
                <Image style={GS.image80} source={require('../assets/tekkom-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/tekkom555.png')} />
            }
            </TouchableOpacity>
          </View>
        </View>
        <View style={GS.parentComitteeView}>
          <View style={GS.comittee1}>
            <TouchableOpacity onPress={() => selectedComittee(3)}>
              {comittee.selected == 3 ? 
                <Image style={GS.image80} source={require('../assets/pr-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/pr555.png')} />
              }
            </TouchableOpacity>
          </View>
          <View style={GS.comittee2}>
            <TouchableOpacity onPress={() => selectedComittee(4)}>
            {comittee.selected == 4 ? 
                <Image style={GS.image80} source={require('../assets/ctfkom-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/ctfkom555.png')} />
            }
            </TouchableOpacity>
          </View>
          <View style={GS.comittee3}>
            <TouchableOpacity onPress={() => selectedComittee(5)}>
            {comittee.selected == 5 ? 
                <Image style={GS.image80} source={require('../assets/satkom-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/satkom555.png')} />
            }
            </TouchableOpacity>
          </View>
        </View>
        {
            info.map((relevantComittee) => {
              if (relevantComittee.id == comittee.selected) {
                return(
                  <View>
                    <Text style={T.text30}>
                      {relevantComittee.id == 0 ? <Image style={GS.small} source={require('../assets/styret-white.png')} />:null}
                      {relevantComittee.id == 1 ? <Image style={GS.small} source={require('../assets/eventkom-white.png')} />:null}{relevantComittee.id == 2 ? <Image style={GS.small} source={require('../assets/tekkom-white.png')} />:null}{relevantComittee.id == 3 ? <Image style={GS.small} source={require('../assets/pr-white.png')} />:null}{relevantComittee.id == 4 ? <Image style={GS.small} source={require('../assets/ctfkom-white.png')} />:null}{relevantComittee.id == 5 ? <Image style={GS.small} source={require('../assets/satkom-white.png')} />:null}{relevantComittee.title}</Text>{relevantComittee.quote ? Space(5):null}
                    <Text style={T.boldParagraph}>{relevantComittee.quote}</Text>{relevantComittee.quote ? Space(5):null}
                    <Text style={T.paragraph}>{relevantComittee.description}</Text>
                    {Space(15)}
                  </View>
                )
              }
            })
          }
        {comittee.selected == 0 ? 
        <View>
          <Image style={GS.personImage} source={require('../assets/leder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Anders Eiken</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Eiken#6059</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/nestleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Nestleder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Mads Halland</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}¬.¬#6719</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/sekreter.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>Sekretær</Text>
          {Space(5)}
          <Text style={T.leaderName}>Celina Brynildsen</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Celina#6955</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>EventKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sofie Hagen</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}sofiee#9763</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/prleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>PR leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Kristina Kataki</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Kataki#7254</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>TekKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Simon Edna</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Sim#3909</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/ctfkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>CTF leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Eskil Refsgaard</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}refsgaard#9067</Text>
          {Space(25)}
          <Image style={GS.personImage} source={require('../assets/satkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>SatKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sebastian Hestsveen</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}stubbe#8694</Text>
          {Space(25)}
        </View>: null}
        
        {comittee.selected == 1 ? 
        <View>
          <Image style={GS.personImage} source={require('../assets/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>EventKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sofie Hagen</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}sofiee#9763</Text>
          {Space(25)}
        </View>: null}

        {comittee.selected == 2 ? 
        <View>
          <Image style={GS.personImage} source={require('../assets/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>TekKom leder</Text>
          {Space(5)}
          <Text style={T.leaderName}>Simon Edna</Text>
          {Space(5)}
          <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Sim#3909</Text>
          {Space(25)}
        </View>: null}

        {comittee.selected == 3 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/prleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>PR leder</Text>
            {Space(5)}
            <Text style={T.leaderName}>Kristina Kataki</Text>
            {Space(5)}
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Kataki#7254</Text>
            {Space(25)}
          </View>: null}

        {comittee.selected == 4 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/ctfkomleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>CTF leder</Text>
            {Space(5)}
            <Text style={T.leaderName}>Eskil Refsgaard</Text>
            {Space(5)}
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}refsgaard#9067</Text>
            {Space(25)}
          </View>: null}

        {comittee.selected == 5 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/satkomleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>SatKom leder</Text>
            {Space(5)}
            <Text style={T.leaderName}>Sebastian Hestsveen</Text>
            {Space(5)}
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}stubbe#8694</Text>
            {Space(25)}
          </View>: null}

        {Space(10)}
        <Text style={T.text25}>Offentlige dokumenter</Text>
        <View>
          <Text style={T.paragraph}>For mer informasjon og offentlige dokumenter kan du besøke 
            {<Text style={T.orange15} onPress={() => Linking.openURL('https://redmine.login.no/projects/wiki/wiki')}> Redmine
            {
              <Image style={GS.redMine} source={require('../assets/redmine-orange.png')} />
            }</Text>}
          </Text>
          
        </View>
        {Space(10)}
        <Social/>
        <Copyright/>
      </Card>
      {Space(10)}
    </ScrollView>
  </View> 

  <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/house-orange.png')} />
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
