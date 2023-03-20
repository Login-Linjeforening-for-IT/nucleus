import * as React from 'react';                                                 // React

import { NavigationContainer } from '@react-navigation/native';                 // Navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';       // Creates bottom tab navigator

const Tab = createBottomTabNavigator();                                         // Declares Tab to equal CBTN function

import CommitteeMenuScreen from '../screens/menu/committeeMenu';                // Displays all committees contact information
import SpecificListingScreen from '../screens/specificListing';                 // Specific Job listing
import SpecificEventScreen from '../screens/specificEvent';                     // Specific Events
import InternalScreen from '../screens/menu/internal';                          // Internal screen
import BusinessScreen from '../screens/menu/business';                          // Companies' screen
import SettingScreen from '../screens/menu/settings';                           // Settings 
import ReportScreen from '../screens/menu/report';                              // Report form for blameworthy conditions
import ListingScreen from '../screens/listings';                                // Job listings
import AboutScreen from '../screens/menu/about';                                // About Login
import LoginScreen from '../screens/menu/login';                                // Login to innsida
import EventScreen from '../screens/event';                                     // Events
import MenuScreen from '../screens/menu';                                       // Profile

function Navigator() {                                                          // Declares Navigator, wraps in container and declares all navigation routes
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
                    {/* <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} /> */}
                    <Tab.Screen name='InternalScreen'             options={{tabBarStyle: { display: "none" }}} component={InternalScreen} />
                    <Tab.Screen name='LoginScreen'             options={{tabBarStyle: { display: "none" }}} component={LoginScreen} />
                    <Tab.Screen name='CommitteeMenuScreen'      options={{tabBarStyle: { display: "none" }}} component={CommitteeMenuScreen} />
                    <Tab.Screen name='SpecificListingScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificListingScreen} />
                </Tab.Navigator>                    
            </NavigationContainer>
        )
}

export default Navigator;                                                         // Exports all navigation functionality
