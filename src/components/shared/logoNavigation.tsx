import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import MS from "@styles/menuStyles";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

export default function LogoNavigation (navigation: BottomTabNavigationProp<ParamListBase>, isDark: boolean): JSX.Element {
    return (
        <TouchableOpacity
            // TOTDO: Place initial screen name i state so 'Eventscreen ikke er hardcoded'
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