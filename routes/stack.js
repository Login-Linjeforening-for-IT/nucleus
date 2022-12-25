import * as React from 'react';                                                 // React

import { NavigationContainer } from '@react-navigation/native';                 // Navigation container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';       // Creates bottom tab navigator

const Tab = createBottomTabNavigator();                                         // Declares Tab to equal CBTN

import HomeScreen from '../screens/home'                                        // Home
import EventScreen from '../screens/event';                                     // Events
import AboutScreen from '../screens/about';                                     // About Login
import ProfileScreen from '../screens/profile';                                 // Profile
import ListingScreen from '../screens/listings';                                // Job listings
import SpecificEventScreen from '../screens/specificEvent';                     // Specific Events
import InternalScreen from '../screens/internal/internal';                      // Innsida (verv)
import BusinessScreen from '../screens/contact/business';                       // Companies' screen
import SettingScreen from '../screens/settings';                                // Settings 
import TodoScreen from '../screens/internal/todo';                              // Todo (verv)
import MakeNotificationScreen from '../screens/internal/makeNotification';      // Make notification (verv)
import LoginScreen from '../screens/login';                                     // Login to innsida
import ReportScreen from '../screens/contact/report';                           // Report form for blameworthy conditions
import ContactMenuScreen from '../screens/contact/contactMenu';                 // Contact Login - Linjeforeningen for IT
import CommitteeMenuScreen from '../screens/contact/committeeMenu';             // Displays all committees contact information
import SpecificListingScreen from '../screens/specificListing';                 // Specific Job listing
import SpecificArticleScreen from '../screens/specificArticle';                 // Specific article

function Navigator() {                                                          // Declares Navigator, wraps in container and declares all navigation routes
    return(
        <NavigationContainer>                                                   
            <Tab.Navigator screenOptions={{ headerShown: false}}>               
                <Tab.Screen name='HomeScreen'               options={{tabBarStyle: { display: "none" }}} component={HomeScreen} />
                <Tab.Screen name='EventScreen'              options={{tabBarStyle: { display: "none" }}} component={EventScreen} />
                <Tab.Screen name='AboutScreen'              options={{tabBarStyle: { display: "none" }}} component={AboutScreen} />
                <Tab.Screen name='ProfileScreen'            options={{tabBarStyle: { display: "none" }}} component={ProfileScreen} />
                <Tab.Screen name='ListingScreen'            options={{tabBarStyle: { display: "none" }}} component={ListingScreen} />
                <Tab.Screen name='SpecificEventScreen'      options={{tabBarStyle: { display: "none" }}} component={SpecificEventScreen} />
                <Tab.Screen name='InternalScreen'           options={{tabBarStyle: { display: "none" }}} component={InternalScreen} />
                <Tab.Screen name='BusinessScreen'           options={{tabBarStyle: { display: "none" }}} component={BusinessScreen} />
                <Tab.Screen name='SettingScreen'            options={{tabBarStyle: { display: "none" }}} component={SettingScreen} />
                <Tab.Screen name='TodoScreen'               options={{tabBarStyle: { display: "none" }}} component={TodoScreen} />
                <Tab.Screen name='MakeNotificationScreen'   options={{tabBarStyle: { display: "none" }}} component={MakeNotificationScreen} />
                <Tab.Screen name='LoginScreen'              options={{tabBarStyle: { display: "none" }}} component={LoginScreen} />
                <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} />
                <Tab.Screen name='ContactMenuScreen'        options={{tabBarStyle: { display: "none" }}} component={ContactMenuScreen} />
                <Tab.Screen name='CommitteeMenuScreen'      options={{tabBarStyle: { display: "none" }}} component={CommitteeMenuScreen} />
                <Tab.Screen name='SpecificListingScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificListingScreen} />
                <Tab.Screen name='SpecificArticleScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificArticleScreen} />
            </Tab.Navigator>                    
        </NavigationContainer>
    )
}

export default Navigator;                                                         // Exports all navigation functionality
