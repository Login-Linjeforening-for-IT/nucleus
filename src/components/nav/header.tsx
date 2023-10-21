import FetchColor from '@styles/fetchTheme'
import GS from '@styles/globalStyles'
import React, { PropsWithChildren, ReactNode } from 'react'
import { BlurView } from 'expo-blur'
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native'
import { ExtendedBottomTabHeaderProps } from '@interfaces'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'


export default function Header({ options, route }: ExtendedBottomTabHeaderProps): ReactNode {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const title = options.title ? options.title : route.name

    return (
        <BlurWrapper>
            <View style={{...GS.headerView}}>
                <View style={GS.innerHeaderViewOne}>
                    {options.headerComponents?.left?.map((node, index) => 
                        <View style={GS.logo} key={index}>{node}</View> 
                    )}
                </View>
                {
                    title.length > 40 
                    ?   <Text style={{...GS.headerTitle, color: 
                            FetchColor({ theme, variable: 'TITLETEXTCOLOR' })}}>
                            {title}
                        </Text>
                    :   <Text style={{...GS.headerTitle, color: 
                            FetchColor({ theme, variable: 'TITLETEXTCOLOR' })}}>
                            {title}
                        </Text>
                }
                    <View style={GS.innerHeaderViewTwo}>
                    {options.headerComponents?.right?.map((node, index) => (
                        <View style={index === 1
                            ? {...GS.customMenuIcon, width: Platform.OS === "ios" ? 28 : 5} 
                            : GS.customMenuIcon} key={index}>{node}
                        </View>
                    ))}
                </View>
            </View>
            {options.headerComponents?.bottom?.map((node, index) => 
                <View key={index}>{node}</View>
            )}
        </BlurWrapper>
    )
}

// Wraps the content in blur or transparent depending on OS
function BlurWrapper(props: PropsWithChildren) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { search } = useSelector((state: ReduxState) => state.event)
    const route = useRoute()

    const height = Dimensions.get('window').height * 8 / 100 +
    (StatusBar.currentHeight ? StatusBar.currentHeight - 7 : 20) + (search 
        && route.name === "Events"
        ? Platform.OS === "ios" 
            ? 120
            : 110
        : Platform.OS === "ios"
            ? 0
            : 5)

    return (
        <>
            <BlurView 
                style={{height: height}} 
                intensity={Platform.OS === "ios" ? 30 : 20}
            />
            <View style={{...GS.blurBackgroundView,
                height: height,
                backgroundColor: FetchColor({theme, variable: "TRANSPARENTANDROID"})
            }}>{props.children}</View>
        </>
    )
}