import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ParamListBase } from "@react-navigation/native";
import { MS } from "@styles/menuStyles";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";
import { ReactNode } from "react";

export default function (navigation: BottomTabNavigationProp<ParamListBase>, isDark: boolean): JSX.Element {

    return (
        <TouchableOpacity
            onPress={() => { navigation.getState().index == 0 ? null : StackActions.popToTop() }}>
            <Image
                style={MS.tMenuIcon}
                source={isDark
                    ? require("@assets/logo/loginText.png")
                    : require("@assets/logo/loginText-black.png")}
            />
        </TouchableOpacity>
    )
}