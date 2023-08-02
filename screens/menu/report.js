{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import DynamicCircle from '../../shared/eventComponents/dynamicCircle';
import GreenLight from '../../shared/eventComponents/greenLight';
import GrayLight from '../../shared/eventComponents/grayLight';
import CardSmaller from '../../shared/functions/cardSmaller';
import Check from '../../shared/eventComponents/check';
import Button from '../../shared/functions/button';
import Space from '../../shared/functions/space';
import FetchColor from '../../styles/fetchTheme';
import { SS } from '../../styles/settingStyles';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { T } from '../../styles/text';
import { BlurView } from 'expo-blur';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
  Dimensions,
  Platform
} from 'react-native';

{/* ========================= APP START ========================= */}

export default function ReportScreen( { navigation }) {
 
  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const eventPage   = () => { navigation.navigate('EventScreen') }
  const menuPage   = () => { navigation.navigate('MenuScreen') }
  const adPage = () => { navigation.navigate('AdScreen') }
  
  const sendForm = () => {
    if (data.name === data.name) {
      lang ? Alert.alert('Denne funksjonen kommer snart', 'Midlertidig løsning:\nMail: kontakt@login.no\nDiscord: Axe#9595') : Alert.alert('This function is coming soon.', 'Temporary solution:\nMail: kontakt@login.no\nDiscord: Axe#9595') // Takk for beskjed. / Thanks for letting us know.
    } else {
      lang ? Alert.alert('Feil! Vennligst send varslingen som anonym epost til kontakt@login.no') : Alert.alert('Error! Please send the report as an anonymous email to kontakt@login.no')
    }
  }

const [data, setData] = useState({
  name: '',
  contact: '',
  content: '',
  check_nameInputChange: false,
  check_contactInputChange: false,
  check_contentInputChange: false,
}) 

const [database] = useState({
  name: 'admin',
  pass: 'admin'
}
)

const inputName = (val) => {
  if(val.length > 1) {
    setData({
      ...data,
      name: val,
      check_nameInputChange: true
    })
  }else{
    setData({
      ...data,
      name: val,
      check_nameInputChange: false
    })
  }
}

const inputContact = (val) => {
  if(val.length > 1) {
    setData({
      ...data,
      contact: val,
      check_contactInputChange: true
    })
  }else{
    setData({
      ...data,
      content: val,
      check_contactInputChange: false
    })
  }
}

const inputContent = (val) => {
  if(val.length > 20) {
    setData({
      ...data,
      content: val,
      check_contentInputChange: true
    })
  }else{
    setData({
      ...data,
      content: val,
      check_contentInputChange: false
    })
  }
}

  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View>
      {/* ========================= DISPLAY CONTENT ========================= */}
      <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
        <View>
          {Space((Dimensions.get('window').height/8.1)+40)}
          <Text style={{...T.centered, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Anonymt og sikkert. Alltid.' : 'Anonymous and secure. Always.'}</Text>
          {Space(30)}

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                <TextInput 
                style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                placeholder = {lang ? 'Kontaktinformasjon varsler (frivillig)' : 'Contact info reporter (voluntary)'}
                placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                textAlign='center'
                onChangeText={(val) => inputName(val)}
                selectionColor={FetchColor(theme, "ORANGE")}
                />
                  {data.check_nameInputChange ?
                <View>
                <View style = {SS.greenLight}><GreenLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                :
                <View>
                <View style = {SS.greenLight}><GrayLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                }
              </View>
            </CardSmaller>
          </View>

          {Space(20)}

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                <TextInput 
                style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                placeholder = {lang ? 'Hvem angår hendelsen? (frivillig)' : 'Who is affected? (voluntary'}
                placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                textAlign='center'
                onChangeText={(val) => inputContact(val)}
                selectionColor={FetchColor(theme, "ORANGE")}
                />
                  {data.check_contactInputChange ?
                <View>
                <View style = {SS.greenLight}><GreenLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                :
                <View>
                <View style = {SS.greenLight}><GrayLight/></View>
                <View style = {SS.checkContent}><Check/></View>
                </View>
                }
              </View>
            </CardSmaller>
          </View>

          {Space(20)}
          
            <View style={SS.reportContentView}>
              <CardSmaller>
                <View style={SS.reportContentView}>
                  <TextInput 
                  multiline={true}
                  style={{...GS.reportInputContentText, color: FetchColor(theme, 'TEXTCOLOR')}}
                  placeholder = {lang ? 'Hva vil du rapportere?' : 'What would you like to report?'}
                  placeholderTextColor={FetchColor(theme, 'TITLETEXTCOLOR')}
                  textAlign='center'
                  onChangeText={(val) => inputContent(val)}
                  selectionColor={FetchColor(theme, "ORANGE")}
                  />
                    {data.check_contentInputChange ?
                  <View>
                  <View style = {SS.reportGreenLight}><GreenLight/></View>
                  <View style = {SS.reportCheckContent}><Check/></View>
                  </View>
                  :
                  <View>
                  <View style = {SS.reportGreenLight}><GrayLight/></View>
                  <View style = {SS.reportCheckContent}><Check/></View>
                  </View>
                  }
                </View>
              </CardSmaller>  
            </View>

          <View>
          {Space(40)}
            <TouchableOpacity 
            disabled ={!data.check_contentInputChange}
            onPress={() => sendForm()}>
              <Button style={{...SS.button, backgroundColor: FetchColor(theme, 'ORANGE')}}>
                <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>SEND</Text>
              </Button>
            </TouchableOpacity>
            {Space(20)}
          </View>
        </View>
        {Space(Dimensions.get('window').height/10)}
    </View>   

  {/* ========================= DISPLAY TOP MENU ========================= */}
  {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => menuPage()}>
          <Image style={MS.goBack} source={require('../../assets/icons/goback777.png')} />
        </TouchableOpacity>

        <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}</View>

        <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Varsle' : 'Report'}</Text>

      </View>

      {/* ========================= DISPLAY BOTTOM MENU ========================= */}
      {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
            <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={MS.bMenuIconTO} onPress={() => adPage()}>
            <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
              <Image style={MS.bMenuIcon} source={require('../../assets/menu/menu-orange.png')} />
            </TouchableOpacity>
        </View>     
      </View>
    </TouchableWithoutFeedback>

  )
};