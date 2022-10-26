import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/home'
import EventScreen from '../screens/event';
import AboutScreen from '../screens/about';
import SettingScreen from '../screens/settings';
import SpecificEventScreen from '../screens/specificEvent';
import InternalScreen from '../screens/internal';
import BusinessScreen from '../screens/business';
import NotificationScreen from '../screens/notification';
import ContactScreeen from '../screens/contact';
import TodoScreen from '../screens/todo';
import MakeNotificationScreen from '../screens/makeNotification';
import CreditScreen from '../screens/credit';
import TopMenuScreen from '../screens/topmenu';

const screens = {
    EventScreen: {
        screen: EventScreen
    },
    SpecificEventScreen: {
        screen: SpecificEventScreen,
    },
    HomeScreen: {
        screen: HomeScreen
    },
    AboutScreen: {
        screen: AboutScreen
    },
    TopMenuScreen: {
        screen: TopMenuScreen
    },
    SettingScreen: {
        screen: SettingScreen
    },
    InternalScreen: {
        screen: InternalScreen
    },
    BusinessScreen: {
        screen: BusinessScreen
    },
    NotificationScreen: {
        screen: NotificationScreen
    },
    ContactScreen: {
        screen: ContactScreeen
    },
    TodoScreen: {
        screen: TodoScreen
    },
    MakeNotificationScreen: {
        screen: MakeNotificationScreen
    },
    CreditScreen: {
        screen: CreditScreen
    },
}

const HomeStack = createStackNavigator(screens, {defaultNavigationOptions: {
    title: '',
    headerShown: '',
    headerTintColor: '#fd8738',
    headerBackTitleVisible: '',
    headerStyle: {
        backgroundColor: '#111',
    },
}});

export default createAppContainer(HomeStack);
