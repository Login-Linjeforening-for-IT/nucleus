import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack";

export type TabBarProps<T extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, T>;

export type EventScreenProps<T extends keyof EventStackParamList> = 
    CompositeScreenProps<
        StackScreenProps<EventStackParamList, T>,
        BottomTabScreenProps<TabParamList>
    >

export type EventStackParamList = {
    EventScreen: undefined
    SpecificEventScreen: {eventID: number}
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends TabParamList {}
    }
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

export type TabParamList = {
    EventNav: NavigatorScreenParams<EventStackParamList>
    AdNav: NavigatorScreenParams<AdStackParamList>
    MenuNav: NavigatorScreenParams<MenuStackParamList>
}