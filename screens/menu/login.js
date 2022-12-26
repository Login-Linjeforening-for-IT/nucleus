{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}
import { GS } from '../../styles/globalStyles';
import { MS } from '../../styles/menuStyles';
import { T } from '../../styles/text';
import { SS } from '../../styles/settingStyles';
import GreenLight, { Check, GrayLight, RedLight, DynamicCircle } from '../../shared/eventComponents/otherComponents';
import { Button, CardSmaller, Space } from '../../shared/sharedComponents';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginStatus } from '../../redux/loginStatus';
import { BlurView } from 'expo-blur';
import FetchColor from '../../styles/fetchTheme';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import React, { useState } from 'react';

{/* ========================= APP START ========================= */}

export default function LoginScreen( { navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )
  const { login } = useSelector( (state) => state.login )
  const { theme } = useSelector( (state) => state.theme )

  const dispatch = useDispatch()
  
  const goBack       = () => { navigation.navigate('ProfileScreen') }
  const menuPage     = () => { navigation.navigate('MenuScreen')    }              // Function to navigate to menu
  const eventPage    = () => { navigation.navigate('EventScreen')   }
  const listingPage  = () => { navigation.navigate('ListingScreen') }

  const internalPage = () => {
    if (data.name === database.name && data.pass === database.pass) {
      dispatch(changeLoginStatus())
      navigation.navigate('InternalScreen');
    } else {
      Alert.alert('Feil brukernavn eller passord')
    }
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
})

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
    <View>
{/* ========================= DISPLAY CONTENT ========================= */}
<View style={{...GS.content, backgroundColor: FetchColor(theme, 'BACKGROUND')}}>
{Space(Dimensions.get('window').height/7.5)}
        <View>
          {Space(80)}
            <Text style={{...T.centered50, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Innsida' : 'Intranet'}</Text>
            {Space(20)}

            <View style={SS.loginView}>
              <CardSmaller>
                <View style={SS.loginView}>
                  <TextInput 
                  style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                  placeholder={lang ? '         brukernavn' : '         username'}
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
                </View>
              </CardSmaller>
            </View>

            {Space(10)}

            <View style={SS.loginView}>
              <CardSmaller>
                <View style={SS.loginView}>
                  <TextInput 
                  style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                  placeholder={lang ? '         passord' : '         password'}
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
                      <View style = {{...SS.passCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                      <Image style={SS.showPassImage} source={require('../../assets/eyeF.png')} />
                    </View>
                    </View>
                    :
                    <View>
                    <View style = {SS.passLight}><RedLight/></View>
                    <View style = {{...SS.passCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                      <Image style={SS.showPassImage} source={require('../../assets/eyeT.png')} />
                    </View>
                    </View>
                    }
                    
                    </TouchableOpacity>
                  :
                  <View>
                    <View style = {SS.noPassLight}><GrayLight/></View>
                    <View style = {{...SS.noPassCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                      <Image style={SS.noPassImage} source={require('../../assets/eyeF.png')} />
                    </View>
                  </View>
                  }

                </View>
              </CardSmaller>
            </View>

            <View>
              {Space(20)}
              <TouchableOpacity 
              disabled ={!data.name || !data.pass}
              onPress={() => internalPage()}>
                <Button style={{...SS.button, backgroundColor: FetchColor(theme, 'ORANGE')}}>
                  <Text style={{...T.centered20, color: FetchColor(theme, 'TEXTCOLOR')}}>LOGIN</Text>
                </Button>
              </TouchableOpacity>
            </View>
            {Space(40)}

              <View style={SS.makeNotificationImage}>
                <Image style={GS.smallImage} source={require('../../assets/loginText.png')} />
              </View>
        </View>
        {Space(Dimensions.get('window').height/10)}
      </View>   

{/* ========================= DISPLAY TOP MENU ========================= */}
<BlurView style={MS.topMenu} intensity={30}/>
      <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
    <TouchableOpacity onPress={() => menuPage()}>
      <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
    </TouchableOpacity>

    <View style={GS.loginStatus}>{login ? DynamicCircle(10,10,'red',0,0,60,0):null}</View>

    <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'Innsida' : 'Intranet'}</Text>
  </View>

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
<BlurView style={MS.bMenu} intensity={30}/>
    <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => menuPage()}>
              <Image style={MS.bMenuIcon} source={require('../../assets/menu-orange.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};