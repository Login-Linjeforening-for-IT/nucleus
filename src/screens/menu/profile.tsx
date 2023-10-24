import Svg, { LinearGradient, Rect, Stop } from "react-native-svg"
import { View, Dimensions,ScrollView } from "react-native"
import ProfileInfo from "@/components/profile/profileInfo"
import Profile from "@/components/profile/profile"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import PS from "@styles/profileStyles"
import { useSelector } from "react-redux"
import { ScreenProps } from "@interfaces"
import React, { useState } from "react"
import Swipe from "@components/nav/swipe"

type ScrollProps = {
    nativeEvent: {
        contentOffset: {
            y: number
        }
    }
}

export default function ProfileScreen({ navigation }: ScreenProps): 
JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const { 
        id,
        ban,
        joinedevents,
        name,
        allergies,
        preferences,
        mail,
        schoolyear,
        degree,
        image
    } = useSelector((state: ReduxState) => state.profile )

    const profile = { 
        allergies,
        ban,
        degree,
        id: 0,
        image,
        joinedevents: 40,
        mail,
        name,
        preferences,
        schoolyear
    }

    const profileInfo = { degree, schoolyear, mail, preferences, allergies }

    const [scrollPosition, setScrollPosition] = useState(0)

    function handleScroll(event: ScrollProps) {
        setScrollPosition(-event.nativeEvent.contentOffset.y)
    }

    return (
        <Swipe left="MenuScreen">
            <View>
                <View style={{
                        ...PS.content, 
                        backgroundColor: FetchColor({theme, variable: "DARKER"})
                }}>
                    <View style={{
                        ...PS.profileView,
                        backgroundColor: FetchColor({theme, variable: "ORANGE"}), 
                        height: scrollPosition
                    }} />
                    <ScrollView 
                        scrollEventThrottle={40} 
                        onScroll={handleScroll} 
                        showsVerticalScrollIndicator={false}
                    >
                        <Svg style={PS.profileGradientBackground}>
                            <LinearGradient 
                                id="gradient" 
                                x1="0%" 
                                y1="0%" 
                                x2="0%" 
                                y2={0.55}
                            >
                                <Stop 
                                    offset="40%" 
                                    stopColor={FetchColor({theme, variable: "ORANGE"})} 
                                />
                                <Stop 
                                    offset={theme === 1 ? "86%" : "100%"} 
                                    stopColor={FetchColor({theme, variable: "DARKER"})}
                                />
                            </LinearGradient>
                            <Rect 
                                x="0" 
                                y={theme === 1 ? 65 : 0} 
                                width="100%" 
                                height="100%" 
                                fill="url(#gradient)" 
                            />
                        </Svg>
                        <Space height={Dimensions.get("window").height / 8} />
                        <Profile profile={profile} />
                        <Space height={40} />
                        <ProfileInfo profile={profileInfo} />
                        <Space height={Dimensions.get("window").height / 3} />
                    </ScrollView>
                </View>
            </View>
        </Swipe>
    )
}
