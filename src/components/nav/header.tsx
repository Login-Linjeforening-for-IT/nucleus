import GS from '@styles/globalStyles'
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { BlurView } from 'expo-blur'
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native'
import { HeaderProps} from '@interfaces'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Image } from "react-native"
import MS from '@styles/menuStyles'

export default function Header({ options, route, navigation }: HeaderProps): ReactNode {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { event } = useSelector((state: ReduxState) => state.event)
    const { ad } = useSelector((state: ReduxState) => state.ad )
    const orangeIcon = require('@assets/icons/goback-orange.png')
    let title = route.name && (lang 
            ? require('@text/no.json').screens[route.name] 
            : require('@text/en.json').screens[route.name])

    if (!title && route.name === "SpecificEventScreen") title = lang ? event.name_no : event.name_en
    if (!title && route.name === "SpecificAdScreen") title = lang ? ad.title_no : ad.title_en
    if (route.name === "ProfileScreen") return <></>

    const { isDark } = useSelector((state: ReduxState) => state.theme )

    const  [backIcon, setBackIcon] = useState(isDark 
        ? require('@assets/icons/goback777.png')
        : require('@assets/icons/goback111.png'))

    return (
        <BlurWrapper>
            <View style={{...GS.headerView}}>
                <View style={GS.innerHeaderViewOne}>
                    {options.headerComponents?.left ? options.headerComponents?.left.map((node, index) => 
                        <View style={GS.logo} key={index}>{node}</View> 
                    ) : 
                    <TouchableOpacity onPress={() => {
                        setBackIcon(orangeIcon)
                        navigation.goBack()
                    }}>
                        <Image style={MS.tMenuIcon} source={backIcon}></Image>
                    </TouchableOpacity>
                    }
                </View>
                {
                    title.length > 40 
                    ?   <Text style={{...GS.headerTitle, color: 
                            theme.titleTextColor}}>
                            {title}
                        </Text>
                    :   <Text style={{...GS.headerTitle, color: 
                        theme.titleTextColor}}>
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

// Wraps the content in blur
function BlurWrapper(props: PropsWithChildren) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const route = useRoute()
    const defaultHeight = Dimensions.get('window').height * 8 / 100 + (StatusBar.currentHeight ? StatusBar.currentHeight - 7 : 0)
    const isSearchingEvents = event.search && route.name === "EventScreen"
    const isSearchingAds = ad.search && route.name === "AdScreen"
    const categories = typeof event.categories.length == 'number' ? event.categories.length : 0
    const extraHeight = isSearchingEvents 
        ? 5 * categories
        : isSearchingAds 
            ? 14.5 * ad.skills.length
            : 1
    const height = defaultHeight + extraHeight + (isSearchingEvents || isSearchingAds
        ? Platform.OS === "ios" 
            ? 120
            : 110
        : Platform.OS === "ios"
            ? 20
            : 5)

    return (
        <>
            <BlurView 
                style={{height: height}} 
                intensity={Platform.OS === "ios" ? 30 : 20}
            />
            <View style={{...GS.blurBackgroundView,
                height: height,
                backgroundColor: theme.transparentAndroid
            }}>{props.children}</View>
        </>
    )
}
