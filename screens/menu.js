import { nativeApplicationVersion } from "expo-application";
import { createStackNavigator } from "@react-navigation/stack";
import Cluster from '../shared/functions/cluster';
import Space from "../shared/components/utils";
import FetchColor from '../styles/fetchTheme';
import { CS } from '../styles/clusterStyles';
import { GS } from '../styles/globalStyles';
import { ES } from '../styles/eventStyles';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import TopMenu from '../shared/topMenu';
import { T } from '../styles/text';
import InternalScreen from '../screens/menu/internal'; // Internal screen
import BusinessScreen from '../screens/menu/business'; // Companies' screen
// import SpecificAdScreen from '../screens/specificAd'; // Specific job listing
import SettingScreen from '../screens/menu/settings'; // Settings
import ReportScreen from '../screens/menu/report'; // Report form for blameworthy conditions
import AboutScreen from '../screens/menu/about'; // About Login
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Linking,
    Dimensions,
    Alert
} from 'react-native';

const MenuStack = createStackNavigator();

{/* ========================= APP START ========================= */ }

export default function MenuScreen() {

    const { lang } = useSelector((state) => state.lang)
    const { login } = useSelector((state) => state.login)
    const { theme } = useSelector((state) => state.theme)
    const { id, name, image } = useSelector((state) => state.profile)
    const profile = { id: 0, name: "Eirik Hanasand", image }

    const [setting] = useState([
        { id: '1', nav: SettingScreen, titleNO: 'Innstillinger', titleEN: 'Settings' },
        //{id: '2', nav: 'ReportScreen',        titleNO: 'Varsle',          titleEN: 'Report'         },
        { id: '3', nav: AboutScreen, titleNO: 'Om oss', titleEN: 'About Login' },
        { id: '4', nav: BusinessScreen, titleNO: 'For bedrifter', titleEN: 'For companies' },
        // { id: '5', nav: LoginScreen, titleNO: 'Innsida (verv)', titleEN: 'Intranet (verv)' },
    ])
    const [feedback, setFeedback] = useState({ status: 0 })                   //  Feedback options visibility boolean

    function toggleFeedback() {                                             //  --- UPDATES FEEDBACK STATE ---
        setFeedback({                                                         //  Function to show feedback types
            status: !feedback.status                                       //  Change feedback state
        });
    }

    return (
        <>
        <MenuStack.Navigator
            initialRouteName="root"
            screenOptions={{
                headerShown: false,
                animationEnabled: false
            }}>
            <MenuStack.Screen name="root">
                {({ navigation }) => <>
                    <View style={{ ...GS.content, backgroundColor: FetchColor(theme, 'DARKER') }}>
                        <FlatList
                            style={{ minHeight: '100%' }}
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            data={setting}
                            renderItem={({ item, index }) => (
                                <View>
                                    {index == 0 ? Space(Dimensions.get('window').height / 8) : null}
                                    {/* {index == 0 ? SmallProfile(navigation, theme, lang, profile, login) : null} */}
                                    <TouchableOpacity onPress={() => item.id == 5 && login ? navigation.navigate('InternalScreen') : navigation.navigate(item.nav.name)}>
                                        <Cluster>
                                            <View style={{ ...CS.clusterBack }}>
                                                <View style={CS.twinLeft}>
                                                    <Text style={{ ...T.text20, color: FetchColor(theme, 'TEXTCOLOR') }}>{lang ? item.titleNO : item.titleEN}</Text>
                                                </View>
                                                <View style={CS.twinRight}>
                                                    <Image style={CS.arrowImage} source={require('../assets/icons/dropdownBase.png')} />
                                                </View>
                                            </View>
                                        </Cluster>
                                    </TouchableOpacity>
                                    <View>
                                        {Space(10)}
                                        {index == setting.length - 1 && !feedback.status ?
                                            <TouchableOpacity onPress={() => toggleFeedback()}>
                                                <View>
                                                    <Text style={{ ...T.contact, textDecorationLine: 'underline', color: FetchColor(theme, 'OPPOSITETEXTCOLOR') }}>{lang ? 'Gi tilbakemelding' : 'Give feedback'}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            : null}

                                        {index == setting.length - 1 && feedback.status ?
                                            <View style={{ ...ES.row, justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity onPress={() => Linking.openURL('https://discordapp.com/users/376827396764073997')}>
                                                    <View style={{ backgroundColor: FetchColor(theme, 'BACKGROUND') }}>
                                                        <Text style={{ ...T.contact, textDecorationLine: 'underline', color: FetchColor(theme, 'OPPOSITETEXTCOLOR') }}>Discord</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={async () => {
                                                    Linking.openURL('mailto:kontakt@login.no').catch(() => lang ? Alert.alert('Kunne ikke åpne mail!', 'Mail: kontakt@login.no') : Alert.alert('Could not open mail!', 'Reach us at kontakt@login.no'))
                                                }}>
                                                    <View>
                                                        <Text style={{ ...T.contact, textDecorationLine: 'underline', color: FetchColor(theme, 'OPPOSITETEXTCOLOR') }}>Mail</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            : null}
                                    </View>
                                    {index == setting.length - 1 ? <Text style={{ ...T.contact, color: FetchColor(theme, 'OPPOSITETEXTCOLOR') }}>{lang ? `Versjon ${nativeApplicationVersion}` : `Version ${nativeApplicationVersion}`}</Text> : null}
                                </View>
                            )}
                        ></FlatList></View></>}
            </MenuStack.Screen>
            {setting.map((screen, index) => {
                return (
                    <MenuStack.Screen {...{ key: index, name: screen.nav.name, component: screen.nav }}></MenuStack.Screen>
                )
            })}
            <MenuStack.Screen name={InternalScreen.name} component={InternalScreen}></MenuStack.Screen>
        </MenuStack.Navigator>
        </>
    )
};

