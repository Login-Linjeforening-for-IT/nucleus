import { StyleSheet, Platform } from "react-native"

export const NS = StyleSheet.create({
    notificationBack: {
        flexDirection: "row",
        alignItems: "center",
    },
    notificationViewLeft: {
        alignItems: "center",
        width: "15%",
    },
    notificationViewMid: {
        justifyContent: "center",
        paddingHorizontal: 6,
        bottom: 4,
        width: "85%",
    },
    title: {
        maxHeight: Platform.OS === "ios" ? 20 * 3 : 17 * 2.5,
        fontSize: Platform.OS === "ios" ? 20 : 17,
    },
    loc: {
        fontSize: Platform.OS === "ios" ? 15 : 13,
    },
    time: {
        top: -30,
        fontSize: 12
    },
    error: {
        textAlign: "center",
        top: "30%",
    }
})

export default NS
