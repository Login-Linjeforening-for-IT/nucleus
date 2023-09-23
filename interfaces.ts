import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { DimensionValue, ImageSourcePropType } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { 
    BottomTabBarProps,
    BottomTabNavigationEventMap
} from "@react-navigation/bottom-tabs/lib/typescript/src/types"
  
export interface ExtendedDescriptor {
    options: ExtendedRouteOptions
}

export interface ExtendedBottomTabBarProps 
extends Omit<BottomTabBarProps, 'descriptors'> {
    descriptors: Record<string, ExtendedDescriptor>
}

export interface ExtendedRouteOptions extends BottomTabNavigationOptions {
    display?: boolean
    focusedIcon?: ImageSourcePropType
    icon?: ImageSourcePropType
}

export interface ScreenProps {
    navigation: Navigation
}

export type Navigation = NavigationHelpers<ParamListBase, 
BottomTabNavigationEventMap>

export interface SpecificEventScreenProps extends ExtendedBottomTabBarProps {
    route: RouteProp<RootStackParamList, 'SpecificEventScreen'>
}

export interface SpecificAdScreenProps extends ExtendedBottomTabBarProps {
    route: RouteProp<RootStackParamList, 'SpecificAdScreen'>
}

export interface StackProps extends ExtendedRouteOptions {
    name: string
    component: React.FC<any>
}

export interface ClusterProps extends React.PropsWithChildren<{}> {
    noColor?: boolean
    marginVertical?: DimensionValue
    marginHorizontal?: DimensionValue
}
