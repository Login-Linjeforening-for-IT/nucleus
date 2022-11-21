{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { StatusBar } from 'expo-status-bar';
import { GS } from '../styles/globalStyles';
import { MS } from '../styles/menuStyles';
import { T } from '../styles/text';
import { SS } from '../styles/settingStyles';
import GreenLight, { Button, Check, GrayLight, RedLight } from '../shared/sharedComponents';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { useState } from 'react';
import { CardSmaller } from '../shared/card';

{/* ========================= APP START ========================= */}

export default function LoginScreen( { navigation }) {

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
const internalPage = () => {
  if (data.name === database.name && data.pass === database.pass) {
    navigation.navigate('InternalScreen');
  } else {
    Alert.alert('Feil brukernavn eller passord')
  }
}
const goBack = () => {
  navigation.goBack()
}
const [data, setData] = useState({
  name: '',
  pass: '',
  check_textInputChange: false,
  check_passInputChange: false,
  secureTextEntry: true
}) 

const [database] = useState({
  name: 'admin',
  pass: 'admin'
}
)

const inputName = (val) => {
  if(val.length > 0) {
    setData({
      ...data,
      name: val,
      check_textInputChange: true
    })
  }else{
    setData({
      ...data,
      name: val,
      check_textInputChange: false
    })
  }
}

const inputPass = (val) => {
  if (val.length > 0) {
    setData({
      ...data,
      pass: val,
      check_passInputChange: true
    })
  }else{
    setData({
      ...data,
      check_passInputChange: false
    })
  }
}


const showPass = () => {
  setData({
    ...data,
    secureTextEntry: !data.secureTextEntry
  });
}

  return(
    <View style={MS.backGround}>
      <StatusBar style="light" />
{/* ========================= DISPLAY TOP MENU ========================= */}
  <View style={MS.topMenu}>
    <TouchableOpacity onPress={() => goBack()}>
      <Image style={MS.goBack} source={require('../assets/goback777.png')} />
    </TouchableOpacity>
    <View style={MS.tMenuIcons}>
      <TouchableOpacity onPress={() => ProfilePage()}>
        <Image style={MS.tMenuL} source={require('../assets/loginperson-orange.png')} />
      </TouchableOpacity>
    </View>
  </View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={GS.content}>
        
        <View>
      
            <Text style={T.centered50}>Innsida</Text>
            <Text/><Text/>

            <View style={SS.loginView}>
              <CardSmaller style={SS.inputField}>
                <View style={SS.loginView}>
                  <TextInput 
                  style={GS.inputText}
                  placeholder='brukernavn'
                  placeholderTextColor={'#555'}
                  textAlign='center'
                  onChangeText={(val) => inputName(val)}
                  />
                   {data.check_textInputChange ?
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
              <CardSmaller style={SS.inputField}>
                <View style={SS.loginView}>
                  <TextInput 
                  style={GS.inputText}
                  placeholder='passord'
                  placeholderTextColor={'#555'}
                  secureTextEntry = {data.secureTextEntry ? true : false}
                  textAlign='center'
                  onChangeText={(val) => inputPass(val)}
                  />
                  {data.check_passInputChange ?
                    <TouchableOpacity onPress={showPass}>
                    {data.secureTextEntry ?
                      <View>
                      <View style = {SS.passLight}><GreenLight/></View>
                      <View style = {SS.passCheck}>
                      <Image style={SS.showPassImage} source={require('../assets/eyeF.png')} />
                    </View>
                    </View>
                    :
                    <View>
                    <View style = {SS.passLight}><RedLight/></View>
                    <View style = {SS.passCheck}>
                      <Image style={SS.showPassImage} source={require('../assets/eyeT.png')} />
                    </View>
                    </View>
                    }
                    
                    </TouchableOpacity>
                  :
                  <View>
                    <View style = {SS.noPassLight}><GrayLight/></View>
                    <View style = {SS.noPassCheck}>
                      <Image style={SS.noPassImage} source={require('../assets/eyeF.png')} />
                    </View>
                  </View>
                  }

                </View>
              </CardSmaller>
            </View>

            <View>
              <Text/><Text/><Text/>
              <TouchableOpacity 
              disabled ={!data.name || !data.pass}
              onPress={() => internalPage()}>
                <Button style={SS.button}>
                  <Text style={T.centered20}>LOGIN</Text>
                </Button>
              </TouchableOpacity>
              <Text/><Text/><Text/><Text/>
            </View>
              

              <View style={SS.makeNotificationImage}>
                  <Image style={GS.creditImage} source={require('../assets/login-text.png')} />
                </View>
        </View>
      </View>   

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
          <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenu3} source={require('../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenu2} source={require('../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => settingsPage()}>
            <Image style={MS.bMenu1} source={require('../assets/menu-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};