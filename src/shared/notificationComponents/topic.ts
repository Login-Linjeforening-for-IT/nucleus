// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6
// import messaging from "@react-native-firebase/messaging"
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6

type topicParams = {
    topicID?: string
    lang: boolean | undefined
    status?: boolean
    category?: string
    catArray?: number[]
}

/**
 * **Function for subscribing and unsubscribing from notification topics**
 *
 * When changing language it will setup notifications to follow language.
 *
 * @param {string} topicID Topic identifier - "langChange" passed when changing language
 * @param {boolean} lang Language, 1 for norwegian, 0 for english
 * @param {boolean} status  true/false Subscribe or unsubscribe from given topic.
 */
export default async function topic({topicID, lang, status, category, catArray}:
topicParams) {

    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
      return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    const granted = await messaging().requestPermission()
    var topic = lang ? "norwegian"+topicID:"english"+topicID

    if(granted) {
        if(topicID === "langChange") {
            if(lang) {
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
                await messaging().subscribeToTopic("norwegianIMPORTANT")
                await messaging().subscribeToTopic("norwegianBEDPRES")
                await messaging().subscribeToTopic("norwegianTEKKOM")
                await messaging().subscribeToTopic("norwegianCTF")
                await messaging().subscribeToTopic("norwegianSOCIAL")
                await messaging().subscribeToTopic("norwegianKARRIEREDAG")
                await messaging().subscribeToTopic("norwegianFADDERUKA")
                await messaging().subscribeToTopic("norwegianLOGIN")
                await messaging().subscribeToTopic("norwegianANNET")
                return null
            }else{
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
                await messaging().subscribeToTopic("englishIMPORTANT")
                await messaging().subscribeToTopic("englishBEDPRES")
                await messaging().subscribeToTopic("englishTEKKOM")
                await messaging().subscribeToTopic("englishCTF")
                await messaging().subscribeToTopic("englishSOCIAL")
                await messaging().subscribeToTopic("englishKARRIEREDAG")
                await messaging().subscribeToTopic("englishFADDERUKA")
                await messaging().subscribeToTopic("englishLOGIN")
                await messaging().subscribeToTopic("englishANNET")
                return null
            }
        } else if (topicID === "maintenance") {
            if(!lang) await messaging().subscribeToTopic("maintenance")       // For maintainers of this project
            else      await messaging().unsubscribeFromTopic("maintenance")   // When you no longer desire to be notified
        } else {
            let cat = category ? category.toLowerCase() : null

            if(status && catArray) {
                // Subscribe to given topic for desired time intervals
                await messaging().subscribeToTopic(`${topic}`)
                if(catArray[0]) await messaging().subscribeToTopic(topic + cat + "10m")
                if(catArray[1]) await messaging().subscribeToTopic(topic + cat + "30m")
                if(catArray[2]) await messaging().subscribeToTopic(topic + cat + "1h")
                if(catArray[3]) await messaging().subscribeToTopic(topic + cat + "2h")
                if(catArray[4]) await messaging().subscribeToTopic(topic + cat + "3h")
                if(catArray[5]) await messaging().subscribeToTopic(topic + cat + "6h")
                if(catArray[6]) await messaging().subscribeToTopic(topic + cat + "1d")
                if(catArray[7]) await messaging().subscribeToTopic(topic + cat + "2d")
                if(catArray[8]) await messaging().subscribeToTopic(topic + cat + "1w")
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