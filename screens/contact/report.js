{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import { SS } from '../../styles/settingStyles';
import React, { useState } from 'react';
import GreenLight, { Button, Check, GrayLight } from '../../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { CardSmaller } from '../../shared/sharedComponents';

{/* ========================= APP START ========================= */}

export default function ReportScreen( { navigation }) {

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
const sendForm = () => {
  if (data.name === data.name) {

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
    <View>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <Text style={MS.screenTitle}>     Varsle</Text>

      <TouchableOpacity onPress={() => profilePage()}>
        <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
      </TouchableOpacity>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <View>
          <Text style={T.centered}>Anonymt og sikkert. Alltid.</Text>
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
      <View style={MS.bMenu}>
          <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};