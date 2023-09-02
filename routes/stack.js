import * as React from 'react'; // React

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Creates bottom tab navigator
import {NavigationContainer} from '@react-navigation/native'; // Navigation container

const Tab = createBottomTabNavigator(); // Declares Tab to equal CBTN function
import SpecificEventScreen from '../screens/specificEvent'; // Specific Events
import InternalScreen from '../screens/menu/internal'; // Internal screen
import BusinessScreen from '../screens/menu/business'; // Companies' screen
// import SpecificAdScreen from '../screens/specificAd'; // Specific job listing
import SettingScreen from '../screens/menu/settings'; // Settings
import ReportScreen from '../screens/menu/report'; // Report form for blameworthy conditions
import AboutScreen from '../screens/menu/about'; // About Login
import ProfileScreen from '../screens/menu/profile/profile'; // Login to innsida
import LoginScreen from '../screens/menu/profile/login'; // Login to innsida
import EventScreen from '../screens/event'; // Events
import MenuScreen from '../screens/menu'; // Menu
// import AdScreen from '../screens/ads'; // Job advertisements

function Navigator() { // Declares Navigator, wraps in container and declares all navigation routes
    return (
        <NavigationContainer>
            <Tab.Navigator backBehavior='history' initialRouteName='EventScreen' screenOptions={
                {headerShown: false}
            }>
                <Tab.Screen name='EventScreen' options={ { tabBarStyle: { display: "none" } } } component={EventScreen}/>
                <Tab.Screen name='MenuScreen' options={{tabBarStyle: {display: "none"}}}component={MenuScreen}/> 
                {/* <Tab.Screen name='AdScreen' options={{tabBarStyle: {display: "none"}}} component={AdScreen}/>  */}
                <Tab.Screen name='AboutScreen' options={{tabBarStyle: {display: "none"}}} component={AboutScreen}/>
                <Tab.Screen name='SpecificEventScreen' options={{tabBarStyle: {display: "none"}}} component={SpecificEventScreen}/>
                <Tab.Screen name='BusinessScreen' options={{tabBarStyle: {display: "none"}}} component={BusinessScreen}/>
                <Tab.Screen name='SettingScreen' options={{tabBarStyle: {display: "none"}}} component={SettingScreen}/>
            {/* <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} /> */}
                <Tab.Screen name='InternalScreen' options={{tabBarStyle: {display: "none"}}} component={InternalScreen}/>
                <Tab.Screen name='LoginScreen' options={{tabBarStyle: {display: "none"}}} component={LoginScreen}/>
                <Tab.Screen name='ProfileScreen' options={{tabBarStyle: {display: "none"}}} component={ProfileScreen}/>
                {/* <Tab.Screen name='SpecificAdScreen' options={{tabBarStyle: {display: "none"}}} component={SpecificAdScreen}/> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator; // Exports all navigation functionality
