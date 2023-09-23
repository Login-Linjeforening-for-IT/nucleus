import { View, Image, TouchableOpacity, Platform, Text, Dimensions } from "react-native"
import FetchColor from "@styles/fetchTheme"
import { useSelector } from "react-redux"
import { MS } from "@styles/menuStyles"
import { BlurView } from "expo-blur"
import React from "react"
import { Navigation } from "@interfaces"

type TopMenuProps = {
    navigation: Navigation
    title: string
    screen: string
    back?: string
}
/**
 * Top Menu on every page
 * @param {*} props
 * @returns
 */
export default function TopMenu({ navigation, title, screen, back }
: TopMenuProps) {

    const { theme } = useSelector( (state: ReduxState) => state.theme)
    const goBack = () => { navigation.navigate(back ? back : "EventScreen")}
    const eventPage = () => { navigation.navigate("EventScreen") }

    return (
        <>
            {Platform.OS === "ios"
                ? <BlurView style={MS.topMenu} intensity={30}/>
                : <View style={{
                    ...MS.topMenu,
                    backgroundColor: FetchColor({
                        theme, variable: "TRANSPARENTANDROID"})}}/>}
            <View style={{
                    ...MS.topMenu,
                    backgroundColor: FetchColor({
                        theme,
                        variable: "TRANSPARENT" })
            }}>
                {back ?
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image
                            style={MS.goBack}
                            source={require("@assets/icons/goback777.png")}
                        />
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={MS.logoBackground}
                        onPress={() => screen != "event" && eventPage()}
                    >
                        <Image
                            style={MS.tMenuIcon}
                            source={theme === 0 || theme === 2 || theme === 3
                                ? require("@assets/logo/loginText.png")
                                : require("@assets/logo/loginText-black.png")}
                        />
                    </TouchableOpacity>
                }
                <Text
                    style={{
                        ...MS.smallMultilineTitle,
                        top: title.length > 28
                            ? Dimensions.get("window").height / 22
                            : Dimensions.get("window").height / 17,
                        color: FetchColor({
                            theme, variable: "TITLETEXTCOLOR"})
                    }}
                >
                    {title}
                </Text>
            </View>
        </>
    )
}