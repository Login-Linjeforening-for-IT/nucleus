
import { View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BlurView} from 'expo-blur'
import { MS } from '../../styles/menuStyles';
import FetchColor from '../../styles/fetchTheme';
import { useSelector } from 'react-redux';


export default function MyTabBar({ state, descriptors, navigation }) {
    const { theme } = useSelector( (state) => state.theme )
    return (
        <>
        {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
        <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT') }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                if(!options.display){
                    return
                }
                const isFocused = state.index === index;
        
                const onPress = () => {
                    const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                    });
                
                    if (!isFocused && !event.defaultPrevented) {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate({ name: route.name, merge: true });
                    }
                };
        
                const onLongPress = () => {
                    navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    style={{...MS.bMenuIconTO}}
                    onPress={onPress} onLongPress={onLongPress}
                    >
                    <Image style={MS.bMenuIcon} source={isFocused?options.focusedIcon:options.themeIcon(theme)}></Image>
                    </TouchableOpacity>
                );
            })}
        </View>
        </>
    );
}