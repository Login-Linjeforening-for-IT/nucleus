import FetchColor from '@styles/fetchTheme';
import React, { PropsWithChildren, ReactNode } from 'react';
import { BlurView } from 'expo-blur';
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native';
import { ExtendedBottomTabHeaderProps } from '@interfaces';
import MS from '@styles/menuStyles';
import GS from '@styles/globalStyles';
import { useSelector } from 'react-redux';

// Wraps the content in blur or transparent depending on OS
function BlurWrapper(props: PropsWithChildren) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    
    return (
        <>
            {Platform.OS === "ios"
                ? <BlurView style={MS.topMenu} intensity={30}>{props.children}</BlurView>
                : <View style={{
                    paddingTop: StatusBar.currentHeight,
                    height: Dimensions.get('window').height * 8 / 100 + (StatusBar.currentHeight ? StatusBar.currentHeight : 0),
                    backgroundColor: FetchColor({
                    theme,
                    variable: "TRANSPARENT"
                    })
                                    }}>{props.children}</View>}
        </>
    )
}


export default function Header({ options, route }: ExtendedBottomTabHeaderProps): ReactNode {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const title = options.title ? options.title : route.name;

    return (
        <>
            <BlurWrapper>
                <View style={GS.headerView}>
                    <View style={GS.innerHeaderViewOne}>
                        {options.headerComponents?.left?.map((node, index) => 
                            <View style={{}} key={index}>{node}</View> 
                        )}
                    </View>
                    {
                        title.length > 40 
                            ? <Text style={{color: FetchColor({ theme, variable: 'TITLETEXTCOLOR' }) }}>{title}</Text>
                            : <Text style={{alignSelf: 'center', fontSize: 30, color: FetchColor({ theme, variable: 'TITLETEXTCOLOR' })}}>{title}</Text>
                    }
                     <View style={GS.innerHeaderViewTwo}>
                        {options.headerComponents?.right?.map((node, index) => 
                            <View style={{}} key={index}>{node}</View>
                        )}
                    </View>
                </View>
                {options.headerComponents?.bottom?.map((node, index) => 
                    <View style={{}} key={index}>{node}</View>
                )}
            </BlurWrapper>
        </>
    )
}
