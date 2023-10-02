import { StyleSheet, Dimensions, Platform } from "react-native"


export const MS = StyleSheet.create ({
    // Big headertitle for EventScreen (due to filter causing problems)
    filterScreenTitle: {
        position: "absolute",
        textAlign: "center",
        left: 100,
        top: Platform.OS === "ios" ? "50%" : "40%",
        right: "-6%",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: Platform.OS === "ios" ? 30 : 28,
    },
    smallTitle: {
        position: "absolute",
        textAlign: "center",
        top: Dimensions.get("window").height / 18,
        left: 0,
        right: "-6%",
        marginLeft: "auto",
        marginRight: "auto",
        alignSelf: "center",
        fontSize: Platform.OS === "ios" ? 25 : 23,
    },
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
        top: 0,
        left: "-2.5%",
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
    // Size of goBack icon
    goBack: {
        top: "52%",
        left: "140%",
        width: 25,
        height: 25,
    },
    multiTop: {
        width: 90,
        height: 60,
        top: 35,
        right: "5%",
        flexDirection: "row",
        justifyContent: "space-evenly",
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
        bottom: Platform.OS === "ios" ? null : 0,
        width: "100%",
        height: "10%",
        flexDirection: "row",
    },
    // Bottom menu icon TouchableOpacity
    bMenuIconTouchableOpacity: {
        width: 120,
        height: 65,
    },
    // Bottom menu icons
    bMenuIcon: {
        width: 90,
        height: 65,
        alignSelf: "center",
    },
    logoBackground: {
        width: 100,
        alignItems: "center",
    },
    touchableIcon: {
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        top: Platform.OS === "ios" ? null : -8,
    },
})

export default MS
