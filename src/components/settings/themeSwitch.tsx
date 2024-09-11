import { View, TouchableOpacity, Image } from "react-native"
import { changeTheme, resetTheme } from "@redux/theme"
import { useSelector, useDispatch } from "react-redux"
import SS from "@styles/settingStyles"

/**
 * Function that provides a switch for controlling the theme of the application
 * @returns View containing switch
 */
export default function ThemeSwitch() {

    const { value } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    return (
        <View style={{maxHeight: 40, justifyContent: "center"}}>
            <TouchableOpacity onPress={() => value > 3 ? dispatch(resetTheme()) : dispatch(changeTheme())}>
            {value === 0 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/sun.png")} />: null}
            {value === 1 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/abyss.png")} />: null}
            {value === 2 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/sunset.png")} />: null}
            {value === 3 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/christmas.png")} />: null}
            {/* {value === 4 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/easter.png")} />: null} */}
            {value === 4 ? <Image style={SS.lightSwitchImage} source={require("@assets/themes/moon.png")} />: null}
            </TouchableOpacity>
        </View>
    )
}
