import { StyleSheet, Platform, Dimensions } from "react-native"
import T from "./text"
const height = Dimensions.get("window").height

export const MS = StyleSheet.create ({
    // Small headertitle (for multiline)
    smallMultilineTitle: {
        position: "absolute",
        left: 60,
        right: 60,
        justifyContent: "center",
        textAlign: "center",
        ...T.text20,
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
        height: "100%",
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
