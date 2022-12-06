import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

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

const screens = {
    HomeScreen:             {screen: HomeScreen},
    EventScreen:            {screen: EventScreen},
    ProfileScreen:          {screen: ProfileScreen},
    ListingScreen:          {screen: ListingScreen},
    SpecificEventScreen:    {screen: SpecificEventScreen},
    AboutScreen:            {screen: AboutScreen},
    BusinessScreen:         {screen: BusinessScreen},
    InternalScreen:         {screen: InternalScreen},
    LoginScreen:            {screen: LoginScreen},
    SettingScreen:          {screen: SettingScreen},
    ContactMenuScreen:      {screen: ContactMenuScreen},
    TodoScreen:             {screen: TodoScreen},
    MakeNotificationScreen: {screen: MakeNotificationScreen},
    ReportScreen:           {screen: ReportScreen},
    CommitteeMenuScreen:    {screen: CommitteeMenuScreen},
    SpecificListingScreen:  {screen: SpecificListingScreen},
    SpecificArticleScreen:  {screen: SpecificArticleScreen},
}

const HomeStack = createStackNavigator(screens, {defaultNavigationOptions: {
    animationEnabled: false,
    title: '',
    headerShown: '',
    headerBackTitleVisible: '',
}});

export default createAppContainer(HomeStack);
