import FetchColor from '@styles/fetchTheme';                              // Function to fetch theme color
import { MS } from '@styles/menuStyles';                                  // Menu styles
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';                                       // Blur effect
import { getHeaderTitle } from '@react-navigation/elements';
import { Dimensions } from 'react-native';
import {                                                                    // React native components
  View,                                                                     // View component
  Image,                                                                    // Image component
  TouchableOpacity,                                                         // TouchableOpacity     (custom button)
  Text,
  StatusBar
} from 'react-native';                                                      // React native
import { ExtendedBottomTabHeaderProps } from '@interfaces';
import { ReactNode, useEffect, useState } from 'react';
import { FlipInEasyX } from 'react-native-reanimated';


export default function Header({layout, options, route, navigation}: ExtendedBottomTabHeaderProps): ReactNode{
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme }  = useSelector( (state: ReduxState) => state.theme )
    const eventPage = () => { navigation.navigate('EventScreen') }
    const title = options.title ? options.title[Number(lang)] : route.name;
    
    return (
        <>
            <BlurView tint='dark' style={{paddingTop: StatusBar.currentHeight, height: Dimensions.get('window').height*8/100+StatusBar?.currentHeight}} intensity={30}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', height: '100%'}}>
                {options.backIcon ? 
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={{}} source={require('@assets/icons/goback777.png')} />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={() => route.name != 'EventScreen' && eventPage()}>
                        <Image style={{width: 32, height: 32, left: '20%'}} source={theme == 0 || theme == 2 || theme == 3 ? require('@assets/logo/loginText.png') : require('@assets/logo/loginText-black.png')} />
                    </TouchableOpacity>
                }
                {
                    title.length > 40 ? <Text style={{color: FetchColor({theme, variable:'TITLETEXTCOLOR'})}}>{title}</Text>
                    : <Text style={{alignSelf: 'center', color: FetchColor({theme, variable:'TITLETEXTCOLOR'}), fontSize: 30}}>{title}</Text>
                }
                <View style={{flex: 1, display: 'flex', flexDirection: 'row-reverse'}}>
                    {options.headerComponents?.map((node, index)=>{return <View style={{display: 'flex'}} key={index}>{node}</View>})}
                </View>
                </View>
            </BlurView>
        </>
    )
}