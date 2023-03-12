import CornerSquare from '../eventComponents/cornerSquare';
import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import { useSelector } from 'react-redux';
import { T } from '../../styles/text'
import Space from './space';
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native';

/**
 * Function for displaying all comitees 
 * @returns View containing all comittees
 */
export default function AllComitees() {
    
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )
    // Todo: Rework this into a more general solution
    return(
        <View>
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img%2Fportraits%2Fportrett_leder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'Leder' : 'Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Tormod Müller</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/210124409816612876')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}Backsiide#3129</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img%2Fportraits%2Fportrett_nestleder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'Nestleder' : 'Deputy chairman'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Kristina Kataki</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/877108421772582962')}>
          <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}Kataki#7254</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img%2Fportraits%2Fportrett_sekret%C3%A6r.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'Sekretær' : 'Secretary'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Aleksander Aaboen</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/610784035777544202')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}aleksanderaa#2130</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img/portraits/portrett_eventkom-leder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'EventKom leder' : 'EventKom Leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Sander Hauge</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/171972901501796352')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}Sandiss#5586</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img/portraits/portrett_pr-leder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'PR leder' : 'PR leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Ida Førland</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/470279697465606159')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}IdaForland#1277</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img/portraits/portrett_tekkom-leder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'TekKom leder' : 'TekKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Eirik Hanasand</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/376827396764073997')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}Axe#9595</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img/portraits/portrett_ctfkom-leder.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme, Math.floor(Math.random() * 2))}</View>
          <Text style={T.leaderTitle}>{lang ? 'CTF leder' : 'CTF leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Eskil Refsgaard</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/522483274933731331')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}refsgaard#9067</Text>
          </TouchableOpacity>
          {Space(25)}
          <Image style={GS.personImage} source={{uri: `https://cdn.login.no/img%2Fportraits%2Fportrett_%C3%B8konomi.jpg`}} />
          {Space(10)}
          <View style={{position: 'relative', left: 0, bottom: 0}}>{CornerSquare(theme)}</View>
          <Text style={T.leaderTitle}>{lang ? 'SatKom leder' : 'SatKom leader'}</Text>
          {Space(5)}
          <Text style={{...T.leaderName, color: FetchColor(theme, 'TEXTCOLOR')}}>Trygve Sollund</Text>
          {Space(5)}
          <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/209395476288634881')}>
            <Text style={{...T.discord, color: FetchColor(theme, 'DISCORD')}}>{<Image style={GS.tiny} source={require('../../assets/social/discord-colored.png')} />}Spikeupine#4356</Text>
          </TouchableOpacity>
          {Space(20)}
        </View>
    )
}