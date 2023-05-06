{ /* ========================= IMPORTING NEEDED LIBRARIES ========================= */
}
import DynamicCircle from '../eventComponents/dynamicCircle';
import OldTopicSwitchList from './oldTopicSwitchList';
import Notification from '../functions/notification';
import ThemeSwitch from '../functions/themeSwitch';
import Language from '../functions/language';
import Space from '../functions/space';
import FetchColor from '../../styles/fetchTheme';
import {GS} from '../../styles/globalStyles';
import Card from '../functions/card';
import {MS} from '../../styles/menuStyles';
import {useSelector} from 'react-redux';
import {T} from '../../styles/text';
import {BlurView} from 'expo-blur';
import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import BellChange from './oldUI';

{ /* ========================= APP START ========================= */
}

export default function OldSettingScreen({navigation}) {

    const {theme} = useSelector((state) => state.theme)
    const {lang} = useSelector((state) => state.lang)
    const {login} = useSelector((state) => state.login)
    const {oldUI} = useSelector((state) => state.misc) // Old User Interface

    const eventPage = () => {
        navigation.navigate(!oldUI ? 'EventScreen' : 'OldEventScreen')
    }
    const menuPage = () => {
        navigation.navigate(!oldUI ? 'MenuScreen' : 'OldMenuScreen')
    }
    const adPage = () => {
        navigation.navigate('AdScreen')
    }

    return (
        <View> 
            <View style={
                {
                    ...GS.content,
                    backgroundColor: FetchColor(theme, 'BACKGROUND')
                }
            }>
                <ScrollView showsVerticalScrollIndicator={false}>
                {
                    Space(Dimensions.get('window').height / 8)
                }
                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Tema' : 'Theme'
                                }</Text>
                            </View>
                            <View style={
                                GS.view2
                            }><ThemeSwitch/></View>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Språk' : 'Language'
                                }</Text>
                            </View>
                            <View style={
                                GS.langView
                            }><Language/></View>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Gammel UI' : 'Old UI'
                                }</Text>
                            </View>
                            <View style={
                                GS.view2
                            }><BellChange/></View>
                        </View>
                    </Card>

                    {
                    Space(15)
                }
                    <Text style={
                        {
                            ...T.text30,
                            left: 15,
                            color: FetchColor(theme, 'OPPOSITETEXTCOLOR')
                        }
                    }>
                        {
                        lang ? 'Varslinger' : 'Notifications'
                    }</Text>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Viktig informasjon' : 'Important info'
                                }</Text>
                            </View>
                            <View style={
                                GS.view2
                            }><Notification category='IMPORTANT'/></View>
                        </View>
                    </Card>

                    {
                    Space(10)
                }
                    <Text style={
                        {
                            ...T.text25,
                            left: 15,
                            color: FetchColor(theme, 'OPPOSITETEXTCOLOR')
                        }
                    }>
                        {
                        lang ? 'Nye arrangementer' : 'New events'
                    }</Text>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Bedpres' : 'Company Presentations'
                                }</Text>
                            </View>
                            <Notification category='BEDPRES'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>TekKom</Text>
                            </View>
                            <Notification category='TEKKOM'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>CTF</Text>
                            </View>
                            <Notification category='CTF'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Sosialt' : 'Social'
                                }</Text>
                            </View>
                            <Notification category='SOCIAL'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? 'Karrieredag' : 'Career day'
                                }</Text>
                            </View>
                            <Notification category='KARRIEREDAG'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>Fadderuka</Text>
                            </View>
                            <Notification category='FADDERUKA'/>
                        </View>
                    </Card>


                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>Login</Text>
                            </View>
                            <Notification category='LOGIN'/>
                        </View>
                    </Card>

                    <Card>
                        <View style={
                            GS.notificationBack
                        }>
                            <View style={
                                GS.view
                            }>
                                <Text style={
                                    {
                                        ...GS.notificationText,
                                        color: FetchColor(theme, 'TEXTCOLOR')
                                    }
                                }>
                                    {
                                    lang ? "Annet" : "Other"
                                }</Text>
                            </View>
                            <Notification category='ANNET'/>
                        </View>
                    </Card>

                    {
                    Space(15)
                }
                    <Text style={
                        {
                            ...T.text25,
                            left: 15,
                            color: FetchColor(theme, 'OPPOSITETEXTCOLOR')
                        }
                    }>
                        {
                        lang ? 'Påminnelser' : 'Reminders'
                    }</Text>

                    {
                    OldTopicSwitchList("tekkom", "TekKom")
                }
                    {
                    OldTopicSwitchList("ctf", "CTF")
                }
                    {
                    lang ? OldTopicSwitchList("social", "Sosialt", 1) : OldTopicSwitchList("social", "Social", 1)
                }
                    {
                    lang ? OldTopicSwitchList("karrieredag", "Karrieredag", 1) : OldTopicSwitchList("karrieredag", "Career day", 1)
                }
                    {
                    OldTopicSwitchList("fadderuka", "Fadderuka", 1)
                }
                    {
                    OldTopicSwitchList("bedpres", "Bedpres", 1)
                }
                    {
                    OldTopicSwitchList("login", "Login", 1)
                }
                    {
                    lang ? OldTopicSwitchList("annet", "Annet", 1) : OldTopicSwitchList("annet", "Other", 1)
                }

                    {
                    Space((Dimensions.get('window').height / 3) + 10)
                } 
                </ScrollView>
            </View>

            {/* ========================= DISPLAY TOP MENU ========================= */}
            {
            Platform.OS === 'ios' ? <BlurView style={
                    MS.topMenu
                }
                intensity={30}/> : <View style={
                {
                    ...MS.topMenu,
                    backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')
                }
            }/>}
            <View style={
                {
                    ...MS.topMenu,
                    backgroundColor: FetchColor(theme, 'TRANSPARENT')
                }
            }>
                <TouchableOpacity onPress={
                    () => menuPage()
                }>
                    <Image style={
                            MS.goBack
                        }
                        source={
                            require('../../assets/icons/goback777.png')
                        }/>
                </TouchableOpacity>

                <View style={
                    GS.loginStatus
                }>
                    {
                    login ? DynamicCircle(10, 10, 'red', Dimensions.get('window').width / 1.4, null, 60, null) : null
                }</View>

                <Text style={
                    {
                        ...MS.screenTitle,
                        color: FetchColor(theme, 'TITLETEXTCOLOR')
                    }
                }>
                    {
                    lang ? 'Innstillinger' : 'Settings'
                }</Text>
            </View>

            {/* ========================= DISPLAY BOTTOM MENU ========================= */}
            {
            Platform.OS === 'ios' ? <BlurView style={
                    MS.bMenu
                }
                intensity={30}/> : <View style={
                {
                    ...MS.bMenu,
                    backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')
                }
            }/>}
            <View style={
                {
                    ...MS.bMenu,
                    backgroundColor: FetchColor(theme, 'TRANSPARENT')
                }
            }>
                <TouchableOpacity style={
                        MS.bMenuIconTO
                    }
                    onPress={
                        () => eventPage()
                }>
                    <Image style={
                            MS.bMenuIcon
                        }
                        source={
                            theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/calendar777.png') : require('../../assets/menu/calendar-black.png')
                        }/>
                </TouchableOpacity>
                <TouchableOpacity style={
                        MS.bMenuIconTO
                    }
                    onPress={
                        () => adPage()
                }>
                    <Image style={
                            MS.bMenuIcon
                        }
                        source={
                            theme == 0 || theme == 2 || theme == 3 ? require('../../assets/menu/business.png') : require('../../assets/menu/business-black.png')
                        }/>
                </TouchableOpacity>
                <TouchableOpacity style={
                        MS.bMenuIconTO
                    }
                    onPress={
                        () => menuPage()
                }>
                    <Image style={
                            MS.bMenuIcon
                        }
                        source={
                            require('../../assets/menu/menu-orange.png')
                        }/>
                </TouchableOpacity>
            </View>
        </View>

    )
};
