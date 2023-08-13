import DynamicCircle from '../../../shared/eventComponents/dynamicCircle';
import GreenLight from '../../../shared/eventComponents/greenLight';
import GrayLight from '../../../shared/eventComponents/grayLight';
import Cluster from '../../../shared/functions/cluster';
import RedLight from '../../../shared/eventComponents/redLight';
import { changeLoginStatus } from '../../../redux/loginStatus';
import { useSelector, useDispatch } from 'react-redux';
import Check from '../../../shared/eventComponents/check';
import Button from '../../../shared/functions/button';
import Space from '../../../shared/functions/space';
import FetchColor from '../../../styles/fetchTheme';                                   // Function for fetching theme color
import { SS } from '../../../styles/settingStyles';
import { GS } from '../../../styles/globalStyles';                                     // Global styles
import { MS } from '../../../styles/menuStyles';                                       // Menu styles
import React, { useState } from 'react';
import { T } from '../../../styles/text';                                              // Text styles
import { BlurView } from 'expo-blur';                                               // Blur effect
import { 
    Text,                                                                             // Text component
    View,                                                                             // View component
    Image,                                                                            // Image component
    TouchableOpacity,                                                                 // TouchableOpacity (custom button)
    Dimensions,                                                                       // Screen size
    Platform,
    TextInput,
    Alert,
    Keyboard,
} from 'react-native';                                                              // React Native

{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}

{/* ========================= APP START ========================= */}

export default function LoginScreen( { navigation }) {

    const { lang  } = useSelector( (state) => state.lang  )
    const { login } = useSelector( (state) => state.login )
    const { theme } = useSelector( (state) => state.theme )

    const dispatch = useDispatch()
    const eventPage = () => { navigation.navigate('EventScreen') }
    const menuPage = () => { navigation.navigate('MenuScreen') }
    // const adPage = () => { navigation.navigate('AdScreen') }

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
        <View style={{...GS.content, backgroundColor: FetchColor(theme, 'DARKER')}}>
            {Space(Dimensions.get('window').height/8.1)}
                <View>
                    {Space(80)}
                    <Text style={{...T.centered50, color: FetchColor(theme, 'TEXTCOLOR')}}>{lang ? 'Innsida' : 'Intranet'}</Text>
                    {Space(20)}

                    <View style={SS.loginView}>
                        <Cluster>
                            <View style={SS.loginView}>
                                <TextInput 
                                    style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                                    placeholder={lang ? '         brukernavn' : '         username'}
                                    placeholderTextColor={'#555'}
                                    textAlign='center'
                                    onChangeText={(val) => inputName(val)}
                                    selectionColor={FetchColor(theme, "ORANGE")}
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
                        </Cluster>
                    </View>

                    {Space(10)}

                    <View style={SS.loginView}>
                    <Cluster>
                        <View style={SS.loginView}>
                        <TextInput 
                            style={{...GS.inputText, backgroundColor: FetchColor(theme, 'DARKER'), color: FetchColor(theme, 'TEXTCOLOR')}}
                            placeholder={lang ? '         passord' : '         password'}
                            placeholderTextColor={'#555'}
                            secureTextEntry = {data.secureTextEntry ? true : false}
                            textAlign='center'
                            onChangeText={(val) => inputPass(val)}
                            selectionColor={FetchColor(theme, "ORANGE")}
                        />
                        {data.check_passInputChange ?
                            <TouchableOpacity onPress={showPass}>
                            {data.secureTextEntry ?
                            <View>
                            <View style = {SS.passLight}><GreenLight/></View>
                            <View style = {{...SS.passCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                            <Image style={SS.showPassImage} source={require('../../../assets/icons/eyeF.png')} />
                            </View>
                            </View>
                            :
                            <View>
                            <View style = {SS.passLight}><RedLight/></View>
                            <View style = {{...SS.passCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                            <Image style={SS.showPassImage} source={require('../../../assets/icons/eyeT.png')} />
                            </View>
                            </View>
                            }
                            
                            </TouchableOpacity>
                        :
                        <View>
                            <View style = {SS.noPassLight}><GrayLight/></View>
                            <View style = {{...SS.noPassCheck, color: FetchColor(theme, 'TEXTCOLOR')}}>
                            <Image style={SS.noPassImage} source={require('../../../assets/icons/eyeF.png')} />
                            </View>
                        </View>
                        }

                    </View>
                </Cluster>
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
                    <Image style={GS.smallImage} source={require('../../../assets/logo/loginText.png')} />
                </View>
            </View>
            {Space(Dimensions.get('window').height/3)}
        </View>

    {/* ========================= DISPLAY TOP MENU ========================= */}
    {Platform.OS === 'ios' ? <BlurView style={MS.topMenu} intensity={30}/> : <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
    <View style={{...MS.topMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
        <TouchableOpacity onPress={() => menuPage()}>
            <Image style={MS.goBack} source={require('../../../assets/icons/goback777.png')} />
        </TouchableOpacity>

        <View style={GS.loginStatus}>
            {login ? DynamicCircle(10,10,'red',Dimensions.get('window').width/1.4,null,60,null):null}
        </View>

        <Text style={{... MS.screenTitle, color: FetchColor(theme, 'TITLETEXTCOLOR')}}>{lang ? 'For bedrifter' : 'For companies'}</Text>
    </View>

    {/* ========================= DISPLAY BOTTOM MENU ========================= */}
    {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
        <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT')}}>
            <TouchableOpacity style={MS.bMenuIconTO} onPress={() => eventPage()}>
                <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../../assets/menu/calendar777.png') : require('../../../assets/menu/calendar-black.png')} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={MS.bMenuIconTO} onPress={() => adPage()}>
                <Image style={MS.bMenuIcon} source={theme == 0 || theme == 2 || theme == 3 ? require('../../../assets/menu/business.png') : require('../../../assets/menu/business-black.png')} />
            </TouchableOpacity> */}
            <TouchableOpacity style={MS.bMenuIconTO} onPress={() => menuPage()}>
                <Image style={MS.bMenuIcon} source={require('../../../assets/menu/menu-orange.png')} />
            </TouchableOpacity>
        </View>
    </View>
  )
};