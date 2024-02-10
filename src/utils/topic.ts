// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 3/6
import messaging from "@react-native-firebase/messaging"
import subscribeToTopic from "@utils/subscribeToTopic"
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
    // return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 4/6
    const granted = await messaging().requestPermission()
    if (!granted) return console.log("You must enable notifications for this feature.")

    const topic = lang ? `n${topicID}` : `e${topicID}`
    const topics = ["IMPORTANT", "BEDPRES", "TEKKOM", "CTF", "SOCIAL", "KARRIEREDAG", "FADDERUKA", "LOGIN", "ANNET"]
    const intervals = ["10m", "30m", "1h", "2h", "3h", "6h", "1d", "2d", "1w"]

    
    if (topicID === "langChange") {
        if (!lang) {
            for (const topic of topics) {
                // Unsubscribe from old language
                await messaging().unsubscribeFromTopic(`e${topic}`)
                // Subscribe to new language
                await subscribeToTopic(`n${topic}`)
            }

            return
        }

        for (const topic of topics) {
            // Unsubscribe from old language
            await messaging().unsubscribeFromTopic(`e${topic}`)
            // Subscribe to new language
            await subscribeToTopic(`n${topic}`)
        }

        return
    } 
    
    let cat = category ? category.toLowerCase() : null

    if (status && Array.isArray(catArray)) {
        // Subscribe to given topic for desired time intervals
        await subscribeToTopic(topic)

        for (let i = 0; i < catArray.length; i++) {
            if (catArray[i]) await subscribeToTopic(`${topic}${cat}${intervals[i]}`)
        }

        return
    } 
    
    // Unsubscribe from given topic for all time intervals
    await messaging().unsubscribeFromTopic(topic)

    for (let i = 0; i < intervals.length; i++) {
        await messaging().unsubscribeFromTopic(`${topic}${cat}${intervals[i]}`)
    }
}
