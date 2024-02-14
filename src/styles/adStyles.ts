import { StyleSheet, Dimensions, Platform } from "react-native"

export const AS = StyleSheet.create({
    content: {
        height: Dimensions.get("window").height + 200,
    },
    adBack: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 2
    },
    adViewLeft: {
        alignItems: "center",
    },
    adViewMid: {
        justifyContent: "center",
        left: Platform.OS === "ios" ? 7.5 : 10,
        paddingHorizontal: 6,
        marginRight: 'auto',
        width: '55%'
    },
    locationView: {
        justifyContent: "center",
    },
    title: {
        maxHeight: Platform.OS === "ios" ? 20 * 3 : 17 * 2.5,
        fontSize: 18
    },
    specificAdTitle: {
        maxWidth: "72.5%",
        left: 10,
        alignSelf: "center",
        // Limits to 3 lines (same as image height)
        // maxHeight: Platform.OS === "ios" ? 24 * 3 : 17 * 2.5,
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
        marginTop: 5
    },
    loc: {
        top: 3,
        fontSize: Platform.OS === "ios" ? 15 : 13,
    },
    adTitleView: {
        flexDirection: "row",
        marginBottom: 10
    },
    adInfoInsideView: {
        flexDirection: "row",
    },
    adBannerSmall: {
        top: 1.7,
        height: 60,
        aspectRatio: 3 / 2,
        resizeMode: "stretch",
    },
    adBanner: {
        width: "100%",
        aspectRatio: 10 / 4,
        resizeMode: "stretch",
        marginBottom: 12
    },
    adClusterImage: {
        aspectRatio: 3 / 2,
    },
})

export default AS
