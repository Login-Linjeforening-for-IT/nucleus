import { StyleSheet, Platform } from "react-native"

export const T = StyleSheet.create({
    // Red text - used when
    red: {
        alignSelf: "center",
        color: "red",
        fontSize: 15,
    },
    // Location missing error text
    locationError: {
        top: 2,
        left: 8,
        alignSelf: "center",
        color: "red",
        fontSize: 15,
    },
    // Text of size 10
    text10: {
        fontSize: 10,
    },
    // Text of size 15
    text15: {
        fontSize: 15,
    },
    // Bold text of size 40
    bold40: {
        fontSize: 40,
        fontWeight: "bold",
    },
    // Bold text of size 25 (used for a few words per line max)
    bold25: {
        fontSize: 25,
        fontWeight: "bold",
    },
    // Bold text of size 28 (30 is too big when bold)
    bold28: {
        maxWidth: "89%",
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "bold",
    },
    // Text of size 30
    text30: {
        fontSize: 30,
    },
    // Text of size 25
    text25: {
        fontSize: Platform.OS === "ios" ? 25 : 20,
    },
    // Text of size 20
    text20: {
        fontSize: 20,
    },
    // Centered text of size 30
    centered: {
        alignSelf: "center",
        fontSize: 30,
    },
    // Centered text of size 10
    centered10: {
        alignSelf: "center",
        fontSize: 10,
    },
    // Centered text of size 15
    centered15: {
        alignSelf: "center",
        fontSize: 15,
    },
    // Orange centered text of size 15
    orangeCentered15: {
        alignSelf: "center",
        fontSize: 15,
        textDecorationLine: "underline",
    },
    // Centered text of size 20
    centered20: {
        textAlign: "center",
        fontSize: 20,
    },
    // Centered text of size 20 for the contact screen
    contact: {
        alignSelf: "center",
        fontSize: 15,
    },
    // Centered bold text of size 25 (used for a few words per line max)
    centeredBold25: {
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 25,
    },
    // Centered bold text of size 20
    centeredBold20: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    // Centered text of size 50
    centered50: {
        alignSelf: "center",
        fontSize: 50,
    },
    // Used for paragraphs, size 15
    paragraph: {
        fontSize: 15,
    },
    // Orange text of size 15
    orange15: {
        color: "#fd8738",
        fontSize: 15,
    },
    // Committee leader title text
    leaderTitle: {
        left: "17.5%",
        color: "#fd8738",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    // Committee leader name text
    leaderName: {
        left: "17.5%",
        fontSize: 20,
        marginBottom: 5
    },
    // Committee leader discord text
    discord: {
        left: "16.5%",
        fontSize: 20,
        textDecorationLine: "underline",
    },
    // Bold text with line next to it
    boldWithLine: {
        left: 5,
        fontSize: 15,
        fontWeight: "bold",
    },
    // Used for bold paragraphs, size 15
    boldParagraph: {
        maxWidth: "100%",
        fontSize: 15,
        fontWeight: "bold",
    },
    // Copyright text (size: 17)
    copyright: {
        textAlign: "center",
        fontSize: 10,
        marginVertical: 10
    },
    // DpecificEventInfo text (+10px from left)
    specificEventInfo: {
        fontSize: 20,
    },
    specificEventInfoContent: {
        fontSize: 20,
        maxWidth: 240
    },
    // Text used for filter categories
    filterCategoryText: {
        fontSize: 12,
        left: 5,
    },
    // Mazemap text on SES
    mazemap: {
        textDecorationLine: "underline",
        fontSize: 20,
    },
})

export default T
