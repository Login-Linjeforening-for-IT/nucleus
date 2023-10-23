import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { ParamListBase } from "@react-navigation/native"
import MS from "@styles/menuStyles"
import { Image } from "react-native"
import { TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"

type LogoNavigationProps = {
    navigation: BottomTabNavigationProp<ParamListBase>
}

export default function LogoNavigation ({navigation}: LogoNavigationProps): JSX.Element {
    const { isDark } = useSelector((state: ReduxState) => state.theme )

    return (
        <TouchableOpacity
            // TODO: Place initial screen name in state so 'Eventscreen' is not hardcoded
            onPress={() => { navigation.getState().index == 0 ? null : navigation.navigate('EventScreen')}}>
            <Image
                style={MS.tMenuIcon}
                source={isDark
                    ? require("@assets/logo/loginText.png")
                    : require("@assets/logo/loginText-black.png")}
            />
        </TouchableOpacity>
    )
}
