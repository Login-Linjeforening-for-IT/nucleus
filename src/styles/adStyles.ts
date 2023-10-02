import { StyleSheet, Dimensions, Platform } from "react-native"

export const AS = StyleSheet.create({
    adBack: {
        flexDirection: "row",
        alignItems: "center",
    },
    adViewLeft: {
        alignItems: "center",
        width: "26%",
    },
    adViewMid: {
        justifyContent: "center",
        left: Platform.OS === "ios" ? 7.5 : 10,
        paddingHorizontal: 6,
        width: "65.5%",
    },
    adViewRight: {
        width: "8.5%",
    },
    locationView: {
        justifyContent: "center",
    },
    title: {
        maxHeight: Platform.OS === "ios" ? 20 * 3 : 17 * 2.5,
        fontSize: Platform.OS === "ios" ? 20 : 17,
    },
    specificAdTitle: {
        maxWidth: "90%",
        left: 10,
        alignSelf: "center",
        maxHeight: Platform.OS === "ios" ? 20 * 3 : 17 * 2.5,
        fontSize: Platform.OS === "ios" ? 20 : 17,
    },
    adInfoType: {
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    adInfo: {
        // maxWidth: "90%",
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    adInfoBold: {
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 17.5 : 14,
    },
    socialMediaImage: {
        height: 30,
        width: 30,
    },
    // Join event button
    adButton: {
        height: 30,
        width: Dimensions.get("window").width / 2.75,
        alignSelf: "center",
        borderRadius: 10,
    },
    adButtonText: {
        textAlign: "center",
        top: Platform.OS === "ios" ? 2 : 0,
        fontWeight: "600",
        fontSize: 20,
    },
    socialView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    loc: {
        fontSize: Platform.OS === "ios" ? 15 : 13,
    },
    adTitleView: {
        flexDirection: "row",
    },
    adInfoInsideView: {
        flexDirection: "row",
    },
    bellPosition: {
        left: -4.2,
    },
    adBannerSmall: {
        top: 1.7,
        height: 60,
        aspectRatio: 3 / 2,
        resizeMode: "contain",
    },
    adBanner: {
        width: "100%",
        aspectRatio: 10 / 4,
        resizeMode: "contain",
    },
    adClusterImage: {
        aspectRatio: 3 / 2,
    },
})
