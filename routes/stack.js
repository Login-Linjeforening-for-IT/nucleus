import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeScreen from '../screens/home'
import EventScreen from '../screens/event';
import AboutScreen from '../screens/about';
import ListingScreen from '../screens/listings';
import SpecificEventScreen from '../screens/specificEvent';
import InternalScreen from '../screens/internal/internal';
import BusinessScreen from '../screens/contact/business';
import SettingScreen from '../screens/settings';
import TodoScreen from '../screens/internal/todo';
import MakeNotificationScreen from '../screens/internal/makeNotification';
import LoginScreen from '../screens/login';
import ProfileScreen from '../screens/profile';
import ReportScreen from '../screens/contact/report';
import ContactMenuScreen from '../screens/contact/contactMenu';
import CommitteeMenuScreen from '../screens/contact/committeeMenu';
import SpecificListingScreen from '../screens/specificListing';
import SpecificArticleScreen from '../screens/specificarticle';

function Navigator() {
    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false}}>
                <Tab.Screen name='HomeScreen'               options={{tabBarStyle: { display: "none" }}} component={HomeScreen} />
                <Tab.Screen name='EventScreen'              options={{tabBarStyle: { display: "none" }}} component={EventScreen} />
                <Tab.Screen name='AboutScreen'              options={{tabBarStyle: { display: "none" }}} component={AboutScreen} />
                <Tab.Screen name='ListingScreen'            options={{tabBarStyle: { display: "none" }}} component={ListingScreen} />
                <Tab.Screen name='SpecificEventScreen'      options={{tabBarStyle: { display: "none" }}} component={SpecificEventScreen} />
                <Tab.Screen name='InternalScreen'           options={{tabBarStyle: { display: "none" }}} component={InternalScreen} />
                <Tab.Screen name='BusinessScreen'           options={{tabBarStyle: { display: "none" }}} component={BusinessScreen} />
                <Tab.Screen name='SettingScreen'            options={{tabBarStyle: { display: "none" }}} component={SettingScreen} />
                <Tab.Screen name='TodoScreen'               options={{tabBarStyle: { display: "none" }}} component={TodoScreen} />
                <Tab.Screen name='MakeNotificationScreen'   options={{tabBarStyle: { display: "none" }}} component={MakeNotificationScreen} />
                <Tab.Screen name='LoginScreen'              options={{tabBarStyle: { display: "none" }}} component={LoginScreen} />
                <Tab.Screen name='ProfileScreen'            options={{tabBarStyle: { display: "none" }}} component={ProfileScreen} />
                <Tab.Screen name='ReportScreen'             options={{tabBarStyle: { display: "none" }}} component={ReportScreen} />
                <Tab.Screen name='ContactMenuScreen'        options={{tabBarStyle: { display: "none" }}} component={ContactMenuScreen} />
                <Tab.Screen name='CommitteeMenuScreen'      options={{tabBarStyle: { display: "none" }}} component={CommitteeMenuScreen} />
                <Tab.Screen name='SpecificListingScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificListingScreen} />
                <Tab.Screen name='SpecificArticleScreen'    options={{tabBarStyle: { display: "none" }}} component={SpecificArticleScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;
