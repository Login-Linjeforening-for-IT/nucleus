import FetchColor from '@styles/fetchTheme';                              // Function to fetch theme color
import { useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';                                       // Blur effect
import { Dimensions, Platform } from 'react-native';
import {                                                                    // React native components
    View,                                                                     // View component
    Text,
    StatusBar
} from 'react-native';                                                      // React native
import { ExtendedBottomTabHeaderProps } from '@interfaces';
import { PropsWithChildren, ReactNode } from 'react';
import { MS } from '@styles/menuStyles';

interface BlurViewProps {
    theme: number
}

// Wraps the content in blur or transparent depending on OS
function BlurWrapper(props: PropsWithChildren<BlurViewProps>) {
    const theme = props.theme
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
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const title = options.title ? options.title[Number(lang)] : route.name;

    return (
        <>
            <BlurWrapper theme={theme}>
                <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5%' }}>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {options.headerComponents?.left?.map((node, index) => { return <View style={{}} key={index}>{node}</View> })}
                    </View>
                    {
                        title.length > 40 ? <Text style={{ color: FetchColor({ theme, variable: 'TITLETEXTCOLOR' }) }}>{title}</Text>
                            : <Text style={{ alignSelf: 'center', color: FetchColor({ theme, variable: 'TITLETEXTCOLOR' }), fontSize: 30 }}>{title}</Text>
                    }
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {options.headerComponents?.right?.map((node, index) => { return <View style={{}} key={index}>{node}</View> })}
                    </View>
                </View>
                {options.headerComponents?.bottom?.map((node, index) => { return <View style={{}} key={index}>{node}</View> })}
            </BlurWrapper>
        </>
    )
}