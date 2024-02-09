import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StackProps } from "@interfaces"
import { NavigationContainer, RouteConfigComponent } from "@react-navigation/native"
import Footer from "@nav/footer"
import { useSelector } from "react-redux"
import EventScreen from "@screens/event"
import MenuScreen from "@screens/menu"
import AdScreen from "@screens/ads"
import React, { ReactNode } from "react"
import { Image } from "react-native"
import MS from "@styles/menuStyles"
import linking from "@utils/linking"
import { AdStackParamList, EventStackParamList, MenuRoutes, MenuStackParamList, TabParamList } from "@utils/screenTypes"
import { createStackNavigator } from "@react-navigation/stack"
import ProfileScreen from "@screens/menu/profile"
import SettingScreen from "@screens/menu/settings"
import NotificationScreen from "@screens/menu/notifications"
import AboutScreen from "@screens/menu/about"
import BusinessScreen from "@screens/menu/business"
import LoginScreen from "@screens/menu/login"
import InternalScreen from "@screens/menu/internal"
import ReportScreen from "@screens/menu/report"


// Declares Tab to equal CBTN function
const Tab = createBottomTabNavigator<TabParamList>()
const EventStack = createStackNavigator<EventStackParamList>()
const AdStack = createStackNavigator<AdStackParamList>()
const MenuStack = createStackNavigator<MenuStackParamList>()

function Events() {
    return (
        <EventStack.Navigator>
            <EventStack.Screen name="EventScreen" component={EventScreen}/>
        </EventStack.Navigator>
    )
}

function Ads() {
    return (
        <AdStack.Navigator>
            <AdStack.Screen name="AdScreen" component={AdScreen}/>
        </AdStack.Navigator>
    )
}

function Menu() {
    return (
        <MenuStack.Navigator>
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

// Declares Navigator, wraps in container and declares all navigation routes
/**
 * Declares navigator of the app, wraps the navigator in the container, and
 * declares all navigation routes available.
 * 
 * @returns Application with navigation
 */
export default function Navigator(): JSX.Element {
    const { isDark } = useSelector((state: ReduxState) => state.theme )

    const screens = [
        {
            name: "EventScreen",
            component: EventScreen,
            focusedIcon: require("@assets/menu/calendar-orange.png"),
            icon: isDark
                ? require("@assets/menu/calendar777.png")
                : require("@assets/menu/calendar-black.png")
        },
        {
            name: "AdScreen",
            component: AdScreen,
            focusedIcon: require("@assets/menu/business-orange.png"),
            icon: isDark
                ? require("@assets/menu/business.png")
                : require("@assets/menu/business-black.png")
        },
        {
            name: "MenuScreen",
            component: MenuScreen,
            focusedIcon: require("@assets/menu/menu-orange.png"),
            icon: isDark
                ? require("@assets/menu/menu.png")
                : require("@assets/menu/menu-black.png")
        }
    ] as const

    return (
        <NavigationContainer linking={linking}>
            <Tab.Navigator
                // Set initialscreen at to not defaut to top of tab stack
                initialRouteName={screens[0].name}
                backBehavior="history"
                screenOptions={{headerShown: false}}
                // Sets the tab bar component
                tabBar={props => <Footer 
                    state={props.state} 
                    descriptors={props.descriptors} 
                    navigation={props.navigation} 
                    insets={props.insets} 
                />}
            >
                {/* Maps over all screens, returning each of */}
                {screens.map((screen: StackProps) => (
                    <Tab.Screen 
                        key={screen.name} 
                        options={({
                            tabBarIcon: ({focused}) => (
                                <Image
                                    style={MS.bMenuIcon} 
                                    source={focused 
                                        ? screen.focusedIcon
                                        : screen.icon} 
                                />
                            )
                        })}
                        name={screen.name+"Root"}
                        component={screen.component}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    )
}
