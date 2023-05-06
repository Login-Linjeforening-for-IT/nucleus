import * as React from 'react'; // React

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Creates bottom tab navigator
import {NavigationContainer} from '@react-navigation/native'; // Navigation container

const Tab = createBottomTabNavigator(); // Declares Tab to equal CBTN function
import BoardScreen from '../screens/menu/board'; // Displays all committees contact information
import SpecificEventScreen from '../screens/specificEvent'; // Specific Events
import OldEventScreen from '../shared/legacy/oldEvent'; // Events
import InternalScreen from '../screens/menu/internal'; // Internal screen
import BusinessScreen from '../screens/menu/business'; // Companies' screen
import SpecificAdScreen from '../screens/specificAd'; // Specific job listing
import SettingScreen from '../screens/menu/settings'; // Settings
import OldSettingScreen from '../shared/legacy/oldSettings'; // Old settings
import ReportScreen from '../screens/menu/report'; // Report form for blameworthy conditions
import AboutScreen from '../screens/menu/about'; // About Login
import LoginScreen from '../screens/menu/login'; // Login to innsida
import EventScreen from '../screens/event'; // Events
import MenuScreen from '../screens/menu'; // Menu
import OldMenuScreen from '../shared/legacy/oldMenu'; // Old menu
import {useSelector} from 'react-redux'; // Redux
import AdScreen from '../screens/ads'; // Job advertisements
import LegacyAboutScreen from '../shared/legacy/legacyAbout';
import LegacyBoardScreen from '../shared/legacy/legacyBoard';
import LegacyBusinessScreen from '../shared/legacy/legacyBusiness';

function Navigator() { // Declares Navigator, wraps in container and declares all navigation routes
    const {oldUI} = useSelector((state) => state.misc) // Old User Interface
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={
                {headerShown: false}
            }>
                {
                !oldUI ? <Tab.Screen name='EventScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={EventScreen}/> : <Tab.Screen name='OldEventScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={OldEventScreen}/>
                }
                <Tab.Screen name='AdScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={AdScreen}/> 
                {
                    !oldUI ? 
                        <Tab.Screen name='MenuScreen'
                            options={
                                {
                                    tabBarStyle: {
                                        display: "none"
                                    }
                                }
                            }
                            component={MenuScreen}
                        /> 
                    : 
                    <Tab.Screen name='OldMenuScreen'
                        options={
                            {
                                tabBarStyle: {
                                    display: "none"
                                }
                            }
                        }
                        component={OldMenuScreen}
                    />
                }

{
                !oldUI ? <Tab.Screen name='AboutScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={AboutScreen}/> : <Tab.Screen name='LegacyAboutScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={LegacyAboutScreen}/>
                }

                <Tab.Screen name='SpecificEventScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={SpecificEventScreen}/>
                <Tab.Screen name='BusinessScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={BusinessScreen}/> 
            {
                !oldUI ? 
                    <Tab.Screen name='SettingScreen'
                        options={
                            {
                                tabBarStyle: {
                                    display: "none"
                                }
                            }
                        }
                        component={SettingScreen}/> 
                : 
                    <Tab.Screen name='OldSettingScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={OldSettingScreen}/>
            }
                
            {/* <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} /> */}
                <Tab.Screen name='InternalScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={InternalScreen}/>
                <Tab.Screen name='LoginScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={LoginScreen}/>
                {
                    !oldUI ? 
                        <Tab.Screen name='BoardScreen'
                            options={
                                {
                                    tabBarStyle: {
                                        display: "none"
                                    }
                                }
                            }
                            component={BoardScreen}/> 
                    : 
                        <Tab.Screen name='LegacyBoardScreen'
                            options={
                                {
                                    tabBarStyle: {
                                        display: "none"
                                    }
                                }
                            }
                            component={LegacyBoardScreen}/>
                }
                <Tab.Screen name='SpecificAdScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={SpecificAdScreen}/>
                <Tab.Screen name='LegacyBusinessScreen'
                    options={
                        {
                            tabBarStyle: {
                                display: "none"
                            }
                        }
                    }
                    component={LegacyBusinessScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator; // Exports all navigation functionality
