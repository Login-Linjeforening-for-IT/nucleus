import { StyleSheet } from "react-native"

export const CS = StyleSheet.create({
    // Card height and direction on eventscreen
    clusterBack: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    twinLeft: {
        width: "97%",
    },
    twinRight: {
        justifyContent: "center",
        width: "3%",
    },
    evenTwinLeft: {
        top: -1,
        minHeight: 30,
        justifyContent: "center",
        width: "40%",
    },
    evenTwinRight: {
        minHeight: 30,
        justifyContent: "center",
        flexDirection: "row",
        width: "60%",
    },
    adViewLeft: {
        justifyContent: "center",
        width: "38%"
    },
    adViewMid: {
        left: 5,
        justifyContent: "center",
        paddingHorizontal: 6,
        width: "50%",
    },
    adViewRight: {
        width: "10%",
    },
    arrowView: {
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1 / 1,
        transform: [{ rotate: "180deg" }],
    },
    arrowImage: {
        left: -10,
        height: 20,
        aspectRatio: 1 / 1,
        resizeMode: "contain",
    },
})
