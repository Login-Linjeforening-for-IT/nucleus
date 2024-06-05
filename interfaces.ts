import { ParamListBase } from "@react-navigation/native"
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { DimensionValue, ImageSourcePropType, StyleProp, ViewStyle } from "react-native"
import { ReactNode } from "react"
import type { StackHeaderProps, StackNavigationOptions } from "@react-navigation/stack"
import { 
    BottomTabHeaderProps,
    BottomTabNavigationProp
} from "@react-navigation/bottom-tabs/lib/typescript/src/types"

export interface ExtendedBottomTabHeaderProps 
    extends Omit<BottomTabHeaderProps, 'options'> {
    options: ExtendedRouteOptions
}

export interface ExtendedRouteOptions extends Omit<BottomTabNavigationOptions, 'header'> {
    focusedIcon: ImageSourcePropType
    icon: ImageSourcePropType
    themeIcon?: ImageSourcePropType
    
    header?: (props: ExtendedBottomTabHeaderProps) => ReactNode
}

export interface ScreenProps {
    navigation: Navigation
}

export type Navigation = BottomTabNavigationProp<ParamListBase, string, string>

export interface StackProps extends ExtendedRouteOptions {
    name: string
    component: React.FC<any>
}

export interface ClusterProps extends React.PropsWithChildren<{}> {
    noColor?: boolean
    marginVertical?: DimensionValue
    marginHorizontal?: DimensionValue
    highlight?: boolean
    style?: StyleProp<ViewStyle>
}

export type NotificationScreenProps = {
    back: string
    navigation: Navigation
}

export interface HeaderProps extends Omit<StackHeaderProps, 'options'> {
    options: StackRouteOptions & {headerComponents?: {bottom?: JSX.Element[], right?: JSX.Element[], left?: JSX.Element[]}}
}

export interface StackRouteOptions extends Omit<StackNavigationOptions, 'header'> {
    header?: (props: HeaderProps) => React.ReactNode
}
