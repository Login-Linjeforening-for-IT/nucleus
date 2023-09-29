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
    organizationLogoSmall: {
        alignSelf: "center",
        width: Dimensions.get("window").width - 4,
        height: 150,
        resizeMode: "contain",
    },
    adViewTitle: {
        left: 5,
        fontSize: 40,
    },
    bellSize: {
        height: 40,
        width: 40,
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
    // Small check icon inside filter
    smallerCheckIcon: {
        height: 20,
        top: "0%",
        alignSelf: "center",
    },
    // Layout for specificAdScreen
    specificAdInfoView: {
        flexDirection: "row",
        alignItems: "center",
    },
    // Layout for the image on specificAdView
    specificAdView1: {
        alignItems: "center",
        height: 100,
        overflow: "hidden",
    },
    // The header image on specificListingScreen
    specificAdImage: {
        alignSelf: "center",
        width: Dimensions.get("window").width - 4,
        height: 150,
        resizeMode: "contain",
    },
    // Middle sized icons
    size: {
        height: 40,
        width: 40,
    },
    absoluteView: {
        flexDirection: "row",
    },
    // Position of ad color circle
    adLight: {
        top: -10,
        height: 0,
        width: 10,
    },
    // Position of specific ad color circle
    specificAdLight: {
        // left: 8, // not sure if this is used
        height: 20,
        width: 20,
    },
    card: {
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    // Card content styling
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 18,
    },
    cardSmaller: {
        marginHorizontal: 10,
        borderRadius: 20,
    },
    // Small icons
    smallSize: {
        height: 20,
        width: 20,
    },
    // AdScreen filter text
    filterText: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 10,
        width: "95%",
        marginHorizontal: 10,
        height: 30,
        borderRadius: 15,
        color: "white",
    },
    // Filter view
    filterView: {
        paddingTop: 10,
        flexDirection: "row",
        marginHorizontal: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    // Position of adfilter check icon
    checkBox: {
        top: "-50%",
        right: 20,
    },
    // Adfilter checked icon
    checkedBox: {
        top: "-80%",
        right: 20,
    },
    // Checkmark on check icon
    checkedIconCheckMark: {
        right: 18,
        // Extremely small height as it cannot be 0 (should be revised to use
        // absolute positioning so it doesnt depend on height)
        top: "-1000000%",
        height: 0.004,
    },
    // View for categories inside the filter
    categoryView: {
        flexDirection: "row",
        left: 30,
        top: 7,
        width: 122,
    },
    // Filter reset icon
    filterResetIcon: {
        left: -60,
        top: 5,
        height: 40,
        width: 40,
    },
    mazemapIcon: {
        left: 4,
        height: 20,
        width: 10,
    },
    row: {
        flexDirection: "row",
    },
})
