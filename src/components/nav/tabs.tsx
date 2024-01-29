import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StackProps } from "@interfaces"
import { NavigationContainer } from "@react-navigation/native"
import Footer from "@nav/footer"
import { useSelector } from "react-redux"
import EventScreen from "@screens/event"
import MenuScreen from "@screens/menu"
import AdScreen from "@screens/ads"
import React from "react"
import { Image, View } from "react-native"
import MS from "@styles/menuStyles"
import { createStackNavigator } from "@react-navigation/stack"
import TagInfo from "@components/shared/tagInfo"

// Declares Tab to equal CBTN function
const Tab = createBottomTabNavigator()
const Root = createStackNavigator()


function Tabs(){
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
    ]

    return (
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
    ]

    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{headerShown: false}}>
                <Root.Screen name="Tabs" component={Tabs}/>
                <Root.Screen name="InfoModal" options={{presentation: 'transparentModal', cardOverlayEnabled: true}} component={TagInfo}/>
            </Root.Navigator>
        </NavigationContainer>
    )
}
