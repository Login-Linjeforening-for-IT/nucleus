import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack";
declare global {
    namespace ReactNavigation {
      interface RootParamList extends TabBarParamList {}
    }
}

export type TabBarProps<T extends keyof TabBarParamList> =
BottomTabScreenProps<TabBarParamList, T>;

export type EventScreenProps<T extends keyof EventStackParamList> = 
    CompositeScreenProps<
        StackScreenProps<EventStackParamList, T>,
        BottomTabScreenProps<TabBarParamList>
        >

export type EventStackParamList = {
    EventScreen: undefined
    SpecificEventScreen: {eventID: number}
}


export type AdStackParamList = {
    AdScreen: undefined
    SpecificAdScreen: undefined
}

export type MenuRoutes = 
"ProfileScreen"
    | "SettingScreen"
    | "NotificationScreen"
    | "AboutScreen"
    | "BusinessScreen"
    | "ReportScreen"
    | "LoginScreen"
    | "InternalScreen" 

    export type ItemProps = {
    id: number
    nav: MenuRoutes
    title: string
}

export type MenuProps<T extends keyof MenuStackParamList> = 
StackScreenProps<MenuStackParamList, T>

export type MenuStackParamList = {
    ProfileScreen: undefined,
    SettingScreen: undefined,
    NotificationScreen: undefined,
    AboutScreen: undefined,
    BusinessScreen: undefined,
    ReportScreen: undefined,
    LoginScreen: undefined,
    InternalScreen: undefined,
    MenuScreen: undefined
}

export type TabBarParamList = {
    EventNav: NavigatorScreenParams<EventStackParamList>
    AdNav: NavigatorScreenParams<AdStackParamList>
    MenuNav: NavigatorScreenParams<MenuStackParamList>
}

export type RootStackParamList = {
    Tabs: NavigatorScreenParams<TabBarParamList>
    InfoModal: undefined
}