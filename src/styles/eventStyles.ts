import { StyleSheet, Dimensions, Platform } from "react-native"

export const ES = StyleSheet.create({
    // ========================= EventScreen =========================
    // Left side card view
    view: {
        top: "-2%",
        justifyContent: "center",
        height: "120%",
        borderRadius: 10,
    },
    // Middle card view
    view2: {
        top: 5,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "72%",
    },
    // Right side card view
    view3: {
        position: "absolute",
        right: 5,
        height: "100%",
    },
    // Card height and direction on eventscreen
    eventBack: {
        flexDirection: "row",
        height: 55,
    },
    // Eventmonth text on specificEventScreen
    monthText: {
        width: 45,
        textAlign: "center",
        bottom: 7,
        fontSize: Platform.OS === "ios" ? 20 : 18,
    },
    // Eventday text on eventScreen
    eventCardDayText: {
        textAlign: "center",
        width: 45,
        top: -3,
        fontSize: Platform.OS === "ios" ? 25 : 22,
    },
    // Eventname text on eventScreen
    title: {
        left: 5,
        top: -5,
        fontSize: 20,
    },
    // Eventlocation text on eventScreen
    loc: {
        left: 10,
        top: -10,
        fontSize: 15,
    },
    // Eventlocation text on oldEventScreen
    oldLoc: {
        left: 5,
        top: -5,
        fontSize: 20,
    },
    // Position of checklight on eventScreen
    greenLight: {
        top: "12%",
        alignSelf: "center",
    },
    // Renders big check icon
    checkContent: {
        left: 2,
        top: "-30%",
        alignSelf: "center",
    },
    // Small check icon inside filter
    smallerCheckIcon: {
        height: 20,
        top: "0%",
        alignSelf: "center",
    },
    //======================== SpecificEventScreen ===================
    // Layout for specificEventScreen
    specificEventInfoView: {
        flexDirection: "row",
        alignItems: "center",
    },
    // Layout for the image on specificEventView
    specificEventView1: {
        alignItems: "center",
        height: 100,
        overflow: "hidden",
    },
    // The header image on specificEventScreen
    specificEventImage: {
        alignSelf: "center",
        width: Dimensions.get("window").width - 24,
        resizeMode: "stretch",
        height: 150,
    },
    //======================== EventComponentStyles ===================
    // Middle sized icons
    size: {
        height: 40,
        width: 40,
    },
    // Middle sized icons
    bellSize: {
        height: 30,
        width: 30,
    },
    bellPosition: {
        top: 6,
    },
    // View to change the flex direction to horizontally align items
    absoluteView: {
        flexDirection: "row",
        display: 'flex'
    },
    // Position of specific event color circle
    eventLight: {
        top: Platform.OS === "ios" ? -9 : -8,
        height: 0,
        alignSelf: "center",
        left: 2,
    },
    // Position of specific event color circle
    specificEventLight: {
        // left: 8, // not sure if this is used or not
        height: 20,
        width: 20,
    },
    // Card styling
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
    // Smaller card
    cardSmaller: {
        marginHorizontal: 10,
        borderRadius: 20,
    },
    // Card content styling
    clusterContent: {
        paddingTop: 3,
        marginHorizontal: 15,
        marginVertical: 4,
    },
    // Card content styling
    jobClusterContent: {
        paddingTop: 3,
        marginHorizontal: 15,
        marginVertical: 6,
    },
    // Smaller card
    clusterSmaller: {
        marginHorizontal: 10,
        borderRadius: 20,
    },
    // Small icons
    smallSize: {
        height: 20,
        width: 20,
    },
    // EventScreen filter text
    filterText: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 10,
        width: "95%",
        paddingTop: 10,
        marginHorizontal: 10,
        height: 30,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
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
    // Filter view
    clusterFilterView: {
        flexDirection: "row",
    },
    // EventScreen filter text
    clusterFilterText: {
        alignSelf: "center",
        alignItems: "center",
        height: 30,
        color: "white", // White text color (should be moved to depend on theme)
        display: 'flex',
        flexGrow: 1
    },
    // Position of eventfilter check icon
    checkBox: {
        top: "-50%",
        right: 20,
    },
    // Eventfilter checked icon
    checkedBox: {
        top: "-80%",
        right: 20,
    },
    // Checkmark on check icon
    checkedIconCheckMark: {
        right: 18,
        // Extremely small height as it cannot be 0 (should be revised
        // to use absolute positioning so it doesnt depend on height)
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
    // View for categories inside the filter
    clusterCategoryView: {
        flexDirection: "row",
        left: "9%",
        top: 7,
        width: Dimensions.get("window").width / 3.1,
    },
    // Filter reset icon
    filterResetIcon: {
        left: -60,
        top: 10,
        height: 40,
        width: 40,
    },
    // Filter reset icon
    clusterFilterResetIcon: {
        height: 40,
        width: 40,
    },
    eventButton: {
        height: 30,
        width: Dimensions.get("window").width / 2.75,
        alignSelf: "center",
        borderRadius: 10,
    },
    // Mazemap icon used on SES
    mazemapIcon: {
        left: 4,
        height: 20,
        width: 10,
    },
    // When all u need is a row
    row: {
        flexDirection: "row",
    },
    sesContent: {
        height: Dimensions.get("window").height + 200,
    }
})
