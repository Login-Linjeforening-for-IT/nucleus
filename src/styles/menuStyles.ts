import { StyleSheet, Platform } from "react-native"

export const MS = StyleSheet.create ({
    // Small headertitle (for multiline)
    smallMultilineTitle: {
        position: "absolute",
        left: 60,
        right: 60,
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20,
    },
    // Top menu background view
    topMenu: {
        position: "absolute",
        width: "105%",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "9%",
    },
    // Size of top menu icons
    tMenuIcon: {
        width: 32,
        height: 32,
    },
    multiIcon: {
        height: 24,
        width: 24,
    },
    // ----- BOTTOM MENU -----
    // Bottom menu view
    bMenu: {
        position: "absolute",
        top: Platform.OS === "ios" ? "90%" : null,
        bottom: Platform.OS === "ios" ? null : -30,
        width: "100%",
        height: "12.5%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    // Bottom menu icon TouchableOpacity
    bMenuIconTouchableOpacity: {
        width: 90,
        height: 65,
    },
    // Bottom menu icons
    bMenuIcon: {
        width: 80,
        height: 65,
        alignSelf: "center",
    },
    logoBackground: {
        width: 100,
        alignItems: "center",
    },
})

export default MS
