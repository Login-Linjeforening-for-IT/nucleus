// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 6/6
import messaging from "@react-native-firebase/messaging"
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 6/6

/**
 * Subscribes the user to the passed topic
 * @param topic topic to subscribe to
 */
export default async function subscribeToTopic(topic: string) {
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6
    // return null
    // COMMENT IN THIS BOX WHILE TESTING IN EXPO 6/6

    try {
        await messaging().subscribeToTopic(topic)
        return { result: true, feedback: `Subscribed to ${topic}`}
    } catch (e: any) {
        if (e.message.includes('TOO_MANY_SUBSCRIBERS')) {
            return { result: false, feedback: `Too many subscribers for topic: ${topic}`}
        } else {
            return { result: false, feedback: `Subscription to topic failed: ${e}`}
        }
    }
}
