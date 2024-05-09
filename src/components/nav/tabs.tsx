import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import Footer from "@nav/footer"
import { useSelector } from "react-redux"
import AdScreen from "@screens/ads"
import EventScreen from "@screens/event"
import MenuScreen from "@screens/menu"
import MS from "@styles/menuStyles"
import React from "react"
import TagInfo from "@components/shared/tagInfo"
import { Image } from "react-native"
import { StackCardInterpolatedStyle, StackCardInterpolationProps, createStackNavigator } from "@react-navigation/stack"
import { StackProps } from "@interfaces"
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types"
import NotificationModal from "@components/shared/notificationModal"
import NotificationScreen from "@screens/menu/notifications"
import linking from "@utils/linking"
import { AdStackParamList, EventStackParamList, MenuStackParamList, RootStackParamList, TabBarParamList } from "@utils/screenTypes"
import ProfileScreen from "@screens/menu/profile"
import SettingScreen from "@screens/menu/settings"
import AboutScreen from "@screens/menu/about"
import BusinessScreen from "@screens/menu/business"
import LoginScreen from "@screens/menu/login"
import InternalScreen from "@screens/menu/internal"
import ReportScreen from "@screens/menu/report"
import SpecificEventScreen from "@screens/event/specificEvent"
import SpecificAdScreen from "@screens/ads/specificAd"
import Header from "./header"


// Declares Tab to equal CBTN function
const Root = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabBarParamList>()
const EventStack = createStackNavigator<EventStackParamList>()
const AdStack = createStackNavigator<AdStackParamList>()
const MenuStack = createStackNavigator<MenuStackParamList>()

function Events() {
    return (
        <EventStack.Navigator screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props}/>}}>
            <EventStack.Screen name="EventScreen" component={EventScreen}/>
            <EventStack.Screen name="SpecificEventScreen" component={SpecificEventScreen}/>
        </EventStack.Navigator>
    )
}

function Ads() {
    return (
        <AdStack.Navigator screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props}/>}}>
            <AdStack.Screen name="AdScreen" component={AdScreen}/>
            <AdStack.Screen name="SpecificAdScreen" component={SpecificAdScreen}/>
        </AdStack.Navigator>
    )
}

function Menu() {
    return (
        <MenuStack.Navigator screenOptions={{
            animationEnabled: false,
            headerTransparent: true,
            header: props => <Header {...props}/>}}>
            <MenuStack.Screen name="MenuScreen" component={MenuScreen}/>
            <MenuStack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <MenuStack.Screen name="SettingScreen" component={SettingScreen}/>
            <MenuStack.Screen name="NotificationScreen" component={NotificationScreen}/>
            <MenuStack.Screen name="AboutScreen" component={AboutScreen}/>
            <MenuStack.Screen name="BusinessScreen" component={BusinessScreen}/>
            <MenuStack.Screen name="LoginScreen" component={LoginScreen}/>
            <MenuStack.Screen name="InternalScreen" component={InternalScreen}/>
            <MenuStack.Screen name="ReportScreen" component={ReportScreen}/>
        </MenuStack.Navigator>
    )
}

/**
 * Declares the tab navigator, and declares the eventstack, adstack and menustack.
 * 
 * @returns Application with navigation
 */
function Tabs(): JSX.Element {
    const { isDark } = useSelector((state: ReduxState) => state.theme)

    return (
        <Tab.Navigator
            // Set initialscreen at to not defaut to top of tab stack
            initialRouteName={"EventNav"}
            backBehavior="history"
            screenOptions={{headerShown: false}}
            // Sets the tab bar component
            tabBar={props => <Footer 
                state={props.state} 
                descriptors={props.descriptors} 
                navigation={props.navigation} 
            />}
        >
            <Tab.Screen 
                name="EventNav" 
                component={Events} 
                options={({
                    tabBarIcon: ({focused}) => (
                        <Image
                            style={MS.bMenuIcon} 
                            source={focused 
                                ? require("@assets/menu/calendar-orange.png")
                                : isDark
                                    ? require("@assets/menu/calendar777.png")
                                    : require("@assets/menu/calendar-black.png")} 
                        />
                    )
                })}
            />
            <Tab.Screen 
                name="AdNav" 
                component={Ads} 
                options={({
                    tabBarIcon: ({focused}) => (
                        <Image
                            style={MS.bMenuIcon} 
                            source={focused 
                                ? require("@assets/menu/business-orange.png")
                                : isDark
                                    ? require("@assets/menu/business.png")
                                    : require("@assets/menu/business-black.png")}
                        />
                    )
                })}
            />
            <Tab.Screen 
                name="MenuNav" 
                component={Menu}
                options={({
                    tabBarIcon: ({focused}) => (
                        <Image
                            style={MS.bMenuIcon} 
                            source={focused 
                                ? require("@assets/menu/calendar-orange.png")
                                : isDark
                                    ? require("@assets/menu/menu.png")
                                    : require("@assets/menu/menu-black.png")}
                        />
                    )
            })}
            />
        </Tab.Navigator>
    )
}

/**
 * Declares navigator of the app, wraps the navigator in the container, and
 * declares the InfoModal and the tab navigation.
 * 
 * @returns Application with navigation
 */
export default function Navigator(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)

    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.background
        }
    }

    const config: TransitionSpec = {
        animation: 'timing',
        config:{
            duration: 100,
        }
    }
    
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{headerShown: false}}>
                <Root.Screen name="Tabs" component={Tabs}/>
                {/* <Root.Screen name="NotificationScreen" component={NotificationScreen as any} /> */}
                <Root.Screen 
                    name="InfoModal" 
                    options={{
                        presentation: 'transparentModal', 
                        cardOverlayEnabled: true, 
                        cardStyleInterpolator: animateFromBottom, 
                        transitionSpec: {open: config, close: config}
                    }}
                    component={TagInfo}
                />
                <Root.Screen
                    name="NotificationModal" 
                    options={{
                        presentation: 'transparentModal',
                        cardStyleInterpolator: animateFromTop, 
                        transitionSpec: {open: config, close: config},
                    }}
                    component={NotificationModal}
                />
            </Root.Navigator>
        </NavigationContainer>
    )
}

function animateFromBottom({ current }: StackCardInterpolationProps): StackCardInterpolatedStyle {
    return ({
        cardStyle: {
            transform: [{
                translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                    extrapolate: 'clamp',
                })
            },
            ],
        },
        overlayStyle: {
            backgroundcolor: 'black',
            opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
                extrapolate: 'clamp',
            })
        }
    })
}

function animateFromTop({ current }: StackCardInterpolationProps): StackCardInterpolatedStyle {
    return ({
        cardStyle: {
            transform: [{
                translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 0],
                    extrapolate: 'clamp',
                })
            }],
        },
        overlayStyle: {
            backgroundColor: 'black',
            opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
                extrapolate: 'clamp',
            })
        }
    })
}
