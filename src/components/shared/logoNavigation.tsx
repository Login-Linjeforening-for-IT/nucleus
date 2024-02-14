import { Navigation } from "@interfaces"
import { useNavigation } from "@react-navigation/native"
import MS from "@styles/menuStyles"
import { Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"

export default function LogoNavigation (): JSX.Element {
    const { isDark } = useSelector((state: ReduxState) => state.theme )
    const navigation: Navigation = useNavigation()
    const state = navigation.getState()
    
    return (
        // TODO: Place initial screen name in state so 'Eventscreen' is not hardcoded
        <TouchableOpacity onPress={() => { 
            state.routeNames[state.index] == 'EventScreen' 
                ? null
                : navigation.navigate('EventScreen')
        }}>
            <Image
                style={MS.tMenuIcon}
                source={isDark
                    ? require("@assets/logo/loginText.png")
                    : require("@assets/logo/loginText-black.png")}
            />
        </TouchableOpacity>
    )
}
