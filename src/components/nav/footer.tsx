import { View, TouchableOpacity, Image } from "react-native"
import { ExtendedBottomTabBarProps } from "@interfaces"
import FetchColor from "@styles/fetchTheme"
import { useSelector } from "react-redux"
import MS from "@styles/menuStyles"
import {BlurView} from "expo-blur"
import React from "react"
import { RouteProp } from "@react-navigation/native"
import * as WebBrowser from 'expo-web-browser';
import { SvgXml } from "react-native-svg"
import USBicon from "@assets/menu/USB-temp-icon.svg"

export default function Footer({ state, descriptors, navigation }: 
ExtendedBottomTabBarProps): JSX.Element {
    // Get the current theme
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <>
                <BlurView style={MS.bMenu} intensity={30}/>
                <View style={{
                    ...MS.bMenu,
                    backgroundColor: FetchColor({theme,
                        variable: "TRANSPARENTANDROID"})
                }} />
            {/* Transparent container for the icons */}
            <View style={{
                    ...MS.bMenu,
                }}>
                {/* Create the icons based on options passed from stack.js */}
                {state.routes.map((route: RouteProp<RootStackParamList, any>, 
                    index: number) => {
                    const { options } = descriptors[route.key]
                    
                    if (!options.display) return

                    const isFocused = state.index === index
                    // Emitt the normal tab events
                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        })

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the
                            // params inside the tab screen are preserved
                            navigation.navigate(route.name, {merge: true})
                        }
                    }

                    if (!options.focusedIcon || !options.icon) return

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        })
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused
                                ? { selected: true }
                                : {}}
                            style={MS.bMenuIconTouchableOpacity}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Image 
                                style={MS.bMenuIcon} 
                                source={isFocused 
                                    ? options.focusedIcon
                                    : options.icon} 
                            />
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                    accessibilityRole="button"
                    style={{...MS.bMenuIconTouchableOpacity, paddingLeft: 20}}
                    onPress={async()=>{
                        WebBrowser.openBrowserAsync("https://usb.login.no/").catch((reason)=>{
                            console.log(reason)
                        })
                    }}
                >
                    <SvgXml
                        width={MS.bMenuIconTouchableOpacity.width-50}
                        height={MS.bMenuIconTouchableOpacity.height}
                        xml={USBicon}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
