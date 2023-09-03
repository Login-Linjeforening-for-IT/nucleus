import Space, { Line } from '../../shared/components/utils';
import Paragraph from '../../shared/components/paragraph';
import { Kontakt } from '../../shared/functions/social';
import Cluster from '../../shared/functions/cluster';
import en from '../../locales/en/companiesPage.json'
import no from '../../locales/nb/companiesPage.json'
import BottomMenu from '../../shared/bottomMenu';
import FetchColor from '../../styles/fetchTheme';                               // Color fetcher
import { GS } from '../../styles/globalStyles';                                 // Global styles 
import TopMenu from '../../shared/topMenu';
import { useSelector } from 'react-redux';                                      // Redux
import { T } from '../../styles/text';                                          // Text styles 
import React from 'react';                                                      // React
import {      
    Text,                                                                       // Text component
    View,                                                                       // View component
    ScrollView,                                                                 // Scrollable view
    Dimensions,                                                                 // Screen size
} from 'react-native';

export default function BusinessScreen( { navigation }) {                       // Declaring the screen

    const { lang  } = useSelector( (state) => state.lang  )                     // Language state
    const { theme } = useSelector( (state) => state.theme )                     // Theme state
    const isDark = theme == 0 || theme == 2 || theme == 3 ? true : false
    const logo = {
        bedpres:    isDark ? require('../../assets/committee/eventkom/bedpres-white.png') : require('../../assets/committee/eventkom/bedpres-black.png'),
        pr:         isDark ? require('../../assets/committee/prkom/pr-white.png')         : require('../../assets/committee/prkom/pr-black.png'),
        ctf:        isDark ? require('../../assets/committee/ctfkom/ctfkom-white.png')    : require('../../assets/committee/ctfkom/ctfkom-black.png'),
        workshop:   isDark ? require('../../assets/committee/eventkom/workshop.png')      : require('../../assets/committee/eventkom/workshop-black.png'),
        profiling:  isDark ? require('../../assets/committee/eventkom/utlysning.png')     : require('../../assets/committee/eventkom/utlysning-black.png')
    }

  return(
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        {Space(Dimensions.get('window').height/8.1)}
          <Cluster>
            <Text style={{...T.bold40, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? no.companies.title : en.companies.title}</Text>{Space(5)}

            {Space(10)}

            <View style={GS.row}>
              <Text>{Line(60,5)}</Text>
              <View>
              <Text style={{...T.boldWithLine, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Er din bedrift på utskikk etter skarpe IT-studenter? Sjekk ut alt vi har å tilby din bedrift.': 'Is your company looking for sharp IT students? Check out everything we have to offer your company.'}</Text>
              </View>
            </View>

            {Space(10)}

            <Paragraph logo={logo.bedpres}      title={lang ? no.companies.bedpres.title : en.companies.bedpres.title}      body={lang ? no.companies.bedpres.body : en.companies.bedpres.body} />
            <Paragraph logo={logo.pr}           title={lang ? no.companies.cyberdays.title : en.companies.cyberdays.title}  body={lang ? no.companies.cyberdays.body : en.companies.cyberdays.body} />
            <Paragraph logo={logo.ctf}          title={lang ? no.companies.ctf.title : en.companies.ctf.title}              body={lang ? no.companies.ctf.body : en.companies.ctf.body} />
            <Paragraph logo={logo.workshop}     title={lang ? no.companies.workshop.title : en.companies.workshop.title}    body={lang ? no.companies.workshop.body : en.companies.workshop.body} />
            <Paragraph logo={logo.profiling}    title={lang ? no.companies.profiling.title : en.companies.profiling.title}  body={lang ? no.companies.profiling.body : en.companies.profiling.body} />

            {Space(10)}

            <Kontakt/>
          </Cluster>
            
          {Space(10)}
          {Space(Dimensions.get('window').height/3)}
        </ScrollView>
        
        </View>   
        <TopMenu navigation={navigation} title={lang ? "For bedrifter" : "For companies"} back={"MenuScreen"} />
        <BottomMenu navigation={navigation} screen="menu" back={true} />
    </View>
    
  )
};