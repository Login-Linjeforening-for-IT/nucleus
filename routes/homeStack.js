import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
const GLOBAL = require('../styles/theme'); 

import HomeScreen from '../screens/home'
import EventScreen from '../screens/event';
import AboutScreen from '../screens/about';
import SettingScreen from '../screens/settings';
import SpecificEventScreen from '../screens/specificEvent';
import InternalScreen from '../screens/internal/internal';
import BusinessScreen from '../screens/contact/business';
import NotificationScreen from '../screens/notification';
import TodoScreen from '../screens/internal/todo';
import MakeNotificationScreen from '../screens/internal/makeNotification';
import LoginScreen from '../screens/login';
import EditScreen from '../screens/internal/edit';
import ProfileScreen from '../screens/profile';
import ReportScreen from '../screens/contact/report';
import ContactScreen from '../screens/contact/contactTekKom';
import ContactMenuScreen from '../screens/contact/contactMenu';
import SocialMediaScreen from '../screens/contact/socialmedia';
import CommitteeMenuScreen from '../screens/contact/committeeMenu';
import ContactStyretScreen from '../screens/contact/contactStyret';
import ContactEventKomScreen from '../screens/contact/contactEventKom';
import ContactTekKomScreen from '../screens/contact/contactTekKom';
import ContactPRScreen from '../screens/contact/contactPR';
import ContactCTFkomScreen from '../screens/contact/contactCTFkom';
import ContactSATkomScreen from '../screens/contact/contactSATkom';
import SpecificJobScreen from '../screens/specificJobScreen';

const screens = {
    EventScreen: {
        screen: EventScreen
    },
    ProfileScreen: {
        screen: ProfileScreen
    },
    HomeScreen: {
        screen: HomeScreen
    },
    SettingScreen: {
        screen: SettingScreen
    },
    SpecificEventScreen: {
        screen: SpecificEventScreen,
    },
    AboutScreen: {
        screen: AboutScreen
    },
    BusinessScreen: {
        screen: BusinessScreen
    },
    InternalScreen: {
        screen: InternalScreen
    },
    LoginScreen: {
        screen: LoginScreen
    },
    NotificationScreen: {
        screen: NotificationScreen
    },
    ContactScreen: {
        screen: ContactScreen
    },
    ContactMenuScreen: {
        screen: ContactMenuScreen
    },
    TodoScreen: {
        screen: TodoScreen
    },
    MakeNotificationScreen: {
        screen: MakeNotificationScreen
    },
    EditScreen: {
        screen: EditScreen
    },
    SocialMediaScreen: {
        screen: SocialMediaScreen
    },
    ReportScreen: {
        screen: ReportScreen
    },
    CommitteeMenuScreen: {
        screen: CommitteeMenuScreen
    },
    ContactStyretScreen: {
        screen: ContactStyretScreen
    },
    ContactEventKomScreen: {
        screen: ContactEventKomScreen
    },
    ContactTekKomScreen: {
        screen: ContactTekKomScreen
    },
    ContactPRScreen: {
        screen: ContactPRScreen
    },
    ContactCTFkomScreen: {
        screen: ContactCTFkomScreen
    },
    ContactSATkomScreen: {
        screen: ContactSATkomScreen
    },
    SpecificJobScreen: {
        screen: SpecificJobScreen
    }
}

const HomeStack = createStackNavigator(screens, {defaultNavigationOptions: {
    animationEnabled: false,
    title: '',
    headerShown: '',
    headerBackTitleVisible: '',
}});

export default createAppContainer(HomeStack);
