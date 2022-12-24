{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { MS } from '../styles/menuStyles'
import { GS } from '../styles/globalStyles'
import React, { useState, useEffect } from 'react';
import { T } from '../styles/text'
import Card from '../shared/sharedComponents';
import { useSelector } from 'react-redux';
import { DynamicCircle } from '../shared/eventComponents/otherComponents';
import FetchColor from '../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  FlatList,
  TouchableOpacity
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function ListingScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const [setting] = useState([
    {id: '0', titleNO: 'Hagearbeid hos Login', titleEN: 'Gardening at Login', introduction: 'Vi søker etter en dyktig hagearbeider til vår linjeforening for it, login. Du vil få muligheten til å være med på å skape et trivelig og velstelt uteområde for våre medlemmer.', content: 'Som hagearbeider for login vil du få ansvaret for vedlikeholdet av vårt uteområde, som inkluderer blomsterbed, plen, busker og trær. Du vil også bidra til å planlegge og gjennomføre nye prosjekter, som for eksempel opparbeidelse av benker og gangstier. \n\nVi søker etter en person med interesse for hagebruk og gartnerfaget, samt erfaring fra lignende stillinger. Du må være selvstendig, strukturert og ha god evne til å planlegge og gjennomføre oppgaver. Det er også en fordel om du har kjennskap til relevante verktøy og utstyr. \n\nI denne stillingen vil du få muligheten til å jobbe ute i frisk luft og bidra til å skape et trivelig uteområde for våre medlemmer. Det vil også være mulighet for faglig utvikling gjennom intern kompetanseheving og kurs. Vi tilbyr et godt arbeidsmiljø og konkurransedyktige betingelser.'},
    {id: '1', titleNO: 'Webutvikling for Zebracompany', titleEN: 'Web development for Zebra Company', introduction: 'Zebracompany søker etter en dyktig webutvikler som kan bidra til å utvikle og vedlikeholde nettsteder og nettbaserte løsninger for våre kunder. Stillingen innebærer å jobbe i et dynamisk team med kompetente kollegaer og spennende prosjekter.', content: 'Som webutvikler hos Zebracompany vil du få muligheten til å jobbe med et bredt spekter av teknologier og plattformer, inkludert HTML, CSS, JavaScript, PHP, MySQL og andre relevante verktøy. Du vil også få muligheten til å lære og utforske ny teknologi for å holde deg oppdatert på de siste trendene og utviklingene innenfor bransjen. \n\nI stillingen vil du jobbe tett sammen med resten av utviklingsteamet og ha ansvar for å levere høy kvalitet på arbeidet ditt. Dette innebærer å sikre at nettsteder og løsninger du utvikler er responsivt designet, lett å bruke og har god ytelse. Du vil også ha mulighet til å delta i hele utviklingsprosessen, fra planlegging til lansering av prosjekter. \n\nZebracompany er et innholdsrikt og utfordrende arbeidsmiljø der du vil få muligheten til å lære og vokse som profesjonell. Vi tilbyr et godt arbeidsmiljø, konkurransedyktige lønnsbetingelser og mulighet for faglig utvikling. Hvis du er en dyktig webutvikler som ønsker å være en del av et spennende og vekstorientert selskap, så vil vi gjerne høre fra deg.'},
    {id: '2', titleNO: 'Datasikkerhet hos Dogs Inc.', titleEN: 'Information Security at Dogs Inc.', introduction: 'Dogs Inc. søker etter en dyktig datasikkerhetsingeniør som ønsker å bli en del av vårt dynamiske team. I denne stillingen vil du få muligheten til å jobbe med viktige prosjekter og bidra til å sikre våre kunders data.', content: 'Som datasikkerhetsingeniør hos Dogs Inc. vil du få ansvar for å utvikle og vedlikeholde vår datasikkerhetsstrategi. Dette innebærer å jobbe med alt fra å implementere sikkerhetsløsninger til å utføre risikoanalyser og sårbarhetsvurderinger. Du vil også få muligheten til å samarbeide med andre fagområder innenfor it-sikkerhet og bidra til å holde våre kunders data trygge. \n\nI tillegg til å ha en solid teknisk bakgrunn, søker vi etter en person med god kommunikasjonsevne og gode problemløsingsevner. Du bør også ha en interesse for å holde deg oppdatert på ny teknologi og sikkerhetsløsninger innenfor bransjen. \n\nSå hvis du ønsker å jobbe med en meningsfull og utfordrende oppgave innenfor datasikkerhet, og du tror du har det vi ser etter, vil vi gjerne høre fra deg!'},
  ])

const eventPage   = () => { navigation.navigate('EventScreen')   }
const homePage    = () => { navigation.navigate('HomeScreen')    }
const aboutPage   = () => { navigation.navigate('AboutScreen')   }
const profilePage = () => { navigation.navigate('ProfileScreen') }

return(
  <View>
{/* ========================= DISPLAY TOP MENU ========================= */}
<View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
    <TouchableOpacity onPress={() => aboutPage()}>
      <Image style={MS.tMenuIcon} source={require('../assets/loginText.png')} />
    </TouchableOpacity>

    {login ? DynamicCircle(10,10,'red',0,0,60,0):null}

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Stillinger' : 'Vacancies'}</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../assets/loginperson.png')} />
      </TouchableOpacity>
  </View>

{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
          <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={setting}
          renderItem={({item}) => (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('SpecificListingScreen', {item: item})}>
              <Card>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? item.titleNO : item.titleEN}</Text><Text/>
                <Text style={{...T.centered15, color: FetchColor(theme, 'TEXTCOLOR')}}>{item.introduction}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          )}
          />
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'DARKER')}}>
      <TouchableOpacity onPress={() => homePage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/house777.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenuIcon} source={require('../assets/calendar777.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={MS.bMenuIcon} source={require('../assets/business-orange.png')} />
      </TouchableOpacity>
      </View>     
    </View>
    
  )
};
