{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import AllComitees from '../../shared/functions/allCommittees';
import Copyright from '../../shared/functions/copyright';
import Dropdown from '../../shared/functions/dropdown';
import Cluster from '../../shared/functions/cluster';
import Social from '../../shared/functions/social';
import person from '../../shared/functions/person';
import styret from '../../shared/functions/styret';
import Space from '../../shared/functions/space';
import FetchColor from '../../styles/fetchTheme';
import en from '../../locales/en/aboutPage.json'
import no from '../../locales/nb/aboutPage.json'
import Line from '../../shared/functions/line';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { useSelector } from 'react-redux';
import React, {useState} from 'react';
import { T } from '../../styles/text';
import { BlurView } from 'expo-blur';
import { 
  Text, 
  View, 
  Image, 
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform
} from 'react-native';
import BottomMenu from '../../shared/bottomMenu';

{/* ========================= APP START ========================= */}

export default function AboutScreen( { navigation } ) {
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const screenWidth = Dimensions.get('window').width;

  const eventPage   = () => { navigation.navigate('EventScreen') }
  const menuPage   = () => { navigation.navigate('MenuScreen') }
//   const adPage = () => { navigation.navigate('AdScreen') }

  const [comittee, selectComittee] = useState({
    selected: 0
  }) 

  const selectedComittee = (val) => {
    selectComittee({
      ...comittee,
      selected: val,
    });
  }

  return(
  <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {Space(Dimensions.get('window').height/8.1)}
      <Cluster>
        <Text style={{...T.bold40, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.title : en.title}</Text>{Space(5)}
        <View style={GS.row}>
          <Text>{lang ? Line(58,5) : screenWidth < 390 ? Line(94,5) : Line(92,5)}</Text>
          <View>
            <Text style={{...T.boldWithLine, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.intro : en.intro}</Text>
          </View>
        </View>
        {Space(5)}
        <Dropdown/>
        {Space(10)}
        {styret(theme)}
        {Space(5)}
        <Text style={{...T.centeredBold25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.about.title : en.about.title}</Text>
        {Space(5)}
        <View style={GS.row}>
          <Text>{Line(58,5)}</Text>
          <View>
            <Text style={{...T.boldWithLine, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.about.intro : en.about.intro}</Text>
          </View>
        </View>
        {Space(5)}
        <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.about.body.p1 : en.about.body.p1 }</Text>
        {Space(5)}
        <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.about.body.p2 : en.about.body.p2 }</Text>
        {Space(15)}
        <Text style={{...T.centered24, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.committeeSection.title : en.committeeSection.title }</Text>
        {Space(5)}
        <Text style={{...T.boldParagraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.committeeSection.intro : en.committeeSection.intro }</Text>
        <View style={GS.parentComitteeView}>

            <TouchableOpacity onPress={() => selectedComittee(0)}>
              <View style={{...GS.comittee1, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
                {comittee.selected == 0 ? 
                    <Image style={GS.image80} source={require('../../assets/committee/styret/styret-orange.png')} />
                  : 
                    <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/styret/styret555.png') : require('../../assets/committee/styret/styret-black.png')} />
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectedComittee(1)}>
              <View style={{...GS.comittee2, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
                {comittee.selected == 1 ? 
                    <Image style={GS.image80} source={require('../../assets/committee/eventkom/eventkom-orange.png')} />
                  : 
                    <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/eventkom/eventkom555.png') : require('../../assets/committee/eventkom/eventkom-black.png')} />
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectedComittee(2)}>
              <View style={{...GS.comittee3, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
                {comittee.selected == 2 ? 
                    <Image style={GS.image80} source={require('../../assets/committee/tekkom/tekkom-orange.png')} />
                  : 
                    <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/tekkom/tekkom555.png') : require('../../assets/committee/tekkom/tekkom-black.png')} />
                }
              </View>
            </TouchableOpacity>
        </View>
        <View style={GS.parentComitteeView}>
          <TouchableOpacity onPress={() => selectedComittee(3)}>
            <View style={{...GS.comittee1, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
              {comittee.selected == 3 ? 
                <Image style={GS.image80} source={require('../../assets/committee/prkom/pr-orange.png')} />
              : 
                <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/prkom/pr555.png') : require('../../assets/committee/prkom/pr-black.png')} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectedComittee(4)}>
            <View style={{...GS.comittee2, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
              {comittee.selected == 4 ? 
                  <Image style={GS.image80} source={require('../../assets/committee/ctfkom/ctfkom-orange.png')} />
                : 
                  <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/ctfkom/ctfkom555.png') : require('../../assets/committee/ctfkom/ctfkom-black.png')} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => selectedComittee(5)}>
            <View style={{...GS.comittee3, backgroundColor: FetchColor(theme, 'CONTRAST')}}>
              {comittee.selected == 5 ? 
                  <Image style={GS.image80} source={require('../../assets/committee/satkom/satkom-orange.png')} />
                : 
                  <Image style={GS.image80} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/satkom/satkom555.png') : require('../../assets/committee/satkom/satkom-black.png')} />
              }
            </View>
          </TouchableOpacity>
        </View>
        {
          info.map((relevantComittee, index) => {
            if (relevantComittee.id == comittee.selected) {
              return(
                <View key={index}>
                  <Text style={{...T.text30, color: FetchColor(theme, 'TEXTCOLOR')}}>
                  {relevantComittee.id == 0 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/styret/styret-white.png') : require('../../assets/committee/styret/styret-black.png')} />:null}
                  {relevantComittee.id == 1 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/eventkom/eventkom-white.png') : require('../../assets/committee/eventkom/eventkom-black.png')} />:null}
                  {relevantComittee.id == 2 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/tekkom/tekkom-white.png') : require('../../assets/committee/tekkom/tekkom-black.png')} />:null}
                  {relevantComittee.id == 3 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/prkom/pr-white.png') : require('../../assets/committee/prkom/pr-black.png')} />:null}
                  {relevantComittee.id == 4 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/ctfkom/ctfkom-white.png') : require('../../assets/committee/ctfkom/ctfkom-black.png')} />:null}
                  {relevantComittee.id == 5 ? <Image style={GS.small} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/committee/satkom/satkom.png') : require('../../assets/committee/satkom/satkom-black.png')} />:null}
                  {lang ? relevantComittee.titleNO : relevantComittee.titleEN}</Text>

                  {(relevantComittee.quoteNO && lang || relevantComittee.qouteEN && !lang) ? <Text style={{...T.boldParagraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? relevantComittee.quoteNO : relevantComittee.qouteEN}</Text>:null}
                  {(relevantComittee.quoteNO && lang || relevantComittee.qouteEN && !lang) ? Space(10):null}
                  <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? relevantComittee.descriptionNO : relevantComittee.descriptionEN}</Text>
                  {Space(15)}
                </View>
              )
            }
          })
        }

        {comittee.selected == 0 ? AllComitees(lang,theme): null}
        {comittee.selected == 1 ? person('evntkom', lang, theme): null}
        {comittee.selected == 2 ? person('tekkom', lang, theme): null}
        {comittee.selected == 3 ? person('pr', lang, theme): null}
        {comittee.selected == 4 ? person('ctf', lang, theme): null}
        {comittee.selected == 5 ? person('eco', lang, theme): null}

        {Space(10)}
        <Text style={{...T.text25, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.publicDocs.title : en.publicDocs.title }</Text>
        <View>
          <Text style={{...T.paragraph, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'For mer informasjon og offentlige dokumenter kan du besøke' : 'For more information and public documents, visit'}
            {<Text style={T.orange15} onPress={() => Linking.openURL('https://wiki.login.no')}> {lang ? "wikien":"the wiki"}</Text>}.
          </Text>
          
        </View>
        {Space(10)}
        <Social/>
        <Copyright/>
      </Cluster>
      {Space(10)}
      {Space(Dimensions.get('window').height/3)}
    </ScrollView>
  </View> 

{/* ========================= DISPLAY TOP MENU ========================= */}
{Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
    </TouchableOpacity>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Om Login' : 'About Login'}</Text>
  </View>
{/* ========================= DISPLAY BOTTOM MENU ========================= */}

    <BottomMenu navigation={navigation} screen="menu" />
  </View>
  )
};
