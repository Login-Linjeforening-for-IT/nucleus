{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { T } from '../styles/text';
import { MS } from '../styles/menuStyles';
import Card, { Line, Space , Social, AllComitees, Copyright } from '../shared/sharedComponents';
import React, {useState} from 'react';
import Dropdown from '../shared/dropdown';
import { useSelector } from 'react-redux';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
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

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )

  const [info] = useState([
    {id: '0', titleNO: 'Styret',   titleEN: 'Board',    quoteNO: '', qouteEN: '', descriptionNO: 'Øverste leddet i foreningen er styret. Under årsmøtet blir leder, nestleder og sekretær stemt frem, og disse sitter sammen med lederene fra de ulike komiteene i styret. Sammen er disse ansvarlige for å drive foreningen, styre økonomien og sørge for at alle utfører de oppgavene de skal.', descriptionEN: 'The highest level of the association is the board. During the annual meeting, the chairman, deputy chairman and secretary are voted in, and these sit together with the leaders from the various committees on the board. Together, these are responsible for running the association, managing the finances and ensuring that everyone performs the tasks they are supposed to.'},
    {id: '1', titleNO: 'EventKom', titleEN: 'EventKom', quoteNO: 'EventKom er Logins party-komité hvor målet er å bruke opp alle inntektene PR sørger for.', qouteEN: "EventKom is Login's party committee, where the goal is to use up all the income PR provides.", descriptionNO: 'EventKom har ansvar for å stelle i stand sosiale arrangement på vegne av Login gjennom semesteret. Vi tilbyr sammenkomster der studenter kan møtes på tvers av studieprogram, år og klasser for å få et avbrekk fra studiehverdagen. Målet til EventKom er å bygge et sterkt fellesskap blant IT-studentene ved skolen, som du kan lene deg på når studiehverdagen tar på. Dersom du har forslag til aktiviteter, eller ønsker å være med i komiteen er det bare å kontakte oss på Discord. Forslag og tilbakemeldinger tas imot med glede, og vi håper å høre fra deg.', descriptionEN: 'EventKom is responsible for setting up social events on behalf of Login throughout the semester. We offer gatherings where students can meet across study programmes, years and classes in order to have a break from everyday study life. The aim of EventKom is to build a strong community among the IT students at the school, which you can lean on when the study life gets busy. If you have suggestions for activities, or want to join the committee, just contact us on Discord. Suggestions and feedback are welcomed, and we hope to hear from you.'},
    {id: '2', titleNO: 'TekKom',   titleEN: 'TekKom',   quoteNO: 'TekKom påstår at de jobber med nettsiden men hovedsaklig spiser de pizza. Dette er komiteen for de som liker å lære tekniske ting som å progge og drifte høyteknologisk infrastruktur.', qouteEN: 'TekKom claim that they work on this app and their website, but they mainly eat pizza. This is the committee for those who like to learn technical things such as programming and operating high-tech infrastructure.', descriptionNO: 'TekKom har ansvaret for infrastrukturen til Login. Våre oppgaver innebærer utvikling og vedlikehold av blant annet nettsidene og tjenestene foreningen avhenger av, i tillegg til andre sideprosjekter. Vi organiserer åpne arbeidskvelder med pizza hver uke der vi jobber med TekKom-prosjekter. Her stiller vi ingen forventninger annet enn at man er nysgjerrig og forøker å bidra med det man kan. Hvis du liker å kode, eller bare har et vilt prosjekt i tankene, så er dette komiteen for deg!', descriptionEN: "TekKom is responsible for Login's infrastructure. Our tasks involve development and maintenance of, among other things, the websites and services the association depends on, in addition to other side projects. We organize open work evenings with pizza every week where we work on TekKom projects. Here we set no expectations other than that you are curious and try to contribute what you can. If you enjoy coding, or just have a wild project in mind, this is the committee for you!"},
    {id: '3', titleNO: 'PR',       titleEN: 'PR',       quoteNO: 'PR er Logins gyldne ku og uten dem hadde ikke pengene strømmet inn og ingen av de andre komiteene kunne drevet med sprell!', qouteEN: "PR is Login's golden calf and without them the money wouldn't have flowed in and none of the other committees could do the trick!", descriptionNO: 'PR er Logins ansikt utad og har ansvar for Logins offentlige mediakanaler. PR følger med på vårt ticketsystem og svarer bedriftskontakter. De jobber også for å gi studenter et innsyn og vei inn i næringslivet ved å arrangere bedpreser, workshops/fagpres og karrieredager, som også er Logins hovedinntektskilde! Videre er PR med på å representere Login på events og bistår også med rekruttering av nye medlemmer.', descriptionEN: "PR is Login's public face and is responsible for Login's social media channels. PR monitors our ticket system and responds to company contacts. They also work to give students a sneak peek into the business world, by arranging company presentations and a career fair called The Cyberdays each semester. Furthermore, PR helps to represent Login at events and also assists with the recruitment of new members."},
    {id: '4', titleNO: 'CTFkom',   titleEN: 'CTFkom',   quoteNO: 'CTFkom er Logins hacker-komité. Deres viktigste oppdrag er å hacke seg inn på ING:α sin infrastruktur og lage sprell der!', qouteEN: "CTFkom is Login's hacker committee. Their most important mission is to hack into ING:α's infrastructure and create havoc!", descriptionNO: 'CTFKom er komiteen som stiller i stand CTF arrangementer på campus. De arbeider for at alle IT- studentene ved skolen skal kunne utvikle sine ferdigheter gjennom Capture The Flag konkurranser. Annenhver uke samles de på skolen for å løse oppgaver sammen, og tilbyr en arena der studenter fra ulike studieprogram, år og klasser kan treffes og ha det gøy sammen. Utover dette er vi aktive på Discord, og sørger for at du alltid kan holde deg oppdatert på nye og interessante CTFer. I CTFkom er ingen spørsmål for dumme og dersom du sitter fast i en CTF, eller bare lurer på noe er det bare å sende en melding i kanalen på Discord.', descriptionEN: "CTFkom is the committee that organizes CTF events on campus. They work to ensure that all IT students at the school can develop their skills through Capture The Flag competitions. Every other week they gather at the school to solve tasks together and offer an arena where students from different study programmes, years and classes can meet and have fun together. In addition to this, we are active on Discord, and ensure that you can always stay up to date on new and interesting CTFs. In CTFkom, no question is too stupid and if you are stuck in a CTF, or just wondering about something, just send a message in the channel on Discord."},
    {id: '5', titleNO: 'SATkom',   titleEN: 'SATkom',   quoteNO: "SATkom er komiteen som vokter Login sin pengebinge, og sørger for at pengene både flyter inn og ut. Hvis du har økonomisk sans, eller bare vil bli Login's nye sugar daddy, så er dette komiteen for deg!", qouteEN: "SATkom is the committee that guards Login's money bin and ensures that the money flows both in and out. If you have financial skills, or just want to be Login's new sugar daddy, then this is the committee for you!", descriptionNO: "SATkom står for Sytematiserte Automatiserte Transaksjoner, og de jobber med å forvalte midlene Login har tilgengelig. Deres oppgaver innebærer betaling av regninger, utsending av fakturaer og innkjøp til foreningen. De lager ukentlige regnskap, og passer på at komiteene ikke overskrider budsjettene for mye. Komiteen har også en 'Dungeon Master' som har i oppgave å passe på Loungen, og at alle medlemmene våre får nok koffein. Videre er komiteen involvert i budsjettering, diverse økonomiske saker og andre ablegøyer.", descriptionEN: "SATkom stands for Systematized Automated Transactions, and they work with managing the funds Login has available. Their duties involve paying bills, sending out invoices and purchasing for the association. They prepare weekly accounts, and make sure that the committees do not exceed their budgets too much. The committee also has a 'Dungeon Master' who is tasked with looking after the Lounge, and that all our members get enough caffeine. Furthermore, the committee is involved in budgeting, various financial matters and other minor matters."}
  ])

  const eventPage   = () => { navigation.navigate('EventScreen')   }
  const homePage    = () => { navigation.navigate('HomeScreen')    }
  const profilePage = () => { navigation.navigate('ProfileScreen') }
  const listingPage = () => { navigation.navigate('ListingScreen') }
  const goBack      = () => { navigation.goBack()                  }

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

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={MS.screenTitle}>{lang ? 'Om Login' : 'About Login'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={T.bold40}>{lang ? 'Hvem er vi?' : 'Who are we?'}</Text>{Space(5)}
        <View style={GS.row}>
          <Text>{Line(60,5)}</Text>
          <View>
            <Text style={T.boldWithLine}>{lang ? 'Login er linjeforeningen for IT ved NTNU i Gjøvik og alle som går de følgene studiene er automatisk medlemmer i foreningen.' : 'Login is the student association for IT at  NTNU in Gjøvik and everyone who studies the following courses is automatically a member of the association.'}</Text>
          </View>
        </View>
        {Space(5)}
        <Dropdown/>
        {Space(10)}
        <Image style={GS.aboutImage} source={require('../assets/aboutimage.png')} />
        {Space(5)}
        <Text style={T.centeredBold25}>{lang ? 'Av studenter, for studenter.' : 'By students, for students'}</Text>
        {Space(5)}
        <View style={GS.row}>
          <Text>{Line(60,5)}</Text>
          <View>
            <Text style={T.boldWithLine}>{lang ? 'Foreningen drives av frivillige studenter som arbeider for at du skal få mest mulig ut av studiene dine ved  NTNU.' : 'The association is run by volunteer students who work to ensure that you get the most out of your studies at  NTNU.'}</Text>
          </View>
        </View>
        {Space(5)}
        <Text style={T.paragraph}>{lang ? 'Vi arrangerer regelmessig sosiale arrangementer og bedriftspresentasjoner. Vi holder kontakt med aktuelle bedrifter og inviterer til blant annet cyberdagene én gang i semesteret slik at du som student skal bli kjent med mulighetene utdanningen din gir deg.' : 'We regularly organize social events and company presentations. We keep in touch with relevant companies and invite you to, among other things, the cyber days once a semester so that you, as a student, get to know the opportunities your education gives you.'}</Text>
        {Space(5)}
        <Text style={T.paragraph}>{lang ? 'Hver uke samler vi studenter til  TekKom- og  CTF-samlinger, der man kan lære seg nye ting eller komme med bidrag til foreningen. Her kan man møte andre studenter som deler gleden for å lære, og å sette kunnskapene man tilegner seg i praksis. Videre jobber EvntKom stadig med nye og spennende arrangementer som f.eks. filmkvelder og vinterball.' : 'Every week we gather students for  TekKom and  CTF gatherings, where you can learn new things or contribute to the association. Here you can meet other students who share the joy of learning and putting the knowledge you acquire into practice.  EvntKom is also constantly working on new and exciting events such as movie nights and winter ball.'}</Text>
        {Space(5)}
        <Text style={T.centered25}>{lang ? 'Styret og komiteene' : 'The board and the committees'}</Text>
        <Text style={T.boldParagraph}>{lang ? 'Foreningen er satt sammen av et hovedstyret og en rekke komiteer.' : 'The association is made up of a main board and a number of committees.'}</Text>
        <View style={GS.parentComitteeView}>
            <TouchableOpacity onPress={() => selectedComittee(0)}>
              <View style={GS.comittee1}>
                {comittee.selected == 0 ? 
                    <Image style={GS.image80} source={require('../assets/styret-orange.png')} />
                  : 
                    <Image style={GS.image80} source={require('../assets/styret555.png')} />
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectedComittee(1)}>
              <View style={GS.comittee2}>
                {comittee.selected == 1 ? 
                    <Image style={GS.image80} source={require('../assets/eventkom-orange.png')} />
                  : 
                    <Image style={GS.image80} source={require('../assets/eventkom555.png')} />
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectedComittee(2)}>
              <View style={GS.comittee3}>
                {comittee.selected == 2 ? 
                    <Image style={GS.image80} source={require('../assets/tekkom-orange.png')} />
                  : 
                    <Image style={GS.image80} source={require('../assets/tekkom555.png')} />
                }
              </View>
            </TouchableOpacity>
        </View>
        <View style={GS.parentComitteeView}>
          <TouchableOpacity onPress={() => selectedComittee(3)}>
            <View style={GS.comittee1}>
              {comittee.selected == 3 ? 
                <Image style={GS.image80} source={require('../assets/pr-orange.png')} />
              : 
                <Image style={GS.image80} source={require('../assets/pr555.png')} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectedComittee(4)}>
            <View style={GS.comittee2}>
              {comittee.selected == 4 ? 
                  <Image style={GS.image80} source={require('../assets/ctfkom-orange.png')} />
                : 
                  <Image style={GS.image80} source={require('../assets/ctfkom555.png')} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectedComittee(5)}>
            <View style={GS.comittee3}>
              {comittee.selected == 5 ? 
                  <Image style={GS.image80} source={require('../assets/satkom-orange.png')} />
                : 
                  <Image style={GS.image80} source={require('../assets/satkom555.png')} />
              }
            </View>
          </TouchableOpacity>
        </View>
        {
            info.map((relevantComittee, index) => {
              if (relevantComittee.id == comittee.selected) {
                return(
                  <View key={index}>
                    <Text style={T.text30}>
                      {relevantComittee.id == 0 ? <Image style={GS.small} source={require('../assets/styret-white.png')} />:null}
                      {relevantComittee.id == 1 ? <Image style={GS.small} source={require('../assets/eventkom-white.png')} />:null}
                      {relevantComittee.id == 2 ? <Image style={GS.small} source={require('../assets/tekkom-white.png')} />:null}
                      {relevantComittee.id == 3 ? <Image style={GS.small} source={require('../assets/pr-white.png')} />:null}
                      {relevantComittee.id == 4 ? <Image style={GS.small} source={require('../assets/ctfkom-white.png')} />:null}
                      {relevantComittee.id == 5 ? <Image style={GS.small} source={require('../assets/satkom-white.png')} />:null}
                      {lang ? relevantComittee.titleNO : relevantComittee.titleEN}</Text>{lang ? relevantComittee.quoteNO : relevantComittee.qouteEN ? Space(5):null}
                    <Text style={T.boldParagraph}>{lang ? relevantComittee.quoteNO : relevantComittee.qouteEN}</Text>{lang ? relevantComittee.quoteNO : relevantComittee.qouteEN? Space(5):null}
                    <Text style={T.paragraph}>{lang ? relevantComittee.descriptionNO : relevantComittee.descriptionEN}</Text>
                    {Space(15)}
                  </View>
                )
              }
            })
          }
        {comittee.selected == 0 ? <AllComitees/>: null}
        
        {comittee.selected == 1 ? 
        <View>
          <Image style={GS.personImage} source={require('../assets/eventkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'EventKom leder' : 'EventKom leader'}</Text>
          {Space(5)}
          <Text style={T.leaderName}>Sofie Hagen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877183922021216256')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}sofiee#9763</Text>
          </TouchableOpacity>
          {Space(25)}
        </View>: null}

        {comittee.selected == 2 ? 
        <View>
          <Image style={GS.personImage} source={require('../assets/tekkomleder.png')} />
          {Space(10)}
          <Text style={T.leaderTitle}>{lang ? 'TekKom leder' : 'TekKom leader'}</Text>
          {Space(5)}
          <Text style={T.leaderName}>Simon Edna</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/298525088914079745')}>
            <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Sim#3909</Text>
          </TouchableOpacity>
          {Space(25)}
        </View>: null}

        {comittee.selected == 3 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/prleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>{lang ? 'PR leder' : 'PR leader'}</Text>
            {Space(5)}
            <Text style={T.leaderName}>Kristina Kataki</Text>
            {Space(5)}
            <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877108421772582962')}>
              <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}Kataki#7254</Text>
            </TouchableOpacity>
            {Space(25)}
          </View>: null}

        {comittee.selected == 4 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/ctfkomleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>{lang ? 'CTF leder' : 'CTF leader'}</Text>
            {Space(5)}
            <Text style={T.leaderName}>Eskil Refsgaard</Text>
            {Space(5)}
            <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/522483274933731331')}>
              <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}refsgaard#9067</Text>
          </TouchableOpacity>
            {Space(25)}
          </View>: null}

        {comittee.selected == 5 ? 
          <View>
            <Image style={GS.personImage} source={require('../assets/satkomleder.png')} />
            {Space(10)}
            <Text style={T.leaderTitle}>{lang ? 'SatKom leder' : 'SatKom leader'}</Text>
            {Space(5)}
            <Text style={T.leaderName}>Sebastian Hestsveen</Text>
            {Space(5)}
            <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/119120560931340290')}>
              <Text style={T.leaderName}>{<Image style={GS.tiny} source={require('../assets/discord-white.png')} />}stubbe#8694</Text>
            </TouchableOpacity>
            {Space(25)}
          </View>: null}

        {Space(10)}
        <Text style={T.text25}>{lang ? 'Offentlige dokumenter' : 'Public documents'}</Text>
        <View>
          <Text style={T.paragraph}>{lang ? 'For mer informasjon og offentlige dokumenter kan du besøke' : 'For more information and public documents, visit'}
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
