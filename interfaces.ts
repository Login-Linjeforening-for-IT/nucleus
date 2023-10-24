import { ParamListBase } from "@react-navigation/native"
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { DimensionValue, ImageSourcePropType } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { ReactNode } from "react"
import { StackHeaderProps, StackNavigationOptions } from "@react-navigation/stack"
import { 
    BottomTabBarProps,
    BottomTabHeaderProps,
    BottomTabNavigationProp
} from "@react-navigation/bottom-tabs/lib/typescript/src/types"

export interface ExtendedDescriptor {
    options: ExtendedRouteOptions
}

export interface ExtendedBottomTabBarProps 
extends Omit<BottomTabBarProps, 'descriptors'> {
    descriptors: Record<string, ExtendedDescriptor>
}

export interface ExtendedBottomTabHeaderProps 
    extends Omit<BottomTabHeaderProps, 'options'> {
    options: ExtendedRouteOptions
}

export interface ExtendedRouteOptions extends Omit<BottomTabNavigationOptions, 'header'> {
    focusedIcon: ImageSourcePropType
    icon: ImageSourcePropType
    themeIcon?: ImageSourcePropType
    
    header?: (props: ExtendedBottomTabHeaderProps)=>ReactNode
}

export interface ExtendedStackRouteOptions extends Omit<StackNavigationOptions, 'header'> {
    headerComponents?: {bottom?: JSX.Element[], right?: JSX.Element[], left?: JSX.Element[]}
    header?: (props: StackHeaderProps)=>ReactNode
}

export interface ScreenProps {
    navigation: Navigation
}

export type Navigation = BottomTabNavigationProp<ParamListBase, string, undefined>

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

export type NotificationScreenProps = {
    back: string
    navigation: Navigation
}

export interface HeaderProps extends Omit<StackHeaderProps, 'options'> {
    options: StackRouteOptions & {headerComponents?: {bottom?: JSX.Element[], right?: JSX.Element[], left?: JSX.Element[]}}
}

export interface StackRouteOptions extends Omit<StackNavigationOptions, 'header'> {
    header?: (props: HeaderProps) => React.ReactNode;
}

export interface ExtendedBottomTabBarProps extends Omit<BottomTabBarProps, 'descriptors'> {
    
}

export type TabBarProps = BottomTabNavigationProp<{'eventScreen': undefined}>