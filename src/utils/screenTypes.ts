import { NavigatorScreenParams } from "@react-navigation/native"

export type EventStackParamList = {
    EventScreen: undefined
    SpecificEventScreen: undefined
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

export type MenuStackParamList = {
    [k in MenuRoutes]+?: ItemProps;
} & {MenuScreen: undefined}

export type TabParamList = {
    EventScreen: NavigatorScreenParams<EventStackParamList>
    AdScreen: NavigatorScreenParams<AdStackParamList>
    MenuScreen: NavigatorScreenParams<MenuStackParamList>
}