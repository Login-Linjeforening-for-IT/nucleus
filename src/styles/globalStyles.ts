import { StyleSheet, Dimensions, Platform } from "react-native"

export const GS = StyleSheet.create({
    // Main view of every screen
    content: {
        height: Dimensions.get("window").height + 200,
        paddingHorizontal: 12
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
        alignSelf: "center",
        height: 150,
        width: 150,
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
        marginBottom: 10
    },
    socialView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialPartView: {
        width: "15%",
        alignItems: "center",
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
    }, 
    notificationDropdownTouchable: {
        top: 100,
        position: "absolute",
        marginHorizontal: 16,
        width: "92%",
        zIndex: 3,
        borderRadius: 20,
        height: 70,
    }, 
    notificationDropdownBlur: {
        top: 100,
        position: "absolute",
        marginHorizontal: 16,
        width: "92%",
        zIndex: 1,
        borderRadius: 20,
        height: 70,
        overflow: "hidden"
    }, 
    notificationDropdownTitle: {
        fontWeight: "500",
        fontSize: 20
    }, 
    notificationDropdownBody: {
        fontSize: 18
    },
    headerView: {
        position: "absolute",
        zIndex: 1,
        // When filter is enabled
        top: Dimensions.get("window").height / 17,
        // When filter is disabled
        // top: Platform.OS === "ios" ? 20 : 10,
        display: 'flex', 
        flexDirection: 'row', 
    },
    innerHeaderViewOne: {
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    innerHeaderViewTwo: {
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        justifyContent: 'space-evenly'
    },
    headerTitle: {
        alignSelf: 'center', 
        fontSize: 20,
    },
    blurBackgroundView: {
        position: "absolute",
        width: "100%",
        justifyContent: "center",
    },
    customMenuIcon: {
        right: Platform.OS === "ios" 
            ? Dimensions.get("window").width / 50 
            : Dimensions.get("window").width / 30
    },
    logo: {
        left: Platform.OS === "ios"
            ? Dimensions.get("window").width / 21.5
            : Dimensions.get("window").width / 20
    }
})

export default GS
