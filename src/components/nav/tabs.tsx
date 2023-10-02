import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ExtendedRouteOptions, StackProps } from "@interfaces"
import { NavigationContainer } from "@react-navigation/native"
import SpecificAdScreen from "@screens/specificAd"
import Footer from "@nav/footer"
import { useSelector } from "react-redux"
import EventScreen from "@screens/event"
import MenuScreen from "@screens/menu"
import AdScreen from "@screens/ads"
import React from "react"
import Header from "@nav/header"


// Declares Tab to equal CBTN function
const Tab = createBottomTabNavigator()

// Declares Navigator, wraps in container and declares all navigation routes
/**
 * Declares navigator of the app, wraps the navigator in the container, and
 * declares all navigation routes available.
 * 
 * @returns Application with navigation
 */
export default function Navigator(): JSX.Element {
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

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
        },
        { name: "SpecificAdScreen", component: SpecificAdScreen }
    ]
    
    return (
        <NavigationContainer>
            <Tab.Navigator
                // Set initialscreen at to not defaut to top of tab stack
                initialRouteName={screens[0].name}
                backBehavior="history"
                screenOptions={{ 
                    headerShown: true,
                    headerTransparent: true,
                    header: props => <Header {...props}/>
                } as ExtendedRouteOptions}
                // Sets the tab bar component
                tabBar={props => <Footer 
                    state={props.state} 
                    descriptors={props.descriptors} 
                    navigation={props.navigation} 
                    insets={props.insets} 
                />}
            >
                {/* Maps over all screens, returning each of */}
                {screens.map((screen: StackProps) => {
                    return (
                        <Tab.Screen 
                            key={screen.name} 
                            options={({
                                // Set true if it should be shown in tab bar
                                display: true,

                                // Icon to use while the screen is visible
                                focusedIcon: screen.focusedIcon,

                                // Icon with color fit to active theme
                                icon: screen.icon
                            }) as ExtendedRouteOptions}
                            name={screen.name}
                            component={screen.component}
                        />
                    )
                })}
            </Tab.Navigator>
        </NavigationContainer>
    )
}
