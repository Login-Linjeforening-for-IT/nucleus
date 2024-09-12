import GS from '@styles/globalStyles'
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { BlurView } from 'expo-blur'
import { Dimensions, Platform, View, Text, StatusBar } from 'react-native'
import { HeaderProps} from '@/interfaces'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Image } from "react-native"
import MS from '@styles/menuStyles'
import { useDispatch } from 'react-redux'
import { setTag } from '@redux/event'
import getHeight from '@utils/getHeight'
import getCategories from '@utils/getCategories'

export default function Header({ options, route, navigation }: HeaderProps): ReactNode {
    const { theme, isDark } = useSelector((state: ReduxState) => state.theme)
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { localTitle } = useSelector((state: ReduxState) => state.misc)
    const { tag, eventName } = useSelector((state: ReduxState) => state.event)
    const { adName } = useSelector((state: ReduxState) => state.ad)
    const dispatch = useDispatch()
    const SES = route.name === "SpecificEventScreen"
    const SAS = route.name === "SpecificAdScreen"
    const orangeIcon = require('@assets/icons/goback-orange.png')

    const [title, setTitle] = useState<string>(route.name && (lang
        ? require('@text/no.json').screens[route.name]
        : require('@text/en.json').screens[route.name]))
    
    useEffect(()=>{
        if (SES) {
            setTitle(options.title || eventName || (lang ? "Arrangement" : "Event")) 
        }
        else if (SAS) {
            setTitle(options.title || adName || (lang ? "Jobbanonse" : "Job ad"))
    }}, [eventName, adName])

    if (route.name === localTitle?.screen && localTitle.title !== title) {
        setTitle(localTitle.title)
    }

    if (route.name === "ProfileScreen") {
        return <></>
    }

    const  [backIcon, setBackIcon] = useState(isDark 
        ? require('@assets/icons/goback777.png')
        : require('@assets/icons/goback111.png'))

    function handlePress() {
        setBackIcon(orangeIcon)

        if (tag?.title) {
            dispatch(setTag({ title: "", body: "" }))
        }

        navigation.goBack()
    }
    
    return (
        <BlurWrapper>
            <View style={{...GS.headerView, top: Dimensions.get("window").height / 17}}>
                <View style={GS.innerHeaderViewOne}>
                    {options.headerComponents?.left ? options.headerComponents?.left.map((node, index) => 
                        <View style={GS.logo} key={index}>{node}</View> 
                    ) : 
                    <TouchableOpacity onPress={handlePress}>
                        <Image style={{...MS.tMenuIcon, left: 5}} source={backIcon}></Image>
                    </TouchableOpacity>
                    }
                </View>
                <Text style={{
                    ...GS.headerTitle, 
                    color: theme.titleTextColor, 
                    width: 300, 
                    textAlign: "center", 
                    top: title?.length > 30 ? -8 : undefined
                }}>
                    {title}
                </Text>
                <View style={GS.innerHeaderViewTwo}>
                {options.headerComponents?.right?.map((node, index) => (
                    <View style={index === 1
                        ? {
                            ...GS.customMenuIcon, 
                            width: Platform.OS === "ios" ? 28 : 5, 
                            left: Platform.OS === 'ios' ? 34 : 40
                        } : {...GS.customMenuIcon, left: 24}} key={index}>{node}
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
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const event = useSelector((state: ReduxState) => state.event)
    const ad = useSelector((state: ReduxState) => state.ad)
    const route = useRoute()
    const defaultHeight = 
    Dimensions.get('window').height * 8 // Base decrementor for both platforms
    / (Platform.OS === 'ios' ? 85 // Base height of header on iOS
    : 100 // Base height of header on Android
    ) + (StatusBar.currentHeight ? StatusBar.currentHeight - 2 // Subtractor for Statusbar visible on Android
     : 0 // Defaults to 0 if no statusbar is visible on Android
    )
    const isSearchingEvents = event.search && route.name === "EventScreen"
    const categories = getCategories({lang, categories: event.categories})
    const item = isSearchingEvents ? categories : ad.skills
    const isSearchingAds = ad.search && route.name === "AdScreen"
    const extraHeight = getHeight(item.length)

    const height = defaultHeight + (isSearchingEvents || isSearchingAds
        ? Platform.OS === "ios" 
            ? 50 + extraHeight // Extraheight on iOS
            : isSearchingEvents 
                ? 35 + extraHeight // Extraheight during eventSearch on Android
                : 25 + extraHeight // Extraheight during adSearch on Android
        : Platform.OS === "ios" 
            ? 20 // Extra base height for header on iOS while not searching
            : 5  // Extra base height for header on Android while not searching
        )

    return (
        <>
            <BlurView 
                style={{height}} 
                experimentalBlurMethod='dimezisBlurView' 
                intensity={Platform.OS === "ios" ? 30 : 20} 
            />
            <View style={{
                ...GS.blurBackgroundView, 
                height,
                backgroundColor: theme.transparentAndroid
            }}>
                {props.children}
            </View>
        </>
    )
}
