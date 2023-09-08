import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';     // Creates bottom tab navigator
import {NavigationContainer} from '@react-navigation/native';               // Navigation container

import ProfileScreen from 'login/screens/menu/profile/profile';                // Login to innsida
import SpecificEventScreen from 'login/screens/specificEvent';                 // Specific Events
import LoginScreen from 'login/screens/menu/profile/login';                    // Login to innsida
import InternalScreen from 'login/screens/menu/internal';                      // Internal screen
import BusinessScreen from 'login/screens/menu/business';                      // Companies' screen
import SpecificAdScreen from 'login/screens/specificAd';                   // Specific job listing
import SettingScreen from 'login/screens/menu/settings';                       // Settings
import ReportScreen from 'login/screens/menu/report';                          // Report form for blameworthy conditions
import TabBar from 'login/shared/functions/tabBar.js'
import AboutScreen from 'login/screens/menu/about';                            // About Login
import EventScreen from 'login/screens/event';                                 // Events
import { useSelector } from 'react-redux';
import MenuScreen from 'login/screens/menu';                                   // Menu
import AdScreen from 'login/screens/ads';                                   // Job advertisements

const Tab = createBottomTabNavigator();                                     // Declares Tab to equal CBTN function

export default function Navigator() {                                       // Declares Navigator, wraps in container and declares all navigation routes
    const { theme }    = useSelector( (state) => state.theme )
    const isDark = theme == 0 || theme == 2 || theme == 3 ? true : false

    const visibleScreens = [
        {
            name: 'EventScreen',
            component: EventScreen,
            focusedIcon: require('login/assets/menu/calendar-orange.png'),
            icon: isDark ? require('login/assets/menu/calendar777.png') : require('login/assets/menu/calendar-black.png')
        },
        {
            name: 'MenuScreen',
            component: MenuScreen,
            focusedIcon: require('login/assets/menu/menu-orange.png'),
            icon: isDark ? require('login/assets/menu/menu.png') : require('login/assets/menu/menu-black.png')
        },
        {
            name: 'AdScreen',
            component: AdScreen,
            focusedIcon: require('login/assets/menu/business-orange.png'),
            icon: isDark ? require('login/assets/menu/business.png') : require('login/assets/menu/business-black.png')
        },
    ]

    return (
        <NavigationContainer>
            <Tab.Navigator
                intialRouteName='EventScreen' // Set initialscreen at to not defaut to top of tab stack
                backBehavior='history'
                screenOptions={{ headerShown: false }}
                tabBar={props => <TabBar {...props} />} // Sets the tab bar componet
            >
                <Tab.Screen options={{
                        display: true, // Set true if it should be shown in tab bar
                        focusedIcon: require('login/assets/menu/calendar-orange.png'), // The image to be used if the screen is selected
                        themeIcon: (theme) => { // Method to get the image based on the theme
                            return theme == 0 || theme == 2 || theme == 3 ? require('login/assets/menu/calendar777.png') : require('login/assets/menu/calendar-black.png')
                        }
                    }}
                    name='EventScreen'
                    component={EventScreen}
                />
                <Tab.Screen options={{
                        display: true,
                        focusedIcon: require('login/assets/menu/business-orange.png'),
                        themeIcon: (theme) => {
                            return theme == 0 || theme == 2 || theme == 3 ? require('login/assets/menu/business.png') : require('login/assets/menu/business-black.png')
                        }
                }} 
                    name='AdScreen' 
                    component={AdScreen}
                />
                <Tab.Screen options={{
                        display: true,
                        focusedIcon: require('login/assets/menu/menu-orange.png'),
                        themeIcon: (theme) => {
                            return theme == 0 || theme == 2 || theme == 3 ? require('login/assets/menu/menu.png') : require('login/assets/menu/menu-black.png')
                        }
                }} 
                    name='MenuScreen' 
                    component={MenuScreen}
                />

                <Tab.Screen name='AboutScreen'          options={{ display: false }} component={AboutScreen} />
                <Tab.Screen name='SpecificEventScreen'  options={{ display: false }} component={SpecificEventScreen} />
                <Tab.Screen name='BusinessScreen'       options={{ display: false }} component={BusinessScreen} />
                <Tab.Screen name='SettingScreen'        options={{ display: false }} component={SettingScreen} />
                <Tab.Screen name='InternalScreen'       options={{ display: false }} component={InternalScreen} />
                <Tab.Screen name='LoginScreen'          options={{ display: false }} component={LoginScreen} />
                <Tab.Screen name='ProfileScreen'        options={{ display: false }} component={ProfileScreen} />
                <Tab.Screen name='SpecificAdScreen' options={{ display: false }} component={SpecificAdScreen}/>
                {/* <Tab.Screen name='ReportScreen'     options={{ display: false }} component={ReportScreen} /> */}
 
            </Tab.Navigator>
        </NavigationContainer>
    )
}