import { StyleSheet, Dimensions } from "react-native"

export const GS = StyleSheet.create({
    // Main view of every screen
    content: {
        height: Dimensions.get("window").height + 200,
    },
    // ReportScreen description text
    reportInputContentText: {
        alignSelf: "center",
        alignItems: "center",
        width: "80%",
        height: "90%",
        borderRadius: 40,
    },
    // Horizontal card views on setting notifications
    notificationBack: {
        flexDirection: "row",
        alignItems: "center",
    },
    // Notification card text
    notificationText: {
        fontSize: 20,
    },
    // Notification card text
    notificationTip: {
        fontSize: 15,
    },
    // ReportScreen name and notifier text
    inputText: {
        alignSelf: "center",
        alignItems: "center",
        width: "80%",
        height: 50,
        borderRadius: 20,
    },
    // Left view of notificationScreen
    view: {
        alignSelf: "center",
        width: "85%",
    },
    // Right view of notificationScreen
    view2: {
        justifyContent: "center",
    },
    // Used anywhere there is a small image
    smallImage: {
        top: -30,
        alignSelf: "center",
        height: 120,
        width: 150,
    },
    // Used anywhere there is a image with height of 200
    image200: {
        top: -30,
        alignSelf: "center",
        height: 100,
        width: 200,
    },
    parentCommitteeView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        maxWidth: "93%"
    },
    committee: {
        borderRadius: 10,
        width: "125%",
    },
    image80: {
        alignSelf: "center",
        height: 80,
        width: 80,
    },
    dropdown: {
        flexDirection: "row",
        paddingLeft: 5,
        alignItems: "center",
        height: 40,
    },
    reminderDropdown: {
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        height: 40,
        justifyContent: "space-between",
    },
    dropdownContent: {
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center",
        height: 36,
    },
    dropImage: {
        alignSelf: "center",
        height: 60,
        width: 40,
    },
    reminderDropdownArrow: {
        alignSelf: "center",
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    reminderDropdownArrowOrange: {
        alignSelf: "center",
        height: 60,
        width: 40,
    },
    smallDropImage: {
        alignSelf: "center",
        height: 40,
        width: 25
    },
    row: {
        flexDirection: "row",
    },
    aboutImage: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.5,
    },
    redMine: {
        height: 20,
        width: 20
    },
    tiny: {
        height: 15,
        width: 25,
    },
    medium: {
        alignSelf: "center",
        height: 50,
        width: 50,
    },
    small: {
        height: 25,
        width: 35,
    },
    personImage: {
        alignSelf: "center",
        width: 220,
        height: 220,
    },
    socialView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialPartView: {
        width: "30%",
        alignItems: "center",
    },
    socialBigImage: {
        alignSelf: "center",
        height: 100,
        width: 200,
    },
    // Layout for the image on specificEventView
    specificArticleView: {
        alignItems: "center",
    },
    // The header image on specificEventScreen
    articleImage: {
        width: "94%",
        height: 400,
    },
    loginStatus: {
        position: "absolute",
        left: 15,
    },
    notificationDropdown: {
        position: "absolute",
        width: "100%",
        height: 70,
        zIndex: 2,
        borderRadius: 20,
        paddingLeft: 14,
        paddingTop: 2,
        overflow: "hidden"
    }, notificationDropdownTouchable: {
        top: 100,
        position: "absolute",
        marginHorizontal: 16,
        width: "92%",
        zIndex: 3,
        borderRadius: 20,
        height: 70,
    }, notificationDropdownBlur: {
        top: 100,
        position: "absolute",
        marginHorizontal: 16,
        width: "92%",
        zIndex: 1,
        borderRadius: 20,
        height: 70,
        overflow: "hidden"
    }, notificationDropdownTitle: {
        fontWeight: "500",
        fontSize: 20
    }, notificationDropdownBody: {
        fontSize: 18
    }
})
