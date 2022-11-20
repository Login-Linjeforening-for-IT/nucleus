{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import { SS } from '../../styles/settingStyles';
import sendEmail from '../../shared/sendMail';
import GreenLight, { Button, Check, GrayLight, RedLight } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { CardSmaller } from '../../shared/card';

{/* ========================= APP START ========================= */}

export default function ReportScreen( { navigation }) {

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
const sendForm = () => {
  if (data.name === data.name) {
    
    sendEmail(
        'eirik.hanasand@gmail.com',
        'Testing if mail works',
        'UserName, we need 2 minutes of your time to fill this quick survey [https://google.com]',
    ).then(() => {
        console.log('Your message was successfully sent!');
    });

    Alert.alert('Takk for beskjed.')
    setData({
      ...data,
      name: '',
      contact: '',
      content: '',
      check_nameInputChange: false,
      check_contactInputChange: false,
      check_contentInputChange: false,
    })
  } else {
    Alert.alert('Feil brukernavn eller passord')
  }
}
const goBack = () => {
  navigation.goBack()
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
        
        <View>
          <Text style={T.centered50}>Varsle</Text><Text/>
          <Text style={T.centered20}>Anonymt og sikkert. Alltid.</Text>
          <Text/><Text/>

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                <TextInput 
                style={GS.inputText}
                placeholder='Kontaktinformasjon varsler (frivillig)'
                placeholderTextColor={'#555'}
                textAlign='center'
                onChangeText={(val) => inputName(val)}
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
                <Text/>
              </View>
            </CardSmaller>
          </View>

          <Text/><Text/>

          <View style={SS.loginView}>
            <CardSmaller>
              <View style={SS.loginView}>
                <TextInput 
                style={GS.inputText}
                placeholder='Hvem angår hendelsen? (frivillig)'
                placeholderTextColor={'#555'}
                textAlign='center'
                onChangeText={(val) => inputContact(val)}
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
                <Text/>
              </View>
            </CardSmaller>
          </View>

          <Text/><Text/>

          <View style={SS.reportContentView}>
            <CardSmaller>
              <View style={SS.reportContentView}>
                <TextInput 
                multiline={true}
                style={GS.reportInputContentText}
                placeholder='Hva vil du rapportere?'
                placeholderTextColor={'#555'}
                textAlign='center'
                onChangeText={(val) => inputContent(val)}
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
                <Text/>
              </View>
            </CardSmaller>  
          </View>

          <View>
            <Text/><Text/><Text/>
            <TouchableOpacity 
            disabled ={!data.check_contentInputChange}
            onPress={() => sendForm()}>
              <Button style={SS.button}>
                <Text style={T.centered20}>SEND</Text>
              </Button>
            </TouchableOpacity>
            <Text/><Text/><Text/><Text/>
          </View>
        </View>
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
            <Image style={MS.bMenu1} source={require('../../assets/menu777.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};