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


export default function Header({layout, options, route, navigation}: ExtendedBottomTabHeaderProps): ReactNode{
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme }  = useSelector( (state: ReduxState) => state.theme )
    const title = options.title ? options.title[Number(lang)] : route.name;
    
    return (
        <>
            <BlurView tint='dark' style={{
                paddingTop: StatusBar.currentHeight, 
                height: Dimensions.get('window').height*8/100+(StatusBar?StatusBar.currentHeight:0)
                }} intensity={30}>
                <View style={{display:'flex', flexDirection:'row', height: '100%', paddingLeft: '5%', paddingRight: '5%'}}>
                    <View style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {options.headerComponents?.left?.map((node, index)=>{return <View style={{}} key={index}>{node}</View>})}
                    </View>
                    {
                        title.length > 40 ? <Text style={{color: FetchColor({theme, variable:'TITLETEXTCOLOR'})}}>{title}</Text>
                        : <Text style={{alignSelf: 'center', color: FetchColor({theme, variable:'TITLETEXTCOLOR'}), fontSize: 30}}>{title}</Text>
                    }
                    <View style={{flex: 1, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
                        {options.headerComponents?.right?.map((node, index)=>{return <View style={{}} key={index}>{node}</View>})}
                    </View>
                </View>
            </BlurView>
        </>
    )
}