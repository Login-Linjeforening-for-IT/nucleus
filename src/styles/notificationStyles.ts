import { StyleSheet, Platform } from "react-native"

export const NS = StyleSheet.create({
    notificationBack: {
        flexDirection: "row",
        alignItems: "center",
    },
    notificationView: {
        justifyContent: "center",
        bottom: 4,
        width: "100%",
    },
    title: {
        maxHeight: Platform.OS === "ios" ? 20 * 3 : 17 * 2.5,
        fontSize: Platform.OS === "ios" ? 20 : 17,
    },
    loc: {
        fontSize: Platform.OS === "ios" ? 15 : 13,
    },
    time: {
        top: -25,
        fontSize: 12
    },
    error: {
        textAlign: "center",
        top: "100%"
    }
})

export default NS
