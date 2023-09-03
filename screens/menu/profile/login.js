import GreenLight, { RedLight, GrayLight } from '../../../shared/eventComponents/light';
import Cluster from '../../../shared/functions/cluster';
import { changeLoginStatus } from '../../../redux/loginStatus';
import { useSelector, useDispatch } from 'react-redux';
import Check from '../../../shared/eventComponents/check';
import Button from '../../../shared/functions/button';
import Space from '../../../shared/components/utils';
import FetchColor from '../../../styles/fetchTheme';                                   // Function for fetching theme color
import { SS } from '../../../styles/settingStyles';
import { GS } from '../../../styles/globalStyles';                                     // Global styles
import React, { useState } from 'react';
import { T } from '../../../styles/text';                                              // Text styles
import { 
    Text,                                                                             // Text component
    View,                                                                             // View component
    Image,                                                                            // Image component
    TouchableOpacity,                                                                 // TouchableOpacity (custom button)
    Dimensions,                                                                       // Screen size
    TextInput,
    Alert,
} from 'react-native';                                                              // React Native
import BottomMenu from '../../../shared/bottomMenu';
import TopMenu from '../../../shared/topMenu';

{/* ========================= IMPORTING NEEDED LIBRARIES ========================= */}

{/* ========================= APP START ========================= */}

export default function LoginScreen( { navigation }) {

    const { lang  } = useSelector( (state) => state.lang  )
    const { login } = useSelector( (state) => state.login )
    const { theme } = useSelector( (state) => state.theme )

    const dispatch = useDispatch()

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

        <TopMenu navigation={navigation} title={lang ? "Login" : "Login"} back={"MenuScreen"} />
        <BottomMenu navigation={navigation} screen="menu" back={true} />
    </View>
  )
};