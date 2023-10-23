// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6
// import messaging from "@react-native-firebase/messaging"
// import subscribeToTopic from "@utils/subscribeToTopic"
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6

type topicParams = {
    topicID?: string
    lang: boolean | undefined
    status?: boolean
    category?: string
    catArray?: boolean[] | boolean
}

/**
 * **Function for subscribing and unsubscribing from notification topics**
 *
 * When changing language it will setup notifications to follow language.
 *
 * @param topicID Topic identifier - "langChange" passed when changing language
 * @param lang Language, 1 for norwegian, 0 for english
 * @param status  true/false Subscribe or unsubscribe from given topic.
 */
export default async function topic({topicID, lang, status, category, catArray}:
topicParams) {

    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    const granted = await messaging().requestPermission()
    var topic = lang ? "norwegian"+topicID:"english"+topicID

    if (granted) {
        if (topicID === "langChange") {
            if (lang) {
                // Unsubscribe from old language
                await messaging().unsubscribeFromTopic("englishIMPORTANT")
                await messaging().unsubscribeFromTopic("englishBEDPRES")
                await messaging().unsubscribeFromTopic("englishTEKKOM")
                await messaging().unsubscribeFromTopic("englishCTF")
                await messaging().unsubscribeFromTopic("englishSOCIAL")
                await messaging().unsubscribeFromTopic("englishKARRIEREDAG")
                await messaging().unsubscribeFromTopic("englishFADDERUKA")
                await messaging().unsubscribeFromTopic("englishLOGIN")
                await messaging().unsubscribeFromTopic("englishANNET")

                // Subscribe to new language
                await subscribeToTopic("norwegianIMPORTANT")
                await subscribeToTopic("norwegianBEDPRES")
                await subscribeToTopic("norwegianTEKKOM")
                await subscribeToTopic("norwegianCTF")
                await subscribeToTopic("norwegianSOCIAL")
                await subscribeToTopic("norwegianKARRIEREDAG")
                await subscribeToTopic("norwegianFADDERUKA")
                await subscribeToTopic("norwegianLOGIN")
                await subscribeToTopic("norwegianANNET")
                return null
            } else {
                // Unsubscribe from old language
                await messaging().unsubscribeFromTopic("englishIMPORTANT")
                await messaging().unsubscribeFromTopic("norwegianBEDPRES")
                await messaging().unsubscribeFromTopic("norwegianTEKKOM")
                await messaging().unsubscribeFromTopic("norwegianCTF")
                await messaging().unsubscribeFromTopic("norwegianSOCIAL")
                await messaging().unsubscribeFromTopic("norwegianKARRIEREDAG")
                await messaging().unsubscribeFromTopic("norwegianFADDERUKA")
                await messaging().unsubscribeFromTopic("norwegianLOGIN")
                await messaging().unsubscribeFromTopic("norwegianANNET")

                // Subscribe to new language
                await subscribeToTopic("englishIMPORTANT")
                await subscribeToTopic("englishBEDPRES")
                await subscribeToTopic("englishTEKKOM")
                await subscribeToTopic("englishCTF")
                await subscribeToTopic("englishSOCIAL")
                await subscribeToTopic("englishKARRIEREDAG")
                await subscribeToTopic("englishFADDERUKA")
                await subscribeToTopic("englishLOGIN")
                await subscribeToTopic("englishANNET")
                return null
            }
        } else if (topicID === "maintenance") {
            // For maintainers of this project
            if (!lang) await subscribeToTopic("maintenance")
            // When you no longer desire to be notified
            else await messaging().unsubscribeFromTopic("maintenance")
        } else {
            let cat = category ? category.toLowerCase() : null

            if (status && Array.isArray(catArray)) {
                // Subscribe to given topic for desired time intervals
                await subscribeToTopic(`${topic}`)
                if (catArray[0]) await subscribeToTopic(topic + cat + "10m")
                if (catArray[1]) await subscribeToTopic(topic + cat + "30m")
                if (catArray[2]) await subscribeToTopic(topic + cat + "1h")
                if (catArray[3]) await subscribeToTopic(topic + cat + "2h")
                if (catArray[4]) await subscribeToTopic(topic + cat + "3h")
                if (catArray[5]) await subscribeToTopic(topic + cat + "6h")
                if (catArray[6]) await subscribeToTopic(topic + cat + "1d")
                if (catArray[7]) await subscribeToTopic(topic + cat + "2d")
                if (catArray[8]) await subscribeToTopic(topic + cat + "1w")
            } else {
                // Unsubscribe from given topic for all time intervals
                await messaging().unsubscribeFromTopic(`${topic}`)
                await messaging().unsubscribeFromTopic(topic + cat + "10m")
                await messaging().unsubscribeFromTopic(topic + cat + "30m")
                await messaging().unsubscribeFromTopic(topic + cat + "1h")
                await messaging().unsubscribeFromTopic(topic + cat + "2h")
                await messaging().unsubscribeFromTopic(topic + cat + "3h")
                await messaging().unsubscribeFromTopic(topic + cat + "6h")
                await messaging().unsubscribeFromTopic(topic + cat + "1d")
                await messaging().unsubscribeFromTopic(topic + cat + "2d")
                await messaging().unsubscribeFromTopic(topic + cat + "1w")
            }
        }
    }
}
