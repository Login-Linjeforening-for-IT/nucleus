// Import needed components
import { View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BlurView} from 'expo-blur'
import { MS } from 'login/styles/menuStyles';
import FetchColor from 'login/styles/fetchTheme';
import { useSelector } from 'react-redux';


export default function Footer({ state, descriptors, navigation }) {
    // Get the current theme
    const { theme } = useSelector( (state) => state.theme )

    return (
        <>
            {/*Create a blur element to blur tab backgound or android alternative*/}
            {Platform.OS === 'ios' ? <BlurView style={MS.bMenu} intensity={30}/> : <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENTANDROID')}}/>}
            {/* Transparent container for the icons */}
            <View style={{...MS.bMenu, backgroundColor: FetchColor(theme, 'TRANSPARENT') }}>
                {/* Create the icons based on options passed from stack.js */}
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    if (!options.display) return
                    const isFocused = state.index === index;
                    
                    // Emitt the normal tab events
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
                            style={{...MS.bMenuIconTO}}
                            onPress={onPress} 
                            onLongPress={onLongPress}
                        >
                        <Image style={MS.bMenuIcon} source={isFocused ? options.focusedIcon : options.themeIcon(theme)}></Image>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
}