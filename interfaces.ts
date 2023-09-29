import { NavigationHelpers, NavigationProp, ParamListBase } from "@react-navigation/native";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { DimensionValue, ImageSourcePropType } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { 
    BottomTabBarProps,
    BottomTabNavigationEventMap,
    BottomTabHeaderProps,
    BottomTabNavigationProp
} from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { ReactNode } from "react";

export interface ExtendedTabNavigationOptions 
extends BottomTabNavigationOptions {
    display?: boolean
    focusedIcon?: ImageSourcePropType
    icon?: ImageSourcePropType  
}
  
export interface ExtendedDescriptor {
    options: ExtendedRouteOptions
}

export interface ExtendedBottomTabBarProps 
extends Omit<BottomTabBarProps, 'descriptors'> {
    descriptors: Record<string, ExtendedDescriptor>;
}

export interface ExtendedBottomTabHeaderProps 
    extends Omit<BottomTabHeaderProps, 'options'> {
    options: ExtendedRouteOptions
}

export interface ExtendedRouteOptions extends Omit<BottomTabNavigationOptions, 'header'> {
    display?: boolean
    focusedIcon?: ImageSourcePropType
    themeIcon?: ImageSourcePropType
    backIcon?: boolean
    headerComponents?: {bottom?: JSX.Element[], right?: JSX.Element[], left?: JSX.Element[]}
    header?: (props: ExtendedBottomTabHeaderProps)=>ReactNode
}

export interface ScreenProps {
    navigation: Navigation
}

// export interface SpecificEventScreenProps {
//     navigation: Navigation
//     item: EventProps
// }

export type Navigation = BottomTabNavigationProp<ParamListBase, string, undefined>

export interface SpecificEventScreenProps extends ExtendedBottomTabBarProps {
    route: RouteProp<RootStackParamList, 'SpecificEventScreen'>
}

export interface SpecificAdScreenProps extends ExtendedBottomTabBarProps {
    route: RouteProp<RootStackParamList, 'SpecificAdScreen'>
}

export interface StackProps extends ExtendedTabNavigationOptions {
    name: string
    component: React.FC<any>
}

export interface ClusterProps extends React.PropsWithChildren<{}> {
    noColor?: boolean
    space?: DimensionValue
}