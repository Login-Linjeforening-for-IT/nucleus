import * as React from 'react';                                                 // React

import { NavigationContainer } from '@react-navigation/native';                 // Navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';       // Creates bottom tab navigator

const Tab = createBottomTabNavigator();                                         // Declares Tab to equal CBTN function

import CountdownScreen from '../screens/countdown';                             // Countdown for launch party
import EventScreen from '../screens/event';                                     // Events
import AboutScreen from '../screens/menu/about';                                // About Login
import MenuScreen from '../screens/menu';                                       // Profile
import ListingScreen from '../screens/listings';                                // Job listings
import SpecificEventScreen from '../screens/specificEvent';                     // Specific Events
import InternalScreen from '../screens/internal/internal';                      // Innsida (verv)
import BusinessScreen from '../screens/menu/business';                          // Companies' screen
import SettingScreen from '../screens/menu/settings';                           // Settings 
import TodoScreen from '../screens/internal/todo';                              // Todo (verv)
import MakeNotificationScreen from '../screens/internal/makeNotification';      // Make notification (verv)
import LoginScreen from '../screens/menu/login';                                // Login to innsida
import ReportScreen from '../screens/menu/report';                              // Report form for blameworthy conditions
import CommitteeMenuScreen from '../screens/menu/committeeMenu';                // Displays all committees contact information
import SpecificListingScreen from '../screens/specificListing';                 // Specific Job listing

function Navigator() {                                                          // Declares Navigator, wraps in container and declares all navigation routes

    // REMOVE THIS BOX AFTER LAUNCH PARTY
    const [day, setDay] = React.useState(new Date().getDate())
    const [month, setMonth] = React.useState(1 + new Date().getMonth())
    const [year, setYear] = React.useState(new Date().getFullYear())

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDay(new Date().getDate())
            setMonth(1 + new Date().getMonth())
            setYear(new Date().getFullYear())
        }, 100);
        return () => clearInterval(interval);
    }, [day])
    // REMOVE THIS BOX AFTER LAUNCH PARTY

    if (!(year == 2023 && (month == 1 && day > 18 || month == 2 && day < 11))) { // REMOVE IF ELSE AFTER LAUNCH PARTY
        return(
            <NavigationContainer>                                                   
                <Tab.Navigator screenOptions={{ headerShown: false}}>  
                    <Tab.Screen name='EventScreen' options={{tabBarStyle: { display: "none" }}} component={EventScreen} />
                    <Tab.Screen name='ListingScreen'            options={{tabBarStyle: { display: "none" }}} component={ListingScreen} />             
                    <Tab.Screen name='MenuScreen'               options={{tabBarStyle: { display: "none" }}} component={MenuScreen} />
                    <Tab.Screen name='AboutScreen'              options={{tabBarStyle: { display: "none" }}} component={AboutScreen} />
                    <Tab.Screen name='SpecificEventScreen'      options={{tabBarStyle: { display: "none" }}} component={SpecificEventScreen} />
                    <Tab.Screen name='BusinessScreen'           options={{tabBarStyle: { display: "none" }}} component={BusinessScreen} />
                    <Tab.Screen name='SettingScreen'            options={{tabBarStyle: { display: "none" }}} component={SettingScreen} />
                    {/* <Tab.Screen name='InternalScreen'           options={{tabBarStyle: { display: "none" }}} component={InternalScreen} /> */}
                    {/* <Tab.Screen name='TodoScreen'               options={{tabBarStyle: { display: "none" }}} component={TodoScreen} /> */}
                    {/* <Tab.Screen name='MakeNotificationScreen'   options={{tabBarStyle: { display: "none" }}} component={MakeNotificationScreen} /> */}
                    {/* <Tab.Screen name='LoginScreen'              options={{tabBarStyle: { display: "none" }}} component={LoginScreen} /> */}
                    {/* <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} /> */}
                    <Tab.Screen name='CommitteeMenuScreen'      options={{tabBarStyle: { display: "none" }}} component={CommitteeMenuScreen} />
                    <Tab.Screen name='SpecificListingScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificListingScreen} />
                </Tab.Navigator>                    
            </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>                                                   
                <Tab.Navigator screenOptions={{ headerShown: false}}> 
                    <Tab.Screen name='CountdownScreen' options={{tabBarStyle: { display: "none" }}} component={CountdownScreen} />
                </Tab.Navigator>                    
            </NavigationContainer>
        )
    }
}

export default Navigator;                                                         // Exports all navigation functionality
