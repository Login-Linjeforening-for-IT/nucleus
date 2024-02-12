import { View, TouchableOpacity, Platform } from "react-native"
import { useSelector } from "react-redux"
import MS from "@styles/menuStyles"
import { BlurView } from "expo-blur"
import { openBrowserAsync } from 'expo-web-browser';
import { SvgXml } from "react-native-svg"
import USBicon from "@assets/menu/USB-temp-icon.svg"
import { ReactNode } from "react";
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

type WrapperProps = {
    children: ReactNode;
};

export type FooterProps = {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  };

export default function Footer({ state, descriptors, navigation }: FooterProps): JSX.Element {
    return (
        <Wrapper>
            <Content state={state} descriptors={descriptors} navigation={navigation} />
        </Wrapper>
    )
}

function Wrapper({children}: WrapperProps) {
    const { tag } = useSelector((state: ReduxState) => state.event)
    if (tag) return <View>{children}</View>
    else return <>{children}</>
}

function Content({ state, descriptors, navigation }: FooterProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    return (
        <>
            <BlurView style={MS.bMenu} experimentalBlurMethod='dimezisBlurView' intensity={Platform.OS === 'ios' ? 30 : 20}/>
            <View style={{
                ...MS.bMenu,
                backgroundColor: theme.transparentAndroid
            }} />
            {/* Transparent container for the icons */}
            <View style={MS.bMenu}>
                {/* Create the icons based on options passed from stack.js */}
                {state.routes.map((route, 
                    index: number) => {
                    const { options } = descriptors[route.key]

                    const isFocused = state.index === index
                    // Emitt the normal tab events
                    function onPress() {
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

                    function onLongPress() {
                        navigation.emit({type: "tabLongPress", target: route.key})
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
                            {options.tabBarIcon?options.tabBarIcon({focused: isFocused, color: '', size: 0}):null}
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity
                    accessibilityRole="button"
                    style={{...MS.bMenuIconTouchableOpacity, paddingLeft: 20}}
                    onPress={async()=>{
                        openBrowserAsync("https://usb.login.no/").catch((error)=>{
                            console.log(error)
                        })
                    }}
                >
                    <SvgXml
                        width={MS.bMenuIconTouchableOpacity.width - 55}
                        height={MS.bMenuIconTouchableOpacity.height}
                        xml={USBicon}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
