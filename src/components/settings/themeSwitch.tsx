import { View, TouchableOpacity, Image } from "react-native"
import { changeTheme, resetTheme } from "@redux/theme"
import { useSelector, useDispatch } from "react-redux"
import SS from "@styles/settingStyles"
import React from "react"

/**
 * Function that provides a switch for controlling the theme of the application
 * @returns View containing switch
 */
export default function ThemeSwitch() {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

      return (
        <View style={{maxHeight: 40, justifyContent: "center"}}>
            <TouchableOpacity onPress={() => theme > 2 ? dispatch(resetTheme()) : dispatch(changeTheme())}>
            {theme === 0 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/sun.png")} />: null}
            {theme === 1 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/abyss.png")} />: null}
            {theme === 2 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/sunset.png")} />: null}
            {/* {theme === 3 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/christmas.png")} />: null} */}
            {/* {theme === 4 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/easter.png")} />: null} */}
            {theme === 3 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/moon.png")} />: null}
            </TouchableOpacity>
        </View>
    )
}
