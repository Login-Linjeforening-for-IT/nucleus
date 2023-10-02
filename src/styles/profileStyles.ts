import { StyleSheet, Dimensions } from "react-native"

export const PS = StyleSheet.create({
    profileBackground: {
        alignItems: "center",
        flexDirection: "row",
    },
    profileView: {
        top: 0, 
        left: 0, 
        right: 0, 
        position: "absolute",
    },
    leftTwin: {
        justifyContent: "center",
        alignItems: "center",
        width: "33%",
    },
    rightTwin: {
        justifyContent: "center",
        width: "68%",
    },
    smallProfileImage: {
        height: 60,
        width: 60,
        borderRadius: 100,
    },
    midProfileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
    },
    bigProfileImage: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").width / 2,
        borderRadius: 100,
    },
    smallProfileLeftTriplet: {
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
    },
    smallProfileMiddleTriplet: {
        justifyContent: "center",
        width: "68%",
    },
    smallProfileRightTriplet: {
        justifyContent: "center",
        width: "3%",
    },
    smallProfileImageView: {
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
    profileGradientBackground: {
        top: "-33%",
        position: "absolute",
        width: "100%",
        height: "120%",
    },
    animatedCard: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: Dimensions.get("window").height * (2 / 3),
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        top: 10,
        minWidth: "80%",
        height: 35,
        borderRadius: 20,
    },
    animatedView: {
        top: -Dimensions.get("window").height / 4,
        width: "100%",
        alignItems: "center",
    },
    editImage: {
        left: -10,
        height: 18,
        aspectRatio: 1 / 1,
        resizeMode: "contain",
    },
    animatedProfileChangeCard: {
        position: "absolute",
        zIndex: 1000,
        top: 0,
        width: "100%",
        height: Dimensions.get("window").height * (2 / 3),
        justifyContent: "center",
        alignItems: "center",
    },
    centeredLine: {
        alignItems: "center",
    },
    inputInfoView: {
        top: -40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        height: 30,
    },
})
